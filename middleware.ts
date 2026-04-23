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

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request) as NextResponse

  // Capture click/attribution params from the query string. Only set the
  // cookie when a param is actually present (so we don't overwrite a valid
  // earlier click with a later unrelated visit).
  const sp = request.nextUrl.searchParams
  let anyClickId = false

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
    })
  }

  return response
}

export const config = {
  // Match all paths except: _next, embed, api, admin, static files
  matcher: ['/((?!_next|embed|api|admin|favicon|.*\\..*).*)'],
}
