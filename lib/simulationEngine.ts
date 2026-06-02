export function scoreJournalEntry(questions: any[], answers: Record<string, any>[] = []) {
  let score = 0
  const maxScore = questions.length * 10
  const breakdown = questions.map((q, i) => {
    const ans = answers[i] || {}
    const debitCorrect = ans.debit?.trim() === q.correctDebit?.trim()
    const creditCorrect = ans.credit?.trim() === q.correctCredit?.trim()
    const amountCorrect = Number(ans.amount) === Number(q.amount)
    const marks = debitCorrect && creditCorrect && amountCorrect ? 10
      : (debitCorrect && creditCorrect) ? 7
      : (debitCorrect || creditCorrect) ? 3 : 0
    score += marks
    return {
      question: q.transaction,
      correctDebit: q.correctDebit,
      correctCredit: q.correctCredit,
      studentDebit: ans.debit || "",
      studentCredit: ans.credit || "",
      debitCorrect,
      creditCorrect,
      amountCorrect,
      marks,
      maxMarks: 10,
    }
  })
  return { score, maxScore, percentage: Math.round((score / maxScore) * 100), breakdown }
}

export function scoreTrialBalance(questions: any[], answers: Record<string, any>[] = []) {
  let score = 0
  const maxScore = questions.length * 5
  const breakdown = questions.map((q, i) => {
    const ans = answers[i] || {}
    const sideCorrect = ans.side === q.correctSide
    const amountCorrect = Number(ans.amount) === Number(q.balance)
    const marks = sideCorrect && amountCorrect ? 5 : sideCorrect ? 2 : 0
    score += marks
    return {
      account: q.account,
      correctSide: q.correctSide,
      studentSide: ans.side || "",
      sideCorrect,
      amountCorrect,
      marks,
      maxMarks: 5,
    }
  })
  return { score, maxScore, percentage: Math.round((score / maxScore) * 100), breakdown }
}

export function scoreDepreciation(question: any, answers: Record<string, any>[] = []) {
  const { cost, salvageValue, usefulLife, method, unitsProduced, totalUnits } = question
  let expectedRows: Array<{ year: number; depreciation: number; bookValue: number }> = []

  if (method === "SLM") {
    const annualDep = (cost - salvageValue) / usefulLife
    let bookValue = cost
    for (let y = 1; y <= usefulLife; y++) {
      bookValue -= annualDep
      expectedRows.push({ year: y, depreciation: Math.round(annualDep), bookValue: Math.round(bookValue) })
    }
  } else if (method === "WDV") {
    const rate = 1 - Math.pow(salvageValue / cost, 1 / usefulLife)
    let bookValue = cost
    for (let y = 1; y <= usefulLife; y++) {
      const dep = bookValue * rate
      bookValue -= dep
      expectedRows.push({ year: y, depreciation: Math.round(dep), bookValue: Math.round(bookValue) })
    }
  } else if (method === "UNITS") {
    const depPerUnit = (cost - salvageValue) / totalUnits
    let bookValue = cost
    (unitsProduced || []).forEach((units: number, i: number) => {
      const dep = depPerUnit * units
      bookValue -= dep
      expectedRows.push({ year: i + 1, depreciation: Math.round(dep), bookValue: Math.round(bookValue) })
    })
  }

  let score = 0
  const maxScore = expectedRows.length * 10
  const breakdown = expectedRows.map((exp, i) => {
    const ans = answers[i] || {}
    const depClose = Math.abs(Number(ans.depreciation) - exp.depreciation) <= 10
    const bvClose = Math.abs(Number(ans.bookValue) - exp.bookValue) <= 10
    const marks = depClose && bvClose ? 10 : depClose ? 5 : 0
    score += marks
    return {
      year: exp.year,
      expectedDep: exp.depreciation,
      expectedBV: exp.bookValue,
      studentDep: ans.depreciation,
      studentBV: ans.bookValue,
      marks,
      maxMarks: 10,
    }
  })

  return { score, maxScore, percentage: Math.round((score / maxScore) * 100), breakdown }
}

export function scoreLedgerPosting(questions: any[] = [], answers: Record<string, any>[] = []) {
  let score = 0
  const maxScore = questions.length * 10
  const breakdown = questions.map((q, i) => {
    const ans = answers[i] || {}
    const debitCorrect = String(ans.debitAccount || "").trim() === String(q.journalDebit || "").trim()
    const creditCorrect = String(ans.creditAccount || "").trim() === String(q.journalCredit || "").trim()
    const amountCorrect = Number(ans.amount) === Number(q.amount)
    const marks = debitCorrect && creditCorrect && amountCorrect ? 10 : debitCorrect && creditCorrect ? 7 : debitCorrect || creditCorrect ? 3 : 0
    score += marks
    return {
      transaction: q.particular || q.date,
      expectedDebit: q.journalDebit,
      expectedCredit: q.journalCredit,
      studentDebit: ans.debitAccount || "",
      studentCredit: ans.creditAccount || "",
      expectedAmount: q.amount,
      studentAmount: Number(ans.amount || 0),
      debitCorrect,
      creditCorrect,
      amountCorrect,
      marks,
      maxMarks: 10,
    }
  })
  return { score, maxScore, percentage: Math.round((score / maxScore) * 100), breakdown }
}

export function scoreFinalAccounts(question: any = {}, answers: Record<string, any> = {}) {
  const trialBalance = Array.isArray(question.trialBalance) ? question.trialBalance : []
  const totalTrialValue = trialBalance.reduce((sum: number, row: any) => sum + Number(row.dr || row.cr || 0), 0)
  const answerTotal = Number(answers.tradingTotal || 0) + Number(answers.profitTotal || 0) + Number(answers.balanceSheetTotal || 0)
  const correct = Math.abs(answerTotal - totalTrialValue) <= 100
  const score = correct ? 100 : 0
  return {
    score,
    maxScore: 100,
    percentage: score,
    breakdown: [{ label: "Account totals match trial balance", expected: totalTrialValue, student: answerTotal, correct, maxMarks: 100, marks: score }],
  }
}

export function scoreGSTInvoice(formData: Record<string, any>, scenario: Record<string, any>) {
  const breakdown: Array<Record<string, any>> = []
  let score = 0

  const taxableValue = Number(formData.taxableValue)
  const gstRate = Number(formData.gstRate)
  const expectedCGST = Math.round(taxableValue * (gstRate / 2) / 100)
  const expectedSGST = Math.round(taxableValue * (gstRate / 2) / 100)
  const expectedIGST = Math.round(taxableValue * gstRate / 100)
  const expectedTotal = taxableValue + (formData.supplyType === "Interstate" ? expectedIGST : expectedCGST + expectedSGST)

  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/

  const checks = [
    { label: "Seller GSTIN format", correct: gstinRegex.test(formData.sellerGSTIN || ""), marks: 10 },
    { label: "Buyer GSTIN format", correct: gstinRegex.test(formData.buyerGSTIN || ""), marks: 10 },
    { label: "HSN Code (6 digits)", correct: /^\d{6,8}$/.test(formData.hsnCode || ""), marks: 5 },
    { label: "CGST calculation", correct: Math.abs(Number(formData.cgst) - expectedCGST) <= 1, marks: 15 },
    { label: "SGST calculation", correct: Math.abs(Number(formData.sgst) - expectedSGST) <= 1, marks: 15 },
    { label: "Total amount", correct: Math.abs(Number(formData.totalAmount) - expectedTotal) <= 1, marks: 20 },
    { label: "Invoice date present", correct: !!formData.invoiceDate, marks: 5 },
    { label: "Invoice number format", correct: /^[A-Z0-9/-]{1,16}$/.test(formData.invoiceNo || ""), marks: 5 },
    { label: "Place of supply", correct: !!formData.placeOfSupply, marks: 5 },
    { label: "Taxable value", correct: Math.abs(Number(formData.taxableValue) - scenario.taxableValue) <= 1, marks: 10 },
  ]

  checks.forEach((c) => {
    if (c.correct) score += c.marks
    breakdown.push({ ...c })
  })

  const maxScore = checks.reduce((s: number, c: any) => s + c.marks, 0)
  return { score, maxScore, percentage: Math.round((score / maxScore) * 100), breakdown }
}

export function scoreEWayBill(formData: Record<string, any>, _scenario: Record<string, any> = {}) {
  const breakdown: Array<Record<string, any>> = []
  let score = 0

  const checks = [
    { label: "Value threshold", correct: Number(formData.value || 0) >= 50000, marks: 20 },
    { label: "Transporter ID present", correct: Boolean(String(formData.transporterId || "").trim()), marks: 15 },
    { label: "Vehicle number format", correct: /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/.test(String(formData.vehicleNumber || "").toUpperCase()), marks: 15 },
    { label: "From GSTIN format", correct: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(String(formData.fromGstin || "").toUpperCase()), marks: 15 },
    { label: "To GSTIN format", correct: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(String(formData.toGstin || "").toUpperCase()), marks: 15 },
    { label: "Document details present", correct: Boolean(formData.documentNo && formData.documentDate), marks: 20 },
  ]

  checks.forEach((c) => {
    if (c.correct) score += c.marks
    breakdown.push(c)
  })

  return { score, maxScore: 100, percentage: score, breakdown }
}

export function scoreGSTReturn(scenario: Record<string, any>, answers: Record<string, any>) {
  const { correctOutputTax, correctITC, correctNetTax } = scenario
  const breakdown: Array<Record<string, any>> = []
  let score = 0

  const checks = [
    { label: "Output Tax (GSTR-1)", expected: correctOutputTax, student: Number(answers.outputTax), marks: 30, tolerance: 10 },
    { label: "ITC Available (GSTR-3B)", expected: correctITC, student: Number(answers.itc), marks: 30, tolerance: 10 },
    { label: "Net Tax Payable", expected: correctNetTax, student: Number(answers.netTax), marks: 40, tolerance: 10 },
  ]

  checks.forEach((c) => {
    const correct = Math.abs(c.student - c.expected) <= c.tolerance
    if (correct) score += c.marks
    breakdown.push({ label: c.label, expected: c.expected, student: c.student, correct, marks: correct ? c.marks : 0, maxMarks: c.marks })
  })

  return { score, maxScore: 100, percentage: score, breakdown }
}

export function scoreTDS(questions: any[], answers: Record<string, any>[] = []) {
  let score = 0
  const maxScore = questions.length * 15
  const breakdown = questions.map((q, i) => {
    const ans = answers[i] || {}
    const sectionCorrect = ans.section?.trim() === q.section?.trim()
    const tdsClose = Math.abs(Number(ans.tds) - q.correctTDS) <= q.correctTDS * 0.02
    const dueDateCorrect = String(ans.dueDate || "").toLowerCase().includes(String(q.dueDate || "").toLowerCase().split(" ")[0])
    const marks = (sectionCorrect ? 5 : 0) + (tdsClose ? 7 : 0) + (dueDateCorrect ? 3 : 0)
    score += marks
    return {
      type: q.type,
      section: q.section,
      correctTDS: q.correctTDS,
      studentTDS: ans.tds,
      sectionCorrect,
      tdsClose,
      marks,
      maxMarks: 15,
    }
  })
  return { score, maxScore, percentage: Math.round((score / maxScore) * 100), breakdown }
}

export function scorePayroll(inputs: Record<string, any>, answers: Record<string, any>) {
  const { basic, hra, da, otherAllowances, presentDays, totalDays } = inputs
  const grossPerDay = (basic + hra + da + (otherAllowances || 0)) / totalDays
  const gross = Math.round(grossPerDay * presentDays)
  const pfEmployee = Math.round(basic * 0.12)
  const pfEmployer = Math.round(basic * 0.12)
  const esiApplicable = gross <= 21000
  const esiEmployee = esiApplicable ? Math.round(gross * 0.0075) : 0
  const esiEmployer = esiApplicable ? Math.round(gross * 0.0325) : 0
  const netPay = gross - pfEmployee - esiEmployee

  const breakdown: Array<Record<string, any>> = []
  let score = 0

  const checks = [
    { label: "Gross Salary", expected: gross, student: Number(answers.gross), marks: 20, tolerance: 50 },
    { label: "PF (Employee 12%)", expected: pfEmployee, student: Number(answers.pfEmployee), marks: 20, tolerance: 10 },
    { label: "PF (Employer 12%)", expected: pfEmployer, student: Number(answers.pfEmployer), marks: 15, tolerance: 10 },
    { label: "ESI (Employee 0.75%)", expected: esiEmployee, student: Number(answers.esiEmployee), marks: 15, tolerance: 5 },
    { label: "ESI (Employer 3.25%)", expected: esiEmployer, student: Number(answers.esiEmployer), marks: 10, tolerance: 5 },
    { label: "Net Pay", expected: netPay, student: Number(answers.netPay), marks: 20, tolerance: 50 },
  ]

  checks.forEach((c) => {
    const correct = Math.abs(c.student - c.expected) <= c.tolerance
    if (correct) score += c.marks
    breakdown.push({ ...c, correct, actualMarks: correct ? c.marks : 0 })
  })

  return { score, maxScore: 100, percentage: score, breakdown, computed: { gross, pfEmployee, pfEmployer, esiEmployee, esiEmployer, netPay } }
}

export function scoreIncomeTax(scenario: Record<string, any>, answers: Record<string, any>) {
  const { basicSalary, hra, da, rentPaid, cityType, section80C, section80D, otherIncome } = scenario
  const hraExempt = Math.min(hra, rentPaid - (0.1 * basicSalary), cityType === "Metro" ? 0.5 * basicSalary : 0.4 * basicSalary)
  const taxableHRA = hra - Math.max(0, hraExempt)
  const grossSalary = basicSalary + taxableHRA + da
  const standardDeduction = 50000
  const netSalary = grossSalary - standardDeduction
  const grossTotalIncome = netSalary + (otherIncome || 0)
  const totalDeductions = Math.min(section80C || 0, 150000) + Math.min(section80D || 0, 25000)
  const taxableIncome = grossTotalIncome - totalDeductions

  let tax = 0
  if (taxableIncome <= 300000) tax = 0
  else if (taxableIncome <= 600000) tax = (taxableIncome - 300000) * 0.05
  else if (taxableIncome <= 900000) tax = 15000 + (taxableIncome - 600000) * 0.10
  else if (taxableIncome <= 1200000) tax = 45000 + (taxableIncome - 900000) * 0.15
  else if (taxableIncome <= 1500000) tax = 90000 + (taxableIncome - 1200000) * 0.20
  else tax = 150000 + (taxableIncome - 1500000) * 0.30

  const cess = Math.round(tax * 0.04)
  const totalTax = Math.round(tax + cess)

  const breakdown: Array<Record<string, any>> = []
  let score = 0

  const checks = [
    { label: "Gross Salary", expected: Math.round(grossSalary), student: Number(answers.grossSalary), marks: 15, tolerance: 100 },
    { label: "Net Salary (after Std Deduction)", expected: Math.round(netSalary), student: Number(answers.netSalary), marks: 15, tolerance: 100 },
    { label: "Gross Total Income", expected: Math.round(grossTotalIncome), student: Number(answers.grossTotalIncome), marks: 15, tolerance: 100 },
    { label: "Total Deductions", expected: Math.round(totalDeductions), student: Number(answers.totalDeductions), marks: 15, tolerance: 100 },
    { label: "Taxable Income", expected: Math.round(taxableIncome), student: Number(answers.taxableIncome), marks: 20, tolerance: 100 },
    { label: "Total Tax Payable (incl. Cess)", expected: totalTax, student: Number(answers.totalTax), marks: 20, tolerance: 200 },
  ]

  checks.forEach((c) => {
    const correct = Math.abs(c.student - c.expected) <= c.tolerance
    if (correct) score += c.marks
    breakdown.push({ ...c, correct, actualMarks: correct ? c.marks : 0 })
  })

  return { score, maxScore: 100, percentage: score, breakdown, computed: { grossSalary, netSalary, grossTotalIncome, totalDeductions, taxableIncome, totalTax } }
}

export function scoreAudit(steps: any[] = [], answers: Record<string, any>[] = []) {
  let score = 0
  const maxScore = 100
  const marksPerStep = [15, 20, 20, 15, 15, 15]

  const breakdown = steps.map((step, i) => {
    const ans = answers[i] || {}
    const stepScore = Math.round((ans.completionPercent || 0) / 100 * (marksPerStep[i] || 0))
    score += stepScore
    return { step: step.name, marks: stepScore, maxMarks: marksPerStep[i] || 0, responses: ans.responses || [] }
  })

  return { score, maxScore, percentage: Math.min(score, maxScore), breakdown }
}

export function scoreBanking(scenario: Record<string, any>, answers: Record<string, any>) {
  const breakdown: Array<Record<string, any>> = []
  let score = 0

  if (scenario.type === "EMI") {
    const { principal, rate, tenure } = scenario
    const r = rate / 12 / 100
    const n = tenure
    const expectedEMI = Math.round(principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1))
    const correct = Math.abs(Number(answers.emi) - expectedEMI) <= expectedEMI * 0.02
    if (correct) score += 100
    breakdown.push({ label: "EMI Calculation", expected: expectedEMI, student: answers.emi, correct, marks: correct ? 100 : 0, maxMarks: 100 })
  }

  if (scenario.type === "FD") {
    const { principal, rate, tenureYears, compoundFreq } = scenario
    const n = compoundFreq
    const t = tenureYears
    const expectedMaturity = Math.round(principal * Math.pow(1 + rate / (100 * n), n * t))
    const correct = Math.abs(Number(answers.maturity) - expectedMaturity) <= expectedMaturity * 0.02
    if (correct) score += 100
    breakdown.push({ label: "FD Maturity Amount", expected: expectedMaturity, student: answers.maturity, correct, marks: correct ? 100 : 0, maxMarks: 100 })
  }

  if (scenario.type === "RECONCILIATION") {
    const { items } = scenario
    let itemScore = 0
    ;(items || []).forEach((item: any, i: number) => {
      const ans = Array.isArray(answers.items) ? answers.items[i] || {} : {}
      const correct = ans.classification === item.correctClassification
      if (correct) itemScore += Math.floor(100 / items.length)
      breakdown.push({ label: item.description, expected: item.correctClassification, student: ans.classification, correct, marks: correct ? Math.floor(100 / items.length) : 0 })
    })
    score = itemScore
  }

  return { score, maxScore: 100, percentage: Math.min(score, 100), breakdown }
}

export function scoreERPPurchase(steps: any[] = [], answers: Record<string, any>[] = []) {
  const stepWeights = [15, 15, 25, 20, 15, 10]
  let score = 0
  const breakdown = steps.map((step, i) => {
    const ans = answers[i] || {}
    const requiredFields = step.requiredFields || []
    const filled = requiredFields.filter((f: string) => ans[f] && String(ans[f]).trim() !== "").length
    const completionRatio = requiredFields.length ? filled / requiredFields.length : 1
    const marks = Math.round(completionRatio * (stepWeights[i] || 0))
    score += marks
    return { step: step.name, filled, total: requiredFields.length, marks, maxMarks: stepWeights[i] || 0 }
  })
  return { score, maxScore: 100, percentage: Math.min(score, 100), breakdown }
}

export function scoreInventory(transactions: any[] = [], answers: Record<string, any>[] = [], method = "FIFO") {
  let stock: Array<{ qty: number; rate: number }> = []
  const expectedRows: Array<{ balance: number; balanceValue: number }> = []

  transactions.forEach((txn) => {
    if (txn.type === "IN") {
      stock.push({ qty: txn.qty, rate: txn.rate })
    } else if (txn.type === "OUT") {
      let remaining = txn.qty
      let costOfGoodsSold = 0
      if (method === "FIFO") {
        while (remaining > 0 && stock.length > 0) {
          const batch = stock[0]
          const taken = Math.min(batch.qty, remaining)
          costOfGoodsSold += taken * batch.rate
          batch.qty -= taken
          remaining -= taken
          if (batch.qty === 0) stock.shift()
        }
      }
    }
    const balance = stock.reduce((s: number, b: any) => s + b.qty, 0)
    const balanceValue = stock.reduce((s: number, b: any) => s + b.qty * b.rate, 0)
    expectedRows.push({ balance, balanceValue: Math.round(balanceValue) })
  })

  let score = 0
  const maxScore = transactions.length * 10
  const breakdown = expectedRows.map((exp, i) => {
    const ans = answers[i] || {}
    const qtyCorrect = Number(ans.balance) === exp.balance
    const valCorrect = Math.abs(Number(ans.balanceValue) - exp.balanceValue) <= 10
    const marks = qtyCorrect && valCorrect ? 10 : qtyCorrect ? 5 : 0
    score += marks
    return {
      transaction: i + 1,
      expectedBalance: exp.balance,
      expectedValue: exp.balanceValue,
      studentBalance: ans.balance,
      studentValue: ans.balanceValue,
      marks,
      maxMarks: 10,
    }
  })

  return { score, maxScore, percentage: Math.round((score / maxScore) * 100), breakdown }
}

export function scoreExcel(exercises: any[] = [], answers: Record<string, any>[] = []) {
  let score = 0
  const maxScore = exercises.length * 20
  const breakdown = exercises.map((ex, i) => {
    const ans = answers[i] || {}
    const resultCorrect = String(ans.result).trim() === String(ex.expectedResult).trim()
    const formulaPartial = ans.formula && ans.formula.toUpperCase().includes((ex.functionName || "").toUpperCase())
    const marks = resultCorrect ? 20 : formulaPartial ? 10 : 0
    score += marks
    return {
      exercise: ex.exercise,
      expectedResult: ex.expectedResult,
      studentResult: ans.result,
      formulaCorrect: resultCorrect,
      marks,
      maxMarks: 20,
    }
  })
  return { score, maxScore, percentage: Math.round((score / maxScore) * 100), breakdown }
}

export const SCORING_FUNCTIONS: Record<string, Function> = {
  JOURNAL: scoreJournalEntry,
  LEDGER: scoreLedgerPosting,
  TRIAL_BALANCE: scoreTrialBalance,
  FINAL_ACCOUNTS: scoreFinalAccounts,
  DEPRECIATION: scoreDepreciation,
  GST_INVOICE: scoreGSTInvoice,
  GST_RETURN: scoreGSTReturn,
  EWAYBILL: scoreEWayBill,
  TDS: scoreTDS,
  PAYROLL: scorePayroll,
  INCOME_TAX: scoreIncomeTax,
  AUDIT: scoreAudit,
  BANKING: scoreBanking,
  ERP_PURCHASE: scoreERPPurchase,
  ERP_SALES: scoreERPPurchase,
  ERP_INVENTORY: scoreInventory,
  EXCEL: scoreExcel,
}

export function scoreSimulation(category: string, questions: any, answers: any, scenario: any = {}) {
  const fn = SCORING_FUNCTIONS[category]
  if (!fn) return { score: 0, maxScore: 100, percentage: 0, breakdown: [] }
  return fn(questions, answers, scenario)
}
