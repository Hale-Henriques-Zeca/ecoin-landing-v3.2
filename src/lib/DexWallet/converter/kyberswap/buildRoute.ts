
import {
  getAddress,
  isAddress,
  type Address,
  type Hex,
} from "viem";

import { kyberPost } from "./client";

import type {
  KyberBuildRouteData,
  KyberBuildRouteParams,
  KyberQuoteResult,
  KyberBuiltSwap,
} from "./types";

const BUILD_ENDPOINT = "route/build";

function sameAddress(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

function validateSlippage(value: number): void {
  if (
    !Number.isInteger(value) ||
    value < 1 ||
    value > 500
  ) {
    throw new Error(
      "Slippage must be between 1 and 500 basis points (0.01%–5%).",
    );
  }
}

function validateBuildResponse(
  data: KyberBuildRouteData,
  quote: KyberQuoteResult,
): void {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid KyberSwap build response.");
  }

  if (!/^0x[0-9a-fA-F]+$/.test(data.data || "")) {
    throw new Error("Invalid KyberSwap transaction calldata.");
  }

  if (!isAddress(data.routerAddress)) {
    throw new Error("Invalid KyberSwap execution router.");
  }

  if (!sameAddress(data.routerAddress, quote.routerAddress)) {
    throw new Error(
      "KyberSwap router changed between quote and build.",
    );
  }

  if (BigInt(data.amountIn) !== quote.netAmount) {
    throw new Error(
      "Built transaction amount differs from the net input amount.",
    );
  }

  if (BigInt(data.amountOut) <= 0n) {
    throw new Error("Invalid expected output amount.");
  }

  if (BigInt(data.transactionValue) < 0n) {
    throw new Error("Invalid transaction value.");
  }
}

/**
 * Builds KyberSwap API V1 calldata.
 *
 * This function does not sign or broadcast the transaction.
 * The user's wallet will execute it later.
 */
export async function buildKyberSwapRoute(params: {
  quote: KyberQuoteResult;
  sender: Address;
  recipient: Address;
  slippageTolerance?: number;
  source?: string;
  referral?: string;
  enableGasEstimation?: boolean;
}): Promise<KyberBuiltSwap> {
  const {
    quote,
    sender,
    recipient,
    source,
    referral,
    enableGasEstimation = true,
  } = params;

  const slippageTolerance =
    params.slippageTolerance ?? 50;

  validateSlippage(slippageTolerance);

  if (!isAddress(sender) || !isAddress(recipient)) {
    throw new Error("Invalid sender or recipient address.");
  }

  if (quote.netAmount <= 0n) {
    throw new Error("Invalid quote net amount.");
  }

  if (
    BigInt(quote.routeSummary.amountIn) !== quote.netAmount
  ) {
    throw new Error(
      "Quote summary does not match the net amount.",
    );
  }

  const body: KyberBuildRouteParams = {
    chain: quote.chain,
    routeSummary: quote.routeSummary,

    sender: getAddress(sender),
    recipient: getAddress(recipient),

    slippageTolerance,

    ...(source ? { source } : {}),
    ...(referral ? { referral } : {}),

    enableGasEstimation,
  };

  const data = await kyberPost<KyberBuildRouteData>({
    chain: quote.chain,
    path: BUILD_ENDPOINT,
    body,
  });

  validateBuildResponse(data, quote);

  return {
    chain: quote.chain,

    sender: getAddress(sender),
    recipient: getAddress(recipient),

    tokenIn: quote.tokenIn,
    tokenOut: quote.tokenOut,

    amountIn: BigInt(data.amountIn),
    amountOut: BigInt(data.amountOut),

    routerAddress: getAddress(data.routerAddress),
    transactionValue: BigInt(data.transactionValue),
    data: data.data as Hex,

    slippageTolerance,

    builtAt: Date.now(),
  };
}
