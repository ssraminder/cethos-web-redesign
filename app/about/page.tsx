import { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'

export const metadata: Metadata = {
  title: 'About Us | Cethos Solutions Inc. - Global Translation Company',
  description: 'Cethos Solutions Inc. is a Canadian translation company with offices in Calgary, Dubai, and India. 200+ languages, 5,000+ linguists, ISO 17100 compliant. Specializing in life sciences, oil & gas, and certified translation.',
  keywords: ['translation company', 'about Cethos', 'translation services', 'ISO 17100 translation', 'life sciences translation', 'oil and gas translation', 'global translation company'],
  alternates: {
    canonical: 'https://cethos.com/about',
  },
  openGraph: {
    title: 'About Cethos Solutions Inc. | Global Translation Services',
    description: 'Canadian translation company with global operations. Offices in Calgary, Dubai, and India. 200+ languages. ISO 17100 compliant.',
    url: 'https://cethos.com/about',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}
