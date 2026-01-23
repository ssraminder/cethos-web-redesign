import { Metadata } from 'next'
import ServicesPageContent from './ServicesPageContent'

export const metadata: Metadata = {
  title: 'Translation Services | Cethos Solutions Inc.',
  description: 'Professional translation services in 200+ languages. Life sciences, linguistic validation, certified translation, business, software localization, multimedia, and interpretation services.',
  keywords: ['translation services', 'localization services', 'life sciences translation', 'linguistic validation', 'certified translation', 'software localization', 'multimedia translation', 'interpretation services'],
  alternates: {
    canonical: 'https://cethos.com/services',
  },
  openGraph: {
    title: 'Translation Services | Cethos Solutions Inc.',
    description: 'Professional translation services in 200+ languages. Life sciences, certified, business, software localization.',
    url: 'https://cethos.com/services',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
