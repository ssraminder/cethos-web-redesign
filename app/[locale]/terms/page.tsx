import { Metadata } from 'next'
import TermsContent from './TermsContent'

export const metadata: Metadata = {
  title: 'Terms of Service | Cethos',
  description: 'Read the terms and conditions governing the use of Cethos Solutions Inc. translation and localization services.',
  keywords: ['terms of service', 'terms and conditions', 'translation agreement', 'service agreement'],
  alternates: {
    canonical: 'https://cethos.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | Cethos',
    description: 'Read the terms and conditions governing the use of Cethos Solutions Inc. translation and localization services.',
    url: 'https://cethos.com/terms',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function TermsOfServicePage() {
  return <TermsContent />
}
