"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  FileText, 
  Calculator, 
  Award, 
  TrendingUp, 
  CheckCircle2,
  Clock,
  Trophy,
  Target
} from "lucide-react"

export default function TaxSimulationLabPage() {
  const router = useRouter()
  const [progress, setProgress] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProgress()
  }, [])

  const fetchProgress = async () => {
    try {
      const res = await fetch("/api/tax-simulations/progress")
      const data = await res.json()
      setProgress(data.progress)
    } catch (error) {
      console.error("Failed to fetch progress:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    )
  }

  const gstModules = [
    { id: "registration", title: "GST Registration", icon: FileText, route: "/dashboard/tax-lab/gst/registration" },
    { id: "invoicing", title: "GST Invoicing", icon: FileText, route: "/dashboard/tax-lab/gst/invoicing" },
    { id: "returns", title: "GST Returns (GSTR-1, GSTR-3B)", icon: FileText, route: "/dashboard/tax-lab/gst/returns" },
    { id: "reconciliation", title: "GST Reconciliation", icon: TrendingUp, route: "/dashboard/tax-lab/gst/reconciliation" },
    { id: "audit", title: "GST Audit", icon: CheckCircle2, route: "/dashboard/tax-lab/gst/audit" },
  ]

  const tdsModules = [
    { id: "deduction", title: "TDS Deduction", icon: Calculator, route: "/dashboard/tax-lab/tds/deduction" },
    { id: "challan", title: "TDS Challan (Form 281)", icon: FileText, route: "/dashboard/tax-lab/tds/challan" },
    { id: "returnFiling", title: "TDS Return Filing (24Q/26Q)", icon: FileText, route: "/dashboard/tax-lab/tds/return" },
    { id: "form16", title: "Form 16 Generation", icon: Award, route: "/dashboard/tax-lab/tds/form16" },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Tax Simulation Lab</h1>
        <p className="text-muted-foreground">
          Master GST & TDS compliance through practical simulations
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">GST Progress</p>
              <p className="text-2xl font-bold text-foreground">{progress?.gstProgress?.overallScore || 0}%</p>
            </div>
            <FileText className="h-8 w-8 text-primary opacity-50" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">TDS Progress</p>
              <p className="text-2xl font-bold text-foreground">{progress?.tdsProgress?.overallScore || 0}%</p>
            </div>
            <Calculator className="h-8 w-8 text-primary opacity-50" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Certificates</p>
              <p className="text-2xl font-bold text-foreground">{progress?.certificatesEarned?.length || 0}</p>
            </div>
            <Award className="h-8 w-8 text-primary opacity-50" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Leaderboard Rank</p>
              <p className="text-2xl font-bold text-foreground">#{progress?.leaderboardRank || "-"}</p>
            </div>
            <Trophy className="h-8 w-8 text-primary opacity-50" />
          </div>
        </Card>
      </div>

      {/* GST Modules */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6" />
          GST Simulation Lab
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gstModules.map((module) => {
            const moduleProgress = progress?.gstProgress?.[module.id]
            return (
              <Card key={module.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-primary/10">
                    <module.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{module.title}</h3>
                    {moduleProgress?.completed ? (
                      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 mb-2">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Completed - {moduleProgress.score}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Clock className="h-4 w-4" />
                        <span>{moduleProgress?.attempts || 0} attempts</span>
                      </div>
                    )}
                    <Button
                      onClick={() => router.push(module.route)}
                      variant={moduleProgress?.completed ? "outline" : "default"}
                      size="sm"
                      className="w-full"
                    >
                      {moduleProgress?.completed ? "Practice Again" : "Start Simulation"}
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* TDS Modules */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calculator className="h-6 w-6" />
          TDS Simulation Lab
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tdsModules.map((module) => {
            const moduleProgress = progress?.tdsProgress?.[module.id]
            return (
              <Card key={module.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-primary/10">
                    <module.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{module.title}</h3>
                    {moduleProgress?.completed ? (
                      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 mb-2">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Completed - {moduleProgress.score}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Clock className="h-4 w-4" />
                        <span>{moduleProgress?.attempts || 0} attempts</span>
                      </div>
                    )}
                    <Button
                      onClick={() => router.push(module.route)}
                      variant={moduleProgress?.completed ? "outline" : "default"}
                      size="sm"
                      className="w-full"
                    >
                      {moduleProgress?.completed ? "Practice Again" : "Start Simulation"}
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Certificates Section */}
      {progress?.certificatesEarned && progress.certificatesEarned.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="h-6 w-6" />
            Your Certificates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progress.certificatesEarned.map((cert: string, idx: number) => (
              <Card key={idx} className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">{cert}</h3>
                    <p className="text-sm text-muted-foreground">Earned</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard CTA */}
      <Card className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Check Your Ranking</h3>
            <p className="text-sm text-muted-foreground">See how you compare with other students</p>
          </div>
          <Button onClick={() => router.push("/dashboard/tax-lab/leaderboard")}>
            View Leaderboard
          </Button>
        </div>
      </Card>
    </div>
  )
}
