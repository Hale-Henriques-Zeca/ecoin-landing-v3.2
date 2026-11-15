
import { NextRequest, NextResponse } from "next/server";

import { getLiquidMeshQuote } from "@/lib/DexWallet/converter/liquidmesh/quote";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EXPECTED_USER_ADDRESS =
  "0x985fd6478d35D5599Ce70Fb7ae2Ccb026f3570a3";

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          service: "LiquidMesh",
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    const input = body as Record<string, unknown>;

    const { inputToken, outputToken, amount } = input;

    if (
      typeof inputToken !== "string" ||
      typeof outputToken !== "string" ||
      typeof amount !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          service: "LiquidMesh",
          message: "Invalid quote parameters.",
        },
        { status: 400 }
      );
    }

    // Utiliza o endereço verificado e activo na whitelist.
    const result = await getLiquidMeshQuote({
      chainId: 56,
      inputToken,
      outputToken,
      amount,
      userAddress: EXPECTED_USER_ADDRESS,
    });

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown LiquidMesh error.";

    console.error("[LiquidMesh Quote]", message);

    const status = message.includes("HTTP 403")
      ? 403
      : message.includes("HTTP 429")
        ? 429
        : message.includes("HTTP 5")
          ? 502
          : 400;

    return NextResponse.json(
      {
        success: false,
        service: "LiquidMesh",
        message,
      },
      { status }
    );
  }
}
