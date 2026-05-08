'use client'

import { useEffect, useMemo, useState } from 'react'
import { Loader2, AlertCircle, ChevronLeft, ChevronRight, Globe, Clock, Video } from 'lucide-react'
import { trackConsultEvent, type ConsultPlacement } from '@/lib/tracking'
import { getAdTrackingPayload } from '@/lib/ad-tracking'

interface ApostilleNativePickerProps {
  fullName: string
  email: string
  phone: string
  documentTypes: string[]
  issuingProvinceLabel: string
  destinationCountry: string
  numDocuments: string
  needsNotarization: boolean
  needsTranslation: boolean
  additionalNotes: string
  placement: ConsultPlacement
  onBookingConfirmed: (uid: string, meetingUrl: string, startIso: string) => void
}

const DAY_WINDOW = 14
const MS_PER_DAY = 24 * 60 * 60 * 1000

function buildNotes(p: Pick<
  ApostilleNativePickerProps,
  'documentTypes' | 'issuingProvinceLabel' | 'destinationCountry' | 'numDocuments' | 'needsNotarization' | 'needsTranslation' | 'additionalNotes'
>) {
  const lines: string[] = []
  lines.push(`Document type(s): ${p.documentTypes.join(', ') || '—'}`)
  lines.push(`Issuing province / authority: ${p.issuingProvinceLabel || '—'}`)
  if (p.destinationCountry) lines.push(`Destination country: ${p.destinationCountry}`)
  if (p.numDocuments) lines.push(`Number of documents: ${p.numDocuments}`)
  if (p.needsNotarization) lines.push('Needs notarization before apostille: Yes')
  if (p.needsTranslation) lines.push('Also needs certified translation: Yes')
  if (p.additionalNotes) {
    lines.push('')
    lines.push('Their notes:')
    lines.push(p.additionalNotes)
  }
  return lines.join('\n')
}

function localTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Edmonton'
  } catch {
    return 'America/Edmonton'
  }
}

function ymd(d: Date): string {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function dayLabel(d: Date) {
  return {
    weekday: d.toLocaleDateString(undefined, { weekday: 'short' }),
    day: d.getDate(),
    month: d.toLocaleDateString(undefined, { month: 'short' }),
  }
}

export function ApostilleNativePicker(props: ApostilleNativePickerProps) {
  const [windowStart, setWindowStart] = useState<Date>(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  })
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [slotsByDay, setSlotsByDay] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submittingSlot, setSubmittingSlot] = useState<string | null>(null)

  const tz = useMemo(() => localTimezone(), [])

  const days = useMemo(() => {
    return Array.from({ length: DAY_WINDOW }, (_, i) => {
      const d = new Date(windowStart.getTime() + i * MS_PER_DAY)
      return d
    })
  }, [windowStart])

  // Fetch availability for the visible window.
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const start = new Date(windowStart)
    const end = new Date(windowStart.getTime() + DAY_WINDOW * MS_PER_DAY)

    const url =
      `/api/apostille-consult/slots?` +
      `start_time=${encodeURIComponent(start.toISOString())}` +
      `&end_time=${encodeURIComponent(end.toISOString())}` +
      `&time_zone=${encodeURIComponent(tz)}`

    fetch(url, { method: 'GET' })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        if (!data.ok) throw new Error(data.error || 'Failed to load availability')
        setSlotsByDay(data.slots_by_day || {})
        // Auto-select the first day with availability if nothing selected.
        const firstAvail = Object.entries(data.slots_by_day || {}).find(
          ([, list]) => Array.isArray(list) && (list as string[]).length > 0,
        )?.[0]
        if (firstAvail && !selectedDay) setSelectedDay(firstAvail)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err?.message || 'Could not load times. Please try again.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowStart, tz])

  const slotsForSelected = (selectedDay && slotsByDay[selectedDay]) || []

  function shiftWindow(deltaDays: number) {
    const d = new Date(windowStart.getTime() + deltaDays * MS_PER_DAY)
    if (deltaDays < 0) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (d < today) return
    }
    setWindowStart(d)
    setSelectedDay(null)
  }

  async function bookSlot(slotIso: string) {
    setSubmittingSlot(slotIso)
    setError(null)
    try {
      const adTracking = getAdTrackingPayload()
      const res = await fetch('/api/apostille-consult/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start: slotIso,
          name: props.fullName,
          email: props.email,
          phone: props.phone,
          notes: buildNotes(props),
          time_zone: tz,
          placement: props.placement,
          ad_tracking: adTracking,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        // 409 = slot got taken; refresh availability so the user can pick again.
        if (res.status === 409) {
          setError('That time was just taken — pick another.')
          // Trigger re-fetch by nudging windowStart reference.
          setWindowStart((d) => new Date(d.getTime()))
        } else {
          throw new Error(data.error || 'Booking failed. Please try again.')
        }
        return
      }
      trackConsultEvent('booking_completed', { placement: props.placement })
      props.onBookingConfirmed(data.uid, data.meeting_url, slotIso)
    } catch (err) {
      setError((err as Error).message || 'Booking failed. Please try again.')
    } finally {
      setSubmittingSlot(null)
    }
  }

  const todayIso = ymd(new Date())
  const canGoBack = ymd(windowStart) > todayIso

  return (
    <div>
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-[#0C2340] mb-1">Pick a Time That Works</h3>
        <p className="text-sm text-slate-600 inline-flex items-center gap-3 flex-wrap justify-center">
          <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 15-min call</span>
          <span className="inline-flex items-center gap-1"><Video className="w-3.5 h-3.5" /> Zoom</span>
          <span className="inline-flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {tz}</span>
        </p>
      </div>

      {/* Date strip */}
      <div className="relative">
        <button
          type="button"
          onClick={() => shiftWindow(-DAY_WINDOW)}
          disabled={!canGoBack}
          className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#0891B2] hover:text-[#0891B2] transition-colors"
          aria-label="Earlier dates"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => shiftWindow(DAY_WINDOW)}
          className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:border-[#0891B2] hover:text-[#0891B2] transition-colors"
          aria-label="Later dates"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <div className="overflow-x-auto px-7 pb-2 scrollbar-thin">
          <div className="flex gap-2 min-w-max">
            {days.map((d) => {
              const key = ymd(d)
              const has = (slotsByDay[key]?.length || 0) > 0
              const isSelected = selectedDay === key
              const labels = dayLabel(d)
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedDay(key)}
                  disabled={!has && !loading}
                  className={[
                    'flex flex-col items-center justify-center w-16 py-2 rounded-lg border transition-colors',
                    isSelected
                      ? 'border-[#0891B2] bg-[#E0F2FE] text-[#0C2340]'
                      : has
                      ? 'border-slate-200 hover:border-[#0891B2] text-[#0C2340]'
                      : 'border-slate-100 text-slate-300 cursor-not-allowed',
                  ].join(' ')}
                >
                  <span className="text-[10px] uppercase tracking-wide font-semibold">{labels.weekday}</span>
                  <span className="text-lg font-bold leading-none mt-1">{labels.day}</span>
                  <span className="text-[10px] uppercase mt-0.5">{labels.month}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Slots */}
      <div className="mt-4 min-h-[200px]">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-[#0891B2]" />
          </div>
        ) : error ? (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        ) : !selectedDay ? (
          <p className="text-center text-slate-500 py-8 text-sm">No availability in this range. Try the next two weeks →</p>
        ) : slotsForSelected.length === 0 ? (
          <p className="text-center text-slate-500 py-8 text-sm">No times available on this day. Pick another date.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {slotsForSelected.map((iso) => {
              const t = new Date(iso).toLocaleTimeString(undefined, {
                hour: 'numeric',
                minute: '2-digit',
                timeZone: tz,
              })
              const isSubmitting = submittingSlot === iso
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => bookSlot(iso)}
                  disabled={!!submittingSlot}
                  className={[
                    'px-3 py-2.5 rounded-lg border-2 text-sm font-semibold transition-colors',
                    isSubmitting
                      ? 'border-[#0891B2] bg-[#0891B2] text-white'
                      : 'border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white',
                    submittingSlot && !isSubmitting ? 'opacity-40 cursor-not-allowed' : '',
                  ].join(' ')}
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : t}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-slate-500 text-center">
        Booking on Cethos behalf of <strong>{props.email}</strong>. We&apos;ll email a Zoom link as soon as you pick a time.
      </p>
    </div>
  )
}

export default ApostilleNativePicker
