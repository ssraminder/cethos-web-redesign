import { Metadata } from 'next'
import GetQuotePageContent from './GetQuotePageContent'
import LifeSciencesQuotePageContent from './LifeSciencesQuotePageContent'

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

interface GetQuotePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function GetQuotePage({ searchParams }: GetQuotePageProps) {
  const params = await searchParams
  const service = params.service

  if (service === 'life-sciences') {
    return <LifeSciencesQuotePageContent />
  }

  return <GetQuotePageContent />
}
