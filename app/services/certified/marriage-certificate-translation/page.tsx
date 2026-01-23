import { Metadata } from 'next'
import MarriageCertificateContent from './MarriageCertificateContent'

export const metadata: Metadata = {
  title: 'Marriage Certificate Translation Calgary | IRCC Certified | Cethos',
  description: 'Certified marriage certificate translation for IRCC spousal sponsorship. Same-day service Calgary. Divorce decrees included. 100% acceptance guarantee. (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/marriage-certificate-translation',
  },
  openGraph: {
    title: 'Marriage Certificate Translation Calgary | IRCC Certified | Cethos',
    description: 'Certified marriage certificate translation for IRCC spousal sponsorship. Same-day service.',
    url: 'https://cethos.com/services/certified/marriage-certificate-translation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function MarriageCertificateTranslationPage() {
  return <MarriageCertificateContent />
}
