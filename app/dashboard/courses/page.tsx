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
  BookOpen,
  ArrowRight,
  Lock,
  Users,
  Video,
  FileText,
} from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Complete GST Course",
    description: "Master GST from basics to advanced filing procedures",
    instructor: "CA Priya Sharma",
    duration: "24 hours",
    lessons: 48,
    rating: 4.9,
    students: 5432,
    status: "enrolled",
    progress: 65,
    category: "GST",
  },
  {
    id: 2,
    title: "TDS Fundamentals",
    description: "Learn TDS deduction, payment, and return filing",
    instructor: "CA Rajesh Gupta",
    duration: "16 hours",
    lessons: 32,
    rating: 4.8,
    students: 3456,
    status: "enrolled",
    progress: 30,
    category: "TDS",
  },
  {
    id: 3,
    title: "Income Tax Return Filing",
    description: "Comprehensive ITR filing for individuals and businesses",
    instructor: "CA Meera Patel",
    duration: "20 hours",
    lessons: 40,
    rating: 4.7,
    students: 4567,
    status: "available",
    category: "Income Tax",
  },
  {
    id: 4,
    title: "Advanced GST Audit",
    description: "GST audit procedures, reconciliation, and compliance",
    instructor: "CA Amit Kumar",
    duration: "12 hours",
    lessons: 24,
    rating: 4.6,
    students: 1234,
    status: "locked",
    category: "GST",
  },
  {
    id: 5,
    title: "e-Invoicing Masterclass",
    description: "Complete guide to e-invoicing under GST regime",
    instructor: "CA Neha Singh",
    duration: "8 hours",
    lessons: 16,
    rating: 4.8,
    students: 2345,
    status: "available",
    category: "GST",
  },
  {
    id: 6,
    title: "Accounting Basics with Tally",
    description: "Learn accounting fundamentals with practical Tally training",
    instructor: "Prof. Suresh Menon",
    duration: "30 hours",
    lessons: 60,
    rating: 4.9,
    students: 8765,
    status: "completed",
    category: "Accounting",
  },
]

const categories = ["All", "GST", "TDS", "Income Tax", "Accounting"]

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = courses.filter((course) => {
    if (selectedCategory !== "All" && course.category !== selectedCategory) return false
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Courses</h1>
          <p className="text-sm text-muted-foreground">Structured learning paths for tax professionals</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <BookOpen className="mr-2 h-4 w-4" />
          Browse All Courses
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-xs text-muted-foreground">Enrolled</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">1</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">26h</div>
              <div className="text-xs text-muted-foreground">Time Spent</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chart-5/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-chart-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">2</div>
              <div className="text-xs text-muted-foreground">Certificates</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted border border-border flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-primary" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`rounded-xl border bg-card overflow-hidden ${
              course.status === "locked" ? "border-border opacity-75" : "border-border hover:border-primary/50"
            } transition-colors`}
          >
            {/* Card Header */}
            <div className="h-36 bg-gradient-to-br from-primary/20 via-accent/10 to-chart-4/10 relative flex items-center justify-center">
              <BookOpen className="h-16 w-16 text-primary/30" />
              <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-background/80 text-xs font-medium text-foreground">
                {course.category}
              </div>
              {course.status === "completed" && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
                  <CheckCircle2 className="h-3 w-3" />
                  Completed
                </div>
              )}
              {course.status === "enrolled" && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                  <Play className="h-3 w-3" />
                  {course.progress}%
                </div>
              )}
              {course.status === "locked" && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                  <Lock className="h-3 w-3" />
                  Locked
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground">{course.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
              </div>

              <div className="text-sm text-muted-foreground">
                by <span className="text-foreground">{course.instructor}</span>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Video className="h-3 w-3" />
                  {course.lessons} lessons
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-chart-4" />
                  {course.rating}
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                {course.students.toLocaleString()} students enrolled
              </div>

              {course.status === "enrolled" && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{course.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                variant={course.status === "locked" ? "outline" : "default"}
                disabled={course.status === "locked"}
              >
                {course.status === "completed" ? "Review Course" :
                 course.status === "enrolled" ? "Continue Learning" :
                 course.status === "locked" ? "Unlock Course" : "Enroll Now"}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
