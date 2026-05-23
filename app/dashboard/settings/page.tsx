"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  LogOut,
  Camera,
  Check,
  ChevronRight,
} from "lucide-react"

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "billing", label: "Billing", icon: CreditCard },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile")
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    institute: "CA Institute Mumbai",
    role: "Student",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weeklyReport: true,
    newCourses: true,
    batchUpdates: true,
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="rounded-xl border border-border bg-card p-2">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <section.icon className="h-5 w-5" />
                {section.label}
                <ChevronRight className="h-4 w-4 ml-auto" />
              </button>
            ))}
            <hr className="my-2 border-border" />
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3"
        >
          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
                  <p className="text-sm text-muted-foreground">Update your personal details</p>
                </div>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">JD</span>
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Profile Photo</div>
                  <div className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</div>
                </div>
              </div>

              {/* Form */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institute">Institute</Label>
                  <Input id="institute" value={profileData.institute} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={profileData.role} disabled className="bg-muted" />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
                <p className="text-sm text-muted-foreground">Choose how you want to be notified</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Channels</h3>
                {[
                  { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                  { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
                  { key: "sms", label: "SMS Notifications", desc: "Text message alerts" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-background shadow transition-transform ${
                        notifications[item.key as keyof typeof notifications] ? "translate-x-6" : "translate-x-0.5"
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Updates</h3>
                {[
                  { key: "weeklyReport", label: "Weekly Progress Report", desc: "Summary of your weekly activity" },
                  { key: "newCourses", label: "New Courses", desc: "Get notified about new courses" },
                  { key: "batchUpdates", label: "Batch Updates", desc: "Updates from your batch and trainer" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-background shadow transition-transform ${
                        notifications[item.key as keyof typeof notifications] ? "translate-x-6" : "translate-x-0.5"
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === "security" && (
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Security Settings</h2>
                <p className="text-sm text-muted-foreground">Manage your account security</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Lock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Password</div>
                        <div className="text-xs text-muted-foreground">Last changed 30 days ago</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Change Password</Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Two-Factor Authentication</div>
                        <div className="text-xs text-muted-foreground">Add an extra layer of security</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-chart-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Active Sessions</div>
                        <div className="text-xs text-muted-foreground">2 devices logged in</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Section */}
          {activeSection === "appearance" && (
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
                <p className="text-sm text-muted-foreground">Customize how the app looks</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  {["Light", "Dark", "System"].map((theme) => (
                    <button
                      key={theme}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        theme === "Light" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className={`w-full h-20 rounded-md mb-3 ${
                        theme === "Light" ? "bg-white border border-border" :
                        theme === "Dark" ? "bg-slate-900" : "bg-gradient-to-br from-white to-slate-900"
                      }`} />
                      <div className="flex items-center justify-center gap-2">
                        {theme === "Light" && <Check className="h-4 w-4 text-primary" />}
                        <span className="text-sm font-medium text-foreground">{theme}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Billing Section */}
          {activeSection === "billing" && (
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Billing & Subscription</h2>
                <p className="text-sm text-muted-foreground">Manage your subscription and payments</p>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Current Plan</div>
                    <div className="text-xl font-bold text-foreground">Professional</div>
                    <div className="text-sm text-muted-foreground">Billed annually</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                    <div className="text-xs text-muted-foreground">Renews Apr 15, 2024</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  Upgrade Plan
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Payment Methods
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Billing History
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
