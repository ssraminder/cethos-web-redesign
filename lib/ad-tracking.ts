/**
 * Reads Google Ads click identifiers and UTM params from cookies set by the
 * middleware on first touch. Used when submitting a quote so the lead record
 * captures which ad click (if any) produced the lead — the upstream input to
 * Offline Conversion Import.
 *
 * All fields are nullable and safe to include verbatim in a Supabase insert;
 * the column defaults are NULL.
 */

export interface AdTrackingPayload {
  gclid: string | null
  gbraid: string | null
  wbraid: string | null
  ad_click_time: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
}

const COOKIE_NAMES = [
  'gclid',
  'gbraid',
  'wbraid',
  'ad_click_time',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[-.+*]/g, '\\$&') + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

export function getAdTrackingPayload(): AdTrackingPayload {
  const payload: AdTrackingPayload = {
    gclid: readCookie('gclid'),
    gbraid: readCookie('gbraid'),
    wbraid: readCookie('wbraid'),
    ad_click_time: readCookie('ad_click_time'),
    utm_source: readCookie('utm_source'),
    utm_medium: readCookie('utm_medium'),
    utm_campaign: readCookie('utm_campaign'),
    utm_content: readCookie('utm_content'),
    utm_term: readCookie('utm_term'),
  }

  // Honour ?gclid=... params present right now in case the middleware hasn't
  // run yet on this session (e.g. client-side nav). URL wins over cookie
  // since it's fresher.
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href)
    const urlOverride = (key: keyof AdTrackingPayload) => {
      if (key === 'ad_click_time') return
      const v = url.searchParams.get(key)
      if (v) payload[key] = v
    }
    urlOverride('gclid')
    urlOverride('gbraid')
    urlOverride('wbraid')
    urlOverride('utm_source')
    urlOverride('utm_medium')
    urlOverride('utm_campaign')
    urlOverride('utm_content')
    urlOverride('utm_term')
    if (url.searchParams.has('gclid') || url.searchParams.has('gbraid') || url.searchParams.has('wbraid')) {
      payload.ad_click_time = payload.ad_click_time || new Date().toISOString()
    }
  }

  return payload
}
