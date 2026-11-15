
import { NextRequest, NextResponse } from "next/server";
import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";
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
const MAX_QUOTE_AGE_MS = 30_000;

interface BuildRequest {
  quoteToken: string;
  sender: string;
  recipient: string;
  slippageTolerance?: number;
}

interface SignedQuote {
  chainId: number;
  tokenIn: string;
  tokenOut: string;
  grossAmount: string;
  feeAmount: string;
  netAmount: string;
  amountOut: string;
  kyberRouterAddress: string;
  routeSummary: Record<string, unknown>;
  quotedAt: number;
  expiresAt: number;
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

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
}

function verifyQuoteToken(
  token: string,
  secret: string,
): SignedQuote | null {
  const parts = token.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [encodedPayload, receivedSignature] = parts;

  if (
    !/^[A-Za-z0-9_-]+$/.test(encodedPayload) ||
    !/^[A-Za-z0-9_-]+$/.test(receivedSignature)
  ) {
    return null;
  }

  const expectedSignature = signPayload(
    encodedPayload,
    secret,
  );

  const received = Buffer.from(receivedSignature);
  const expected = Buffer.from(expectedSignature);

  if (
    received.length !== expected.length ||
    !timingSafeEqual(received, expected)
  ) {
    return null;
  }

  try {
    const decoded = Buffer
      .from(encodedPayload, "base64url")
      .toString("utf8");

    return JSON.parse(decoded) as SignedQuote;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientId = process.env.KYBER_CLIENT_ID;
    const quoteSecret = getQuoteSecret();
    const converterRouter = process.env.CONVERTER_ROUTER_ADDRESS;

    if (!clientId) {
      return jsonError(
        "KyberSwap client ID is not configured.",
        500,
      );
    }

    if (!quoteSecret) {
      return jsonError(
        "KYBER_QUOTE_SECRET must contain at least 32 characters.",
        500,
      );
    }

    if (!converterRouter || !isAddress(converterRouter)) {
      return jsonError(
        "CONVERTER_ROUTER_ADDRESS is not configured correctly.",
        500,
      );
    }

    let body: BuildRequest;

    try {
      body = await request.json();
    } catch {
      return jsonError("Invalid JSON request body.");
    }

    const {
      quoteToken,
      sender,
      recipient,
      slippageTolerance = 50,
    } = body;

    if (!quoteToken || !sender || !recipient) {
      return jsonError(
        "quoteToken, sender and recipient are required.",
      );
    }

    if (!isAddress(sender) || !isAddress(recipient)) {
      return jsonError("Invalid sender or recipient address.");
    }

    // The swap must be initiated by our own Converter Router.
    if (
      sender.toLowerCase() !== converterRouter.toLowerCase()
    ) {
      return jsonError(
        "Sender must be the configured EdenKingDom Converter Router.",
        403,
      );
    }

    if (
      !Number.isInteger(slippageTolerance) ||
      slippageTolerance < 1 ||
      slippageTolerance > 500
    ) {
      return jsonError(
        "Slippage must be between 1 and 500 bps.",
      );
    }

    const quote = verifyQuoteToken(
      quoteToken,
      quoteSecret,
    );

    if (!quote) {
      return jsonError(
        "Invalid or modified quote token. Request a fresh quote.",
        401,
      );
    }

    const now = Date.now();

    if (
      quote.chainId !== BSC_CHAIN_ID ||
      !Number.isSafeInteger(quote.quotedAt) ||
      !Number.isSafeInteger(quote.expiresAt) ||
      now < quote.quotedAt ||
      now > quote.expiresAt ||
      now - quote.quotedAt > MAX_QUOTE_AGE_MS
    ) {
      return jsonError(
        "Quote expired. Request a fresh quote before building.",
        410,
      );
    }

    if (
      !isAddress(quote.tokenIn) ||
      !isAddress(quote.tokenOut) ||
      !isAddress(quote.kyberRouterAddress)
    ) {
      return jsonError(
        "Signed quote contains invalid addresses.",
        401,
      );
    }

    if (
      !isSupportedBscToken(quote.tokenIn) ||
      !isSupportedBscToken(quote.tokenOut) ||
      quote.tokenIn.toLowerCase() === quote.tokenOut.toLowerCase()
    ) {
      return jsonError(
        "Signed quote contains an unsupported token pair.",
        401,
      );
    }

    if (
      !/^[0-9]+$/.test(quote.grossAmount) ||
      !/^[0-9]+$/.test(quote.feeAmount) ||
      !/^[0-9]+$/.test(quote.netAmount) ||
      !/^[0-9]+$/.test(quote.amountOut)
    ) {
      return jsonError(
        "Signed quote contains invalid amounts.",
        401,
      );
    }

    const gross = BigInt(quote.grossAmount);
    const fee = BigInt(quote.feeAmount);
    const net = BigInt(quote.netAmount);

    if (
      gross <= 0n ||
      fee <= 0n ||
      net <= 0n ||
      fee + net !== gross ||
      fee !== (gross * 300n) / 10_000n
    ) {
      return jsonError(
        "Signed quote amounts are inconsistent.",
        401,
      );
    }

    const routeSummary = quote.routeSummary;

    if (
      !routeSummary ||
      typeof routeSummary !== "object" ||
      String(routeSummary.tokenIn).toLowerCase() !== quote.tokenIn ||
      String(routeSummary.tokenOut).toLowerCase() !== quote.tokenOut ||
      String(routeSummary.amountIn) !== quote.netAmount ||
      String(routeSummary.amountOut) !== quote.amountOut
    ) {
      return jsonError(
        "Signed route summary does not match the quote.",
        401,
      );
    }

    const deadline = Math.floor(Date.now() / 1000) + 300;

    const response = await fetch(
      `${KYBER_BASE_URL}/${BSC_CHAIN_SLUG}/api/v1/route/build`,
      {
        method: "POST",
        headers: {
          "x-client-id": clientId,
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          routeSummary,
          sender,
          recipient,
          slippageTolerance,
          deadline,
          enableGasEstimation: true,
          origin: sender,
          source: "EdenKingDom",
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(20_000),
      },
    );

    const result = await response.json();

    if (
      !response.ok ||
      result?.code !== 0 ||
      !result?.data?.data
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            result?.message ||
            "KyberSwap could not build the swap transaction.",
          providerStatus: response.status,
        },
        { status: 502 },
      );
    }

    const data = result.data;

    if (
      !data.routerAddress ||
      !isAddress(data.routerAddress) ||
      data.routerAddress.toLowerCase() !==
        quote.kyberRouterAddress.toLowerCase()
    ) {
      return jsonError(
        "Built transaction router differs from the signed quote.",
        502,
      );
    }

    if (
      typeof data.data !== "string" ||
      !/^0x([0-9a-fA-F]{2})+$/.test(data.data)
    ) {
      return jsonError(
        "KyberSwap returned invalid transaction calldata.",
        502,
      );
    }

    if (
      String(data.amountIn) !== quote.netAmount ||
      !data.amountOut ||
      !/^[0-9]+$/.test(String(data.amountOut)) ||
      BigInt(String(data.amountOut)) <= 0n
    ) {
      return jsonError(
        "Built transaction amounts do not match the signed route.",
        502,
      );
    }

    const isNativeInput =
      quote.tokenIn.toLowerCase() ===
      BSC_NATIVE_TOKEN.toLowerCase();

    const rawTransactionValue =
      data.transactionValue ?? "0";

    if (
      !/^[0-9]+$/.test(String(rawTransactionValue))
    ) {
      return jsonError(
        "KyberSwap returned an invalid transaction value.",
        502,
      );
    }

    const transactionValue = BigInt(
      String(rawTransactionValue),
    );

    if (
      (!isNativeInput && transactionValue !== 0n) ||
      (isNativeInput && transactionValue !== net)
    ) {
      return jsonError(
        "Transaction value does not match the input token and net amount.",
        502,
      );
    }

    return NextResponse.json(
      {
        success: true,
        chainId: BSC_CHAIN_ID,
        chain: BSC_CHAIN_SLUG,

        sender,
        recipient,

        tokenIn: quote.tokenIn,
        tokenOut: quote.tokenOut,

        grossAmount: quote.grossAmount,
        feeAmount: quote.feeAmount,
        netAmount: quote.netAmount,

        amountIn: String(data.amountIn),
        amountOut: String(data.amountOut),

        // This is KyberSwap's execution router.
        // It is NOT the EdenKingDom Converter Router.
        kyberRouterAddress: data.routerAddress,

        data: data.data,
        transactionValue: transactionValue.toString(),

        gas: data.gas ?? null,

        deadline,
        slippageTolerance,
        builtAt: Date.now(),

        quoteExpiresAt: quote.expiresAt,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("[Converter Build API]", error);

    return jsonError(
      error instanceof Error
        ? error.message
        : "Unexpected build error.",
      500,
    );
  }
}
