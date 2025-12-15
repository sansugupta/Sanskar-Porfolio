import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo purposes
let logs: any[] = []

export async function GET() {
  try {
    // Return recent logs (last 100)
    const recentLogs = logs.slice(-100).reverse()
    return NextResponse.json({ logs: recentLogs })
  } catch (error) {
    console.error("Logs GET error:", error)
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { level, message, timestamp, metadata } = body

    const logEntry = {
      id: Date.now(),
      level: level || "info",
      message,
      timestamp: timestamp || new Date().toISOString(),
      metadata: metadata || {},
    }

    logs.push(logEntry)

    // Keep only last 1000 logs to prevent memory issues
    if (logs.length > 1000) {
      logs = logs.slice(-1000)
    }

    console.log("Log entry:", logEntry)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logs POST error:", error)
    return NextResponse.json({ error: "Failed to create log entry" }, { status: 500 })
  }
}
