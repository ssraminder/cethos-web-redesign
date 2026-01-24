// Netlify Edge Function for geolocation-based location display
// Types are defined inline to avoid build-time dependencies

interface GeoInput {
  country: string
  region: string
  city: string
}

interface LocationConfig {
  locations: string[]
  defaultOpen: string
}

interface NetlifyGeo {
  country?: { code?: string }
  subdivision?: { code?: string }
  city?: string
}

interface NetlifyContext {
  geo?: NetlifyGeo
  next: () => Promise<Response>
}

function getLocationsToShow(geo: GeoInput): LocationConfig {
  const { country, region, city } = geo
  const cityLower = (city || '').toLowerCase()

  // Canada
  if (country === 'CA') {
    // Edmonton area
    const edmontonArea = [
      'edmonton', 'sherwood park', 'st. albert', 'st albert',
      'spruce grove', 'leduc', 'fort saskatchewan', 'beaumont', 'devon'
    ]
    if (edmontonArea.some(c => cityLower.includes(c))) {
      return { locations: ['edmonton', 'calgary'], defaultOpen: 'edmonton' }
    }

    // Ontario
    if (region === 'ON') {
      return { locations: ['toronto', 'calgary'], defaultOpen: 'toronto' }
    }

    // Rest of Canada (including Calgary area)
    return { locations: ['calgary'], defaultOpen: 'calgary' }
  }

  // India
  if (country === 'IN') {
    return { locations: ['india', 'uae'], defaultOpen: 'india' }
  }

  // Europe, Middle East, Asia, Africa → UAE
  const showUAE = [
    // Middle East
    'AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'JO', 'LB', 'IQ', 'SY', 'YE', 'PS', 'IL', 'IR',
    // Europe
    'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'CH', 'AT', 'SE', 'NO', 'DK', 'FI',
    'PL', 'CZ', 'PT', 'GR', 'IE', 'RO', 'HU', 'UA', 'RU', 'TR', 'BY', 'RS', 'HR',
    'BG', 'SK', 'SI', 'LT', 'LV', 'EE',
    // Asia (excluding India)
    'CN', 'JP', 'KR', 'SG', 'MY', 'TH', 'VN', 'PH', 'ID', 'PK', 'BD', 'LK', 'NP',
    'MM', 'KH', 'HK', 'TW', 'MN',
    // Africa
    'ZA', 'EG', 'NG', 'KE', 'MA', 'TN', 'GH', 'ET', 'TZ', 'UG', 'DZ', 'SD'
  ]

  if (showUAE.includes(country)) {
    return { locations: ['uae'], defaultOpen: 'uae' }
  }

  // USA and Americas → Calgary
  const americas = ['US', 'MX', 'BR', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'DO', 'CR', 'PA', 'JM']
  if (americas.includes(country)) {
    return { locations: ['calgary'], defaultOpen: 'calgary' }
  }

  // Default: Calgary
  return { locations: ['calgary'], defaultOpen: 'calgary' }
}

export default async (request: Request, context: NetlifyContext) => {
  const response = await context.next()
  const contentType = response.headers.get('content-type') || ''

  // Only process HTML responses
  if (!contentType.includes('text/html')) {
    return response
  }

  const html = await response.text()

  // Get geolocation from Netlify context
  const geo = {
    country: context.geo?.country?.code || 'CA',
    region: context.geo?.subdivision?.code || '',
    city: context.geo?.city || '',
  }

  // Determine which locations to show
  const locationsConfig = getLocationsToShow(geo)

  // Inject config into HTML
  const script = `<script>window.__CETHOS_GEO__ = ${JSON.stringify({
    ...locationsConfig,
    detected: geo
  })}</script>`

  const modifiedHtml = html.replace('</head>', `${script}</head>`)

  return new Response(modifiedHtml, {
    headers: response.headers,
  })
}

import type { Config } from "@netlify/edge-functions"

export const config: Config = {
  path: "/*",
  excludedPath: ["/api/*", "/_next/*", "/favicon.ico", "*.svg", "*.png", "*.jpg", "*.css", "*.js"]
}
