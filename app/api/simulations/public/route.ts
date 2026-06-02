import { NextResponse } from "next/server"
import { getPublishedSimulations } from "@/lib/simulation"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const query = url.searchParams.get("query")?.toLowerCase() ?? ""
  const category = url.searchParams.get("category")
  const difficulty = url.searchParams.get("difficulty")

  let simulations = await getPublishedSimulations()

  if (query) {
    simulations = simulations.filter((simulation) => simulation.title.toLowerCase().includes(query) || simulation.description.toLowerCase().includes(query) || simulation.tags.some((tag) => tag.toLowerCase().includes(query)))
  }

  if (category) {
    simulations = simulations.filter((simulation) => simulation.category === category)
  }

  if (difficulty) {
    simulations = simulations.filter((simulation) => simulation.difficulty === difficulty)
  }

  return NextResponse.json({ simulations })
}
