import { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'

export const metadata: Metadata = {
  title: 'About Us | Cethos Solutions Inc.',
  description: 'Learn about Cethos Solutions Inc., a global translation company founded in 2015. We provide professional translation services in 200+ languages with 5,000+ expert linguists.',
  keywords: ['about cethos', 'translation company', 'language services provider', 'professional translators', 'global translation'],
  alternates: {
    canonical: 'https://cethos.com/about',
  },
  openGraph: {
    title: 'About Us | Cethos Solutions Inc.',
    description: 'Learn about Cethos Solutions Inc., a global translation company providing professional translation services in 200+ languages.',
    url: 'https://cethos.com/about',
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}
