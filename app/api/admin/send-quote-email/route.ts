import { NextResponse } from 'next/server'

const Brevo = require('@getbrevo/brevo')

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      quoteId,
      customerEmail,
      customerName,
      linkUrl,
      buttonText,
      quotedPrice,
      currency,
      turnaroundDays,
    } = body

    if (!customerEmail || !linkUrl || !quotedPrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const apiInstance = new Brevo.TransactionalEmailsApi()
    apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)

    const formattedPrice = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: currency || 'CAD',
    }).format(quotedPrice)

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Quote is Ready</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse;">

          <!-- Header with Logo -->
          <tr>
            <td style="background-color: #0C2340; padding: 30px 40px; border-radius: 12px 12px 0 0; text-align: center;">
              <img src="https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/png_logo_cethos_light_bg.png"
                   alt="Cethos Solutions Inc."
                   style="max-width: 180px; height: auto; margin-bottom: 15px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                Your Quote is Ready!
              </h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="background-color: #ffffff; padding: 40px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">

              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear ${customerName},
              </p>

              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Thank you for your interest in our services. We have prepared your quote and it's ready for your review.
              </p>

              <!-- Quote Summary Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="background-color: #f0fdf4; padding: 25px; border-radius: 12px; border: 2px solid #86efac; text-align: center;">
                    <p style="color: #166534; margin: 0 0 10px 0; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">
                      Your Quote Total
                    </p>
                    <p style="color: #0C2340; margin: 0; font-size: 36px; font-weight: 700;">
                      ${formattedPrice}
                    </p>
                    ${turnaroundDays ? `
                    <p style="color: #166534; margin: 10px 0 0 0; font-size: 14px;">
                      Estimated delivery: ${turnaroundDays} business days
                    </p>
                    ` : ''}
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="text-align: center; padding: 10px 0 30px 0;">
                    <a href="${linkUrl}"
                       style="display: inline-block; background-color: #0891B2; color: white; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                      ${buttonText || 'Review and Pay'}
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0; text-align: center;">
                Click the button above to review your quote details and proceed with payment.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

              <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0;">
                If you have any questions about your quote, please don't hesitate to reach out to us at
                <a href="mailto:quotes@cethos.com" style="color: #0891B2; text-decoration: none;">quotes@cethos.com</a>
                or call us at <a href="tel:+15876000786" style="color: #0891B2; text-decoration: none;">(587) 600-0786</a>.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0C2340; padding: 30px 40px; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="color: #94a3b8; margin: 0 0 10px 0; font-size: 14px;">
                Quote Reference: ${quoteId.slice(0, 8).toUpperCase()}
              </p>
              <p style="color: #64748b; margin: 0; font-size: 12px;">
                Cethos Solutions Inc. · Calgary, AB · Dubai, UAE · Patiala, India
              </p>
              <p style="color: #64748b; margin: 10px 0 0 0; font-size: 12px;">
                <a href="https://cethos.com" style="color: #0891B2; text-decoration: none;">cethos.com</a> ·
                <a href="tel:+15876000786" style="color: #0891B2; text-decoration: none;">(587) 600-0786</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `

    const sendSmtpEmail = new Brevo.SendSmtpEmail()
    sendSmtpEmail.subject = `Your Quote is Ready - ${formattedPrice} | Cethos Solutions`
    sendSmtpEmail.sender = {
      name: 'Cethos Solutions Inc.',
      email: 'quotes@cethos.com'
    }
    sendSmtpEmail.to = [{ email: customerEmail, name: customerName }]
    sendSmtpEmail.replyTo = {
      name: 'Cethos Quotes',
      email: 'quotes@cethos.com'
    }
    sendSmtpEmail.htmlContent = htmlContent

    await apiInstance.sendTransacEmail(sendSmtpEmail)

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const err = error as Error
    console.error('[Send Quote Email] Error:', err.message)
    return NextResponse.json(
      { error: 'Failed to send email', message: err.message },
      { status: 500 }
    )
  }
}
