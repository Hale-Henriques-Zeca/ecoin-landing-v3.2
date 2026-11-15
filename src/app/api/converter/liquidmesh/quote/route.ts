
import { NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";

import { CONVERTER_CONTRACTS, NATIVE_BNB } from "@/lib/DexWallet/converter/contracts";
import { getLiquidMeshQuote } from "@/lib/DexWallet/converter/liquidmesh/quote";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface QuoteRequest {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  userAddress: string;
  slippage: number;
}

function isPositiveIntegerString(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d+$/.test(value)) {
    return false;
  }

  try {
    return BigInt(value) > 0n;
  } catch {
    return false;
  }
}

function isAllowedToken(address: string): boolean {
  const allowedTokens = [
    CONVERTER_CONTRACTS.tokens.eCoin,
    CONVERTER_CONTRACTS.tokens.USDT,
    CONVERTER_CONTRACTS.tokens.eDollar,
    NATIVE_BNB,
  ];

  return allowedTokens.some(
    (token) => token.toLowerCase() === address.toLowerCase()
  );
}

function calculateMinimumAmountOut(
  amountOut: string,
  slippage: number
): string {
  const slippageBps = BigInt(Math.round(slippage * 100));
  const denominator = 10_000n;

  return (
    (BigInt(amountOut) * (denominator - slippageBps)) /
    denominator
  ).toString();
}

export async function POST(request: NextRequest) {
  try {
    let body: Partial<QuoteRequest>;

    try {
      body = (await request.json()) as Partial<QuoteRequest>;
    } catch {
      return NextResponse.json(
        { success: false, error: "Corpo do pedido inválido." },
        { status: 400 }
      );
    }

    // 1. Validar os endereços dos tokens
    if (
      typeof body.tokenIn !== "string" ||
      !isAddress(body.tokenIn) ||
      typeof body.tokenOut !== "string" ||
      !isAddress(body.tokenOut)
    ) {
      return NextResponse.json(
        { success: false, error: "Endereço de token inválido." },
        { status: 400 }
      );
    }

    // 2. Permitir apenas os ativos configurados na EdenKingDom
    if (
      !isAllowedToken(body.tokenIn) ||
      !isAllowedToken(body.tokenOut)
    ) {
      return NextResponse.json(
        { success: false, error: "Ativo não suportado pelo Converter." },
        { status: 400 }
      );
    }

    // 3. Impedir conversão do mesmo ativo
    if (
      body.tokenIn.toLowerCase() ===
      body.tokenOut.toLowerCase()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Os ativos de entrada e saída devem ser diferentes.",
        },
        { status: 400 }
      );
    }

    // 4. Validar a quantidade em unidades mínimas
    if (!isPositiveIntegerString(body.amountIn)) {
      return NextResponse.json(
        {
          success: false,
          error: "amountIn deve ser um inteiro positivo em unidades mínimas.",
        },
        { status: 400 }
      );
    }

    // 5. Validar a carteira
    if (
      typeof body.userAddress !== "string" ||
      !isAddress(body.userAddress)
    ) {
      return NextResponse.json(
        { success: false, error: "Endereço de carteira inválido." },
        { status: 400 }
      );
    }

    // 6. Validar slippage
    if (
      typeof body.slippage !== "number" ||
      !Number.isFinite(body.slippage) ||
      body.slippage < 0.1 ||
      body.slippage > 5
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Slippage deve estar entre 0.1% e 5%.",
        },
        { status: 400 }
      );
    }

    // 7. Consultar LiquidMesh.
    // Não existe providerId, Adapter ou RouterRegistry neste fluxo.
    const result = await getLiquidMeshQuote({
      chainId: 56,
      inputToken: body.tokenIn,
      outputToken: body.tokenOut,
      amount: body.amountIn,
      userAddress: body.userAddress,
    });

    const quoteData = result.quote.data;

    if (
      !quoteData ||
      typeof quoteData.outputAmount !== "string" ||
      !/^\d+$/.test(quoteData.outputAmount) ||
      BigInt(quoteData.outputAmount) <= 0n
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "LiquidMesh não devolveu uma quantidade de saída válida.",
        },
        { status: 502 }
      );
    }

    // 8. Calcular o mínimo estimado com o slippage selecionado.
    const minimumAmountOut = calculateMinimumAmountOut(
      quoteData.outputAmount,
      body.slippage
    );

    const priceImpact =
      quoteData.priceImpactPct !== undefined
        ? Number(quoteData.priceImpactPct)
        : undefined;

    // 9. Resposta normalizada para o frontend.
    return NextResponse.json(
      {
        success: true,
        quote: {
          provider: "LIQUIDMESH",
          chainId: 56,
          tokenIn: result.inputToken,
          tokenOut: result.outputToken,
          amountIn: result.inputAmount,
          expectedAmountOut: quoteData.outputAmount,
          minimumAmountOut,
          slippage: body.slippage,
          priceImpact:
            priceImpact !== undefined && Number.isFinite(priceImpact)
              ? priceImpact
              : null,
          routePlans: quoteData.routePlans ?? [],
          midPrice: quoteData.midPrice ?? null,
          estimatedGas: quoteData.estimatedGas ?? null,
          blockNumber: quoteData.blockNumber ?? null,
          updatedAt: Date.now(),
        },
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("[liquidmesh/quote]", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Não foi possível obter a cotação LiquidMesh.",
      },
      { status: 502 }
    );
  }
}
