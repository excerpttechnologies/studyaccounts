"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Clock, Play, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import type { Simulation, SimulationAttempt } from "@/lib/types"
// FALLBACK removed - all simulations come from MongoDB
import SimulationPlayer from "@/components/simulations/SimulationPlayer"

export default function SimulationDetailPage() {
  const params = useParams()
  const [simulation, setSimulation] = useState<Simulation | null>(null)
  const [related, setRelated] = useState<Simulation[]>([])
  const [loading, setLoading] = useState(true)
  const [relatedLoading, setRelatedLoading] = useState(false)
  const [attempt, setAttempt] = useState<SimulationAttempt | null>(null)
  const [started, setStarted] = useState(false)
  const [scoreResult, setScoreResult] = useState<any>(null)

  useEffect(() => {
    async function loadSimulation() {
      if (!params?.slug) return
      setLoading(true)

      const [simulationResponse, progressResponse] = await Promise.allSettled([
        fetch(`/api/simulations/${params.slug}`),
        fetch(`/api/user/simulations/${params.slug}/progress`, { cache: "no-store" }),
      ])

      let simulationData: any = null
      if (simulationResponse.status === "fulfilled") {
        const response = simulationResponse.value
        simulationData = await response.json()
        if (!response.ok) {
          toast({ title: "Simulation not found", description: simulationData.error || "This content is unavailable." })
        }
      }

      if (progressResponse.status === "fulfilled") {
        const progress = await progressResponse.value.json()
        if (progressResponse.value.ok && progress.attempt) {
          setAttempt(progress.attempt)
        }
      }

      if (!simulationData || !simulationData.simulation) {
        setLoading(false)
        return
      }

      setSimulation(simulationData.simulation)
      setLoading(false)
      loadRelated(simulationData.simulation.category, simulationData.simulation.id)
    }

    async function loadRelated(category: string, currentId: string) {
      setRelatedLoading(true)
      const response = await fetch(`/api/simulations/public?category=${encodeURIComponent(category)}`)
      const data = await response.json()
      if (response.ok) {
        setRelated(data.simulations.filter((item: Simulation) => item.id !== currentId).slice(0, 3))
      }
      setRelatedLoading(false)
    }

    loadSimulation()
  }, [params?.slug])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          Loading simulation details...
        </div>
      </div>
    )
  }

  if (!simulation) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm text-center">
          <p className="text-lg font-semibold">Simulation not found</p>
          <p className="mt-2 text-sm text-slate-500">This simulation is unavailable or has been removed.</p>
          <div className="mt-4">
            <Link href="/simulations">
              <Button variant="outline" size="sm">Back to library</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Simulation</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{simulation.title}</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{simulation.description}</p>
          </div>
          <Link href="/simulations">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to library
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-black dark:border-neutral-800">
            {simulation.videoUrl ? (
              <video
                src={simulation.videoUrl}
                controls
                poster={simulation.thumbnailUrl || undefined}
                className="h-full w-full max-h-[420px] object-cover"
              />
            ) : simulation.thumbnailUrl ? (
              // show thumbnail image when video is not available
              // use img instead of background to avoid empty src warnings
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={simulation.thumbnailUrl}
                alt={simulation.title}
                className="h-full w-full max-h-[420px] object-cover"
              />
            ) : (
              <div className="h-[420px] flex items-center justify-center text-sm text-slate-200">No video available</div>
            )}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-neutral-200 bg-slate-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Difficulty</p>
              <p className="mt-2 font-semibold text-slate-950 dark:text-white">{simulation.difficulty}</p>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-slate-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Duration</p>
              <p className="mt-2 font-semibold text-slate-950 dark:text-white">{simulation.duration}</p>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-slate-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Views</p>
              <p className="mt-2 font-semibold text-slate-950 dark:text-white">{simulation.views}</p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-neutral-200 bg-slate-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Simulation instructions</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{simulation.instructions}</p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button className="gap-2">
              <Play className="h-4 w-4" /> Start simulation
            </Button>
            <span className="rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm text-slate-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-slate-300">
              {simulation.tags.join(" · ")}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <Sparkles className="h-5 w-5 text-primary" />
              Related simulations
            </div>
            {relatedLoading ? (
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Loading related content...</p>
            ) : related.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">No similar published simulations yet.</p>
            ) : (
              <div className="mt-4 space-y-4">
                {related.map((item) => (
                  <Link key={item.id} href={`/simulations/${item.slug}`} className="block rounded-3xl border border-neutral-200 bg-slate-50 p-4 transition hover:border-primary/40 dark:border-neutral-800 dark:bg-neutral-900">
                    <p className="font-semibold text-slate-950 dark:text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
