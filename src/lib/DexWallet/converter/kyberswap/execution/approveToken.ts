
import {
  erc20Abi,
  getAddress,
  type Address,
  type Hash,
  type PublicClient,
  type WalletClient,
} from "viem";

import type { KyberBuiltSwap } from "../kyberswap/types";
import {
  KYBER_NATIVE_BNB,
} from "../kyberswap/validateRoute";

export interface ApproveTokenParams {
  walletClient: WalletClient;
  publicClient: PublicClient;
  swap: KyberBuiltSwap;
}

export interface ApproveTokenResult {
  skipped: boolean;
  approvalHash?: Hash;
  allowance: bigint;
  spender: Address;
}

function isNativeBNB(token: Address): boolean {
  return token.toLowerCase() === KYBER_NATIVE_BNB.toLowerCase();
}

export async function approveKyberSwapToken({
  walletClient,
  publicClient,
  swap,
}: ApproveTokenParams): Promise<ApproveTokenResult> {
  const account = walletClient.account;

  if (!account) {
    throw new Error("Connect your wallet before approving tokens.");
  }

  if (!walletClient.chain || walletClient.chain.id !== 56) {
    throw new Error("Please switch your wallet to BNB Smart Chain.");
  }

  if (isNativeBNB(swap.tokenIn)) {
    return {
      skipped: true,
      allowance: 0n,
      spender: getAddress(swap.routerAddress),
    };
  }

  if (swap.amountIn <= 0n) {
    throw new Error("Invalid approval amount.");
  }

  const token = getAddress(swap.tokenIn);
  const spender = getAddress(swap.routerAddress);

  const currentAllowance = await publicClient.readContract({
    address: token,
    abi: erc20Abi,
    functionName: "allowance",
    args: [account.address, spender],
  });

  if (currentAllowance >= swap.amountIn) {
    return {
      skipped: true,
      allowance: currentAllowance,
      spender,
    };
  }

  // Alguns tokens exigem allowance = 0 antes de uma nova aprovação.
  if (currentAllowance > 0n) {
    const resetHash = await walletClient.writeContract({
      account,
      chain: walletClient.chain,
      address: token,
      abi: erc20Abi,
      functionName: "approve",
      args: [spender, 0n],
    });

    const resetReceipt = await publicClient.waitForTransactionReceipt({
      hash: resetHash,
    });

    if (resetReceipt.status !== "success") {
      throw new Error("Failed to reset the token allowance.");
    }
  }

  // Aprovação exata: nunca unlimited approval.
  const approvalHash = await walletClient.writeContract({
    account,
    chain: walletClient.chain,
    address: token,
    abi: erc20Abi,
    functionName: "approve",
    args: [spender, swap.amountIn],
  });

  const approvalReceipt =
    await publicClient.waitForTransactionReceipt({
      hash: approvalHash,
    });

  if (approvalReceipt.status !== "success") {
    throw new Error("Token approval transaction failed.");
  }

  const updatedAllowance = await publicClient.readContract({
    address: token,
    abi: erc20Abi,
    functionName: "allowance",
    args: [account.address, spender],
  });

  if (updatedAllowance < swap.amountIn) {
    throw new Error(
      "Token allowance is still below the required swap amount.",
    );
  }

  return {
    skipped: false,
    approvalHash,
    allowance: updatedAllowance,
    spender,
  };
}
