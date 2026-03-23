// No arquivo da API de histórico:
import { db } from "@/lib/db"

export const dynamic = 'force-dynamic'; // Adiciona isto!

export async function GET() {
  const history = await db.price.findMany({
    orderBy: { timestamp: "asc" },
    take: 365
  })
  return Response.json(history)
}
