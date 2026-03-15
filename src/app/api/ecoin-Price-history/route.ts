import { db } from "@/lib/db"

export async function GET(){

const history = await db.price.findMany({
 orderBy:{timestamp:"asc"},
 take:365
})

return Response.json(history)

}