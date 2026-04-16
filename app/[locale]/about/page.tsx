import { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'

export const metadata: Metadata = {
  title: 'About Us | Global Translation Company',
  description: 'Cethos Solutions Inc. is a Canadian translation company headquartered in Calgary with offices in Dubai and India. 200+ languages, 5,000+ linguists, ISO 17100 compliant. Specializing in life sciences, certified translations, and enterprise solutions.',
  keywords: ['translation company', 'about Cethos', 'translation services', 'ISO 17100 translation', 'life sciences translation', 'oil and gas translation', 'global translation company'],
  alternates: {
    canonical: 'https://cethos.com/about',
  },
  openGraph: {
    title: 'About Us | Global Translation Company | Cethos',
    description: 'Canadian translation company with global operations. Headquartered in Calgary with offices in Dubai and India. 200+ languages. ISO 17100 compliant.',
    url: 'https://cethos.com/about',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}
