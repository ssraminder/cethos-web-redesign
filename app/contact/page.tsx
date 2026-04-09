import { Metadata } from 'next'
import ContactPageContent from './ContactPageContent'
import { LocalBusinessJsonLd } from '@/components/JsonLd'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Contact Us | Cethos Solutions Inc.',
  description: 'Contact Cethos Solutions for professional translation services. Offices in Canada, Dubai, and India. Call (587) 600-0786 or email info@cethos.com.',
  keywords: ['contact cethos', 'translation services contact', 'language services', 'translation company Canada', 'get quote'],
  alternates: {
    canonical: 'https://cethos.com/contact',
  },
  openGraph: {
    title: 'Contact Us | Cethos Solutions Inc.',
    description: 'Contact Cethos Solutions Inc. for translation services. Offices in Canada, Dubai, and India.',
    url: 'https://cethos.com/contact',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <>
      <LocalBusinessJsonLd location="calgary" />
      <LocalBusinessJsonLd location="dubai" />
      <LocalBusinessJsonLd location="india" />
      <BreadcrumbJsonLd items={[
        { name: 'Contact', url: 'https://cethos.com/contact' },
      ]} />
      <ContactPageContent />
    </>
  )
}
