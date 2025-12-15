import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo purposes
// In production, you'd use a proper database
const analyticsData = {
  totalVisitors: 1247,
  pageViews: 3891,
  avgSessionTime: "2:34",
  bounceRate: "32%",
  dailyVisitors: [],
  pageData: [],
}

export async function GET() {
  try {
    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error("Analytics GET error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, page, timestamp } = body

    // Log the analytics event
    console.log("Analytics event:", { action, page, timestamp })

    // Update analytics data
    if (action === "page_view") {
      analyticsData.pageViews += 1

      // Simulate visitor tracking
      const today = new Date().toDateString()
      const existingDay = analyticsData.dailyVisitors.find((d: any) => d.date === today)

      if (existingDay) {
        existingDay.count += 1
      } else {
        analyticsData.dailyVisitors.push({ date: today, count: 1 })
        analyticsData.totalVisitors += 1
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics POST error:", error)
    return NextResponse.json({ error: "Failed to track analytics" }, { status: 500 })
  }
}
