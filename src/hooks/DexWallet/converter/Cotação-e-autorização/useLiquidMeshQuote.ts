
"use client";

import { useMemo } from "react";
import useSWR from "swr";
import { isAddress, parseUnits } from "viem";

import {
  CONVERTER_SETTINGS,
  ZERO_ADDRESS,
} from "@/lib/DexWallet/converter/contracts";

import { CONVERTER_ASSETS } from "@/lib/DexWallet/converter/assets";

import type { ConverterAssetSymbol } from "@/types/converter";

export interface LiquidMeshQuoteParams {
  tokenIn: ConverterAssetSymbol;
  tokenOut: ConverterAssetSymbol;
  amount: string;
  userAddress?: string;
  slippage?: number;
  enabled?: boolean;
}

export interface LiquidMeshQuote {
  provider: "LIQUIDMESH";
  chainId: number;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  expectedAmountOut: string;
  minimumAmountOut: string;
  slippage: number;
  priceImpact: number | null;
  routePlans: unknown[];
  midPrice: string | null;
  estimatedGas: number | null;
  blockNumber: number | null;
  updatedAt: number;
}

interface LiquidMeshQuoteResponse {
  success: boolean;
  quote?: LiquidMeshQuote;
  error?: string;
}

interface QuoteRequestBody {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  userAddress: string;
  slippage: number;
}

async function fetchLiquidMeshQuote(
  url: string,
  body: QuoteRequestBody
): Promise<LiquidMeshQuote> {
  const response = await fetch(url, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as LiquidMeshQuoteResponse;

  if (!response.ok || !data.success || !data.quote) {
    throw new Error(
      data.error || "Não foi possível obter a cotação LiquidMesh."
    );
  }

  const quote = data.quote;

  if (
    typeof quote.expectedAmountOut !== "string" ||
    typeof quote.minimumAmountOut !== "string" ||
    !/^\d+$/.test(quote.expectedAmountOut) ||
    !/^\d+$/.test(quote.minimumAmountOut)
  ) {
    throw new Error("A resposta LiquidMesh contém valores inválidos.");
  }

  if (
    BigInt(quote.expectedAmountOut) <= 0n ||
    BigInt(quote.minimumAmountOut) <= 0n ||
    BigInt(quote.minimumAmountOut) > BigInt(quote.expectedAmountOut)
  ) {
    throw new Error("A cotação LiquidMesh não passou na validação.");
  }

  if (!Number.isFinite(quote.updatedAt)) {
    throw new Error("Data da cotação inválida.");
  }

  return quote;
}

export function useLiquidMeshQuote({
  tokenIn,
  tokenOut,
  amount,
  userAddress,
  slippage = CONVERTER_SETTINGS.defaultSlippage,
  enabled = true,
}: LiquidMeshQuoteParams) {
  const assetIn = CONVERTER_ASSETS[tokenIn];
  const assetOut = CONVERTER_ASSETS[tokenOut];

  const amountIn = useMemo(() => {
    if (!amount || !assetIn) return null;

    try {
      const parsed = parseUnits(amount, assetIn.decimals);
      return parsed > 0n ? parsed.toString() : null;
    } catch {
      return null;
    }
  }, [amount, assetIn]);

  const validPair = Boolean(
    assetIn &&
      assetOut &&
      tokenIn !== tokenOut &&
      isAddress(assetIn.address) &&
      isAddress(assetOut.address) &&
      assetIn.address !== ZERO_ADDRESS &&
      assetOut.address !== ZERO_ADDRESS
  );

  const validWallet =
    typeof userAddress === "string" &&
    isAddress(userAddress);

  const validSlippage =
    Number.isFinite(slippage) &&
    slippage >= CONVERTER_SETTINGS.minimumSlippage &&
    slippage <= CONVERTER_SETTINGS.maximumSlippage;

  const requestEnabled = Boolean(
    enabled &&
      amountIn &&
      validPair &&
      validWallet &&
      validSlippage
  );

  const requestBody = useMemo<QuoteRequestBody | null>(() => {
    if (
      !requestEnabled ||
      !assetIn ||
      !assetOut ||
      !userAddress ||
      !amountIn
    ) {
      return null;
    }

    return {
      tokenIn: assetIn.address,
      tokenOut: assetOut.address,
      amountIn,
      userAddress,
      slippage,
    };
  }, [
    requestEnabled,
    assetIn,
    assetOut,
    amountIn,
    userAddress,
    slippage,
  ]);

  const swrKey = requestBody
    ? "/api/converter/liquidmesh/quote"
    : null;

  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(
    swrKey
      ? [swrKey, requestBody]
      : null,
    ([url, body]) => fetchLiquidMeshQuote(url, body),
    {
      refreshInterval: CONVERTER_SETTINGS.quoteRefreshInterval,
      revalidateOnFocus: true,
      dedupingInterval: 2_000,
      shouldRetryOnError: false,
    }
  );

  const isFresh = data
    ? Date.now() - data.updatedAt <
      CONVERTER_SETTINGS.quoteRefreshInterval * 2
    : false;

  return {
    quote: data ?? null,
    error: error?.message ?? null,

    isLoading,
    isValidating,

    isReady: Boolean(data && isFresh),
    isFresh,

    refreshQuote: mutate,
  };
}
