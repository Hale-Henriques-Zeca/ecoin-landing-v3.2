import { NextResponse } from "next/server"
// Importação dinâmica para evitar que o Prisma seja chamado no build-time
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Importamos o script apenas quando a função for realmente chamada
    const { collect } = await import("../../../../scripts/priceCollector")
    await collect()
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Erro na coleta:", error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
