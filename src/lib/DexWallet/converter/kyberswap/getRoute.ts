
import { getAddress, isAddress } from "viem";

import {
  calculateConverterFee,
} from "../fee/feeCalculator";

import { kyberGet } from "./client";

import type {
  GetRouteParams,
  KyberGetRouteData,
  KyberQuoteResult,
} from "./types";

const ROUTES_ENDPOINT = "routes";

function sameAddress(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

function validateRouteInput(params: GetRouteParams): void {
  if (!isAddress(params.tokenIn)) {
    throw new Error("Invalid input token address.");
  }

  if (!isAddress(params.tokenOut)) {
    throw new Error("Invalid output token address.");
  }

  if (sameAddress(params.tokenIn, params.tokenOut)) {
    throw new Error("Input and output tokens must be different.");
  }

  if (
    params.fee.grossAmount <= 0n ||
    params.fee.feeAmount <= 0n ||
    params.fee.netAmount <= 0n
  ) {
    throw new Error("Invalid fee calculation.");
  }

  const expectedFee = calculateConverterFee(
    params.fee.grossAmount,
  );

  if (
    expectedFee.feeAmount !== params.fee.feeAmount ||
    expectedFee.netAmount !== params.fee.netAmount
  ) {
    throw new Error(
      "Fee breakdown is inconsistent. Recalculate the fee.",
    );
  }
}

/**
 * Fetches the best KyberSwap route using API V1.
 *
 * IMPORTANT:
 * amountIn is always fee.netAmount.
 * grossAmount is never sent to KyberSwap.
 */
export async function getKyberRoute(
  params: GetRouteParams,
): Promise<KyberQuoteResult> {
  validateRouteInput(params);

  const {
    chain,
    tokenIn,
    tokenOut,
    fee,
  } = params;

  const netAmount = fee.netAmount;

  const routeData = await kyberGet<KyberGetRouteData>({
    chain,
    path: ROUTES_ENDPOINT,
    query: {
      tokenIn: getAddress(tokenIn),
      tokenOut: getAddress(tokenOut),

      // Never use fee.grossAmount here.
      amountIn: netAmount.toString(),

      includedSources: params.includedSources,
      excludedSources: params.excludedSources,
      gasInclude: params.gasInclude,
      saveGas: params.saveGas,
    },
  });

  if (!routeData?.routeSummary) {
    throw new Error(
      "KyberSwap did not return a route summary.",
    );
  }

  const summary = routeData.routeSummary;

  if (!isAddress(routeData.routerAddress)) {
    throw new Error("Invalid KyberSwap router address.");
  }

  if (
    !sameAddress(summary.tokenIn, tokenIn) ||
    !sameAddress(summary.tokenOut, tokenOut)
  ) {
    throw new Error(
      "KyberSwap returned a route for different tokens.",
    );
  }

  if (BigInt(summary.amountIn) !== netAmount) {
    throw new Error(
      "KyberSwap route amount does not match the net input amount.",
    );
  }

  if (
    !summary.amountOut ||
    !/^\d+$/.test(summary.amountOut) ||
    BigInt(summary.amountOut) <= 0n
  ) {
    throw new Error("Invalid KyberSwap output amount.");
  }

  return {
    chain,

    tokenIn: getAddress(tokenIn),
    tokenOut: getAddress(tokenOut),

    grossAmount: fee.grossAmount,
    feeAmount: fee.feeAmount,
    netAmount,

    amountOut: BigInt(summary.amountOut),

    routerAddress: getAddress(routeData.routerAddress),
    routeSummary: summary,

    amountOutUsd: summary.amountOutUsd,
    gas: summary.gas,
    gasUsd: summary.gasUsd,

    quotedAt: Date.now(),
  };
}
