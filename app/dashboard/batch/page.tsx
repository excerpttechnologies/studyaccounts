"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Users,
  MessageSquare,
  Trophy,
  Calendar,
  Crown,
  TrendingUp,
  Clock,
  Star,
  Mail,
} from "lucide-react"

const batchInfo = {
  name: "GST Masters Batch 2024",
  institute: "CA Institute Mumbai",
  trainer: "CA Priya Sharma",
  startDate: "Jan 15, 2024",
  endDate: "Apr 15, 2024",
  totalStudents: 45,
  avgScore: 84,
}

const leaderboard = [
  { rank: 1, name: "Aarav Patel", score: 95, simulations: 28, avatar: "AP" },
  { rank: 2, name: "Priya Sharma", score: 93, simulations: 26, avatar: "PS" },
  { rank: 3, name: "Rahul Kumar", score: 91, simulations: 25, avatar: "RK" },
  { rank: 4, name: "John Doe", score: 88, simulations: 24, avatar: "JD", isYou: true },
  { rank: 5, name: "Sneha Gupta", score: 86, simulations: 22, avatar: "SG" },
  { rank: 6, name: "Amit Singh", score: 85, simulations: 21, avatar: "AS" },
  { rank: 7, name: "Neha Verma", score: 83, simulations: 20, avatar: "NV" },
  { rank: 8, name: "Vikram Joshi", score: 81, simulations: 19, avatar: "VJ" },
]

const upcomingEvents = [
  { title: "Live GST Workshop", date: "Tomorrow, 3:00 PM", type: "workshop" },
  { title: "Mock Test - GSTR-1", date: "Mar 25, 10:00 AM", type: "test" },
  { title: "Doubt Clearing Session", date: "Mar 27, 4:00 PM", type: "session" },
  { title: "Final Assessment", date: "Apr 10, 9:00 AM", type: "assessment" },
]

const batchmates = [
  { name: "Aarav Patel", status: "online", lastActive: "Now" },
  { name: "Priya Sharma", status: "online", lastActive: "Now" },
  { name: "Rahul Kumar", status: "offline", lastActive: "2h ago" },
  { name: "Sneha Gupta", status: "online", lastActive: "Now" },
  { name: "Amit Singh", status: "offline", lastActive: "1d ago" },
]

export default function BatchPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Batch</h1>
          <p className="text-sm text-muted-foreground">Connect with your batchmates and track progress</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <MessageSquare className="mr-2 h-4 w-4" />
          Open Batch Chat
        </Button>
      </div>

      {/* Batch Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground">{batchInfo.name}</h2>
            <p className="text-sm text-muted-foreground">{batchInfo.institute}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Trainer:</span>
              <span className="text-foreground font-medium">{batchInfo.trainer}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{batchInfo.totalStudents}</div>
              <div className="text-xs text-muted-foreground">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{batchInfo.avgScore}%</div>
              <div className="text-xs text-muted-foreground">Avg Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">4</div>
              <div className="text-xs text-muted-foreground">Your Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">21</div>
              <div className="text-xs text-muted-foreground">Days Left</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:col-span-2 rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Leaderboard</h2>
                <p className="text-sm text-muted-foreground">Top performers this month</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {leaderboard.map((student) => (
              <div
                key={student.rank}
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  student.isYou ? "bg-primary/10 border border-primary/20" : "hover:bg-muted"
                } transition-colors`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  student.rank === 1 ? "bg-chart-4 text-chart-4-foreground" :
                  student.rank === 2 ? "bg-muted-foreground/30 text-foreground" :
                  student.rank === 3 ? "bg-chart-4/30 text-chart-4" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {student.rank <= 3 ? <Crown className="h-4 w-4" /> : student.rank}
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{student.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{student.name}</span>
                    {student.isYou && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">You</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{student.simulations} simulations</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">{student.score}%</div>
                  <div className="text-xs text-muted-foreground">avg score</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Upcoming</h2>
                <p className="text-xs text-muted-foreground">Batch events</p>
              </div>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    event.type === "workshop" ? "bg-primary" :
                    event.type === "test" ? "bg-chart-4" :
                    event.type === "session" ? "bg-accent" : "bg-destructive"
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{event.title}</div>
                    <div className="text-xs text-muted-foreground">{event.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Batchmates Online */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Batchmates</h2>
                <p className="text-xs text-muted-foreground">3 online now</p>
              </div>
            </div>
            <div className="space-y-3">
              {batchmates.map((mate, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {mate.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card ${
                      mate.status === "online" ? "bg-accent" : "bg-muted-foreground"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{mate.name}</div>
                    <div className="text-xs text-muted-foreground">{mate.lastActive}</div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Batchmates
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
