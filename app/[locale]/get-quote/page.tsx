import { Metadata } from 'next'
import GetQuotePageContent from './GetQuotePageContent'

export const metadata: Metadata = {
  title: 'Get a Free Quote | Cethos Solutions Inc.',
  description: 'Request a free translation quote from Cethos. Life sciences, certified, business, and software localization services in 200+ languages. Response within 2 hours.',
  keywords: ['translation quote', 'free quote', 'translation pricing', 'localization quote', 'language services quote'],
  alternates: {
    canonical: 'https://cethos.com/get-quote',
  },
  openGraph: {
    title: 'Get a Free Quote | Cethos Solutions Inc.',
    description: 'Request a free translation quote. Life sciences, certified, business, and software localization services.',
    url: 'https://cethos.com/get-quote',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function GetQuotePage() {
  return <GetQuotePageContent />
}
