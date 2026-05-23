"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Clock,
  Award,
  CheckCircle2,
  FileText,
} from "lucide-react"

const overviewStats = [
  { label: "Total Time Spent", value: "48h 32m", change: "+12%", trend: "up", icon: Clock },
  { label: "Simulations Done", value: "32", change: "+8", trend: "up", icon: FileText },
  { label: "Average Score", value: "87%", change: "+5%", trend: "up", icon: Target },
  { label: "Badges Earned", value: "12", change: "+3", trend: "up", icon: Award },
]

const weeklyProgress = [
  { day: "Mon", simulations: 4, score: 85 },
  { day: "Tue", simulations: 3, score: 90 },
  { day: "Wed", simulations: 5, score: 82 },
  { day: "Thu", simulations: 2, score: 88 },
  { day: "Fri", simulations: 6, score: 91 },
  { day: "Sat", simulations: 4, score: 85 },
  { day: "Sun", simulations: 1, score: 95 },
]

const topPerformance = [
  { topic: "GSTR-1 Filing", score: 95, attempts: 8 },
  { topic: "TDS Form 24Q", score: 92, attempts: 5 },
  { topic: "e-Way Bill", score: 90, attempts: 6 },
  { topic: "GSTR-3B", score: 88, attempts: 7 },
  { topic: "GST Registration", score: 85, attempts: 4 },
]

const recentAchievements = [
  { title: "GST Expert", description: "Completed all GST simulations", date: "2 days ago", icon: "🏆" },
  { title: "Perfect Score", description: "100% on GSTR-1 simulation", date: "5 days ago", icon: "⭐" },
  { title: "Quick Learner", description: "Completed 10 simulations in a week", date: "1 week ago", icon: "🚀" },
  { title: "Consistent", description: "7-day learning streak", date: "1 week ago", icon: "🔥" },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">Track your learning progress and performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                stat.trend === "up" ? "text-accent" : "text-destructive"
              }`}>
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Weekly Progress</h2>
                <p className="text-sm text-muted-foreground">Simulations completed per day</p>
              </div>
            </div>
          </div>
          <div className="h-48 flex items-end justify-between gap-2">
            {weeklyProgress.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center gap-1">
                  <span className="text-xs text-muted-foreground">{day.simulations}</span>
                  <div
                    className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t transition-all"
                    style={{ height: `${day.simulations * 25}px` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Score Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <PieChart className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Score Distribution</h2>
                <p className="text-sm text-muted-foreground">Performance breakdown</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-muted-foreground">90-100%</div>
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: "35%" }} />
              </div>
              <div className="w-12 text-sm text-foreground text-right">35%</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-muted-foreground">80-89%</div>
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "40%" }} />
              </div>
              <div className="w-12 text-sm text-foreground text-right">40%</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-muted-foreground">70-79%</div>
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-chart-4 rounded-full" style={{ width: "18%" }} />
              </div>
              <div className="w-12 text-sm text-foreground text-right">18%</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm text-muted-foreground">Below 70%</div>
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-destructive rounded-full" style={{ width: "7%" }} />
              </div>
              <div className="w-12 text-sm text-foreground text-right">7%</div>
            </div>
          </div>
        </motion.div>

        {/* Top Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Top Performance</h2>
                <p className="text-sm text-muted-foreground">Your best topics</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {topPerformance.map((topic, index) => (
              <div key={topic.topic} className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{topic.topic}</div>
                  <div className="text-xs text-muted-foreground">{topic.attempts} attempts</div>
                </div>
                <div className="text-sm font-semibold text-accent">{topic.score}%</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-5/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-chart-5" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Recent Achievements</h2>
                <p className="text-sm text-muted-foreground">Badges and milestones</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {recentAchievements.map((achievement) => (
              <div key={achievement.title} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{achievement.title}</div>
                  <div className="text-xs text-muted-foreground">{achievement.description}</div>
                </div>
                <div className="text-xs text-muted-foreground">{achievement.date}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
