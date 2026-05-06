import { Metadata } from 'next'
import PrivacyContent from './PrivacyContent'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Cethos Solutions Inc. collects, uses, and protects your personal information. Read our comprehensive privacy policy.',
  keywords: ['privacy policy', 'data protection', 'PIPEDA', 'GDPR', 'personal information'],
  alternates: {
    canonical: 'https://cethos.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy',
    description: 'Learn how Cethos Solutions Inc. collects, uses, and protects your personal information.',
    url: 'https://cethos.com/privacy',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyContent />
}
