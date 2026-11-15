
import {
  getAddress,
  type Hash,
  type PublicClient,
  type WalletClient,
} from "viem";

import type {
  KyberBuiltSwap,
  KyberQuoteResult,
} from "../kyberswap/types";

import {
  validateKyberSwapRoute,
} from "../kyberswap/validateRoute";

export interface ExecuteKyberSwapParams {
  walletClient: WalletClient;
  publicClient: PublicClient;
  quote: KyberQuoteResult;
  swap: KyberBuiltSwap;
}

export interface ExecuteKyberSwapResult {
  hash: Hash;
  from: string;
  to: string;
  amountIn: bigint;
  submittedAt: number;
}

export async function executeKyberSwap({
  walletClient,
  publicClient,
  quote,
  swap,
}: ExecuteKyberSwapParams): Promise<ExecuteKyberSwapResult> {
  const account = walletClient.account;

  if (!account) {
    throw new Error("Connect your wallet before executing the swap.");
  }

  if (!walletClient.chain || walletClient.chain.id !== 56) {
    throw new Error("Wallet must be connected to BNB Smart Chain.");
  }

  const currentChainId = await publicClient.getChainId();

  if (currentChainId !== 56) {
    throw new Error("RPC client is not connected to BNB Smart Chain.");
  }

  if (
    account.address.toLowerCase() !==
    swap.sender.toLowerCase()
  ) {
    throw new Error(
      "Connected wallet does not match the swap sender.",
    );
  }

  validateKyberSwapRoute({
    quote,
    swap,
    expectedChainId: currentChainId,
  });

  // Para ERC-20, confirma que a aprovação já foi realizada.
  // Para BNB nativo, a carteira envia transactionValue.
  const isNativeBNB =
    swap.tokenIn.toLowerCase() ===
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

  if (!isNativeBNB) {
    const allowance = await publicClient.readContract({
      address: getAddress(swap.tokenIn),
      abi: [
        {
          type: "function",
          name: "allowance",
          stateMutability: "view",
          inputs: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
          ],
          outputs: [{ name: "", type: "uint256" }],
        },
      ],
      functionName: "allowance",
      args: [
        account.address,
        getAddress(swap.routerAddress),
      ],
    });

    if (allowance < swap.amountIn) {
      throw new Error(
        "Insufficient token allowance. Approve the net input amount first.",
      );
    }
  }

  const hash = await walletClient.sendTransaction({
    account,
    chain: walletClient.chain,
    to: getAddress(swap.routerAddress),
    data: swap.data,
    value: swap.transactionValue,
  });

  return {
    hash,
    from: account.address,
    to: getAddress(swap.routerAddress),
    amountIn: swap.amountIn,
    submittedAt: Date.now(),
  };
}
