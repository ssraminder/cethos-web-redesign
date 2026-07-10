import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

// Click identifiers and attribution params we capture from the URL on first
// touch. Stored in HTTP-only cookies so the server-side form handlers can
// read them when the user eventually submits a quote.
const CLICK_ID_PARAMS = ['gclid', 'gbraid', 'wbraid'] as const
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

const COOKIE_MAX_AGE_SECONDS = 90 * 24 * 60 * 60 // 90 days (matches default Google Ads click-through window)

// Cookie domain: the portal lives at portal.cethos.com and the vendor app at
// vendor.cethos.com, but the marketing site (and Google Ads landing pages)
// runs on cethos.com / www.cethos.com. Without an explicit domain attribute
// the cookies are scoped to the exact host and the portal cannot read them
// when the user clicks "Get Quote" — which is why orders.utm_* is null on
// nearly every May 2026 order despite the middleware capturing UTMs.
// Setting domain='.cethos.com' makes the cookies visible across subdomains.
// Localhost/preview hosts skip the domain attribute (browsers reject it).
function cookieDomain(request: NextRequest): string | undefined {
  const host = request.nextUrl.hostname.toLowerCase()
  if (host === 'cethos.com' || host.endsWith('.cethos.com')) {
    return '.cethos.com'
  }
  return undefined
}

// Research-page language variants (/research/th etc.) are standalone pages,
// not site locales — they must never carry a locale prefix. Keep the language
// list in sync with PANEL_PAGE_LANGS in app/[locale]/research/panelLocales.ts.
const RESEARCH_LANG_PATH = /^\/research\/(th|ja|pl|de|cs|it)$/
const PREFIXED_RESEARCH_LANG_PATH = /^\/(?:en|fr)(\/research\/(?:th|ja|pl|de|cs|it))$/

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  let response: NextResponse
  const prefixed = pathname.match(PREFIXED_RESEARCH_LANG_PATH)
  if (prefixed) {
    // A NEXT_LOCALE=fr cookie (or French Accept-Language) makes next-intl
    // redirect /research/ja -> /fr/research/ja; send those back.
    const url = request.nextUrl.clone()
    url.pathname = prefixed[1]
    response = NextResponse.redirect(url, 308)
  } else if (RESEARCH_LANG_PATH.test(pathname)) {
    // Serve under the default locale directly, bypassing next-intl's locale
    // detection so fr-cookie visitors aren't bounced to the /fr prefix.
    response = NextResponse.rewrite(new URL(`/en${pathname}`, request.url))
  } else {
    response = intlMiddleware(request) as NextResponse
  }

  // Capture click/attribution params from the query string. Only set the
  // cookie when a param is actually present (so we don't overwrite a valid
  // earlier click with a later unrelated visit).
  const sp = request.nextUrl.searchParams
  let anyClickId = false
  const domain = cookieDomain(request)

  for (const name of CLICK_ID_PARAMS) {
    const value = sp.get(name)
    if (value) {
      response.cookies.set(name, value, {
        maxAge: COOKIE_MAX_AGE_SECONDS,
        // Not httpOnly — the quote form runs in the browser and reads these
        // values via document.cookie when building the insert payload.
        httpOnly: false,
        secure: true,
        sameSite: 'lax',
        path: '/',
        ...(domain ? { domain } : {}),
      })
      anyClickId = true
    }
  }

  for (const name of UTM_PARAMS) {
    const value = sp.get(name)
    if (value) {
      response.cookies.set(name, value, {
        maxAge: COOKIE_MAX_AGE_SECONDS,
        // Not httpOnly — the quote form runs in the browser and reads these
        // values via document.cookie when building the insert payload.
        httpOnly: false,
        secure: true,
        sameSite: 'lax',
        path: '/',
        ...(domain ? { domain } : {}),
      })
    }
  }

  // Record the click timestamp alongside a click id so we can populate
  // quotes.ad_click_time when the lead is eventually created.
  if (anyClickId) {
    response.cookies.set('ad_click_time', new Date().toISOString(), {
      maxAge: COOKIE_MAX_AGE_SECONDS,
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
      path: '/',
      ...(domain ? { domain } : {}),
    })
  }

  return response
}

export const config = {
  // Match all paths except: _next, embed, api, admin, ingest (PostHog proxy), static files
  matcher: ['/((?!_next|embed|api|admin|ingest|favicon|.*\\..*).*)'],
}
