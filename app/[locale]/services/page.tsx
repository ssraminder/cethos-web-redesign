import { Metadata } from 'next'
import ServicesPageContent from './ServicesPageContent'

export const metadata: Metadata = {
  title: 'Professional Translation Services | 200+ Languages | Cethos',
  description: 'Life sciences, certified, website, software, and legal translation services in 200+ languages. ISO 17100 compliant. Same-day available.',
  keywords: ['translation services', 'localization services', 'life sciences translation', 'linguistic validation', 'certified translation', 'software localization', 'interpretation services', 'transcription services'],
  alternates: {
    canonical: 'https://cethos.com/services',
  },
  openGraph: {
    title: 'Professional Translation Services | Cethos Solutions',
    description: 'From life sciences to website localization, we deliver accurate translations in 200+ languages.',
    url: 'https://cethos.com/services',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
