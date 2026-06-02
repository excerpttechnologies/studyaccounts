"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Trophy, Clock } from "lucide-react"
// fallback removed - using empty state instead

type SimulationOverview = {
  id: string
  slug: string
  title: string
  description: string
  category: string
  difficulty: string
  estimatedTime: string
  tags: string[]
  status: "completed" | "not-started"
  score: number | null
  completedAt: string | null
}

type SimulationStats = {
  completedCount: number
  attemptCount: number
  averageScore: number
}

type ApiResponse = {
  simulations: SimulationOverview[]
  stats: SimulationStats
  error?: string
}

export default function SimulationPage() {
  const [simulations, setSimulations] = useState<SimulationOverview[]>([])
  const [stats, setStats] = useState<SimulationStats>({ completedCount: 0, attemptCount: 0, averageScore: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  async function refreshSimulations() {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/user/simulations", { cache: "no-store" })
      const data: ApiResponse = await response.json()

      if (!response.ok) {
        setError(data.error || "Unable to load simulations.")
        // fallback to local dataset when server returns an error
        setSimulations([])
        setStats({ completedCount: 0, attemptCount: 0, averageScore: 0 })
        return
      }

      // server returned OK but might be empty
      if (!data.simulations || data.simulations.length === 0) {
        setSimulations([])
        setStats({ completedCount: 0, attemptCount: 0, averageScore: 0 })
      } else {
        setSimulations(data.simulations)
        setStats(data.stats)
      }
    } catch (err) {
      setError("Unable to load simulations. Please try again.")
      // network or unexpected error: use fallback
      setSimulations([])
      setStats({ completedCount: 0, attemptCount: 0, averageScore: 0 })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshSimulations()
  }, [])

  const activeSimulations = useMemo(
    () => simulations.filter((simulation) => simulation.status !== "completed"),
    [simulations]
  )

  function handleStartSimulation(simulationSlug: string) {
    window.location.href = `/simulations/${simulationSlug}`
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Simulations</h1>
            <p className="text-sm text-muted-foreground">Practice compliance scenarios with role-based mock simulations.</p>
          </div>
          <Button onClick={refreshSimulations} disabled={loading}>
            <ArrowRight className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 text-primary">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">Active Simulations</span>
          </div>
          <div className="mt-4 text-3xl font-bold text-foreground">{activeSimulations.length}</div>
          <p className="mt-2 text-sm text-muted-foreground">Simulations waiting for your next attempt.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 text-accent">
            <Trophy className="h-5 w-5" />
            <span className="text-sm font-medium">Completed</span>
          </div>
          <div className="mt-4 text-3xl font-bold text-foreground">{stats.completedCount}</div>
          <p className="mt-2 text-sm text-muted-foreground">Total simulations completed by you.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 text-chart-4">
            <Clock className="h-5 w-5" />
            <span className="text-sm font-medium">Average Score</span>
          </div>
          <div className="mt-4 text-3xl font-bold text-foreground">{stats.averageScore}%</div>
          <p className="mt-2 text-sm text-muted-foreground">Based on all completed sessions.</p>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-5 text-sm text-destructive">{error}</div>
      ) : null}

      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center rounded-xl border border-border bg-card p-8 text-muted-foreground">
          Loading simulations...
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {simulations.map((simulation) => (
            <div key={simulation.id} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{simulation.category}</span>
                  <h2 className="mt-2 text-lg font-semibold text-foreground">{simulation.title}</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border px-2 py-1">{simulation.difficulty}</span>
                  <span className="rounded-full border border-border px-2 py-1">{simulation.estimatedTime}</span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">{simulation.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {simulation.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-muted-foreground">
                  {simulation.status === "completed" ? `Last score: ${simulation.score}%` : "Not attempted yet."}
                </div>
                <Button
                  size="sm"
                  className="inline-flex items-center gap-2"
                  onClick={() => handleStartSimulation(simulation.slug)}
                >
                  <Play className="h-4 w-4" />
                  {simulation.status === "completed" ? "Retake" : "Start"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}




// app/page.tsx (helper simulators)

// ============================================================================
// 1. TDS SIMULATOR
// ============================================================================
type TDSQuestion = {
  id: number;
  type: string;
  payee: string;
  amount: number;
  section: string;
  correctTDS: number;
  dueDate: string;
};

type TDSAnswer = {
  section: string;
  tds: string;
  dueDate: string;
};

function TDSSimulator({
  questions,
  answers,
  onChange,
}: {
  questions: TDSQuestion[];
  answers: TDSAnswer[] | null;
  onChange: (a: TDSAnswer[]) => void;
}) {
  const [rows, setRows] = useState<TDSAnswer[]>(() =>
    questions.map((_, i) => answers?.[i] ?? { section: "", tds: "", dueDate: "" })
  );

  useEffect(() => {
    onChange(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const update = (i: number, f: keyof TDSAnswer, v: string) => {
    setRows((prev) => {
      const n = [...prev];
      n[i] = { ...n[i], [f]: v };
      return n;
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-900 mb-1">TDS Calculator</h2>
        <p className="text-sm text-gray-500">
          Calculate TDS section, amount and due date for each payment.
        </p>
      </div>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={q.id} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-gray-500">
                  {q.type}
                </span>
                <h3 className="font-semibold text-gray-900 mt-1">{q.payee}</h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  Payment Amount:{" "}
                  <strong className="text-gray-900">
                    ₹{q.amount.toLocaleString("en-IN")}
                  </strong>
                </p>
              </div>
              <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500">
                Q{i + 1}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                  TDS Section
                </label>
                <select
                  value={rows[i]?.section ?? ""}
                  onChange={(e) => update(i, "section", e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  <option value="">Select…</option>
                  {["192", "194C", "194J", "194I", "194A", "194B", "194D"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                  TDS Amount (₹)
                </label>
                <input
                  type="number"
                  value={rows[i]?.tds ?? ""}
                  onChange={(e) => update(i, "tds", e.target.value)}
                  placeholder="Enter TDS amount"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                  Due Date
                </label>
                <input
                  type="text"
                  value={rows[i]?.dueDate ?? ""}
                  onChange={(e) => update(i, "dueDate", e.target.value)}
                  placeholder="7th of next month"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 2. JOURNAL ENTRY SIMULATOR
// ============================================================================
const ACCOUNTS = [
  "Cash A/c",
  "Bank A/c",
  "Purchases A/c",
  "Sales A/c",
  "Capital A/c",
  "Rent A/c",
  "Salary A/c",
  "Machinery A/c",
  "Debtors A/c",
  "Creditors A/c",
  "Stock A/c",
  "Loan A/c",
  "Interest A/c",
  "Commission A/c",
  "Drawings A/c",
  "Building A/c",
  "Depreciation A/c",
  "Advertisement A/c",
  "Discount A/c",
];

type JournalQuestion = {
  id: number;
  transaction: string;
  correctDebit: string;
  correctCredit: string;
  amount: number;
  rule?: string;
};

type JournalAnswer = {
  debit: string;
  credit: string;
  amount: string;
};

function JournalEntrySimulator({
  questions,
  answers,
  onChange,
}: {
  questions: JournalQuestion[];
  answers: JournalAnswer[] | null;
  onChange: (a: JournalAnswer[]) => void;
}) {
  const [rows, setRows] = useState<JournalAnswer[]>(
    () => questions.map((_, i) => answers?.[i] ?? { debit: "", credit: "", amount: "" })
  );

  useEffect(() => {
    onChange(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  function update(i: number, field: keyof JournalAnswer, value: string) {
    setRows((prev) => {
      const n = [...prev];
      n[i] = { ...n[i], [field]: value };
      return n;
    });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-900 mb-1">Journal Entry Simulator</h2>
        <p className="text-sm text-gray-500">
          Select the correct Debit and Credit accounts for each transaction.
        </p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-900 w-8">#</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Transaction</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900 w-48">
                Debit Account
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900 w-48">
                Credit Account
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900 w-36">
                Amount (₹)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {questions.map((q, i) => (
              <tr key={q.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{i + 1}</td>
                <td className="px-4 py-3">
                  <p className="text-gray-900 font-medium">{q.transaction}</p>
                  {q.rule && <p className="text-xs text-gray-500 mt-0.5">{q.rule}</p>}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={rows[i]?.debit ?? ""}
                    onChange={(e) => update(i, "debit", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  >
                    <option value="">Select account…</option>
                    {ACCOUNTS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={rows[i]?.credit ?? ""}
                    onChange={(e) => update(i, "credit", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  >
                    <option value="">Select account…</option>
                    {ACCOUNTS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={rows[i]?.amount ?? ""}
                    onChange={(e) => update(i, "amount", e.target.value)}
                    placeholder={q.amount.toString()}
                    className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// 3. TRIAL BALANCE SIMULATOR
// ============================================================================
type TBQuestion = {
  account: string;
  balance: number;
  correctSide: string;
  hint?: string;
};

type TBAnswer = {
  side: string;
  amount: string;
};

function TrialBalanceSimulator({
  questions,
  answers,
  onChange,
}: {
  questions: TBQuestion[];
  answers: TBAnswer[] | null;
  onChange: (a: TBAnswer[]) => void;
}) {
  const [rows, setRows] = useState<TBAnswer[]>(
    () => questions.map((_, i) => answers?.[i] ?? { side: "", amount: "" })
  );

  useEffect(() => {
    onChange(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  function update(i: number, field: keyof TBAnswer, value: string) {
    setRows((prev) => {
      const n = [...prev];
      n[i] = { ...n[i], [field]: value };
      return n;
    });
  }

  const drTotal = rows.reduce(
    (s, r) => (r.side === "Dr" ? s + Number(r.amount || 0) : s),
    0
  );
  const crTotal = rows.reduce(
    (s, r) => (r.side === "Cr" ? s + Number(r.amount || 0) : s),
    0
  );
  const balanced = drTotal === crTotal && drTotal > 0;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-900 mb-1">Trial Balance Preparation</h2>
        <p className="text-sm text-gray-500">
          Place each ledger balance on the correct Dr or Cr side.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left font-semibold text-gray-900">Account</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900 w-28">
                Side (Dr/Cr)
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900 w-36">
                Amount (₹)
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-500 text-xs w-24">
                Hint
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {questions.map((q, i) => (
              <tr key={q.account} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{q.account}</td>
                <td className="px-4 py-3">
                  <select
                    value={rows[i]?.side ?? ""}
                    onChange={(e) => {
                      update(i, "side", e.target.value);
                      update(i, "amount", q.balance.toString());
                    }}
                    className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  >
                    <option value="">Select…</option>
                    <option value="Dr">Dr</option>
                    <option value="Cr">Cr</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={rows[i]?.amount ?? ""}
                    onChange={(e) => update(i, "amount", e.target.value)}
                    placeholder={q.balance.toString()}
                    className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">{q.hint}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-200 bg-gray-50 font-semibold">
              <td className="px-4 py-3 text-gray-900">Total</td>
              <td className="px-4 py-3" />
              <td className="px-4 py-3">
                <div className="flex gap-4 text-xs">
                  <span>Dr: ₹{drTotal.toLocaleString("en-IN")}</span>
                  <span>Cr: ₹{crTotal.toLocaleString("en-IN")}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                {balanced ? (
                  <span className="text-green-600 text-xs font-medium">✓ Balanced</span>
                ) : (
                  <span className="text-red-500 text-xs">✗ Mismatch</span>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ============================================================================
// 4. GST INVOICE SIMULATOR
// ============================================================================
type GSTScenario = {
  scenario: string;
  taxableValue: number;
  gstRate: number;
  supplyType: string;
};

type GSTAns = Record<string, string>;

function GSTInvoiceSimulator({
  questions,
  answers,
  onChange,
}: {
  questions: GSTScenario;
  answers: GSTAns | null;
  onChange: (a: GSTAns) => void;
}) {
  const q = questions;
  const [form, setForm] = useState<GSTAns>(answers ?? {});
  useEffect(() => {
    onChange(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const taxable = Number(form.taxableValue || 0);
  const gstRate = Number(form.gstRate || q.gstRate);
  const cgst = Math.round((taxable * (gstRate / 2)) / 100);
  const igst = Math.round((taxable * gstRate) / 100);

  function Field({
    label,
    name,
    placeholder,
    type = "text",
  }: {
    label: string;
    name: string;
    placeholder?: string;
    type?: string;
  }) {
    return (
      <div>
        <label className="text-xs font-medium text-gray-500 mb-1.5 block">{label}</label>
        <input
          type={type}
          value={form[name] ?? ""}
          onChange={(e) => set(name, e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Scenario:</strong> {q.scenario}
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
        <h2 className="font-semibold text-gray-900">GST Tax Invoice</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Seller GSTIN" name="sellerGSTIN" placeholder="27AABCS1234A1Z5" />
          <Field label="Buyer GSTIN" name="buyerGSTIN" placeholder="27AABCT5678B1Z3" />
          <Field label="Invoice Number" name="invoiceNo" placeholder="INV-2024-001" />
          <Field label="Invoice Date" name="invoiceDate" type="date" />
          <Field label="HSN Code" name="hsnCode" placeholder="847130" />
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">
              Supply Type
            </label>
            <select
              value={form.supplyType ?? ""}
              onChange={(e) => set("supplyType", e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="">Select…</option>
              <option value="Intrastate">Intrastate (CGST + SGST)</option>
              <option value="Interstate">Interstate (IGST)</option>
            </select>
          </div>
          <Field label="Taxable Value (₹)" name="taxableValue" type="number" placeholder="450000" />
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">
              GST Rate (%)
            </label>
            <select
              value={form.gstRate ?? ""}
              onChange={(e) => set("gstRate", e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="">Select…</option>
              {[5, 12, 18, 28].map((r) => (
                <option key={r} value={r}>
                  {r}%
                </option>
              ))}
            </select>
          </div>
          {(form.supplyType === "Intrastate" || !form.supplyType) && (
            <>
              <Field label="CGST (₹)" name="cgst" type="number" placeholder={cgst.toString()} />
              <Field label="SGST (₹)" name="sgst" type="number" placeholder={cgst.toString()} />
            </>
          )}
          {form.supplyType === "Interstate" && (
            <Field label="IGST (₹)" name="igst" type="number" placeholder={igst.toString()} />
          )}
          <Field
            label="Total Invoice Amount (₹)"
            name="totalAmount"
            type="number"
            placeholder={(taxable + cgst * 2).toString()}
          />
        </div>
        {taxable > 0 && (
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-xs text-blue-700 grid grid-cols-3 gap-3">
            <div>
              <div className="font-semibold">Taxable Value</div>
              <div>₹{taxable.toLocaleString("en-IN")}</div>
            </div>
            <div>
              <div className="font-semibold">CGST + SGST</div>
              <div>₹{(cgst * 2).toLocaleString("en-IN")}</div>
            </div>
            <div>
              <div className="font-semibold">Total</div>
              <div>₹{(taxable + cgst * 2).toLocaleString("en-IN")}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE (helper tools) — not the page default
// ============================================================================
function AccountingTools() {
  // 1. TDS Simulator Data
  const tdsQuestions: TDSQuestion[] = [
    {
      id: 1,
      type: "Professional Fee",
      payee: "ABC Consulting",
      amount: 50000,
      section: "194J",
      correctTDS: 5000,
      dueDate: "7th May, 2025",
    },
    {
      id: 2,
      type: "Rent",
      payee: "XYZ Properties",
      amount: 120000,
      section: "194I",
      correctTDS: 12000,
      dueDate: "7th June, 2025",
    },
  ];

  const [tdsAnswers, setTdsAnswers] = useState<TDSAnswer[] | null>(null);

  // 2. Journal Entry Simulator Data
  const journalQuestions: JournalQuestion[] = [
    {
      id: 1,
      transaction: "Started business with cash ₹1,00,000",
      correctDebit: "Cash A/c",
      correctCredit: "Capital A/c",
      amount: 100000,
      rule: "Real & Personal Account",
    },
    {
      id: 2,
      transaction: "Purchased goods for cash ₹20,000",
      correctDebit: "Purchases A/c",
      correctCredit: "Cash A/c",
      amount: 20000,
      rule: "Nominal & Real Account",
    },
    {
      id: 3,
      transaction: "Paid rent ₹5,000",
      correctDebit: "Rent A/c",
      correctCredit: "Cash A/c",
      amount: 5000,
      rule: "Nominal & Real Account",
    },
  ];
  const [journalAnswers, setJournalAnswers] = useState<JournalAnswer[] | null>(null);

  // 3. Trial Balance Simulator Data
  const tbQuestions: TBQuestion[] = [
    { account: "Cash A/c", balance: 50000, correctSide: "Dr", hint: "Asset" },
    { account: "Bank A/c", balance: 75000, correctSide: "Dr", hint: "Asset" },
    { account: "Capital A/c", balance: 150000, correctSide: "Cr", hint: "Liability/Equity" },
    { account: "Sales A/c", balance: 80000, correctSide: "Cr", hint: "Revenue" },
    { account: "Purchases A/c", balance: 40000, correctSide: "Dr", hint: "Expense" },
    { account: "Rent A/c", balance: 5000, correctSide: "Dr", hint: "Expense" },
  ];
  const [tbAnswers, setTbAnswers] = useState<TBAnswer[] | null>(null);

  // 4. GST Invoice Simulator Data
  const gstScenario: GSTScenario = {
    scenario:
      "M/s TechSolutions (GSTIN: 27AAACA1234A1Z) sold 10 laptops at ₹45,000 each to M/s ABC Traders (GSTIN: 27AAACB5678B1Z). HSN: 847130, Rate: 18% IGST (Interstate supply).",
    taxableValue: 450000,
    gstRate: 18,
    supplyType: "Interstate",
  };
  const [gstAnswers, setGstAnswers] = useState<GSTAns | null>(null);

  const handleSubmit = () => {
    console.log("=== All Simulator Answers ===");
    console.log("TDS Answers:", tdsAnswers);
    console.log("Journal Answers:", journalAnswers);
    console.log("Trial Balance Answers:", tbAnswers);
    console.log("GST Answers:", gstAnswers);
    alert("Answers logged to console. Check developer tools.");
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Accounting Practice Suite</h1>
          <p className="text-gray-500 mt-2">
            Test your skills with TDS, Journal Entry, Trial Balance, and GST simulations
          </p>
        </div>

        <div className="space-y-10">
          <section>
            <TDSSimulator
              questions={tdsQuestions}
              answers={tdsAnswers}
              onChange={setTdsAnswers}
            />
          </section>

          <section>
            <JournalEntrySimulator
              questions={journalQuestions}
              answers={journalAnswers}
              onChange={setJournalAnswers}
            />
          </section>

          <section>
            <TrialBalanceSimulator
              questions={tbQuestions}
              answers={tbAnswers}
              onChange={setTbAnswers}
            />
          </section>

          <section>
            <GSTInvoiceSimulator
              questions={gstScenario}
              answers={gstAnswers}
              onChange={setGstAnswers}
            />
          </section>

          <div className="flex justify-center pt-4">
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              Submit All Answers
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}