import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

const CAL_INTEGRATIONS_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/cal-integrations`
    : 'https://lmzoyezvsjgsxveoakdr.supabase.co/functions/v1/cal-integrations'

const CAL_USERNAME = process.env.CAL_USERNAME || 'cethos'
const CAL_EVENT_SLUG = process.env.CAL_EVENT_SLUG || 'apostille-consult'

let cachedEventTypeId: number | null = null
let cachedEventTypeAt = 0
const EVENT_TYPE_TTL_MS = 5 * 60 * 1000

async function callCal(action: string, params: Record<string, unknown>) {
  const res = await fetch(CAL_INTEGRATIONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ action, params }),
    cache: 'no-store',
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const e = new Error(data?.error || `cal-integrations ${action} failed (${res.status})`)
    ;(e as any).status = res.status
    ;(e as any).body = data
    throw e
  }
  return data
}

async function resolveEventTypeId(): Promise<number> {
  if (cachedEventTypeId && Date.now() - cachedEventTypeAt < EVENT_TYPE_TTL_MS) {
    return cachedEventTypeId
  }
  const data = await callCal('get_event_type', {
    username: CAL_USERNAME,
    event_slug: CAL_EVENT_SLUG,
  })
  const id: number =
    data?.data?.eventType?.id ?? data?.data?.id ?? data?.eventType?.id ?? data?.id
  if (!id || typeof id !== 'number') {
    throw new Error(`Could not resolve event type id`)
  }
  cachedEventTypeId = id
  cachedEventTypeAt = Date.now()
  return id
}

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
    if (placement) metadata.utm_content = placement
    if (phone) metadata.phone = phone
    if (ad.gclid) metadata.gclid = ad.gclid
    if (ad.gbraid) metadata.gbraid = ad.gbraid
    if (ad.wbraid) metadata.wbraid = ad.wbraid

    const eventTypeId = await resolveEventTypeId()
    const data = await callCal('create_booking', {
      event_type_id: eventTypeId,
      start,
      name,
      email,
      phone,
      notes,
      metadata,
      time_zone: time_zone || 'America/Edmonton',
    })

    const booking = data?.data ?? data
    const uid: string = booking?.uid || booking?.bookingUid || ''
    const meetingUrl: string =
      (typeof booking?.location === 'string' && booking.location.startsWith('http') ? booking.location : '') ||
      booking?.metadata?.videoCallUrl ||
      booking?.videoCallData?.url ||
      ''

    return NextResponse.json({ ok: true, uid, meeting_url: meetingUrl, raw: booking })
  } catch (err) {
    const e = err as Error & { status?: number; body?: unknown }
    return NextResponse.json(
      { ok: false, error: e.message, detail: e.body },
      { status: e.status === 409 ? 409 : 500 },
    )
  }
}
