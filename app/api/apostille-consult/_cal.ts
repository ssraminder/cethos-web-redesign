/**
 * Server-side Cal.com REST client used by the apostille consult API routes.
 *
 * The previous implementation went through the cal-integrations Supabase
 * edge function, but that requires the Next.js runtime to authenticate with
 * the project's service-role key — and any drift between Netlify's env and
 * Supabase's auto-injected secret silently breaks the picker. Calling
 * Cal.com directly removes the cross-system key sync entirely.
 *
 * The cal-integrations function is still the authority for the inbound
 * webhook (Cal.com → us), where we attribute leads, fire GA4 events, queue
 * Google Ads OCI rows, and send the Cethos-branded confirmation email.
 *
 * Required env (Netlify):
 *   - CAL_API_KEY (from Cal.com Settings → Developer → API Keys)
 *   - CAL_USERNAME (default: "cethos")
 *   - CAL_EVENT_SLUG (default: "apostille-consult")
 */

const CAL_API_BASE = process.env.CAL_API_BASE || 'https://api.cal.com/v2'
const CAL_API_VERSION = process.env.CAL_API_VERSION || '2024-08-13'

export const CAL_USERNAME = process.env.CAL_USERNAME || 'cethos'
export const CAL_EVENT_SLUG = process.env.CAL_EVENT_SLUG || 'apostille-consult'

export class CalApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown,
  ) {
    super(message)
    this.name = 'CalApiError'
  }
}

async function calFetch<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const apiKey = process.env.CAL_API_KEY
  if (!apiKey) {
    throw new CalApiError('CAL_API_KEY is not set', 500)
  }

  const res = await fetch(`${CAL_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'cal-api-version': CAL_API_VERSION,
      ...((init.headers as Record<string, string>) || {}),
    },
    cache: 'no-store',
  })

  const text = await res.text()
  let body: unknown = text
  try {
    body = text ? JSON.parse(text) : {}
  } catch {
    // leave body as raw text on parse failure
  }

  if (!res.ok) {
    const message =
      (body as { error?: string; message?: string })?.error ||
      (body as { error?: string; message?: string })?.message ||
      `Cal.com ${path} failed (${res.status})`
    throw new CalApiError(message, res.status, body)
  }
  return body as T
}

let cachedEventTypeId: number | null = null
let cachedEventTypeAt = 0
const EVENT_TYPE_TTL_MS = 5 * 60 * 1000

interface EventTypeResponse {
  data?: { eventType?: { id?: number }; id?: number }
  eventType?: { id?: number }
  id?: number
}

export async function resolveEventTypeId(): Promise<number> {
  if (cachedEventTypeId && Date.now() - cachedEventTypeAt < EVENT_TYPE_TTL_MS) {
    return cachedEventTypeId
  }
  const data = await calFetch<EventTypeResponse>(
    `/event-types/${encodeURIComponent(CAL_USERNAME)}/${encodeURIComponent(CAL_EVENT_SLUG)}`,
  )
  const id =
    data?.data?.eventType?.id ?? data?.data?.id ?? data?.eventType?.id ?? data?.id
  if (typeof id !== 'number') {
    throw new CalApiError(
      'Could not resolve Cal.com event type id',
      500,
      data,
    )
  }
  cachedEventTypeId = id
  cachedEventTypeAt = Date.now()
  return id
}

interface SlotsResponse {
  data?: { slots?: Record<string, Array<{ time: string }>> }
  slots?: Record<string, Array<{ time: string }>>
}

export async function listSlots(opts: {
  startTime: string
  endTime: string
  timeZone: string
}): Promise<{ slotsByDay: Record<string, string[]>; eventTypeId: number }> {
  const eventTypeId = await resolveEventTypeId()
  const qs = new URLSearchParams({
    eventTypeId: String(eventTypeId),
    startTime: opts.startTime,
    endTime: opts.endTime,
    timeZone: opts.timeZone,
  })
  const data = await calFetch<SlotsResponse>(`/slots/available?${qs.toString()}`)
  const raw = data?.data?.slots ?? data?.slots ?? {}
  const slotsByDay: Record<string, string[]> = {}
  for (const [day, list] of Object.entries(raw)) {
    slotsByDay[day] = (list || []).map((s) => s.time).filter(Boolean)
  }
  return { slotsByDay, eventTypeId }
}

interface BookingResponse {
  data?: {
    uid?: string
    bookingUid?: string
    location?: string
    metadata?: { videoCallUrl?: string }
    videoCallData?: { url?: string }
  }
  uid?: string
  bookingUid?: string
  location?: string
  metadata?: { videoCallUrl?: string }
  videoCallData?: { url?: string }
}

export async function createBooking(opts: {
  start: string
  name: string
  email: string
  phone?: string
  notes?: string
  timeZone: string
  metadata: Record<string, string>
}): Promise<{ uid: string; meetingUrl: string; raw: unknown }> {
  const eventTypeId = await resolveEventTypeId()
  const body: Record<string, unknown> = {
    start: opts.start,
    eventTypeId,
    attendee: {
      name: opts.name,
      email: opts.email,
      timeZone: opts.timeZone,
      ...(opts.phone ? { phoneNumber: opts.phone } : {}),
    },
    metadata: opts.metadata,
  }
  if (opts.notes) body.bookingFieldsResponses = { notes: opts.notes }

  const data = await calFetch<BookingResponse>(`/bookings`, {
    method: 'POST',
    body: JSON.stringify(body),
  })

  const booking = data?.data ?? data
  const uid = booking?.uid || booking?.bookingUid || ''
  const meetingUrl =
    (typeof booking?.location === 'string' && booking.location.startsWith('http')
      ? booking.location
      : '') ||
    booking?.metadata?.videoCallUrl ||
    booking?.videoCallData?.url ||
    ''

  return { uid, meetingUrl, raw: booking }
}
