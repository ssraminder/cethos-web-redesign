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
    throw new Error(data?.error || `cal-integrations ${action} failed (${res.status})`)
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
  // Cal.com v2 wraps the resource under data.data.id (or data.id legacy).
  const id: number =
    data?.data?.eventType?.id ?? data?.data?.id ?? data?.eventType?.id ?? data?.id
  if (!id || typeof id !== 'number') {
    throw new Error(`Could not resolve event type id from response: ${JSON.stringify(data).slice(0, 200)}`)
  }
  cachedEventTypeId = id
  cachedEventTypeAt = Date.now()
  return id
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const startTime = url.searchParams.get('start_time')
    const endTime = url.searchParams.get('end_time')
    const timeZone = url.searchParams.get('time_zone') || 'America/Edmonton'
    if (!startTime || !endTime) {
      return NextResponse.json({ error: 'start_time and end_time required' }, { status: 400 })
    }

    const eventTypeId = await resolveEventTypeId()
    const data = await callCal('list_event_slots', {
      event_type_id: eventTypeId,
      start_time: startTime,
      end_time: endTime,
      time_zone: timeZone,
    })

    // Normalize to a flat shape the client can iterate.
    // Cal.com returns { slots: { "2026-05-12": [{ time }, ...], ... } }
    const slotsByDay: Record<string, string[]> = {}
    const raw = data?.data?.slots ?? data?.slots ?? {}
    for (const [day, list] of Object.entries(raw as Record<string, Array<{ time: string }>>)) {
      slotsByDay[day] = (list || []).map((s) => s.time).filter(Boolean)
    }

    return NextResponse.json({ ok: true, event_type_id: eventTypeId, time_zone: timeZone, slots_by_day: slotsByDay })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 },
    )
  }
}
