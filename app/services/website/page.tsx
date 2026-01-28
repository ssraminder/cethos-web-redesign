import { Metadata } from 'next'
import WebsiteLocalizationContent from './WebsiteLocalizationContent'

export const metadata: Metadata = {
  title: 'Website Localization Services | Multilingual SEO | Cethos',
  description: 'Professional website localization in 200+ languages. E-commerce, SaaS, and corporate website translation with SEO optimization. CMS integration included.',
  keywords: [
    'website localization',
    'website translation',
    'multilingual website',
    'international SEO',
    'e-commerce localization',
    'SaaS localization',
    'CMS translation',
    'hreflang implementation',
    'multilingual SEO',
    'website translation services',
  ],
  alternates: {
    canonical: 'https://cethos.com/services/website',
  },
  openGraph: {
    title: 'Website Localization Services | Cethos Solutions',
    description: 'Launch your website in new markets with culturally adapted, SEO-optimized translations.',
    url: 'https://cethos.com/services/website',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Localization Services | Cethos',
    description: 'Professional website localization in 200+ languages with SEO optimization.',
  },
}

export default function WebsiteLocalizationPage() {
  return <WebsiteLocalizationContent />
}
