import { Metadata } from 'next'
import WebsiteLocalizationContent from './WebsiteLocalizationContent'

export const metadata: Metadata = {
  title: 'Website Localization Services | Multilingual SEO | Cethos',
  description: 'Professional website localization in 200+ languages. E-commerce, SaaS, and corporate website translation with SEO optimization. CMS integration included.',
  keywords: ['website localization', 'website translation', 'multilingual SEO', 'e-commerce localization', 'SaaS localization', 'CMS integration', 'hreflang', 'international SEO'],
  alternates: {
    canonical: 'https://cethos.com/services/website',
  },
  openGraph: {
    title: 'Website Localization Services | Cethos Solutions',
    description: 'Launch your website in new markets with culturally adapted, SEO-optimized translations.',
    url: 'https://cethos.com/services/website',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function WebsiteLocalizationPage() {
  return <WebsiteLocalizationContent />
}
