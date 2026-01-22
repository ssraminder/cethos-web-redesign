import { Metadata } from 'next'
import GetQuotePageContent from './GetQuotePageContent'

export const metadata: Metadata = {
  title: 'Get a Free Quote | Cethos Solutions Inc.',
  description: 'Request a free translation quote from Cethos Solutions Inc. Get a detailed quote within 2 hours for professional translation services in 200+ languages.',
  keywords: ['translation quote', 'free quote', 'translation pricing', 'localization quote', 'language services quote'],
  alternates: {
    canonical: 'https://cethos.com/get-quote',
  },
  openGraph: {
    title: 'Get a Free Quote | Cethos Solutions Inc.',
    description: 'Request a free translation quote. Get a detailed quote within 2 hours for 200+ languages.',
    url: 'https://cethos.com/get-quote',
  },
}

export default function GetQuotePage() {
  return <GetQuotePageContent />
}
