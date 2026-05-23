"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Play,
  Clock,
  CheckCircle2,
  Star,
  Filter,
  Search,
  FileText,
  ArrowRight,
  Lock,
  TrendingUp,
} from "lucide-react"

const gstSimulations = [
  {
    id: 1,
    title: "GSTR-1 Return Filing",
    description: "Learn to file outward supplies return with complete form walkthrough",
    duration: "45 mins",
    difficulty: "Beginner",
    rating: 4.8,
    completions: 1234,
    status: "completed",
    score: 92,
    image: "/gstr1.png",
  },
  {
    id: 2,
    title: "GSTR-3B Return Filing",
    description: "Monthly summary return filing with tax calculation and ITC claims",
    duration: "60 mins",
    difficulty: "Intermediate",
    rating: 4.7,
    completions: 956,
    status: "completed",
    score: 85,
    image: "/gstr3b.png",
  },
  {
    id: 3,
    title: "e-Way Bill Generation",
    description: "Generate e-Way bills for goods movement with validation checks",
    duration: "30 mins",
    difficulty: "Beginner",
    rating: 4.9,
    completions: 2341,
    status: "in_progress",
    progress: 60,
    image: "/eway.png",
  },
  {
    id: 4,
    title: "GST Annual Return (GSTR-9)",
    description: "Comprehensive annual return filing with reconciliation",
    duration: "90 mins",
    difficulty: "Advanced",
    rating: 4.6,
    completions: 567,
    status: "locked",
    image: "/gstr9.png",
  },
  {
    id: 5,
    title: "Input Tax Credit Reconciliation",
    description: "Match ITC with GSTR-2A/2B and resolve mismatches",
    duration: "75 mins",
    difficulty: "Advanced",
    rating: 4.8,
    completions: 789,
    status: "available",
    image: "/itc.png",
  },
  {
    id: 6,
    title: "GST Registration Process",
    description: "Complete GST registration workflow with document verification",
    duration: "40 mins",
    difficulty: "Beginner",
    rating: 4.9,
    completions: 3456,
    status: "available",
    image: "/registration.png",
  },
]

const stats = [
  { label: "Total Simulations", value: "6", icon: FileText },
  { label: "Completed", value: "2", icon: CheckCircle2 },
  { label: "In Progress", value: "1", icon: Clock },
  { label: "Avg Score", value: "88%", icon: TrendingUp },
]

export default function GSTSimulationsPage() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSimulations = gstSimulations.filter((sim) => {
    if (filter !== "all" && sim.status !== filter) return false
    if (searchQuery && !sim.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">GST Simulations</h1>
          <p className="text-sm text-muted-foreground">Practice real-world GST filing scenarios</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Play className="mr-2 h-4 w-4" />
          Start Random Simulation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted border border-border flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search simulations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-muted border border-border rounded-lg px-3 py-2 text-sm outline-none"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="locked">Locked</option>
          </select>
        </div>
      </div>

      {/* Simulations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSimulations.map((sim, index) => (
          <motion.div
            key={sim.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`rounded-xl border bg-card overflow-hidden ${
              sim.status === "locked" ? "border-border opacity-75" : "border-border hover:border-primary/50"
            } transition-colors`}
          >
            {/* Card Header with gradient background */}
            <div className="h-32 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 relative flex items-center justify-center">
              <FileText className="h-16 w-16 text-primary/30" />
              {sim.status === "completed" && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
                  <CheckCircle2 className="h-3 w-3" />
                  {sim.score}%
                </div>
              )}
              {sim.status === "in_progress" && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-chart-4/20 text-chart-4 text-xs font-medium">
                  <Clock className="h-3 w-3" />
                  {sim.progress}%
                </div>
              )}
              {sim.status === "locked" && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                  <Lock className="h-3 w-3" />
                  Locked
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground">{sim.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{sim.description}</p>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {sim.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-chart-4" />
                  {sim.rating}
                </div>
                <div>{sim.completions.toLocaleString()} completed</div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  sim.difficulty === "Beginner" ? "bg-accent/10 text-accent" :
                  sim.difficulty === "Intermediate" ? "bg-chart-4/10 text-chart-4" :
                  "bg-destructive/10 text-destructive"
                }`}>
                  {sim.difficulty}
                </span>
                <Button
                  size="sm"
                  variant={sim.status === "locked" ? "outline" : "default"}
                  disabled={sim.status === "locked"}
                  className={sim.status !== "locked" ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {sim.status === "completed" ? "Retry" :
                   sim.status === "in_progress" ? "Continue" :
                   sim.status === "locked" ? "Unlock" : "Start"}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
