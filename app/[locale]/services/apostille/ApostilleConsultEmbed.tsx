'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { CheckCircle, Loader2 } from 'lucide-react'
import { trackConsultEvent, type ConsultPlacement } from '@/lib/tracking'
import { getAdTrackingPayload } from '@/lib/ad-tracking'

interface ApostilleConsultEmbedProps {
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
  onBookingToQuoteClick?: () => void
}

const FALLBACK_CAL_LINK = 'cethos/apostille-consult'

function buildNotes(p: Omit<ApostilleConsultEmbedProps, 'placement' | 'onBookingToQuoteClick'>) {
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

export function ApostilleConsultEmbed(props: ApostilleConsultEmbedProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const widgetOpenedTrackedRef = useRef(false)

  const calLink = process.env.NEXT_PUBLIC_CAL_LINK || FALLBACK_CAL_LINK

  const iframeUrl = useMemo(() => {
    const utmContent = props.placement
    const ad = typeof window !== 'undefined' ? getAdTrackingPayload() : null
    const params = new URLSearchParams({
      embed: 'true',
      embedType: 'inline',
      layout: 'month_view',
      name: props.fullName,
      email: props.email,
      smsReminderNumber: props.phone,
      notes: buildNotes(props),
      utm_source: 'cethos',
      utm_medium: 'apostille_page',
      utm_campaign: 'free_consult',
      utm_content: utmContent,
      // Cal.com forwards `metadata[*]` to the webhook payload's metadata field
      // so the cal-integrations function can attribute the booking.
      'metadata[phone]': props.phone,
      'metadata[utm_source]': 'cethos',
      'metadata[utm_medium]': 'apostille_page',
      'metadata[utm_campaign]': 'free_consult',
      'metadata[utm_content]': utmContent,
      'metadata[lead_type]': 'apostille_consult',
    })
    if (ad?.gclid) params.append('metadata[gclid]', ad.gclid)
    if (ad?.gbraid) params.append('metadata[gbraid]', ad.gbraid)
    if (ad?.wbraid) params.append('metadata[wbraid]', ad.wbraid)
    return `https://cal.com/${calLink}?${params.toString()}`
  }, [calLink, props])

  useEffect(() => {
    if (!widgetOpenedTrackedRef.current) {
      trackConsultEvent('booking_widget_opened', { placement: props.placement })
      widgetOpenedTrackedRef.current = true
    }

    function onMessage(e: MessageEvent) {
      if (typeof e.data !== 'object' || e.data === null) return
      const evt = (e.data as any).type || (e.data as any).action || ''
      if (
        evt === 'booking_successful' ||
        evt === 'bookingSuccessful' ||
        evt === 'booking-successful' ||
        evt === '__bookingSuccessful'
      ) {
        if (!bookingConfirmed) {
          setBookingConfirmed(true)
          trackConsultEvent('booking_completed', { placement: props.placement })
        }
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [props.placement, bookingConfirmed])

  if (bookingConfirmed) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-[#0C2340] mb-2">Booked!</h3>
        <p className="text-slate-600 mb-6">
          Check your email for the Zoom link and confirmation. We&apos;ll see you on the call.
        </p>
        <div className="bg-[#E0F2FE] rounded-lg p-4 text-sm text-slate-700 mb-4">
          <p className="font-medium text-[#0C2340] mb-1">While you wait —</p>
          <p>start your apostille quote so we can have a price ready when we talk.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            trackConsultEvent('booking_to_quote_clicked', { placement: props.placement })
            props.onBookingToQuoteClick?.()
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold transition-colors"
        >
          Start My Apostille Quote →
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-[#0C2340] mb-1">Pick a Time That Works</h3>
        <p className="text-sm text-slate-600">
          15-min call · Mon–Fri, 9–5 Mountain Time · we&apos;ll email a Zoom link.
        </p>
      </div>
      <div className="relative w-full" style={{ minHeight: 620 }}>
        {!iframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 rounded-lg">
            <Loader2 className="w-6 h-6 animate-spin text-[#0891B2]" />
          </div>
        )}
        <iframe
          title="Cethos Free Apostille Consultation Booking"
          src={iframeUrl}
          className="w-full rounded-lg border border-slate-200"
          style={{ minHeight: 620, height: 620 }}
          onLoad={() => setIframeLoaded(true)}
          allow="camera; microphone; fullscreen; payment"
        />
      </div>
      <p className="mt-3 text-xs text-slate-500 text-center">
        We&apos;ve pre-filled your name, email, phone, and the case details you just entered.
      </p>
    </div>
  )
}

export default ApostilleConsultEmbed
