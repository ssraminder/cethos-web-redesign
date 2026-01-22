import { Metadata } from 'next'
import ServicesPageContent from './ServicesPageContent'

export const metadata: Metadata = {
  title: 'Translation Services | Cethos Solutions Inc.',
  description: 'Professional translation services including life sciences, certified, business, software localization, and multimedia translation in 200+ languages.',
  keywords: ['translation services', 'localization services', 'life sciences translation', 'certified translation', 'software localization', 'multimedia translation'],
  alternates: {
    canonical: 'https://cethos.com/services',
  },
  openGraph: {
    title: 'Translation Services | Cethos Solutions Inc.',
    description: 'Professional translation services in 200+ languages. Life sciences, certified, business, software, and multimedia translation.',
    url: 'https://cethos.com/services',
  },
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
