
"use client";

import { useCallback, useState } from "react";
import {
  useAccount,
  usePublicClient,
  useWalletClient,
} from "wagmi";

import {
  isAddress,
  type Address,
  type Hex,
} from "viem";

import type { KyberBuiltSwap } from "@/lib/DexWallet/converter/kyberswap/types";

const BSC_CHAIN_ID = 56;

const NATIVE_BNB =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as Address;

const MAX_SWAP_AGE_MS = 60_000;

const ERC20_ABI = [
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
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

interface UseExecuteKyberSwapParams {
  builtSwap: KyberBuiltSwap | null;
}

interface UseExecuteKyberSwapReturn {
  execute: () => Promise<Hex | null>;
  isExecuting: boolean;
  isApproving: boolean;
  isSimulating: boolean;
  transactionHash: Hex | null;
  approvalHash: Hex | null;
  error: string | null;
  reset: () => void;
}

function sameAddress(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

export function useExecuteKyberSwap({
  builtSwap,
}: UseExecuteKyberSwapParams): UseExecuteKyberSwapReturn {
  const { address, chainId, isConnected } = useAccount();

  const publicClient = usePublicClient({
    chainId: BSC_CHAIN_ID,
  });

  const { data: walletClient } = useWalletClient({
    chainId: BSC_CHAIN_ID,
  });

  const [isExecuting, setIsExecuting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const [transactionHash, setTransactionHash] =
    useState<Hex | null>(null);

  const [approvalHash, setApprovalHash] =
    useState<Hex | null>(null);

  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setTransactionHash(null);
    setApprovalHash(null);
    setError(null);
    setIsExecuting(false);
    setIsApproving(false);
    setIsSimulating(false);
  }, []);

  const execute = useCallback(async (): Promise<Hex | null> => {
    if (isExecuting) {
      return null;
    }

    setError(null);
    setTransactionHash(null);
    setApprovalHash(null);

    try {
      if (!isConnected || !address || !walletClient) {
        throw new Error("Connect your wallet before continuing.");
      }

      if (chainId !== BSC_CHAIN_ID) {
        throw new Error("Please switch your wallet to BNB Smart Chain.");
      }

      if (!publicClient) {
        throw new Error("BSC public client is not available.");
      }

      if (!builtSwap) {
        throw new Error("Build the swap transaction first.");
      }

      if (
        !isAddress(builtSwap.routerAddress) ||
        !isAddress(builtSwap.tokenIn) ||
        !isAddress(builtSwap.tokenOut) ||
        !isAddress(builtSwap.sender) ||
        !isAddress(builtSwap.recipient)
      ) {
        throw new Error("Invalid transaction address.");
      }

      if (!sameAddress(builtSwap.sender, address)) {
        throw new Error("The transaction sender is not your connected wallet.");
      }

      if (builtSwap.chain !== "bsc") {
        throw new Error("Unsupported swap network.");
      }

      if (
        builtSwap.amountIn <= 0n ||
        builtSwap.amountOut <= 0n ||
        builtSwap.transactionValue < 0n
      ) {
        throw new Error("Invalid transaction amounts.");
      }

      if (
        !/^0x([0-9a-fA-F]{2})+$/.test(builtSwap.data)
      ) {
        throw new Error("Invalid transaction calldata.");
      }

      if (
        Date.now() - builtSwap.builtAt > MAX_SWAP_AGE_MS
      ) {
        throw new Error("This swap transaction has expired. Build it again.");
      }

      const isNativeBNB = sameAddress(
        builtSwap.tokenIn,
        NATIVE_BNB,
      );

      if (isNativeBNB) {
        if (builtSwap.transactionValue !== builtSwap.amountIn) {
          throw new Error(
            "BNB transaction value must equal the net input amount.",
          );
        }
      } else if (builtSwap.transactionValue !== 0n) {
        throw new Error(
          "An ERC20 swap must not send native BNB as transaction value.",
        );
      }

      setIsExecuting(true);

      // --------------------------------------------------
      // 1. ERC20 allowance: approve exact net input only
      // --------------------------------------------------

      if (!isNativeBNB) {
        const currentAllowance = await publicClient.readContract({
          address: builtSwap.tokenIn,
          abi: ERC20_ABI,
          functionName: "allowance",
          args: [address, builtSwap.routerAddress],
        });

        if (currentAllowance < builtSwap.amountIn) {
          setIsApproving(true);

          const approveHash = await walletClient.writeContract({
            address: builtSwap.tokenIn,
            abi: ERC20_ABI,
            functionName: "approve",
            args: [
              builtSwap.routerAddress,
              builtSwap.amountIn,
            ],
            account: address,
            chain: walletClient.chain,
          });

          setApprovalHash(approveHash);

          const approvalReceipt =
            await publicClient.waitForTransactionReceipt({
              hash: approveHash,
            });

          if (approvalReceipt.status !== "success") {
            throw new Error("Token approval transaction failed.");
          }

          setIsApproving(false);

          const updatedAllowance = await publicClient.readContract({
            address: builtSwap.tokenIn,
            abi: ERC20_ABI,
            functionName: "allowance",
            args: [address, builtSwap.routerAddress],
          });

          if (updatedAllowance < builtSwap.amountIn) {
            throw new Error("Insufficient token allowance after approval.");
          }
        }
      }

      // --------------------------------------------------
      // 2. Simulate transaction before sending
      // --------------------------------------------------

      setIsSimulating(true);

      const transactionRequest = {
        account: address,
        to: builtSwap.routerAddress,
        data: builtSwap.data,
        value: builtSwap.transactionValue,
      } as const;

      await publicClient.call(transactionRequest);

      const gasEstimate = await publicClient.estimateGas(
        transactionRequest,
      );

      setIsSimulating(false);

      // --------------------------------------------------
      // 3. Send transaction through connected wallet
      // --------------------------------------------------

      const hash = await walletClient.sendTransaction({
        account: address,
        to: builtSwap.routerAddress,
        data: builtSwap.data,
        value: builtSwap.transactionValue,
        gas: (gasEstimate * 120n) / 100n,
        chain: walletClient.chain,
      });

      setTransactionHash(hash);

      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
      });

      if (receipt.status !== "success") {
        throw new Error("KyberSwap transaction reverted.");
      }

      return hash;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unexpected swap execution error.",
      );

      return null;
    } finally {
      setIsExecuting(false);
      setIsApproving(false);
      setIsSimulating(false);
    }
  }, [
    isExecuting,
    isConnected,
    address,
    chainId,
    walletClient,
    publicClient,
    builtSwap,
  ]);

  return {
    execute,
    isExecuting,
    isApproving,
    isSimulating,
    transactionHash,
    approvalHash,
    error,
    reset,
  };
}
