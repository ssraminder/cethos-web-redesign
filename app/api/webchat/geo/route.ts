import { NextResponse, type NextRequest } from 'next/server'

// Visitor location for the website chat (Live visitors in Cethos Chat).
// cethos.com is served by Vercel, which adds x-vercel-ip-country / -city /
// -country-region to every request (city is URL-encoded). Netlify's
// x-nf-geo is kept as a fallback. Display only — nothing security-relevant
// depends on it.

export const dynamic = 'force-dynamic'

const regionNames = (() => {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' })
  } catch {
    return null
  }
})()

function decode(v: string | null): string {
  if (!v) return ''
  try {
    return decodeURIComponent(v)
  } catch {
    return v
  }
}

export function GET(req: NextRequest) {
  const code = req.headers.get('x-vercel-ip-country') || ''
  let country = code ? regionNames?.of(code.toUpperCase()) || code : ''
  let region = decode(req.headers.get('x-vercel-ip-country-region'))
  let city = decode(req.headers.get('x-vercel-ip-city'))

  const raw = req.headers.get('x-nf-geo')
  if (!country && raw) {
    try {
      const g = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'))
      country = g?.country?.name || g?.country?.code || ''
      region = g?.subdivision?.name || g?.subdivision?.code || ''
      city = g?.city || ''
    } catch {
      /* ignore malformed header */
    }
  }
  return NextResponse.json(
    { country: country.slice(0, 80), region: region.slice(0, 80), city: city.slice(0, 80) },
    { headers: { 'Cache-Control': 'private, no-store' } },
  )
}
