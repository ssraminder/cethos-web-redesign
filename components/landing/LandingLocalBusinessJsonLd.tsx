'use client'

interface LandingLocalBusinessJsonLdProps {
  areaServed?: string[]
}

export function LandingLocalBusinessJsonLd({ areaServed = ['Calgary', 'Edmonton', 'Alberta'] }: LandingLocalBusinessJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cethos.com/#localbusiness',
    name: 'Cethos Solutions Inc.',
    image: 'https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/final_logo_light_bg_cethosAsset%201.svg',
    telephone: '+1-587-600-0786',
    email: 'info@cethos.com',
    url: 'https://cethos.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '421 7 Avenue SW, Floor 30',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      postalCode: 'T2P 4K9',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.0447,
      longitude: -114.0719,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    priceRange: '$$',
    areaServed,
    serviceType: 'Translation Services',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
