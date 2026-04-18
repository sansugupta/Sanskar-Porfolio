import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    return null
  }

  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Store in Supabase
    const { error: dbError } = await supabase
      .from("feedback")
      .insert([
        { 
          message, 
          type: "anonymous",
          metadata: {
            ip: request.headers.get("x-forwarded-for") || "unknown",
            userAgent: request.headers.get("user-agent") || "unknown"
          }
        }
      ])

    if (dbError) {
      console.error("Supabase error:", dbError)
      // Continue anyway to try sending email
    }

    // Send email via Resend
    const resend = getResendClient()

    if (resend) {
      try {
        await resend.emails.send({
          from: "Portfolio Feedback <onboarding@resend.dev>",
          to: "sanskargupta966@gmail.com",
          subject: "New Anonymous Message from Portfolio",
          text: `Message: ${message}\n\nTimestamp: ${new Date().toISOString()}\nIP: ${request.headers.get("x-forwarded-for") || "unknown"}`,
        })
      } catch (emailError) {
        console.error("Resend error:", emailError)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Message received successfully",
    })
  } catch (error) {
    console.error("Error processing message:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
