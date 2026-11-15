
"use client";

import { useMemo } from "react";
import {
  calculateConverterFee,
  type ConverterFeeResult,
} from "@/lib/DexWallet/converter/fee/feeCalculator";

interface UseConverterFeeParams {
  grossAmount?: bigint;
  enabled?: boolean;
}

interface UseConverterFeeReturn {
  fee: ConverterFeeResult | null;
  grossAmount: bigint;
  feeAmount: bigint;
  netAmount: bigint;
  feePercent: number;
  isValid: boolean;
  error: string | null;
}

export function useConverterFee({
  grossAmount = 0n,
  enabled = true,
}: UseConverterFeeParams = {}): UseConverterFeeReturn {
  return useMemo(() => {
    const emptyResult: UseConverterFeeReturn = {
      fee: null,
      grossAmount,
      feeAmount: 0n,
      netAmount: 0n,
      feePercent: 3,
      isValid: false,
      error: null,
    };

    if (!enabled || grossAmount <= 0n) {
      return emptyResult;
    }

    try {
      const fee = calculateConverterFee(grossAmount);

      if (
        fee.grossAmount !== grossAmount ||
        fee.feeAmount <= 0n ||
        fee.netAmount <= 0n ||
        fee.feeAmount + fee.netAmount !== grossAmount
      ) {
        return {
          ...emptyResult,
          error: "Invalid converter fee calculation.",
        };
      }

      return {
        fee,
        grossAmount: fee.grossAmount,
        feeAmount: fee.feeAmount,
        netAmount: fee.netAmount,
        feePercent: 3,
        isValid: true,
        error: null,
      };
    } catch (error) {
      return {
        ...emptyResult,
        error:
          error instanceof Error
            ? error.message
            : "Unable to calculate converter fee.",
      };
    }
  }, [grossAmount, enabled]);
}
