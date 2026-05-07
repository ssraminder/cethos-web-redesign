declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

// Per-lead-type estimated values (CAD) used as the gtag `value` for
// generate_lead events. Apostille consult is top-of-funnel so it's worth less
// than a quote-form lead. Override in Google Ads conversion-action settings if
// you prefer fixed values there instead.
const LEAD_VALUES_CAD: Record<string, number> = {
  apostille_quote: 50,
  apostille_consult: 20,
  default_quote: 25,
  default_contact: 5,
}

export function trackGenerateLead(formType: 'quote' | 'contact', formLabel: string, leadKey?: keyof typeof LEAD_VALUES_CAD) {
  if (typeof window === 'undefined') return

  const resolvedKey: keyof typeof LEAD_VALUES_CAD =
    leadKey ?? (formType === 'quote' ? 'default_quote' : 'default_contact')
  const value = LEAD_VALUES_CAD[resolvedKey] ?? 1

  // Fire gtag generate_lead event for GA4 + Google Ads conversion tracking
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: formType === 'quote' ? 'Quote Form' : 'Contact Form',
      event_label: formLabel,
      lead_type: resolvedKey,
      value,
      currency: 'CAD',
    })
  }

  // Also push to dataLayer for GTM-based triggers
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'generate_lead',
    formType: formType === 'quote' ? 'quote_request' : 'contact_form',
    leadType: resolvedKey,
    leadValue: value,
    formPage: window.location.pathname,
    formLabel: formLabel,
  })
}

export function trackConversion(conversionId: string, conversionLabel: string, value?: number) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'conversion', {
    send_to: `${conversionId}/${conversionLabel}`,
    value: value || 0,
    currency: 'CAD',
  })
}

export type ConsultPlacement = 'hero' | 'section' | 'sticky' | 'exit_intent' | 'form_toggle'

export function trackConsultEvent(
  event:
    | 'free_consult_cta_clicked'
    | 'booking_widget_opened'
    | 'booking_completed'
    | 'booking_to_quote_clicked',
  params: Record<string, string | number | undefined> = {}
) {
  if (typeof window === 'undefined') return

  if (window.gtag) {
    window.gtag('event', event, {
      event_category: 'Apostille Consultation',
      ...params,
    })
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}
