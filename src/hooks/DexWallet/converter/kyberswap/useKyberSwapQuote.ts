
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { Address } from "viem";

import {
  calculateConverterFee,
} from "@/lib/DexWallet/converter/fee/feeCalculator";

import type {
  KyberChain,
  KyberQuoteResult,
} from "@/lib/DexWallet/converter/kyberswap/types";

// ============================================================
// TYPES
// ============================================================

interface UseKyberQuoteParams {
  tokenIn?: Address;
  tokenOut?: Address;
  grossAmount?: bigint;
  chain?: KyberChain;
  enabled?: boolean;
}

interface QuoteApiResponse {
  success?: boolean;
  error?: string;

  quote?: {
    chain: KyberChain;
    tokenIn: Address;
    tokenOut: Address;

    grossAmount: string;
    feeAmount: string;
    netAmount: string;

    amountOut: string;

    routerAddress: Address;

    routeSummary: KyberQuoteResult["routeSummary"];

    amountOutUsd?: string | null;
    gas?: string | null;
    gasUsd?: string | null;

    quotedAt: number;
  };
}

interface UseKyberQuoteReturn {
  quote: KyberQuoteResult | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clear: () => void;
}

// ============================================================
// CONFIGURATION
// ============================================================

const QUOTE_ENDPOINT =
  "/api/converter/kyberswap/routes";

// ============================================================
// NORMALIZE QUOTE
// ============================================================

function normalizeQuote(
  response: QuoteApiResponse,
  expectedGrossAmount: bigint,
  expectedFeeAmount: bigint,
  expectedNetAmount: bigint,
  expectedTokenIn: Address,
  expectedTokenOut: Address,
): KyberQuoteResult {
  const item = response?.quote;

  if (!item) {
    throw new Error(
      response?.error ||
        "The quote API returned an empty response.",
    );
  }

  if (
    item.chain !== "bsc" ||
    item.tokenIn.toLowerCase() !== expectedTokenIn.toLowerCase() ||
    item.tokenOut.toLowerCase() !== expectedTokenOut.toLowerCase()
  ) {
    throw new Error(
      "The quote API returned unexpected conversion parameters.",
    );
  }

  if (
    !/^\d+$/.test(item.grossAmount) ||
    !/^\d+$/.test(item.feeAmount) ||
    !/^\d+$/.test(item.netAmount) ||
    !/^\d+$/.test(item.amountOut)
  ) {
    throw new Error(
      "The quote API returned invalid numeric amounts.",
    );
  }

  const grossAmount = BigInt(item.grossAmount);
  const feeAmount = BigInt(item.feeAmount);
  const netAmount = BigInt(item.netAmount);
  const amountOut = BigInt(item.amountOut);

  // Verify the frontend-calculated breakdown.
  if (
    grossAmount !== expectedGrossAmount ||
    feeAmount !== expectedFeeAmount ||
    netAmount !== expectedNetAmount
  ) {
    throw new Error(
      "The quote API returned an unexpected amount breakdown.",
    );
  }

  if (
    grossAmount <= 0n ||
    feeAmount <= 0n ||
    netAmount <= 0n ||
    amountOut <= 0n ||
    feeAmount + netAmount !== grossAmount
  ) {
    throw new Error(
      "The quote contains an invalid amount breakdown.",
    );
  }

  // Verify that KyberSwap quoted the NET amount.
  if (
    BigInt(item.routeSummary.amountIn) !== expectedNetAmount
  ) {
    throw new Error(
      "KyberSwap did not use the expected net input amount.",
    );
  }

  if (
    item.routeSummary.tokenIn.toLowerCase() !== expectedTokenIn.toLowerCase() ||
    item.routeSummary.tokenOut.toLowerCase() !== expectedTokenOut.toLowerCase()
  ) {
    throw new Error(
      "KyberSwap returned unexpected route tokens.",
    );
  }

  if (
    BigInt(item.routeSummary.amountOut) !== amountOut
  ) {
    throw new Error(
      "The quote output amount does not match the route summary.",
    );
  }

  return {
    ...item,
    grossAmount,
    feeAmount,
    netAmount,
    amountOut,
  };
}

// ============================================================
// HOOK
// ============================================================

export function useKyberSwapQuote({
  tokenIn,
  tokenOut,
  grossAmount = 0n,
  chain = "bsc",
  enabled = true,
}: UseKyberQuoteParams): UseKyberQuoteReturn {
  const [quote, setQuote] =
    useState<KyberQuoteResult | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const requestId = useRef(0);

  const abortRef =
    useRef<AbortController | null>(null);

  // ----------------------------------------------------------
  // CLEAR
  // ----------------------------------------------------------

  const clear = useCallback(() => {
    requestId.current += 1;

    abortRef.current?.abort();
    abortRef.current = null;

    setQuote(null);
    setError(null);
    setIsLoading(false);
  }, []);

  // ----------------------------------------------------------
  // REFRESH QUOTE
  // ----------------------------------------------------------

  const refetch = useCallback(async () => {
    if (
      !enabled ||
      !tokenIn ||
      !tokenOut ||
      grossAmount <= 0n
    ) {
      clear();
      return;
    }

    if (
      tokenIn.toLowerCase() === tokenOut.toLowerCase()
    ) {
      clear();
      setError(
        "Input and output tokens must be different.",
      );
      return;
    }

    // --------------------------------------------------------
    // 1. Calculate frontend fee breakdown
    // --------------------------------------------------------

    let breakdown;

    try {
      breakdown = calculateConverterFee(grossAmount);
    } catch (err) {
      clear();

      setError(
        err instanceof Error
          ? err.message
          : "Invalid conversion amount.",
      );

      return;
    }

    const {
      grossAmount: expectedGross,
      feeAmount: expectedFee,
      netAmount,
    } = breakdown;

    // --------------------------------------------------------
    // 2. Start request
    // --------------------------------------------------------

    const currentRequest = ++requestId.current;

    abortRef.current?.abort();

    const controller = new AbortController();

    abortRef.current = controller;

    setIsLoading(true);
    setError(null);
    setQuote(null);

    try {
      // ------------------------------------------------------
      // 3. Request quote API
      // ------------------------------------------------------

      const response = await fetch(QUOTE_ENDPOINT, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        cache: "no-store",
        signal: controller.signal,

        body: JSON.stringify({
          chain,
          tokenIn,
          tokenOut,

          // Send the complete frontend breakdown.
          grossAmount: expectedGross.toString(),
          feeAmount: expectedFee.toString(),
          netAmount: netAmount.toString(),
        }),
      });

      let body: QuoteApiResponse;

      try {
        body = (await response.json()) as QuoteApiResponse;
      } catch {
        throw new Error(
          "The quote API returned an invalid response.",
        );
      }

      if (!response.ok) {
        throw new Error(
          body?.error ||
            "Unable to fetch KyberSwap quote.",
        );
      }

      // ------------------------------------------------------
      // 4. Normalize and validate response
      // ------------------------------------------------------

      const normalized = normalizeQuote(
        body,
        expectedGross,
        expectedFee,
        netAmount,
        tokenIn,
        tokenOut,
      );

      // ------------------------------------------------------
      // 5. Update state only for latest request
      // ------------------------------------------------------

      if (currentRequest === requestId.current) {
        setQuote(normalized);
      }
    } catch (err) {
      if (
        err instanceof Error &&
        err.name === "AbortError"
      ) {
        return;
      }

      if (currentRequest === requestId.current) {
        setQuote(null);

        setError(
          err instanceof Error
            ? err.message
            : "Unexpected quote error.",
        );
      }
    } finally {
      if (currentRequest === requestId.current) {
        setIsLoading(false);

        if (abortRef.current === controller) {
          abortRef.current = null;
        }
      }
    }
  }, [
    enabled,
    tokenIn,
    tokenOut,
    grossAmount,
    chain,
    clear,
  ]);

  // ----------------------------------------------------------
  // AUTO QUOTE
  // ----------------------------------------------------------

  useEffect(() => {
    void refetch();

    return () => {
      abortRef.current?.abort();
    };
  }, [refetch]);

  // ----------------------------------------------------------
  // RETURN
  // ----------------------------------------------------------

  return {
    quote,
    isLoading,
    error,
    refetch,
    clear,
  };
}
