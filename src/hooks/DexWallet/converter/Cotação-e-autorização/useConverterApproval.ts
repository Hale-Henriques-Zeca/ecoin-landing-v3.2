
"use client";

import {
  useCallback,
} from "react";

import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import type {
  Address,
} from "viem";

import {
  DEX_CONVERTER_FEE_COLLECTOR_ABI,
  CONVERTER_ERC20_ABI,
} from "@/lib/abis/Converter/abis";

import {
  CONVERTER_CONTRACTS,
  ZERO_ADDRESS,
} from "@/lib/DexWallet/converter/contracts";

import type {
  ConverterAssetSymbol,
} from "@/types/converter";

import {
  CONVERTER_ASSETS,
} from "@/lib/DexWallet/converter/assets";

interface UseConverterApprovalParams {
  token: ConverterAssetSymbol;
  amount: bigint;
}

export function useConverterApproval({
  token,
  amount,
}: UseConverterApprovalParams) {
  const { address, isConnected } = useAccount();

  const asset = CONVERTER_ASSETS[token];

  const isNative = asset.isNative;

  const isConfigured =
    asset.address !== ZERO_ADDRESS &&
    CONVERTER_CONTRACTS.internalConverter !== ZERO_ADDRESS;

  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    refetch: refetchAllowance,
  } = useReadContract({
    address: asset.address,
    abi: CONVERTER_ERC20_ABI,
    functionName: "allowance",
    args:
      address && !isNative
        ? [address, CONVERTER_CONTRACTS.internalConverter]
        : undefined,
    query: {
      enabled:
        isConnected &&
        !!address &&
        !isNative &&
        isConfigured,
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

      if (isNative) {
        throw new Error("BNB does not require approval.");
      }

      if (!isConfigured) {
        throw new Error("Converter contract is not configured.");
      }

      if (amount <= 0n) {
        throw new Error("Invalid approval amount.");
      }

      return writeContractAsync({
        address: asset.address,
        abi: CONVERTER_ERC20_ABI,
        functionName: "approve",
        args: [
          CONVERTER_CONTRACTS.internalConverter,
          approveMax
            ? BigInt(
                "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
              )
            : amount,
        ],
      });
    },
    [
      isConnected,
      address,
      isNative,
      isConfigured,
      amount,
      asset.address,
      writeContractAsync,
    ]
  );

  return {
    allowance: currentAllowance,
    requiresApproval,
    isApproved,
    isNative,
    isConnected,
    isAllowanceLoading,
    isApprovalPending,
    isApprovalConfirming,
    isApprovalConfirmed,
    isApprovalReceiptError,
    approvalHash,
    approvalError,
    approve,
    refetchAllowance,
    resetApproval: reset,
  };
}
