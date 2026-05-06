import { Metadata } from 'next'
import CookiesContent from './CookiesContent'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn about how Cethos Solutions Inc. uses cookies and similar tracking technologies on our website.',
  keywords: ['cookie policy', 'cookies', 'tracking', 'privacy', 'website cookies'],
  alternates: {
    canonical: 'https://cethos.com/cookies',
  },
  openGraph: {
    title: 'Cookie Policy',
    description: 'Learn about how Cethos Solutions Inc. uses cookies and similar tracking technologies on our website.',
    url: 'https://cethos.com/cookies',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function CookiePolicyPage() {
  return <CookiesContent />
}
