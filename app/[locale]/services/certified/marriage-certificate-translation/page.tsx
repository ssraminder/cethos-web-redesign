import { Metadata } from 'next'
import MarriageCertificateContent from './MarriageCertificateContent'

export const metadata: Metadata = {
  title: 'Marriage Certificate Translation Calgary | IRCC Accepted | From $65',
  description: 'Certified marriage certificate translation for spousal sponsorship and IRCC applications. Notarization included. 95+ languages. From $65. Fast turnaround in Calgary.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/marriage-certificate-translation',
  },
  openGraph: {
    title: 'Marriage Certificate Translation Calgary | IRCC Accepted | From $65',
    description: 'Certified marriage certificate translation for spousal sponsorship and IRCC applications. Notarization included. 95+ languages. From $65. Fast turnaround in Calgary.',
    url: 'https://cethos.com/services/certified/marriage-certificate-translation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function MarriageCertificateTranslationPage() {
  return <MarriageCertificateContent />
}
