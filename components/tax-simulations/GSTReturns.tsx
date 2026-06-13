"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Card } from "@/components/ui/card"

interface Props {
  scenario: any
  onSubmit: (responses: any, timeSpent: number) => void
  initialResponses?: any
}

export default function GSTReturns({ scenario, onSubmit, initialResponses }: Props) {
  const [startTime] = useState(Date.now())
  const [activeTab, setActiveTab] = useState<"gstr1" | "gstr3b">("gstr1")
  const [formData, setFormData] = useState(initialResponses || {
    gstin: scenario.gstin,
    period: scenario.period,
    outputTax: 0,
    itc: 0,
    netTax: 0,
    gstr1Submitted: false,
    gstr3bSubmitted: false,
  })

  const handleSubmitReturn = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000)
    if (!formData.gstr1Submitted || !formData.gstr3bSubmitted) {
      toast({ title: "Please file both GSTR-1 and GSTR-3B return forms first!", variant: "destructive" })
      return
    }
    onSubmit(formData, timeSpent)
  }

  const fileGSTR1 = () => {
    if (!formData.outputTax) {
      toast({ title: "Please enter output tax liability in GSTR-1", variant: "destructive" })
      return
    }
    setFormData((prev: any) => ({ ...prev, gstr1Submitted: true }))
    setActiveTab("gstr3b")
    toast({ title: "GSTR-1 Filed Successfully!" })
  }

  const fileGSTR3B = () => {
    const calculatedNet = formData.outputTax - formData.itc
    setFormData((prev: any) => ({
      ...prev,
      netTax: Math.max(0, calculatedNet),
      gstr3bSubmitted: true
    }))
    toast({ title: "GSTR-3B Filed Successfully! Ready to submit return package." })
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-neutral-200 bg-slate-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h3 className="text-lg font-semibold text-foreground mb-4">GST Return Scenario Instruction</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <p><strong>Filing GSTIN:</strong> {scenario.gstin}</p>
            <p><strong>Tax Period:</strong> {scenario.period}</p>
            <p><strong>Total Invoices Recorded:</strong> {scenario.totalInvoices}</p>
          </div>
          <div>
            <p><strong>Calculated Output Tax (GST payable):</strong> ₹{scenario.totalOutputTax.toLocaleString()}</p>
            <p><strong>ITC Available from Purchases (GSTR-2B):</strong> ₹{scenario.inputTax.toLocaleString()}</p>
            <p><strong>Net Tax Liability (Expected):</strong> ₹{scenario.netGSTLiability.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("gstr1")}
          className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 ${
            activeTab === "gstr1"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Form GSTR-1 (Outward Liabilities)
          {formData.gstr1Submitted && <span className="ml-2 text-xs text-green-500 font-bold">✓ Filed</span>}
        </button>
        <button
          onClick={() => setActiveTab("gstr3b")}
          className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 ${
            activeTab === "gstr3b"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Form GSTR-3B (Offset & Payment)
          {formData.gstr3bSubmitted && <span className="ml-2 text-xs text-green-500 font-bold">✓ Filed</span>}
        </button>
      </div>

      {activeTab === "gstr1" ? (
        <Card className="p-6 border border-neutral-200 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-lg font-bold text-foreground mb-4">GSTR-1 Outward Supplies Details</h3>
          <p className="text-xs text-muted-foreground mb-6">Enter details of B2B/B2C outward sales invoice liabilities for the tax period.</p>

          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-sm font-medium text-foreground">Total Output Tax Liability (₹) *</label>
              <Input
                type="number"
                value={formData.outputTax || ""}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, outputTax: Number(e.target.value) }))}
                placeholder="Enter computed sales tax liability"
                className="mt-2"
                disabled={formData.gstr1Submitted}
              />
            </div>

            {!formData.gstr1Submitted ? (
              <Button onClick={fileGSTR1} className="w-full mt-4 bg-primary hover:bg-primary/90">
                Validate & File GSTR-1
              </Button>
            ) : (
              <div className="p-4 rounded-xl bg-green-50 text-green-700 text-sm font-medium dark:bg-green-950/20 dark:text-green-400">
                GSTR-1 return filing has been completed for this period. Move to GSTR-3B return.
              </div>
            )}
          </div>
        </Card>
      ) : (
        <Card className="p-6 border border-neutral-200 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-lg font-bold text-foreground mb-4">GSTR-3B Monthly Return Filing</h3>
          <p className="text-xs text-muted-foreground mb-6">Claim Input Tax Credit (ITC) and pay net liabilities to file GSTR-3B.</p>

          <div className="space-y-4 max-w-md">
            <div className="flex justify-between border-b border-border pb-2 text-sm">
              <span className="text-muted-foreground">Output Tax (declared in GSTR-1):</span>
              <span className="font-semibold text-foreground">₹{formData.outputTax.toLocaleString()}</span>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Input Tax Credit (ITC) Claimable (₹) *</label>
              <Input
                type="number"
                value={formData.itc || ""}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, itc: Number(e.target.value) }))}
                placeholder="Enter eligible ITC amount"
                className="mt-2"
                disabled={formData.gstr3bSubmitted}
              />
            </div>

            <div className="flex justify-between border-t border-border pt-4 text-sm font-bold">
              <span className="text-foreground">Computed Net Tax Payable:</span>
              <span className="text-primary">₹{Math.max(0, formData.outputTax - formData.itc).toLocaleString()}</span>
            </div>

            {!formData.gstr3bSubmitted ? (
              <Button onClick={fileGSTR3B} className="w-full mt-4 bg-primary hover:bg-primary/90">
                Offset Liability & File GSTR-3B
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-green-50 text-green-700 text-sm font-medium dark:bg-green-950/20 dark:text-green-400">
                  GSTR-3B return filed. Net paid: ₹{formData.netTax.toLocaleString()}
                </div>
                <Button onClick={handleSubmitReturn} className="w-full bg-accent hover:bg-accent/90">
                  Submit Return Package
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
