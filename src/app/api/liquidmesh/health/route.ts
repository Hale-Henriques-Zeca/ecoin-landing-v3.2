import { NextResponse } from "next/server";

import { getLiquidMeshConfig } from "@/lib/DexWallet/converter/liquidmesh/config";
import { createLiquidMeshJWT } from "@/lib/DexWallet/converter/liquidmesh/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = getLiquidMeshConfig();

    await createLiquidMeshJWT(
      "GET",
      "/v1/bsc/quote?auth_check=1"
    );

    return NextResponse.json({
      success: true,
      service: "LiquidMesh",
      configuration: "valid",
      privateKeyFormat: "Ed25519 64-byte secret key",
      publicKeyLength: 32,
      jwtGeneration: "success",
      apiKeyConfigured: Boolean(config.apiKey),
      message: "LiquidMesh authentication is ready for API testing.",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown authentication error.";

    console.error("[LiquidMesh Health]", message);

    return NextResponse.json(
      {
        success: false,
        service: "LiquidMesh",
        message: "Authentication configuration failed.",
        error: message,
      },
      { status: 500 }
    );
  }
}