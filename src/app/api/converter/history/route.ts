import { NextRequest, NextResponse } from "next/server";
import { isAddress } from "viem";
import { getConversionHistory } from "@/services/converter/historyService";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const wallet = searchParams.get("wallet");
    const limitParam = searchParams.get("limit") ?? "20";

    if (!wallet || !isAddress(wallet)) {
      return NextResponse.json(
        { success: false, error: "Endereço de carteira inválido ou ausente." },
        { status: 400 }
      );
    }

    const limit = Number(limitParam);

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        { success: false, error: "O limite deve estar entre 1 e 100." },
        { status: 400 }
      );
    }

    const history = await getConversionHistory({
      wallet,
      limit,
    });

    return NextResponse.json(
      {
        success: true,
        wallet,
        history,
      },
      {
        headers: {
          "Cache-Control": "private, no-store",
        },
      }
    );
  } catch (error) {
    console.error("[converter/history]", error);

    return NextResponse.json(
      {
        success: false,
        error: "Não foi possível carregar o histórico.",
      },
      { status: 500 }
    );
  }
}