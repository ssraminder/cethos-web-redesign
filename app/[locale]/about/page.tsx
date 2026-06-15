import { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'

export const metadata: Metadata = {
  title: 'About Us | Cethos Solutions Inc. - Global Translation Company',
  description: 'Cethos Solutions Inc. is a Canadian translation company headquartered in Calgary with offices in Dubai and India. 200+ languages, 5,000+ linguists, rigorous multi-step quality process. Specializing in life sciences, certified translations, and enterprise solutions.',
  keywords: ['translation company', 'about Cethos', 'translation services', 'certified translation company', 'life sciences translation', 'oil and gas translation', 'global translation company'],
  alternates: {
    canonical: 'https://cethos.com/about',
  },
  openGraph: {
    title: 'About Cethos Solutions Inc. | Global Translation Services',
    description: 'Canadian translation company with global operations. Headquartered in Calgary with offices in Dubai and India. 200+ languages. Rigorous multi-step quality process.',
    url: 'https://cethos.com/about',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}
