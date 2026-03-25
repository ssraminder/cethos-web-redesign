declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export function trackQuoteSubmission(serviceType: string, formLocation: string) {
  if (typeof window === 'undefined') return

  // GTM dataLayer push
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'quote_submitted',
    service_type: serviceType,
    form_location: formLocation,
  })
}

export function trackGenerateLead(formType: 'quote' | 'contact', formLabel: string) {
  if (typeof window === 'undefined') return

  // Fire gtag generate_lead event for GA4 + Google Ads conversion tracking
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: formType === 'quote' ? 'Quote Form' : 'Contact Form',
      event_label: formLabel,
      value: 1,
      currency: 'USD',
    })
  }

  // Also push to dataLayer for GTM-based triggers
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'generate_lead',
    formType: formType === 'quote' ? 'quote_request' : 'contact_form',
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
