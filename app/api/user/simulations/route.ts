import { NextResponse } from "next/server"
import { getUserSimulationSummaries } from "@/lib/simulation"
import { getUserFromRequest } from "@/lib/auth-server"

export async function GET(req: Request) {
  const user = await getUserFromRequest(req)
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 })
  }

  const { summaries, stats } = await getUserSimulationSummaries(user.id)
  return NextResponse.json({ simulations: summaries, stats })
}
