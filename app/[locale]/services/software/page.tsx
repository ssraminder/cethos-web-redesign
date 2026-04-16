import { Metadata } from 'next'
import SoftwarePageContent from './SoftwarePageContent'

export const metadata: Metadata = {
  title: 'Software Localization Services',
  description:
    'Expert software localization services. Adapt your apps, websites, and digital products for global markets. UI/UX localization, documentation, and QA testing.',
  alternates: {
    canonical: 'https://cethos.com/services/software',
  },
  openGraph: {
    title: 'Software Localization Services | Cethos',
    description:
      'Expert software localization services. Adapt your apps, websites, and digital products for global markets. UI/UX localization, documentation, and QA testing.',
    url: 'https://cethos.com/services/software',
    siteName: 'Cethos Solutions Inc.',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function SoftwareLocalizationPage() {
  return <SoftwarePageContent />
}
