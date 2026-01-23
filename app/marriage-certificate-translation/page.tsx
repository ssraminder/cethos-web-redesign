import { Metadata } from 'next'
import MarriageCertificatePageContent from './MarriageCertificatePageContent'

export const metadata: Metadata = {
  title: 'Marriage Certificate Translation Calgary | Spousal Sponsorship | Cethos',
  description: 'Certified marriage & divorce certificate translations for IRCC. Spousal sponsorship ready. Same-day service Calgary. 100% acceptance guarantee. Call (587) 600-0786.',
  keywords: ['marriage certificate translation', 'divorce certificate translation', 'spousal sponsorship translation', 'IRCC marriage translation', 'Calgary marriage certificate translation'],
  alternates: {
    canonical: 'https://cethos.com/marriage-certificate-translation',
  },
  openGraph: {
    title: 'Marriage Certificate Translation Calgary | Spousal Sponsorship | Cethos',
    description: 'Certified marriage & divorce certificate translations for IRCC. Same-day service available.',
    url: 'https://cethos.com/marriage-certificate-translation',
  },
}

export default function MarriageCertificateTranslationPage() {
  return <MarriageCertificatePageContent />
}
