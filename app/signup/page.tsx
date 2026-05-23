"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Eye, EyeOff, Mail, Lock, User, Building2, ArrowLeft, CheckCircle2 } from "lucide-react"

const userTypes = [
  { id: "student", label: "Student", description: "Learning GST/TDS filing" },
  { id: "trainer", label: "Trainer", description: "Teaching at an institute" },
  { id: "institute", label: "Institute Admin", description: "Managing an institute" },
]

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get("plan") || "starter"
  
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    userType: "student",
    name: "",
    email: "",
    password: "",
    instituteName: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }
    setIsLoading(true)
    // Simulate signup - will be replaced with MongoDB auth
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Decorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-primary via-primary to-primary/80 p-8">
        <div className="max-w-lg text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Start your journey with SmartAccounts</h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join thousands of students and institutes already transforming their tax training experience.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                "14-day free trial with full access",
                "No credit card required to start",
                "Realistic GST & TDS simulations",
                "AI-powered learning assistance",
                "Detailed progress analytics",
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">SmartAccounts</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
            <p className="mt-2 text-muted-foreground">
              {step === 1 ? "Choose your account type to get started" : "Complete your profile"}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`flex-1 h-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-border"}`} />
            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-border"}`} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                {/* User Type Selection */}
                <div className="space-y-3">
                  {userTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, userType: type.id })}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        formData.userType === type.id
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          formData.userType === type.id ? "bg-primary" : "bg-muted"
                        }`}>
                          {type.id === "student" && <User className={`h-5 w-5 ${formData.userType === type.id ? "text-primary-foreground" : "text-muted-foreground"}`} />}
                          {type.id === "trainer" && <GraduationCap className={`h-5 w-5 ${formData.userType === type.id ? "text-primary-foreground" : "text-muted-foreground"}`} />}
                          {type.id === "institute" && <Building2 className={`h-5 w-5 ${formData.userType === type.id ? "text-primary-foreground" : "text-muted-foreground"}`} />}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{type.label}</div>
                          <div className="text-sm text-muted-foreground">{type.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Continue
                </Button>
              </>
            ) : (
              <>
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Institute Name (conditional) */}
                {formData.userType === "institute" && (
                  <div className="space-y-2">
                    <Label htmlFor="instituteName">Institute name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="instituteName"
                        type="text"
                        placeholder="Your Institute Name"
                        className="pl-10"
                        value={formData.instituteName}
                        onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
                </div>

                {/* Plan Badge */}
                {plan && (
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="text-sm text-muted-foreground">Selected plan</div>
                    <div className="font-medium text-foreground capitalize">{plan}</div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </div>
              </>
            )}
          </form>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </p>

          {/* Sign in link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
