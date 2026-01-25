import { Metadata } from 'next'
import InterpretationPageContent from './InterpretationPageContent'

export const metadata: Metadata = {
  title: 'Interpretation Services | On-Site, OPI, VRI | 200+ Languages | Cethos',
  description: 'Professional interpretation services in 200+ languages. On-site, over-the-phone (OPI), and video remote interpretation (VRI) available 24/7. HIPAA compliant medical, certified legal, and conference interpreters.',
  keywords: [
    'interpretation services',
    'simultaneous interpretation',
    'consecutive interpretation',
    'over-the-phone interpretation',
    'OPI services',
    'video remote interpretation',
    'VRI services',
    'medical interpretation',
    'legal interpretation',
    'court interpreters',
    'conference interpretation',
    'ASL interpreters',
    'sign language interpretation',
    'HIPAA compliant interpretation',
    '24/7 interpretation',
    'remote interpretation',
    'on-site interpreters',
  ],
  alternates: {
    canonical: 'https://cethos.com/services/interpretation',
  },
  openGraph: {
    title: 'Professional Interpretation Services | 200+ Languages | Cethos',
    description: 'Connect with certified interpreters in 200+ languages. On-site, OPI, and VRI interpretation available 24/7. HIPAA compliant with <60 second connection times.',
    url: 'https://cethos.com/services/interpretation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
    images: [
      {
        url: 'https://cethos.com/og-interpretation-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Cethos Interpretation Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Interpretation Services | 200+ Languages',
    description: 'On-site, OPI, and VRI interpretation in 200+ languages. 24/7 availability with certified medical, legal, and conference interpreters.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// JSON-LD structured data for the service
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Professional Interpretation Services',
  description: 'Professional interpretation services in 200+ languages including simultaneous, consecutive, over-the-phone (OPI), and video remote interpretation (VRI). Available 24/7 with certified interpreters for medical, legal, business, and conference settings.',
  provider: {
    '@type': 'Organization',
    name: 'Cethos Solutions Inc.',
    url: 'https://cethos.com',
    logo: 'https://cethos.com/logo.svg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1616 17 Ave SW',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      postalCode: 'T2T 0E3',
      addressCountry: 'CA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-587-600-0786',
      contactType: 'customer service',
      availableLanguage: ['English', 'French', 'Spanish'],
    },
  },
  serviceType: [
    'On-Site Interpretation',
    'Over-the-Phone Interpretation (OPI)',
    'Video Remote Interpretation (VRI)',
    'Simultaneous Interpretation',
    'Consecutive Interpretation',
    'Conference Interpretation',
    'Medical Interpretation',
    'Legal Interpretation',
    'Court Interpretation',
    'ASL Interpretation',
  ],
  areaServed: {
    '@type': 'Country',
    name: ['United States', 'Canada', 'United Kingdom', 'Australia'],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Interpretation Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'On-Site Interpretation',
          description: 'Professional interpreters at your location for meetings, events, and appointments',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Over-the-Phone Interpretation (OPI)',
          description: '24/7 phone-based interpretation in 200+ languages with under 60 second connection',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Video Remote Interpretation (VRI)',
          description: 'Video-based interpretation for sign language, telehealth, and virtual meetings',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Conference Interpretation',
          description: 'Simultaneous interpretation with equipment for large events and conferences',
        },
      },
    ],
  },
  url: 'https://cethos.com/services/interpretation',
}

export default function InterpretationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InterpretationPageContent />
    </>
  )
}
