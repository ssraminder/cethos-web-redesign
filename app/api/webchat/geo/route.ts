import { NextResponse, type NextRequest } from 'next/server'

// Visitor location for the website chat (Live visitors in Cethos Chat).
// cethos.com runs on Netlify, which adds `x-nf-geo` (base64 JSON) to every
// request. Display only — nothing security-relevant depends on it.

export const dynamic = 'force-dynamic'

export function GET(req: NextRequest) {
  let country = ''
  let region = ''
  let city = ''
  const raw = req.headers.get('x-nf-geo')
  if (raw) {
    try {
      const g = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'))
      country = g?.country?.name || g?.country?.code || ''
      region = g?.subdivision?.name || g?.subdivision?.code || ''
      city = g?.city || ''
    } catch {
      /* ignore malformed header */
    }
  }
  if (!country) country = req.headers.get('x-country') || ''
  return NextResponse.json(
    { country: country.slice(0, 80), region: region.slice(0, 80), city: city.slice(0, 80) },
    { headers: { 'Cache-Control': 'private, no-store' } },
  )
}
