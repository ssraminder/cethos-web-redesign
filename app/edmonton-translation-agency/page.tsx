import { Metadata } from 'next'
import EdmontonPageContent from './EdmontonPageContent'

export const metadata: Metadata = {
  title: 'Edmonton Translation Services | IRCC Certified | Remote Service | Cethos',
  description: 'IRCC-certified translation services for Edmonton. Upload documents online, receive certified translations by email or courier. Same-day available. Call (587) 600-0786.',
  keywords: ['Edmonton translation services', 'Edmonton certified translation', 'IRCC translation Edmonton', 'remote translation services', 'document translation Edmonton'],
  alternates: {
    canonical: 'https://cethos.com/edmonton-translation-agency',
  },
  openGraph: {
    title: 'Edmonton Translation Services | IRCC Certified | Remote Service | Cethos',
    description: 'IRCC-certified translation services for Edmonton. Same-day available.',
    url: 'https://cethos.com/edmonton-translation-agency',
  },
}

export default function EdmontonTranslationServicesPage() {
  return <EdmontonPageContent />
}
