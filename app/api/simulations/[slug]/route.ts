import { NextResponse } from "next/server"
import { getSimulationBySlug, incrementSimulationViews } from "@/lib/simulation"

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const routeParams = await params
  const simulation = await incrementSimulationViews(routeParams.slug)
  if (!simulation || !simulation.published) {
    return NextResponse.json({ error: "Simulation not found." }, { status: 404 })
  }

  return NextResponse.json({ simulation })
}
