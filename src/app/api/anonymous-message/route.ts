import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Log the message for debugging
    console.log("Anonymous message received:", {
      message,
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || "unknown",
    })

    // Email sending logic using multiple services
    const emailData = {
      to: "sanskargupta966@gmail.com",
      subject: "New Anonymous Message from Portfolio",
      message: `
        You have received a new anonymous message from your portfolio:
        
        Message: ${message}
        
        Timestamp: ${new Date().toISOString()}
        IP: ${request.headers.get("x-forwarded-for") || "unknown"}
      `,
    }

    // Try multiple email services
    let emailSent = false

    // Method 1: EmailJS API (you'll need to configure this)
    try {
      const emailJSResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
          template_id: "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
          user_id: "YOUR_USER_ID", // Replace with your EmailJS user ID
          template_params: {
            to_email: emailData.to,
            subject: emailData.subject,
            message: emailData.message,
          },
        }),
      })

      if (emailJSResponse.ok) {
        emailSent = true
        console.log("Email sent successfully via EmailJS")
      }
    } catch (error) {
      console.log("EmailJS failed, trying next method:", error)
    }

    // Method 2: Formspree (backup)
    if (!emailSent) {
      try {
        const formspreeResponse = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
          // Replace with your Formspree form ID
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailData.to,
            subject: emailData.subject,
            message: emailData.message,
          }),
        })

        if (formspreeResponse.ok) {
          emailSent = true
          console.log("Email sent successfully via Formspree")
        }
      } catch (error) {
        console.log("Formspree failed:", error)
      }
    }

    // Method 3: Direct SMTP (you can implement this with nodemailer)
    if (!emailSent) {
      // For now, we'll just log it
      console.log("All email services failed, message logged:", emailData)
    }

    return NextResponse.json({
      success: true,
      message: "Anonymous message received successfully",
    })
  } catch (error) {
    console.error("Error processing anonymous message:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
