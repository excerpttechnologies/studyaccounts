"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  TrendingUp,
  Clock,
  BookOpen,
  Plus,
  Play,
  BarChart3,
  FileText,
} from "lucide-react"

const stats = [
  { label: "Simulations Completed", value: "24", change: "+4 this week", icon: CheckCircle2, color: "text-accent" },
  { label: "Average Score", value: "87%", change: "+5% improvement", icon: TrendingUp, color: "text-primary" },
  { label: "Time Spent", value: "18h", change: "This month", icon: Clock, color: "text-chart-4" },
  { label: "Courses Enrolled", value: "3", change: "2 in progress", icon: BookOpen, color: "text-chart-5" },
]

const recentActivities = [
  { title: "Completed GSTR-1 Simulation", time: "2 hours ago", score: "92%", type: "gst" },
  { title: "Started TDS 24Q Course", time: "Yesterday", score: null, type: "course" },
  { title: "Completed GSTR-3B Simulation", time: "2 days ago", score: "85%", type: "gst" },
  { title: "Achieved GST Basics Badge", time: "3 days ago", score: null, type: "badge" },
]

const upcomingTasks = [
  { title: "Complete e-Way Bill Simulation", due: "Due in 2 days", progress: 60 },
  { title: "TDS 26Q Practice Test", due: "Due in 5 days", progress: 0 },
  { title: "GST Annual Return Course", due: "Due in 1 week", progress: 30 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, John! Continue your learning journey.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="mt-2 text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="rounded-xl border border-border bg-card p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Play className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm">Start Simulation</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-accent" />
            </div>
            <span className="text-sm">Browse Courses</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-chart-4" />
            </div>
            <span className="text-sm">View Reports</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-chart-5/10 flex items-center justify-center">
              <Plus className="h-5 w-5 text-chart-5" />
            </div>
            <span className="text-sm">Ask AI Tutor</span>
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View all
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.type === "gst" ? "bg-primary/10" :
                  activity.type === "course" ? "bg-accent/10" : "bg-chart-4/10"
                }`}>
                  {activity.type === "gst" && <FileText className="h-5 w-5 text-primary" />}
                  {activity.type === "course" && <BookOpen className="h-5 w-5 text-accent" />}
                  {activity.type === "badge" && <CheckCircle2 className="h-5 w-5 text-chart-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{activity.title}</div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
                {activity.score && (
                  <div className="text-sm font-semibold text-accent">{activity.score}</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Tasks</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View all
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-foreground">{task.title}</div>
                  <div className="text-xs text-muted-foreground">{task.due}</div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
