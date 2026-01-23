'use client'

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
    image: 'https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/final_logo_light_bg_cethosAsset%201.svg',
    description: 'Professional translation services in 200+ languages specializing in life sciences, linguistic validation, clinical trials, and certified translations.',
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
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://cethos.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function LocalBusinessJsonLd() {
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
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface FAQItem {
  question: string
  answer: string
}

interface FAQJsonLdProps {
  faqs: FAQItem[]
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface ServiceJsonLdProps {
  name: string
  description: string
  url: string
}

export function ServiceJsonLd({ name, description, url }: ServiceJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: 'Cethos Solutions Inc.',
      url: 'https://cethos.com',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface ArticleJsonLdProps {
  title: string
  description: string
  date: string
  author: string
  url: string
}

export function ArticleJsonLd({ title, description, date, author, url }: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cethos Solutions Inc.',
      url: 'https://cethos.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
