
"use client";

import { useMemo } from "react";
import useSWR from "swr";

import {
  isAddress,
  isHex,
  parseUnits,
} from "viem";

import type {
  Address,
  Hex,
} from "viem";

import type {
  ConverterAssetSymbol,
  ConversionQuote,
} from "@/types/converter";

import {
  CONVERTER_ASSETS,
} from "@/lib/DexWallet/converter/assets";

import {
  CONVERTER_SETTINGS,
  ZERO_ADDRESS,
} from "@/lib/DexWallet/converter/contracts";

interface QuoteParams {
  tokenIn: ConverterAssetSymbol;
  tokenOut: ConverterAssetSymbol;
  amount: string;
  slippage?: number;
  providerId?: Hex;
  enabled?: boolean;
}

interface QuoteApiResponse {
  success: boolean;
  quote?: {
    providerId: string;
    tokenIn: string;
    tokenOut: string;
    amountIn: string;
    feeAmount: string;
    netAmountIn: string;
    expectedAmountOut: string;
    minimumAmountOut: string;
    slippage: number;
    routeData: string;
    deadline: string;
    updatedAt: number;
    priceImpact?: number;
  };
  error?: string;
}

async function fetchQuote(
  url: string
): Promise<ConversionQuote> {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const result =
    (await response.json()) as QuoteApiResponse;

  if (!response.ok || !result.success || !result.quote) {
    throw new Error(
      result.error || "Unable to obtain conversion quote."
    );
  }

  const quote = result.quote;

  if (
    !isHex(quote.providerId, { strict: true }) ||
    quote.providerId.length !== 66 ||
    !isAddress(quote.tokenIn) ||
    !isAddress(quote.tokenOut) ||
    !isHex(quote.routeData, { strict: true })
  ) {
    throw new Error("Invalid quote response.");
  }

  if (
    !Number.isFinite(quote.slippage) ||
    !Number.isFinite(quote.updatedAt)
  ) {
    throw new Error("Invalid quote metadata.");
  }

  const amountIn = BigInt(quote.amountIn);
  const feeAmount = BigInt(quote.feeAmount);
  const netAmountIn = BigInt(quote.netAmountIn);
  const expectedAmountOut = BigInt(
    quote.expectedAmountOut
  );
  const minimumAmountOut = BigInt(
    quote.minimumAmountOut
  );

  if (
    amountIn <= 0n ||
    feeAmount <= 0n ||
    feeAmount >= amountIn ||
    netAmountIn !== amountIn - feeAmount ||
    expectedAmountOut <= 0n ||
    minimumAmountOut <= 0n ||
    minimumAmountOut > expectedAmountOut
  ) {
    throw new Error("Invalid quote amounts.");
  }

  const deadline = BigInt(quote.deadline);

  if (deadline <= BigInt(Math.floor(Date.now() / 1000))) {
    throw new Error("Quote has expired.");
  }

  return {
    providerId: quote.providerId as Hex,
    tokenIn: quote.tokenIn as Address,
    tokenOut: quote.tokenOut as Address,
    amountIn,
    feeAmount,
    netAmountIn,
    expectedAmountOut,
    minimumAmountOut,
    slippage: quote.slippage,
    routeData: quote.routeData as Hex,
    deadline,
    updatedAt: quote.updatedAt,
    priceImpact: quote.priceImpact,
  };
}

export function useConverterQuote({
  tokenIn,
  tokenOut,
  amount,
  slippage = CONVERTER_SETTINGS.defaultSlippage,
  providerId,
  enabled = true,
}: QuoteParams) {
  const inputAsset = CONVERTER_ASSETS[tokenIn];
  const outputAsset = CONVERTER_ASSETS[tokenOut];

  const validAmount = useMemo(() => {
    try {
      if (!amount || !/^\d+(\.\d+)?$/.test(amount)) {
        return false;
      }

      return parseUnits(
        amount,
        inputAsset.decimals
      ) > 0n;
    } catch {
      return false;
    }
  }, [amount, inputAsset.decimals]);

  const validPair =
    inputAsset.address !== ZERO_ADDRESS &&
    outputAsset.address !== ZERO_ADDRESS &&
    inputAsset.address.toLowerCase() !==
      outputAsset.address.toLowerCase();

  const validProvider =
    !!providerId &&
    isHex(providerId, { strict: true }) &&
    providerId.length === 66;

  const validSlippage =
    Number.isFinite(slippage) &&
    slippage >= CONVERTER_SETTINGS.minimumSlippage &&
    slippage <= CONVERTER_SETTINGS.maximumSlippage;

  const requestEnabled =
    enabled &&
    validAmount &&
    validPair &&
    validProvider &&
    validSlippage;

  const query = useMemo(() => {
    if (!requestEnabled || !providerId) return null;

    const params = new URLSearchParams({
      tokenIn: inputAsset.address,
      tokenOut: outputAsset.address,
      amount,
      slippage: String(slippage),
      providerId,
    });

    return `/api/converter/quote?${params.toString()}`;
  }, [
    requestEnabled,
    providerId,
    inputAsset.address,
    outputAsset.address,
    amount,
    slippage,
  ]);

  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<ConversionQuote>(
    query,
    fetchQuote,
    {
      refreshInterval: requestEnabled
        ? CONVERTER_SETTINGS.quoteRefreshInterval
        : 0,
      revalidateOnFocus: true,
      dedupingInterval: 3000,
      shouldRetryOnError: false,
    }
  );

  const quoteIsFresh =
    !!data &&
    Date.now() / 1000 - data.updatedAt <= 30 &&
    data.deadline >
      BigInt(Math.floor(Date.now() / 1000));

  const quote = quoteIsFresh ? data : undefined;

  return {
    quote,
    error,
    isLoading,
    isValidating,
    isEnabled: requestEnabled,
    isFresh: quoteIsFresh,
    hasQuote: !!quote,
    refreshQuote: mutate,
  };
}
