
import { NextRequest, NextResponse } from "next/server";

import {
  getAddress,
  isAddress,
  type Address,
} from "viem";

// ============================================================
// CONFIGURATION
// ============================================================

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KYBER_API_BASE =
  "https://aggregator-api.kyberswap.com";

// Keep the Kyber API key on the server.
const KYBER_CLIENT_ID = process.env.KYBER_CLIENT_ID;

// Native BNB sentinel used by KyberSwap.
const NATIVE_BNB =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as Address;

// ============================================================
// SUPPORTED TOKENS — BNB SMART CHAIN
// ============================================================

const SUPPORTED_TOKENS: readonly Address[] = [
  // eCoin (ECOIN)
  "0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964",

  // USDT
  "0x55d398326f99059fF775485246999027B3197955",

  // eDollar (EUSD)
  "0xF7543E5B4735C58a176269202847360aaDfA83C1",
];

// ============================================================
// TYPES
// ============================================================

interface RouteRequest {
  chain?: string;
  tokenIn?: string;
  tokenOut?: string;

  // Frontend-calculated breakdown
  grossAmount?: string;
  feeAmount?: string;
  netAmount?: string;
}

interface KyberRouteSummary {
  tokenIn: string;
  amountIn: string;
  amountInUsd?: string;

  tokenOut: string;
  amountOut: string;
  amountOutUsd?: string;

  gas?: string;
  gasPrice?: string;
  gasUsd?: string;

  route?: unknown;
  [key: string]: unknown;
}

interface KyberRouteResponse {
  code: number | string;
  message?: string;

  data?: {
    routeSummary?: KyberRouteSummary;
    routerAddress?: string;
  };
}

// ============================================================
// HELPERS
// ============================================================

function jsonError(message: string, status: number) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

function normalizeTokenAddress(value: string): Address {
  if (value.toLowerCase() === NATIVE_BNB.toLowerCase()) {
    return NATIVE_BNB;
  }

  if (!isAddress(value)) {
    throw new Error("Invalid token address.");
  }

  return getAddress(value);
}

function sameAddress(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

function isSupportedToken(token: Address): boolean {
  // Native BNB is supported separately.
  if (sameAddress(token, NATIVE_BNB)) {
    return true;
  }

  return SUPPORTED_TOKENS.some((supportedToken) =>
    sameAddress(supportedToken, token),
  );
}

function validateEnvironment(): void {
  if (!KYBER_CLIENT_ID) {
    throw new Error("Missing KYBER_CLIENT_ID.");
  }
}

function parsePositiveAmount(
  value: unknown,
  fieldName: string,
): bigint {
  if (
    typeof value !== "string" ||
    !/^[1-9]\d*$/.test(value)
  ) {
    throw new Error(
      `${fieldName} must be a positive integer string.`,
    );
  }

  return BigInt(value);
}

// ============================================================
// KYBERSWAP ROUTE
// ============================================================

async function getKyberRoute(params: {
  tokenIn: Address;
  tokenOut: Address;
  netAmount: bigint;
}): Promise<KyberRouteResponse> {
  const url = new URL(
    `${KYBER_API_BASE}/bsc/api/v1/routes`,
  );

  url.searchParams.set("tokenIn", params.tokenIn);
  url.searchParams.set("tokenOut", params.tokenOut);

  // IMPORTANT:
  // KyberSwap receives ONLY the net amount.
  url.searchParams.set(
    "amountIn",
    params.netAmount.toString(),
  );

  url.searchParams.set("gasInclude", "true");

  const response = await fetch(url.toString(), {
    method: "GET",

    headers: {
      accept: "application/json",
      "X-Client-Id": KYBER_CLIENT_ID!,
    },

    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  let body: KyberRouteResponse;

  try {
    body = (await response.json()) as KyberRouteResponse;
  } catch {
    throw new Error(
      "KyberSwap returned an invalid JSON response.",
    );
  }

  if (!response.ok) {
    throw new Error(
      body.message ||
        `KyberSwap request failed (${response.status}).`,
    );
  }

  if (
    Number(body.code) !== 0 ||
    !body.data?.routeSummary ||
    !body.data?.routerAddress
  ) {
    throw new Error(
      body.message ||
        "KyberSwap could not find a valid route.",
    );
  }

  return body;
}

// ============================================================
// POST HANDLER
// ============================================================

export async function POST(request: NextRequest) {
  try {
    validateEnvironment();

    let body: RouteRequest;

    try {
      body = (await request.json()) as RouteRequest;
    } catch {
      return jsonError("Invalid JSON request.", 400);
    }

    // --------------------------------------------------------
    // 1. Validate chain
    // --------------------------------------------------------

    if (body.chain !== "bsc") {
      return jsonError(
        "Only BNB Smart Chain is supported.",
        400,
      );
    }

    // --------------------------------------------------------
    // 2. Validate token addresses
    // --------------------------------------------------------

    if (
      typeof body.tokenIn !== "string" ||
      typeof body.tokenOut !== "string"
    ) {
      return jsonError(
        "tokenIn and tokenOut are required.",
        400,
      );
    }

    const tokenIn = normalizeTokenAddress(body.tokenIn);
    const tokenOut = normalizeTokenAddress(body.tokenOut);

    if (sameAddress(tokenIn, tokenOut)) {
      return jsonError(
        "Input and output tokens must be different.",
        400,
      );
    }

    if (
      !isSupportedToken(tokenIn) ||
      !isSupportedToken(tokenOut)
    ) {
      return jsonError(
        "One or both tokens are not supported.",
        400,
      );
    }

    // --------------------------------------------------------
    // 3. Read frontend-calculated breakdown
    // --------------------------------------------------------

    const grossAmount = parsePositiveAmount(
      body.grossAmount,
      "grossAmount",
    );

    const feeAmount = parsePositiveAmount(
      body.feeAmount,
      "feeAmount",
    );

    const netAmount = parsePositiveAmount(
      body.netAmount,
      "netAmount",
    );

    // --------------------------------------------------------
    // 4. Validate breakdown consistency
    // --------------------------------------------------------

    if (feeAmount + netAmount !== grossAmount) {
      return jsonError(
        "Invalid conversion breakdown: feeAmount + netAmount must equal grossAmount.",
        400,
      );
    }

    // The API does not calculate the fee.
    // The API does not call FeeCollector.
    // The API does not execute any transaction.

    // --------------------------------------------------------
    // 5. Request KyberSwap using NET amount only
    // --------------------------------------------------------

    const kyberResponse = await getKyberRoute({
      tokenIn,
      tokenOut,
      netAmount,
    });

    const routeSummary =
      kyberResponse.data!.routeSummary!;

    const routerAddress = getAddress(
      kyberResponse.data!.routerAddress!,
    );

    // --------------------------------------------------------
    // 6. Verify route input amount
    // --------------------------------------------------------

    if (
      typeof routeSummary.amountIn !== "string" ||
      !/^\d+$/.test(routeSummary.amountIn)
    ) {
      throw new Error(
        "KyberSwap returned an invalid input amount.",
      );
    }

    const routeAmountIn = BigInt(routeSummary.amountIn);

    if (routeAmountIn !== netAmount) {
      throw new Error(
        "KyberSwap route amount does not match the net conversion amount.",
      );
    }

    // --------------------------------------------------------
    // 7. Verify route tokens
    // --------------------------------------------------------

    if (
      !sameAddress(routeSummary.tokenIn, tokenIn) ||
      !sameAddress(routeSummary.tokenOut, tokenOut)
    ) {
      throw new Error(
        "KyberSwap returned a route with unexpected tokens.",
      );
    }

    // --------------------------------------------------------
    // 8. Validate output amount
    // --------------------------------------------------------

    if (
      typeof routeSummary.amountOut !== "string" ||
      !/^[1-9]\d*$/.test(routeSummary.amountOut)
    ) {
      throw new Error(
        "KyberSwap returned an invalid output amount.",
      );
    }

    const amountOut = BigInt(routeSummary.amountOut);

    // --------------------------------------------------------
    // 9. Return quote
    // --------------------------------------------------------

    return NextResponse.json(
      {
        success: true,

        quote: {
          chain: "bsc",

          tokenIn,
          tokenOut,

          // Original frontend-calculated breakdown
          grossAmount: grossAmount.toString(),
          feeAmount: feeAmount.toString(),
          netAmount: netAmount.toString(),

          // KyberSwap output calculated from netAmount
          amountOut: amountOut.toString(),

          routerAddress,

          routeSummary,

          amountOutUsd:
            routeSummary.amountOutUsd ?? null,

          gas: routeSummary.gas ?? null,

          gasUsd: routeSummary.gasUsd ?? null,

          quotedAt: Date.now(),
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "[KyberSwap Routes API]",
      error,
    );

    return jsonError(
      error instanceof Error
        ? error.message
        : "Unexpected converter quote error.",
      500,
    );
  }
}
