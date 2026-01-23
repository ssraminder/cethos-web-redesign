import { Metadata } from 'next'
import ImmigrationPageContent from './ImmigrationPageContent'

export const metadata: Metadata = {
  title: 'Immigration Translation Services Calgary | IRCC Certified | Cethos',
  description: 'IRCC-certified immigration translations in Calgary. Birth certificates, marriage docs, diplomas for PR, citizenship, Express Entry. Same-day service. 100% acceptance guarantee.',
  keywords: ['immigration translation', 'IRCC translation', 'certified translation Calgary', 'PR translation', 'citizenship translation', 'Express Entry translation'],
  alternates: {
    canonical: 'https://cethos.com/immigration-translation-services',
  },
  openGraph: {
    title: 'Immigration Translation Services Calgary | IRCC Certified | Cethos',
    description: 'IRCC-certified immigration translations in Calgary. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/immigration-translation-services',
  },
}

export default function ImmigrationTranslationServicesPage() {
  return <ImmigrationPageContent />
}
