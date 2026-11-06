
"use client";

import { useMemo } from "react";

import {
  useReadContract,
} from "wagmi";

import {
  DEX_CONVERTER_FEE_COLLECTOR_ABI,
} from "@/lib/abis/Converter/abis";

import {
  CONVERTER_CONTRACTS,
  ZERO_ADDRESS,
} from "@/lib/DexWallet/converter/contracts";

import {
  calculateConverterFee,
} from "@/lib/DexWallet/converter/formatters";

interface UseConverterFeeParams {
  amountIn?: bigint;
  enabled?: boolean;
}

export function useConverterFee({
  amountIn = 0n,
  enabled = true,
}: UseConverterFeeParams = {}) {
  const validAmount = amountIn > 0n;

  const {
    data: feeAmount,
    isLoading,
    isError,
    refetch,
  } = useReadContract({
    address: CONVERTER_CONTRACTS.feeCollector,
    abi: DEX_CONVERTER_FEE_COLLECTOR_ABI,
    functionName: "previewFee",
    args: validAmount ? [amountIn] : undefined,
    query: {
      enabled:
        enabled &&
        validAmount &&
        CONVERTER_CONTRACTS.feeCollector !== ZERO_ADDRESS,
    },
  });

  const preview = useMemo(() => {
    if (feeAmount === undefined) return undefined;

    const fee = feeAmount as bigint;

    if (fee >= amountIn) return undefined;

    return {
      grossAmount: amountIn,
      feeAmount: fee,
      netAmount: amountIn - fee,
      feePercentage:
        amountIn > 0n
          ? Number((fee * 10_000n) / amountIn) / 100
          : 0,
    };
  }, [feeAmount, amountIn]);

  const localEstimate = useMemo(
    () => calculateConverterFee(amountIn),
    [amountIn]
  );

  return {
    feeAmount: preview?.feeAmount,
    netAmount: preview?.netAmount,
    grossAmount: amountIn,
    feePercentage: preview?.feePercentage,
    preview,
    localEstimate,
    isLoading,
    isError,
    isValid: preview !== undefined,
    refetch,
  };
}
