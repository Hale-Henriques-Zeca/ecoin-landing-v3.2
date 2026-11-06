import { NextResponse } from "next/server";
import {
  CONVERTER_PROVIDERS,
  getConverterProvider,
} from "@/lib/DexWallet/converter/providers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const providers = CONVERTER_PROVIDERS.map((provider) => {
      const configured = getConverterProvider(provider.id);

      return {
        id: provider.id,
        name: provider.name,
        enabled: provider.enabled,
        adapter: provider.adapter,
        configured: Boolean(configured),
      };
    });

    return NextResponse.json(
      {
        success: true,
        chainId: 56,
        providers,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("[converter/providers]", error);

    return NextResponse.json(
      {
        success: false,
        error: "Não foi possível carregar os providers.",
      },
      { status: 500 }
    );
  }
}