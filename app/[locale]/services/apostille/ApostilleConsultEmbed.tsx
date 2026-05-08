'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle, Video, Upload, X } from 'lucide-react'
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
  /**
   * Reserved escape hatch — currently unused in the consult-only redesign,
   * but keeping the prop so the form can remount the picker if needed.
   */
  onBookingToQuoteClick?: () => void
}

export function ApostilleConsultEmbed(props: ApostilleConsultEmbedProps) {
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<
    { uid: string; meetingUrl: string; startIso: string } | null
  >(null)
  const widgetOpenedTrackedRef = useRef(false)

  useEffect(() => {
    if (!widgetOpenedTrackedRef.current) {
      trackConsultEvent('booking_widget_opened', { placement: props.placement })
      widgetOpenedTrackedRef.current = true
    }
  }, [props.placement])

  if (bookingConfirmed && bookingDetails) {
    const startDate = new Date(bookingDetails.startIso)
    const localTime = startDate.toLocaleString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    })
    const cancelUrl = `https://cal.com/booking/${bookingDetails.uid}?cancel=true`
    const uploadUrl =
      `/secure-upload?context=apostille-consult` +
      `&uid=${encodeURIComponent(bookingDetails.uid)}` +
      `&email=${encodeURIComponent(props.email)}` +
      `&name=${encodeURIComponent(props.fullName)}`

    return (
      <div className="py-2">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-[#0C2340] mb-1">You&apos;re booked!</h3>
          <p className="text-slate-600">
            <strong className="text-[#0C2340]">{localTime}</strong>
          </p>
        </div>

        <div className="bg-slate-50 rounded-lg p-4 mb-5 text-sm text-slate-700">
          <p>
            We&apos;ve emailed you a calendar invite with the Zoom link, plus a secure upload link so you can send your documents before the call.
          </p>
        </div>

        <div className="space-y-3 mb-5">
          {bookingDetails.meetingUrl && (
            <a
              href={bookingDetails.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white border-2 border-[#0891B2] text-[#0891B2] hover:bg-[#E0F2FE] font-semibold transition-colors"
            >
              <Video className="w-5 h-5" /> Open Zoom meeting
            </a>
          )}
          <a
            href={uploadUrl}
            onClick={() =>
              trackConsultEvent('booking_to_quote_clicked', {
                placement: props.placement,
                action: 'upload_documents',
              })
            }
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold transition-colors"
          >
            <Upload className="w-5 h-5" /> Upload My Documents Securely
          </a>
        </div>

        <div className="bg-[#E0F2FE] border border-[#0891B2]/20 rounded-lg p-4 mb-4">
          <p className="font-semibold text-[#0C2340] mb-2 text-sm">Make the call count</p>
          <p className="text-sm text-slate-700 mb-2">Before we talk, have ready:</p>
          <ul className="text-sm text-slate-700 space-y-1 pl-5 list-disc">
            <li>A clear photo or scan of every document you want apostilled</li>
            <li>The destination country (and what they&apos;re asking for, if you know)</li>
            <li>Any deadline you&apos;re working against</li>
          </ul>
        </div>

        <div className="text-center text-xs text-slate-500 space-y-1">
          <p>
            Need to cancel?{' '}
            <a
              href={cancelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-[#0891B2] underline-offset-2 hover:underline"
            >
              <X className="w-3 h-3" /> Cancel booking
            </a>
          </p>
          <p>
            To respect everyone&apos;s calendar, this consultation can only be cancelled — not rescheduled.
          </p>
        </div>
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
