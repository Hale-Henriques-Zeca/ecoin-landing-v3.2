import { NextRequest, NextResponse } from "next/server";
import { isAddress, isHex } from "viem";
import { getConverterProvider } from "@/lib/DexWallet/converter/providers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface QuoteRequest {
  providerId: `0x${string}`;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  minAmountOut?: string;
  recipient: string;
  slippage: number;
}

function isPositiveIntegerString(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^\d+$/.test(value) &&
    BigInt(value) > 0n
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<QuoteRequest>;

    if (
      typeof body.providerId !== "string" ||
      !isHex(body.providerId, { strict: true }) ||
      body.providerId.length !== 66
    ) {
      return NextResponse.json(
        { success: false, error: "Provider ID inválido." },
        { status: 400 }
      );
    }

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

    if (
      body.tokenIn.toLowerCase() === body.tokenOut.toLowerCase()
    ) {
      return NextResponse.json(
        { success: false, error: "Os ativos de entrada e saída devem ser diferentes." },
        { status: 400 }
      );
    }

    if (!isPositiveIntegerString(body.amountIn)) {
      return NextResponse.json(
        { success: false, error: "amountIn deve ser um inteiro positivo em unidades mínimas." },
        { status: 400 }
      );
    }

    if (
      typeof body.recipient !== "string" ||
      !isAddress(body.recipient)
    ) {
      return NextResponse.json(
        { success: false, error: "Endereço destinatário inválido." },
        { status: 400 }
      );
    }

    if (
      typeof body.slippage !== "number" ||
      !Number.isFinite(body.slippage) ||
      body.slippage < 0.1 ||
      body.slippage > 5
    ) {
      return NextResponse.json(
        { success: false, error: "Slippage deve estar entre 0.1% e 5%." },
        { status: 400 }
      );
    }

    const provider = getConverterProvider(body.providerId);

    if (!provider) {
      return NextResponse.json(
        { success: false, error: "Provider inexistente ou desativado." },
        { status: 400 }
      );
    }

    // Não fabricar routeData: o formato oficial do LiquidMesh
    // ainda precisa de ser integrado e validado.
    return NextResponse.json(
      {
        success: false,
        code: "PROVIDER_QUOTE_NOT_INTEGRATED",
        error:
          "O provider está configurado, mas o serviço de cotação e geração de routeData ainda não foi integrado.",
      },
      { status: 501 }
    );
  } catch (error) {
    console.error("[converter/quote]", error);

    return NextResponse.json(
      {
        success: false,
        error: "Não foi possível processar o pedido de cotação.",
      },
      { status: 500 }
    );
  }
}