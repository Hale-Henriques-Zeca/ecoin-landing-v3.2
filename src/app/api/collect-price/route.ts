// src/app/api/collect-price/route.ts
import { NextResponse } from "next/server"
import { collect } from "../../../../scripts/priceCollector"

// Esta linha abaixo resolve o erro do build da Vercel!
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await collect()
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Falha na coleta" }, { status: 500 })
  }
}
