
import { NextRequest, NextResponse } from "next/server";

import { createLiquidMeshSwap } from "@/lib/DexWallet/converter/liquidmesh/swap";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          success: false,
          service: "LiquidMesh",
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    const params = body as Record<string, unknown>;

    const {
      inputToken,
      outputToken,
      amount,
      userAddress,
      slippageBps = 50,
    } = params;

    if (
      typeof inputToken !== "string" ||
      typeof outputToken !== "string" ||
      typeof amount !== "string" ||
      typeof userAddress !== "string" ||
      typeof slippageBps !== "number"
    ) {
      return NextResponse.json(
        {
          success: false,
          service: "LiquidMesh",
          message: "Missing or invalid swap parameters.",
        },
        { status: 400 }
      );
    }

    const result = await createLiquidMeshSwap({
      chainId: 56,
      inputToken,
      outputToken,
      amount,
      userAddress,
      slippageBps,
    });

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });

  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown LiquidMesh swap error.";

    console.error("[LiquidMesh Swap]", message);

    return NextResponse.json(
      {
        success: false,
        service: "LiquidMesh",
        message,
      },
      { status: 502 }
    );
  }
}
