
import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "node:crypto";
import { isAddress } from "viem";

import {
  BSC_CHAIN_SLUG,
  BSC_NATIVE_TOKEN,
} from "@/lib/DexWallet/converter/kyberswap/config/chains";

import {
  isSupportedBscToken,
} from "@/lib/DexWallet/converter/kyberswap/config/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KYBER_BASE_URL = "https://aggregator-api.kyberswap.com";

const BSC_CHAIN_ID = 56;
const SERVICE_FEE_BP = 300n;
const BASIS_POINTS = 10_000n;
const QUOTE_TTL_MS = 30_000;

interface QuoteRequest {
  tokenIn: string;
  tokenOut: string;
  grossAmount: string;
}

interface KyberRouteSummary {
  tokenIn?: string;
  tokenOut?: string;
  amountIn?: string | number;
  amountOut?: string | number;
  [key: string]: unknown;
}

function jsonError(message: string, status = 400) {
  return NextResponse.json(
    { success: false, error: message },
    { status },
  );
}

function getQuoteSecret(): string | null {
  const secret = process.env.KYBER_QUOTE_SECRET;

  if (!secret || secret.length < 32) {
    return null;
  }

  return secret;
}

function signQuote(payload: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
}

function createQuoteToken(
  payload: Record<string, unknown>,
  secret: string,
): string {
  const encodedPayload = Buffer
    .from(JSON.stringify(payload))
    .toString("base64url");

  const signature = signQuote(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export async function POST(request: NextRequest) {
  try {
    const clientId = process.env.KYBER_CLIENT_ID;
    const quoteSecret = getQuoteSecret();

    if (!clientId) {
      return jsonError(
        "KyberSwap client ID is not configured on the server.",
        500,
      );
    }

    if (!quoteSecret) {
      return jsonError(
        "KYBER_QUOTE_SECRET must contain at least 32 characters.",
        500,
      );
    }

    let body: QuoteRequest;

    try {
      body = await request.json();
    } catch {
      return jsonError("Invalid JSON request body.");
    }

    const { tokenIn, tokenOut, grossAmount } = body;

    if (!tokenIn || !tokenOut || !grossAmount) {
      return jsonError(
        "tokenIn, tokenOut and grossAmount are required.",
      );
    }

    if (!isAddress(tokenIn) || !isAddress(tokenOut)) {
      return jsonError("Invalid token address.");
    }

    if (
      !isSupportedBscToken(tokenIn) ||
      !isSupportedBscToken(tokenOut)
    ) {
      return jsonError("Unsupported BSC token.");
    }

    if (tokenIn.toLowerCase() === tokenOut.toLowerCase()) {
      return jsonError(
        "Input and output tokens must be different.",
      );
    }

    if (!/^[0-9]{1,78}$/.test(grossAmount)) {
      return jsonError(
        "grossAmount must be an integer string in token base units.",
      );
    }

    const gross = BigInt(grossAmount);

    if (gross <= 0n) {
      return jsonError("Amount must be greater than zero.");
    }

    // API preview only. The on-chain Router is authoritative.
    const feeAmount = (gross * SERVICE_FEE_BP) / BASIS_POINTS;
    const netAmount = gross - feeAmount;

    if (feeAmount <= 0n || netAmount <= 0n) {
      return jsonError(
        "Amount is too small for the service fee.",
      );
    }

    const query = new URLSearchParams({
      tokenIn,
      tokenOut,
      amountIn: netAmount.toString(),
      gasInclude: "true",
    });

    const url =
      `${KYBER_BASE_URL}/${BSC_CHAIN_SLUG}/api/v1/routes?${query.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-client-id": clientId,
        accept: "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    const result = await response.json();

    if (
      !response.ok ||
      result?.code !== 0 ||
      !result?.data?.routeSummary
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            result?.message ||
            "KyberSwap could not find a valid route.",
          providerStatus: response.status,
        },
        { status: 502 },
      );
    }

    const routeSummary =
      result.data.routeSummary as KyberRouteSummary;

    const kyberRouterAddress = result.data.routerAddress;

    if (
      routeSummary.tokenIn?.toLowerCase() !== tokenIn.toLowerCase() ||
      routeSummary.tokenOut?.toLowerCase() !== tokenOut.toLowerCase() ||
      String(routeSummary.amountIn) !== netAmount.toString()
    ) {
      return jsonError(
        "KyberSwap returned a route that does not match the requested net amount.",
        502,
      );
    }

    if (
      !routeSummary.amountOut ||
      !/^[0-9]+$/.test(String(routeSummary.amountOut)) ||
      BigInt(String(routeSummary.amountOut)) <= 0n
    ) {
      return jsonError(
        "KyberSwap returned an invalid output amount.",
        502,
      );
    }

    if (
      !kyberRouterAddress ||
      !isAddress(kyberRouterAddress)
    ) {
      return jsonError(
        "KyberSwap returned an invalid router address.",
        502,
      );
    }

    const quotedAt = Date.now();
    const expiresAt = quotedAt + QUOTE_TTL_MS;

    const quotePayload = {
      chainId: BSC_CHAIN_ID,
      tokenIn: tokenIn.toLowerCase(),
      tokenOut: tokenOut.toLowerCase(),
      grossAmount: gross.toString(),
      feeAmount: feeAmount.toString(),
      netAmount: netAmount.toString(),
      amountOut: String(routeSummary.amountOut),
      kyberRouterAddress: kyberRouterAddress.toLowerCase(),
      routeSummary,
      quotedAt,
      expiresAt,
    };

    const quoteToken = createQuoteToken(
      quotePayload,
      quoteSecret,
    );

    return NextResponse.json(
      {
        success: true,
        chainId: BSC_CHAIN_ID,
        chain: BSC_CHAIN_SLUG,

        tokenIn,
        tokenOut,

        grossAmount: gross.toString(),
        feeAmount: feeAmount.toString(),
        feeBps: SERVICE_FEE_BP.toString(),
        netAmount: netAmount.toString(),

        amountOut: String(routeSummary.amountOut),

        // KyberSwap router, NOT EdenKingDomConverterRouter.
        routerAddress: kyberRouterAddress,

        routeSummary,

        quoteToken,
        quotedAt,
        expiresAt,

        gas: routeSummary.gas ?? null,
        gasUsd: routeSummary.gasUsd ?? null,

        isNativeInput:
          tokenIn.toLowerCase() === BSC_NATIVE_TOKEN.toLowerCase(),

        feeIsOnChainAuthoritative: false,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("[Converter Quote API]", error);

    return jsonError(
      error instanceof Error
        ? error.message
        : "Unexpected quote error.",
      500,
    );
  }
}
