import { NextResponse } from 'next/server'
import { CalApiError, createBooking } from '../_cal'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const { start, name, email, phone, notes, time_zone, placement, ad_tracking } = body

    if (!start || !name || !email) {
      return NextResponse.json(
        { ok: false, error: 'start, name, email required' },
        { status: 400 },
      )
    }

    const ad = ad_tracking || {}
    const metadata: Record<string, string> = {
      lead_type: 'apostille_consult',
      utm_source: 'cethos',
      utm_medium: 'apostille_page',
      utm_campaign: 'free_consult',
    }
    if (placement) metadata.utm_content = String(placement)
    if (phone) metadata.phone = String(phone)
    if (ad.gclid) metadata.gclid = String(ad.gclid)
    if (ad.gbraid) metadata.gbraid = String(ad.gbraid)
    if (ad.wbraid) metadata.wbraid = String(ad.wbraid)

    const { uid, meetingUrl, raw } = await createBooking({
      start,
      name,
      email,
      phone,
      notes,
      timeZone: time_zone || 'America/Edmonton',
      metadata,
    })

    return NextResponse.json({ ok: true, uid, meeting_url: meetingUrl, raw })
  } catch (err) {
    if (err instanceof CalApiError) {
      // 409 = slot already taken — surface as-is so the picker can refresh.
      return NextResponse.json(
        { ok: false, error: err.message, detail: err.body },
        { status: err.status === 409 ? 409 : err.status >= 400 && err.status < 500 ? err.status : 500 },
      )
    }
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 },
    )
  }
}
