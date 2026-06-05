import { NextRequest, NextResponse } from "next/server"
import { getUserFromRequest } from "@/lib/auth-server"
import { connectMongoose } from "@/lib/mongoose"
import StudentTaxProgress from "@/lib/models/StudentTaxProgress"
import TaxLeaderboard from "@/lib/models/TaxLeaderboard"

// GET /api/tax-simulations/progress - Get student's tax simulation progress
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectMongoose()

    let progress = await StudentTaxProgress.findOne({ userId: user.sub }).lean()
    
    if (!progress) {
      // Create initial progress record
      progress = await StudentTaxProgress.create({ userId: user.sub })
      progress = progress.toObject()
    }

    // Get leaderboard position
    const gstLeaderboard = await TaxLeaderboard.findOne({ userId: user.sub, type: "GST" }).lean()
    const tdsLeaderboard = await TaxLeaderboard.findOne({ userId: user.sub, type: "TDS" }).lean()
    const overallLeaderboard = await TaxLeaderboard.findOne({ userId: user.sub, type: "OVERALL" }).lean()

    return NextResponse.json({
      progress,
      leaderboard: {
        gst: gstLeaderboard,
        tds: tdsLeaderboard,
        overall: overallLeaderboard,
      },
    }, { status: 200 })
  } catch (error) {
    console.error("Error fetching tax progress:", error)
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 })
  }
}
