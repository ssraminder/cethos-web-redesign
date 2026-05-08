/**
 * Server-side Cal.com REST client used by the apostille consult API routes.
 *
 * Calls Cal.com v2 API directly (no cal-integrations hop). cal-integrations
 * still owns the inbound webhook side.
 *
 * Cal.com v2 endpoint quirks discovered during E2E:
 *   - Event types list:  GET /v2/event-types?username={username}
 *                        cal-api-version: 2024-06-14
 *                        returns { data: [{ id, slug, ... }] }
 *                        (the path-style /event-types/{username}/{slug} 404s)
 *   - Slots:             GET /v2/slots?eventTypeId=X&start=YYYY-MM-DD&end=YYYY-MM-DD&timeZone=...
 *                        cal-api-version: 2024-09-04
 *                        returns { data: { "YYYY-MM-DD": [{ start: ISO }, ...] } }
 *                        (NOT /slots/available, NOT startTime/endTime params)
 *   - Bookings:          POST /v2/bookings
 *                        cal-api-version: 2024-08-13
 *                        body: { start, eventTypeId, attendee: {name,email,timeZone,phoneNumber}, metadata, bookingFieldsResponses }
 *
 * Required env (Netlify):
 *   - CAL_API_KEY (from Cal.com Settings → Developer → API Keys)
 *   - CAL_USERNAME (default: "cethos")
 *   - CAL_EVENT_SLUG (default: "apostille-consult")
 */

const CAL_API_BASE = process.env.CAL_API_BASE || 'https://api.cal.com/v2'

export const CAL_USERNAME = process.env.CAL_USERNAME || 'cethos'
export const CAL_EVENT_SLUG = process.env.CAL_EVENT_SLUG || 'apostille-consult'

const VERSION_EVENT_TYPES = '2024-06-14'
const VERSION_SLOTS = '2024-09-04'
const VERSION_BOOKINGS = '2024-08-13'

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

function extractMessage(body: unknown, fallback: string): string {
  if (!body) return fallback
  if (typeof body === 'string') return body
  if (typeof body === 'object') {
    const b = body as Record<string, unknown>
    if (typeof b.message === 'string') return b.message
    if (typeof b.error === 'string') return b.error
    if (b.error && typeof b.error === 'object') {
      const e = b.error as Record<string, unknown>
      if (typeof e.message === 'string') return e.message
      if (typeof e.code === 'string') return e.code
    }
  }
  return fallback
}

async function calFetch<T = unknown>(
  path: string,
  apiVersion: string,
  init: RequestInit = {},
): Promise<T> {
  const apiKey = process.env.CAL_API_KEY
  if (!apiKey) throw new CalApiError('CAL_API_KEY is not set', 500)

  const res = await fetch(`${CAL_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'cal-api-version': apiVersion,
      ...((init.headers as Record<string, string>) || {}),
    },
    cache: 'no-store',
  })

  const text = await res.text()
  let body: unknown = text
  try {
    body = text ? JSON.parse(text) : {}
  } catch {
    // leave body as raw text
  }

  if (!res.ok) {
    const message = extractMessage(body, `Cal.com ${path} failed (${res.status})`)
    throw new CalApiError(message, res.status, body)
  }
  return body as T
}

let cachedEventTypeId: number | null = null
let cachedEventTypeAt = 0
const EVENT_TYPE_TTL_MS = 5 * 60 * 1000

interface EventTypeRow {
  id?: number
  slug?: string
  title?: string
}

interface EventTypesListResponse {
  status?: string
  data?: EventTypeRow[]
}

export async function resolveEventTypeId(): Promise<number> {
  if (cachedEventTypeId && Date.now() - cachedEventTypeAt < EVENT_TYPE_TTL_MS) {
    return cachedEventTypeId
  }
  const data = await calFetch<EventTypesListResponse>(
    `/event-types?username=${encodeURIComponent(CAL_USERNAME)}`,
    VERSION_EVENT_TYPES,
  )
  const list = Array.isArray(data?.data) ? data.data : []
  const match = list.find((row) => row?.slug === CAL_EVENT_SLUG)
  if (!match || typeof match.id !== 'number') {
    throw new CalApiError(
      `Cal.com event type with slug "${CAL_EVENT_SLUG}" not found for username "${CAL_USERNAME}"`,
      404,
      { tried: CAL_EVENT_SLUG, available_slugs: list.map((r) => r?.slug).filter(Boolean) },
    )
  }
  cachedEventTypeId = match.id
  cachedEventTypeAt = Date.now()
  return match.id
}

interface SlotsResponse {
  status?: string
  data?: Record<string, Array<{ start?: string; time?: string }>>
}

export async function listSlots(opts: {
  startTime: string
  endTime: string
  timeZone: string
}): Promise<{ slotsByDay: Record<string, string[]>; eventTypeId: number }> {
  const eventTypeId = await resolveEventTypeId()
  // Cal.com v2 /slots wants YYYY-MM-DD for start/end (not full ISO).
  const startDate = opts.startTime.slice(0, 10)
  const endDate = opts.endTime.slice(0, 10)
  const qs = new URLSearchParams({
    eventTypeId: String(eventTypeId),
    start: startDate,
    end: endDate,
    timeZone: opts.timeZone,
  })
  const data = await calFetch<SlotsResponse>(`/slots?${qs.toString()}`, VERSION_SLOTS)
  const raw = data?.data ?? {}
  const slotsByDay: Record<string, string[]> = {}
  for (const [day, list] of Object.entries(raw)) {
    slotsByDay[day] = (list || [])
      .map((s) => s.start || s.time || '')
      .filter(Boolean)
  }
  return { slotsByDay, eventTypeId }
}

interface BookingResponse {
  status?: string
  data?: {
    uid?: string
    bookingUid?: string
    location?: string
    metadata?: { videoCallUrl?: string }
    videoCallData?: { url?: string }
    meetingUrl?: string
  }
}

/**
 * Normalize a phone string to E.164. Handles Canadian/US 10-digit numbers
 * (prefixes +1) and strips formatting from already-E.164 inputs.
 *
 * Cal.com rejects bookings with `responses - {smsReminderNumber} invalid_number`
 * when the phone isn't E.164; this is the single fix point.
 */
function toE164(raw: string | undefined): string | null {
  if (!raw) return null
  const trimmed = raw.trim()
  if (trimmed.startsWith('+')) {
    const digits = trimmed.slice(1).replace(/\D/g, '')
    return digits.length >= 8 ? `+${digits}` : null
  }
  const digits = trimmed.replace(/\D/g, '')
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  return null
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
  const phoneE164 = toE164(opts.phone)

  const body: Record<string, unknown> = {
    start: opts.start,
    eventTypeId,
    attendee: {
      name: opts.name,
      email: opts.email,
      timeZone: opts.timeZone,
      ...(phoneE164 ? { phoneNumber: phoneE164 } : {}),
    },
    metadata: opts.metadata,
  }
  // bookingFieldsResponses must satisfy any required booking fields on the
  // event (notes + smsReminderNumber when SMS workflows are active).
  // Only include smsReminderNumber if we have a valid E.164 — empty/invalid
  // values would re-trigger the "responses - {smsReminderNumber} invalid_number"
  // rejection that motivated this normalization.
  const responses: Record<string, string> = {}
  if (opts.notes) responses.notes = opts.notes
  if (phoneE164) responses.smsReminderNumber = phoneE164
  if (Object.keys(responses).length > 0) body.bookingFieldsResponses = responses

  const data = await calFetch<BookingResponse>(`/bookings`, VERSION_BOOKINGS, {
    method: 'POST',
    body: JSON.stringify(body),
  })

  const booking = data?.data ?? {}
  const uid = booking.uid || booking.bookingUid || ''
  const meetingUrl =
    (typeof booking.location === 'string' && booking.location.startsWith('http')
      ? booking.location
      : '') ||
    booking.meetingUrl ||
    booking.metadata?.videoCallUrl ||
    booking.videoCallData?.url ||
    ''

  return { uid, meetingUrl, raw: booking }
}
