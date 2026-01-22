import { Metadata } from 'next'
import ContactPageContent from './ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact Us | Cethos Solutions Inc.',
  description: 'Contact Cethos Solutions Inc. for translation services. Offices in Calgary (HQ), Dubai, and India. Phone: 587-600-0786. Email: info@cethos.com. Response within 2 hours.',
  keywords: ['contact cethos', 'translation services contact', 'language services', 'Calgary translation', 'get quote'],
  alternates: {
    canonical: 'https://cethos.com/contact',
  },
  openGraph: {
    title: 'Contact Us | Cethos Solutions Inc.',
    description: 'Contact Cethos Solutions Inc. for translation services. Offices in Calgary, Dubai, and India.',
    url: 'https://cethos.com/contact',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}
