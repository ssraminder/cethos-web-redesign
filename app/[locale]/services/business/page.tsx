import { Metadata } from 'next'
import BusinessPageContent from './BusinessPageContent'

export const metadata: Metadata = {
  title: 'Business Translation Services | Cethos Solutions Inc.',
  description:
    'Professional business translation services in 200+ languages. Annual reports, marketing materials, corporate communications, and more. ISO 17100 compliant.',
  alternates: {
    canonical: 'https://cethos.com/services/business',
  },
  openGraph: {
    title: 'Business Translation Services | Cethos Solutions Inc.',
    description:
      'Professional business translation services in 200+ languages. Annual reports, marketing materials, corporate communications, and more. ISO 17100 compliant.',
    url: 'https://cethos.com/services/business',
    siteName: 'Cethos Solutions Inc.',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function BusinessTranslationPage() {
  return <BusinessPageContent />
}
