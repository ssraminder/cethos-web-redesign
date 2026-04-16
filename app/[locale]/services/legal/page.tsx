import { Metadata } from 'next'
import LegalPageContent from './LegalPageContent'

export const metadata: Metadata = {
  title: 'Legal Translation Services',
  description:
    'Certified legal translation services for contracts, court documents, patents, immigration documents, and regulatory filings. Precise, confidential, and certified.',
  alternates: {
    canonical: 'https://cethos.com/services/legal',
  },
  openGraph: {
    title: 'Legal Translation Services | Cethos',
    description:
      'Certified legal translation services for contracts, court documents, patents, immigration documents, and regulatory filings. Precise, confidential, and certified.',
    url: 'https://cethos.com/services/legal',
    siteName: 'Cethos Solutions Inc.',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function LegalTranslationPage() {
  return <LegalPageContent />
}
