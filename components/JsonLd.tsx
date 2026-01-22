'use client'

export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cethos Solutions Inc.',
    url: 'https://cethos.com',
    logo: 'https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/final_logo_light_bg_cethosAsset%201.svg',
    description: 'Professional translation services in 200+ languages. Life sciences, certified, business, software localization, and multimedia translation with precision and speed.',
    foundingDate: '2015',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 18,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '421 7 Avenue SW, Floor 30',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      postalCode: 'T2P 4K9',
      addressCountry: 'CA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-587-600-0786',
      contactType: 'customer service',
      email: 'info@cethos.com',
      availableLanguage: ['English', 'French', 'Spanish', 'German', 'Chinese', 'Japanese', 'Arabic'],
    },
    sameAs: [
      'https://linkedin.com/company/cethos',
      'https://twitter.com/cethos',
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
    name: 'Cethos',
    url: 'https://cethos.com',
    description: 'Professional translation services in 200+ languages with precision and speed.',
    publisher: {
      '@type': 'Organization',
      name: 'Cethos Solutions Inc.',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://cethos.com/search?q={search_term_string}',
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
