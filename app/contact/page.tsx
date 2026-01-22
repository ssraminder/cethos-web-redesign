import { Metadata } from 'next'
import ContactPageContent from './ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact Us | Cethos Solutions Inc.',
  description: 'Contact Cethos Solutions Inc. for professional translation services. Headquarters in Calgary, Canada with offices in Dubai and India. Call 587-600-0786 or email info@cethos.com.',
  keywords: ['contact cethos', 'translation services contact', 'language services', 'Calgary translation', 'get quote'],
  alternates: {
    canonical: 'https://cethos.com/contact',
  },
  openGraph: {
    title: 'Contact Us | Cethos Solutions Inc.',
    description: 'Contact Cethos Solutions Inc. for professional translation services. 24/7 support available.',
    url: 'https://cethos.com/contact',
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}
