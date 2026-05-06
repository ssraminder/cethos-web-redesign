import { Metadata } from 'next'
import LanguagesPageContent from './LanguagesPageContent'

export const metadata: Metadata = {
  title: 'Translation Services by Language | 200+ Languages',
  description: 'Certified translation services in 200+ languages across Canada. Arabic, French, Hindi, Mandarin, Punjabi, Spanish, and more. IRCC accepted. Same-day service available.',
  alternates: {
    canonical: 'https://cethos.com/services/languages',
  },
  openGraph: {
    title: 'Translation Services by Language | 200+ Languages',
    description: 'Certified translation in 200+ languages. IRCC accepted. Same-day service available.',
    url: 'https://cethos.com/services/languages',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function LanguagesPage() {
  return <LanguagesPageContent />
}
