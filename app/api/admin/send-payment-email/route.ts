import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

const Brevo = require('@getbrevo/brevo')

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      quoteId,
      customerEmail,
      customerName,
      quotedPrice,
      currency,
      description,
    } = body

    if (!customerEmail || !quotedPrice || !quoteId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session via Supabase Edge Function
    const supabase = createServerSupabaseClient()

    const { data: session, error: stripeError } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        quoteId,
        amount: Math.round(quotedPrice * 100), // Convert to cents
        currency: (currency || 'CAD').toLowerCase(),
        customerEmail,
        customerName,
        description: description || 'Translation Services',
        successUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cethos.com'}/quote/success?quote_id=${quoteId}`,
        cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cethos.com'}/quote/Step5/${quoteId}`,
      },
    })

    if (stripeError) {
      console.error('[Send Payment Email] Stripe error:', stripeError)
      return NextResponse.json(
        { error: 'Failed to create payment session', message: stripeError.message },
        { status: 500 }
      )
    }

    const stripeUrl = session?.url
    if (!stripeUrl) {
      return NextResponse.json(
        { error: 'No payment URL returned from Stripe' },
        { status: 500 }
      )
    }

    // Send email with Stripe payment link
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
  <title>Complete Your Payment</title>
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
                Complete Your Payment
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
                Your quote has been approved! Click the button below to complete your secure payment and get your project started.
              </p>

              <!-- Payment Summary Box -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="background-color: #eff6ff; padding: 25px; border-radius: 12px; border: 2px solid #93c5fd; text-align: center;">
                    <p style="color: #1e40af; margin: 0 0 10px 0; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">
                      Amount Due
                    </p>
                    <p style="color: #0C2340; margin: 0; font-size: 36px; font-weight: 700;">
                      ${formattedPrice}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="text-align: center; padding: 10px 0 30px 0;">
                    <a href="${stripeUrl}"
                       style="display: inline-block; background-color: #7c3aed; color: white; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                      Pay Now
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0; text-align: center;">
                You'll be redirected to our secure payment page powered by Stripe.
              </p>

              <!-- Security Notice -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="background-color: #f8fafc; padding: 15px; border-radius: 8px; text-align: center;">
                    <p style="color: #64748b; font-size: 13px; margin: 0;">
                      🔒 Secure payment processed by Stripe. Your payment information is never stored on our servers.
                    </p>
                  </td>
                </tr>
              </table>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

              <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0;">
                If you have any questions, please contact us at
                <a href="mailto:quotes@cethos.com" style="color: #0891B2; text-decoration: none;">quotes@cethos.com</a>
                or call <a href="tel:+15876000786" style="color: #0891B2; text-decoration: none;">(587) 600-0786</a>.
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
    sendSmtpEmail.subject = `Complete Your Payment - ${formattedPrice} | Cethos Solutions`
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

    return NextResponse.json({ success: true, stripeUrl })
  } catch (error: unknown) {
    const err = error as Error
    console.error('[Send Payment Email] Error:', err.message)
    return NextResponse.json(
      { error: 'Failed to send payment email', message: err.message },
      { status: 500 }
    )
  }
}
