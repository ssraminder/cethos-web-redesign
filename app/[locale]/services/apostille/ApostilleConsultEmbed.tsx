'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { trackConsultEvent, type ConsultPlacement } from '@/lib/tracking'
import { ApostilleNativePicker } from './ApostilleNativePicker'

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

export function ApostilleConsultEmbed(props: ApostilleConsultEmbedProps) {
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<{ uid: string; meetingUrl: string; startIso: string } | null>(null)
  const widgetOpenedTrackedRef = useRef(false)

  useEffect(() => {
    if (!widgetOpenedTrackedRef.current) {
      trackConsultEvent('booking_widget_opened', { placement: props.placement })
      widgetOpenedTrackedRef.current = true
    }
  }, [props.placement])

  if (bookingConfirmed && bookingDetails) {
    const localTime = new Date(bookingDetails.startIso).toLocaleString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-[#0C2340] mb-2">Booked!</h3>
        <p className="text-slate-600 mb-2">
          You&apos;re booked for <strong>{localTime}</strong>.
        </p>
        <p className="text-slate-600 mb-6">
          Check your email — we&apos;ve sent a Zoom link plus a secure upload link so you can send your documents before the call.
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
    <ApostilleNativePicker
      fullName={props.fullName}
      email={props.email}
      phone={props.phone}
      documentTypes={props.documentTypes}
      issuingProvinceLabel={props.issuingProvinceLabel}
      destinationCountry={props.destinationCountry}
      numDocuments={props.numDocuments}
      needsNotarization={props.needsNotarization}
      needsTranslation={props.needsTranslation}
      additionalNotes={props.additionalNotes}
      placement={props.placement}
      onBookingConfirmed={(uid, meetingUrl, startIso) => {
        setBookingDetails({ uid, meetingUrl, startIso })
        setBookingConfirmed(true)
      }}
    />
  )
}

export default ApostilleConsultEmbed
