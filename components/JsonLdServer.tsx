// Server-only schema.org components for the root layout.
//
// These two functions emit large static schema payloads that are identical
// on every page. Keeping them in a server module means the JSON-LD bytes
// land in the SSR HTML once and never ship as part of the client JS bundle.
// (The matching client variants in JsonLd.tsx remain available for callers
// inside `'use client'` files.)

export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://cethos.com/#organization',
    name: 'Cethos Solutions Inc.',
    legalName: 'Cethos Solutions Inc.',
    url: 'https://cethos.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/final_logo_light_bg_cethosAsset%201.svg',
    },
    image:
      'https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/final_logo_light_bg_cethosAsset%201.svg',
    description:
      'Professional translation services in 200+ languages specializing in life sciences, linguistic validation, clinical trials, and certified translations.',
    foundingDate: '2015',
    founder: {
      '@type': 'Person',
      name: 'Raminder Shah',
      jobTitle: 'Founder & CEO',
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 18,
    },
    slogan: 'Global Communication. Local Precision.',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '421 7 Avenue SW, Floor 30',
        addressLocality: 'Calgary',
        addressRegion: 'AB',
        postalCode: 'T2P 4K9',
        addressCountry: 'CA',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Building A1, Dubai Digital Park, Dubai Silicon Oasis',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '158/3, Dharampura Bazaar',
        addressLocality: 'Patiala',
        addressRegion: 'Punjab',
        postalCode: '147001',
        addressCountry: 'IN',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-587-600-0786',
      contactType: 'customer service',
      email: 'info@cethos.com',
      availableLanguage: ['English', 'French', 'Spanish', 'Hindi', 'Punjabi', 'Arabic'],
    },
    sameAs: [
      'https://www.linkedin.com/company/cethos',
      'https://www.proz.com/business/51142',
    ],
    knowsAbout: [
      'Translation Services',
      'Linguistic Validation',
      'Clinical Trial Translation',
      'Certified Translation',
      'Life Sciences Translation',
      'Cognitive Debriefing',
      'Regulatory Translation',
      'Medical Device Translation',
      'Interpretation Services',
    ],
    areaServed: 'Worldwide',
    serviceType: [
      'Translation Services',
      'Interpretation Services',
      'Localization Services',
      'Linguistic Validation',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function WebSiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://cethos.com/#website',
    name: 'Cethos Solutions Inc.',
    url: 'https://cethos.com',
    description: 'Professional translation services in 200+ languages with precision and speed.',
    publisher: {
      '@id': 'https://cethos.com/#organization',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
