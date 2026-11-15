
"use client";

import { useCallback } from "react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import type { Address } from "viem";

import {
  CONVERTER_ERC20_ABI,
  EDEN_KINGDOM_CONVERTER_ROUTER_ABI,
} from "@/lib/abis/Converter/abis";

import {
  CONVERTER_CONTRACTS,
  ZERO_ADDRESS,
} from "@/lib/DexWallet/converter/contracts";

import type { ConverterAssetSymbol } from "@/types/converter";
import { CONVERTER_ASSETS } from "@/lib/DexWallet/converter/assets";

const MAX_UINT256 = (1n << 256n) - 1n;

interface UseConverterApprovalParams {
  token: ConverterAssetSymbol;
  amount: bigint;
}

export function useConverterApproval({
  token,
  amount,
}: UseConverterApprovalParams) {
  const { address, isConnected, chainId } = useAccount();

  const asset = CONVERTER_ASSETS[token];

  const routerAddress =
    CONVERTER_CONTRACTS.edenKingDomConverterRouter;

  const isNative = asset.isNative;

  const isRouterConfigured =
    routerAddress !== ZERO_ADDRESS;

  const isCorrectChain =
    chainId === CONVERTER_CONTRACTS.chainId;

  const canReadAllowance =
    isConnected &&
    !!address &&
    !isNative &&
    isRouterConfigured &&
    isCorrectChain;

  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    error: allowanceError,
    refetch: refetchAllowance,
  } = useReadContract({
    address: asset.address,
    abi: CONVERTER_ERC20_ABI,
    functionName: "allowance",
    args:
      canReadAllowance
        ? [address as Address, routerAddress]
        : undefined,
    query: {
      enabled: canReadAllowance,
    },
  });

  const {
    writeContractAsync,
    data: approvalHash,
    isPending: isApprovalPending,
    error: approvalError,
    reset,
  } = useWriteContract();

  const {
    isLoading: isApprovalConfirming,
    isSuccess: isApprovalConfirmed,
    isError: isApprovalReceiptError,
  } = useWaitForTransactionReceipt({
    hash: approvalHash,
    query: {
      enabled: !!approvalHash,
    },
  });

  const currentAllowance = allowance ?? 0n;

  const requiresApproval =
    !isNative &&
    amount > 0n &&
    currentAllowance < amount;

  const isApproved =
    isNative ||
    (amount > 0n && currentAllowance >= amount);

  const approve = useCallback(
    async (approveMax = false) => {
      if (!isConnected || !address) {
        throw new Error("Connect your wallet first.");
      }

      if (!isCorrectChain) {
        throw new Error("Switch to BNB Smart Chain Mainnet.");
      }

      if (isNative) {
        throw new Error("BNB does not require ERC20 approval.");
      }

      if (!isRouterConfigured) {
        throw new Error(
          "EdenKingDomConverterRouter address is not configured.",
        );
      }

      if (asset.address === ZERO_ADDRESS) {
        throw new Error("Invalid ERC20 token address.");
      }

      if (amount <= 0n) {
        throw new Error("Invalid approval amount.");
      }

      return writeContractAsync({
        address: asset.address,
        abi: CONVERTER_ERC20_ABI,
        functionName: "approve",
        args: [
          routerAddress,
          approveMax ? MAX_UINT256 : amount,
        ],
      });
    },
    [
      isConnected,
      address,
      isCorrectChain,
      isNative,
      isRouterConfigured,
      asset.address,
      amount,
      routerAddress,
      writeContractAsync,
    ],
  );

  return {
    allowance: currentAllowance,
    requiresApproval,
    isApproved,

    isNative,
    isRouterConfigured,
    isCorrectChain,

    approve,
    refetchAllowance,

    approvalHash,
    isApprovalPending,
    isApprovalConfirming,
    isApprovalConfirmed,
    isApprovalReceiptError,

    isAllowanceLoading,
    allowanceError,
    approvalError,

    resetApproval: reset,
  };
}
