import { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'

export const metadata: Metadata = {
  title: 'About Us | Cethos Solutions Inc.',
  description: 'Founded in 2015, Cethos Solutions Inc. is a Calgary-based language services company specializing in linguistic validation, clinical translation, and life sciences. 200+ languages, global reach.',
  keywords: ['about cethos', 'translation company', 'language services provider', 'linguistic validation', 'clinical translation', 'Calgary translation'],
  alternates: {
    canonical: 'https://cethos.com/about',
  },
  openGraph: {
    title: 'About Us | Cethos Solutions Inc.',
    description: 'Founded in 2015, Cethos Solutions Inc. is a Calgary-based language services company specializing in linguistic validation, clinical translation, and life sciences.',
    url: 'https://cethos.com/about',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}
