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

export function trackConversion(conversionId: string, conversionLabel: string, value?: number) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'conversion', {
    send_to: `${conversionId}/${conversionLabel}`,
    value: value || 0,
    currency: 'CAD',
  })
}
