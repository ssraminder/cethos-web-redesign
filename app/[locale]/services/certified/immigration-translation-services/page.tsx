import { Metadata } from 'next'
import ImmigrationTranslationContent from './ImmigrationTranslationContent'

export const metadata: Metadata = {
  title: 'Immigration Translation Services Canada | IRCC Certified | Cethos',
  description: 'IRCC-certified immigration translations across Canada. Birth certificates, marriage docs, diplomas for PR, citizenship, Express Entry. Same-day service. 100% acceptance guarantee.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/immigration-translation-services',
  },
  openGraph: {
    title: 'Immigration Translation Services Canada | IRCC Certified | Cethos',
    description: 'IRCC-certified immigration translations across Canada. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/immigration-translation-services',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function ImmigrationTranslationPage() {
  return <ImmigrationTranslationContent />
}
