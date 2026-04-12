import { Metadata } from 'next'
import EdmontonTranslationContent from './EdmontonTranslationContent'

export const metadata: Metadata = {
  title: 'Edmonton Translation Services | IRCC Certified | Remote Service | Cethos',
  description: 'IRCC-certified translation services for Edmonton. Upload documents online, receive certified translations by email or courier. Same-day available. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/edmonton-translation-agency',
  },
  openGraph: {
    title: 'Edmonton Translation Services | IRCC Certified | Cethos',
    description: 'IRCC-certified translation services for Edmonton. Upload online, receive by email or courier.',
    url: 'https://cethos.com/services/certified/edmonton-translation-agency',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function EdmontonTranslationPage() {
  return <EdmontonTranslationContent />
}
