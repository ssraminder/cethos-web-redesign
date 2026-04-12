import { Metadata } from 'next'
import WebsitePageContent from './WebsitePageContent'

export const metadata: Metadata = {
  title: 'Website Localization Services | Cethos Solutions Inc.',
  description:
    'Full website adaptation including content translation, SEO localization, and cultural optimization for global markets. Professional website localization in 200+ languages.',
  alternates: {
    canonical: 'https://cethos.com/services/website',
  },
  openGraph: {
    title: 'Website Localization Services | Cethos Solutions Inc.',
    description:
      'Full website adaptation including content translation, SEO localization, and cultural optimization for global markets. Professional website localization in 200+ languages.',
    url: 'https://cethos.com/services/website',
    siteName: 'Cethos Solutions Inc.',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function WebsiteLocalizationPage() {
  return <WebsitePageContent />
}
