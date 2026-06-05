/**
 * Dynamic Scenario Generator for GST & TDS Simulations
 * Generates unique, randomized scenarios for each student
 */

import { randomUUID } from "crypto"

// Company Names Pool
const COMPANY_NAMES = [
  "TechNova Solutions Pvt Ltd",
  "Digital Dynamics India Ltd",
  "Innovate Systems Private Limited",
  "Global Trading Corporation",
  "Sunshine Enterprises",
  "Metro Manufacturing Co",
  "Elite Exports India Pvt Ltd",
  "Prime Consulting Services",
  "Skyline Infrastructure Ltd",
  "Green Energy Solutions",
  "Quantum Technologies Pvt Ltd",
  "Phoenix Retail Chain",
  "BlueStar Logistics",
  "Apex Financial Services",
  "Crown Hotels & Resorts",
]

// Indian States for GST
const INDIAN_STATES = [
  { code: "27", name: "Maharashtra" },
  { code: "07", name: "Delhi" },
  { code: "29", name: "Karnataka" },
  { code: "33", name: "Tamil Nadu" },
  { code: "24", name: "Gujarat" },
  { code: "32", name: "Kerala" },
  { code: "19", name: "West Bengal" },
  { code: "36", name: "Telangana" },
  { code: "09", name: "Uttar Pradesh" },
  { code: "23", name: "Madhya Pradesh" },
]

// Product Categories with HSN Codes
const PRODUCTS = [
  { name: "Laptops", hsnCode: "84713000", rate: 18 },
  { name: "Mobile Phones", hsnCode: "85171200", rate: 18 },
  { name: "LED TVs", hsnCode: "85285200", rate: 18 },
  { name: "Cotton Fabric", hsnCode: "52081100", rate: 5 },
  { name: "Machinery Parts", hsnCode: "84829000", rate: 18 },
  { name: "Pharmaceutical Products", hsnCode: "30049099", rate: 12 },
  { name: "Footwear", hsnCode: "64029900", rate: 12 },
  { name: "Steel Products", hsnCode: "72142000", rate: 18 },
  { name: "Furniture", hsnCode: "94036090", rate: 18 },
  { name: "Electrical Cables", hsnCode: "85444900", rate: 18 },
]

// TDS Sections
const TDS_SECTIONS = [
  { section: "194C", description: "Payment to Contractors", rate: 1, threshold: 30000, type: "Individual" },
  { section: "194C", description: "Payment to Contractors", rate: 2, threshold: 30000, type: "Others" },
  { section: "194J", description: "Professional/Technical Services", rate: 10, threshold: 30000, type: "All" },
  { section: "194H", description: "Commission/Brokerage", rate: 5, threshold: 15000, type: "All" },
  { section: "194I", description: "Rent - Land & Building", rate: 10, threshold: 240000, type: "All" },
  { section: "194I", description: "Rent - Plant & Machinery", rate: 2, threshold: 240000, type: "All" },
  { section: "194Q", description: "Purchase of Goods", rate: 0.1, threshold: 5000000, type: "All" },
  { section: "192", description: "Salary", rate: "As per slab", threshold: 0, type: "All" },
]

// Helper Functions
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomChoice<T>(array: T[]): T {
  return array[randomInt(0, array.length - 1)]
}

function generatePAN(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const pan = [
    randomChoice(letters),
    randomChoice(letters),
    randomChoice(letters),
    randomChoice(letters),
    randomChoice(letters),
    randomInt(0, 9),
    randomInt(0, 9),
    randomInt(0, 9),
    randomInt(0, 9),
    randomChoice(letters),
  ].join("")
  return pan
}

function generateGSTIN(stateCode: string, pan: string): string {
  const checkDigit = randomInt(0, 9)
  return `${stateCode}${pan}1Z${checkDigit}`
}

function generateTAN(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const tan = [
    randomChoice(letters),
    randomChoice(letters),
    randomChoice(letters),
    randomChoice(letters),
    randomInt(0, 9),
    randomInt(0, 9),
    randomInt(0, 9),
    randomInt(0, 9),
    randomChoice(letters),
  ].join("")
  return tan
}

// GST Registration Scenario
export function generateGSTRegistrationScenario(userId: string) {
  const company = randomChoice(COMPANY_NAMES)
  const state = randomChoice(INDIAN_STATES)
  const pan = generatePAN()
  const businessType = randomChoice(["Proprietorship", "Partnership", "Private Limited", "LLP"])
  
  return {
    scenarioId: randomUUID(),
    userId,
    type: "GST_REGISTRATION",
    company,
    businessType,
    pan,
    state: state.name,
    stateCode: state.code,
    address: `${randomInt(1, 999)}, ${randomChoice(["MG Road", "Park Street", "Main Road", "Industrial Area"])}`,
    pincode: `${randomInt(100000, 999999)}`,
    mobile: `+91 ${randomInt(7000000000, 9999999999)}`,
    email: `info@${company.toLowerCase().replace(/\s/g, "")}.com`,
    expectedGSTIN: generateGSTIN(state.code, pan),
  }
}

// GST Invoice Scenario
export function generateGSTInvoiceScenario(userId: string) {
  const sellerState = randomChoice(INDIAN_STATES)
  const buyerState = randomChoice(INDIAN_STATES)
  const product = randomChoice(PRODUCTS)
  const quantity = randomInt(10, 500)
  const rate = randomInt(1000, 50000)
  const taxableValue = quantity * rate
  const isInterstate = sellerState.code !== buyerState.code
  
  const cgst = isInterstate ? 0 : Math.round(taxableValue * (product.rate / 2) / 100)
  const sgst = isInterstate ? 0 : Math.round(taxableValue * (product.rate / 2) / 100)
  const igst = isInterstate ? Math.round(taxableValue * product.rate / 100) : 0
  const totalAmount = taxableValue + cgst + sgst + igst
  
  return {
    scenarioId: randomUUID(),
    userId,
    type: "GST_INVOICE",
    sellerName: randomChoice(COMPANY_NAMES),
    sellerGSTIN: generateGSTIN(sellerState.code, generatePAN()),
    sellerAddress: `${sellerState.name}`,
    sellerState: sellerState.name,
    buyerName: randomChoice(COMPANY_NAMES),
    buyerGSTIN: generateGSTIN(buyerState.code, generatePAN()),
    buyerAddress: `${buyerState.name}`,
    buyerState: buyerState.name,
    product: product.name,
    hsnCode: product.hsnCode,
    quantity,
    rate,
    taxableValue,
    gstRate: product.rate,
    supplyType: isInterstate ? "Interstate" : "Intrastate",
    cgst,
    sgst,
    igst,
    totalAmount,
    invoiceDate: new Date().toISOString().split("T")[0],
    placeOfSupply: buyerState.name,
  }
}

// GST Return (GSTR-1) Scenario
export function generateGSTReturnScenario(userId: string) {
  const numInvoices = randomInt(5, 15)
  const invoices = []
  let totalTaxableValue = 0
  let totalCGST = 0
  let totalSGST = 0
  let totalIGST = 0
  
  for (let i = 0; i < numInvoices; i++) {
    const invoice = generateGSTInvoiceScenario(userId)
    invoices.push(invoice)
    totalTaxableValue += invoice.taxableValue
    totalCGST += invoice.cgst
    totalSGST += invoice.sgst
    totalIGST += invoice.igst
  }
  
  const purchases = randomInt(numInvoices - 2, numInvoices)
  const inputTax = Math.round(totalTaxableValue * 0.10) // Assume 10% ITC
  const netGSTLiability = (totalCGST + totalSGST + totalIGST) - inputTax
  
  return {
    scenarioId: randomUUID(),
    userId,
    type: "GST_RETURN_GSTR1",
    gstin: generateGSTIN(randomChoice(INDIAN_STATES).code, generatePAN()),
    period: `${randomChoice(["January", "February", "March", "April", "May", "June"])}-2026`,
    invoices,
    totalInvoices: numInvoices,
    totalTaxableValue,
    totalCGST,
    totalSGST,
    totalIGST,
    totalOutputTax: totalCGST + totalSGST + totalIGST,
    purchases,
    inputTax,
    netGSTLiability: Math.max(0, netGSTLiability),
  }
}

// TDS Deduction Scenario
export function generateTDSDeductionScenario(userId: string) {
  const tdsConfig = randomChoice(TDS_SECTIONS)
  const amount = randomInt(50000, 1000000)
  const tdsRate = typeof tdsConfig.rate === "number" ? tdsConfig.rate : 10 // Default for slabs
  const tdsAmount = Math.round((amount * tdsRate) / 100)
  const netPayable = amount - tdsAmount
  
  return {
    scenarioId: randomUUID(),
    userId,
    type: "TDS_DEDUCTION",
    payeeName: randomChoice(COMPANY_NAMES),
    pan: generatePAN(),
    section: tdsConfig.section,
    description: tdsConfig.description,
    grossAmount: amount,
    tdsRate,
    tdsAmount,
    netPayable,
    threshold: tdsConfig.threshold,
    deducteeType: tdsConfig.type,
    paymentDate: new Date().toISOString().split("T")[0],
  }
}

// TDS Challan (Form 281) Scenario
export function generateTDSChallanScenario(userId: string) {
  const tan = generateTAN()
  const sections = randomChoice([["194C"], ["194J"], ["194H"], ["194I"], ["194C", "194J"]])
  const amounts = sections.map(() => randomInt(10000, 200000))
  const totalTDS = amounts.reduce((a, b) => a + b, 0)
  const surcharge = totalTDS > 100000 ? Math.round(totalTDS * 0.10) : 0
  const cess = Math.round((totalTDS + surcharge) * 0.04)
  const totalAmount = totalTDS + surcharge + cess
  
  return {
    scenarioId: randomUUID(),
    userId,
    type: "TDS_CHALLAN",
    tan,
    assessmentYear: "2026-27",
    sections,
    amounts,
    totalTDS,
    surcharge,
    cess,
    totalAmount,
    paymentDate: new Date().toISOString().split("T")[0],
    challanNo: `ITNS281-${randomInt(100000, 999999)}`,
  }
}

// TDS Return (24Q/26Q) Scenario
export function generateTDSReturnScenario(userId: string) {
  const quarterType = randomChoice(["24Q", "26Q"])
  const quarter = randomChoice(["Q1 (Apr-Jun)", "Q2 (Jul-Sep)", "Q3 (Oct-Dec)", "Q4 (Jan-Mar)"])
  const numDeductees = randomInt(10, 50)
  
  const deductees = Array.from({ length: numDeductees }, () => ({
    name: randomChoice(COMPANY_NAMES),
    pan: generatePAN(),
    section: randomChoice(TDS_SECTIONS).section,
    amount: randomInt(50000, 500000),
    tds: randomInt(5000, 50000),
  }))
  
  const totalAmount = deductees.reduce((sum, d) => sum + d.amount, 0)
  const totalTDS = deductees.reduce((sum, d) => sum + d.tds, 0)
  
  return {
    scenarioId: randomUUID(),
    userId,
    type: `TDS_RETURN_${quarterType}`,
    returnType: quarterType,
    tan: generateTAN(),
    financialYear: "2025-26",
    quarter,
    deductees,
    totalDeductees: numDeductees,
    totalAmount,
    totalTDS,
    filingDueDate: "31-Jul-2026",
  }
}

// Master Scenario Generator
export function generateTaxScenario(type: string, userId: string) {
  switch (type) {
    case "GST_REGISTRATION":
      return generateGSTRegistrationScenario(userId)
    case "GST_INVOICE":
      return generateGSTInvoiceScenario(userId)
    case "GST_RETURN":
      return generateGSTReturnScenario(userId)
    case "TDS_DEDUCTION":
      return generateTDSDeductionScenario(userId)
    case "TDS_CHALLAN":
      return generateTDSChallanScenario(userId)
    case "TDS_RETURN":
      return generateTDSReturnScenario(userId)
    default:
      throw new Error(`Unknown tax simulation type: ${type}`)
  }
}
