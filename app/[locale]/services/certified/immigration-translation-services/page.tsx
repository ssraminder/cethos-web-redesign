import { Metadata } from 'next'
import ImmigrationTranslationContent from './ImmigrationTranslationContent'

export const metadata: Metadata = {
  title: 'Immigration Translation Services Calgary | IRCC Certified | From $65',
  description: "IRCC-accepted immigration translation for Express Entry, PNP, family sponsorship. Government of Alberta approved. Notarization included. From $65. Calgary's #1 rated service.",
  alternates: {
    canonical: 'https://cethos.com/services/certified/immigration-translation-services',
  },
  openGraph: {
    title: 'Immigration Translation Services Calgary | IRCC Certified | From $65',
    description: "IRCC-accepted immigration translation for Express Entry, PNP, family sponsorship. Government of Alberta approved. Notarization included. From $65. Calgary's #1 rated service.",
    url: 'https://cethos.com/services/certified/immigration-translation-services',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function ImmigrationTranslationPage() {
  return <ImmigrationTranslationContent />
}
