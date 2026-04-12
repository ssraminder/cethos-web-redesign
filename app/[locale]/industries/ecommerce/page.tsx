import { Metadata } from 'next'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import EcommercePageContent from './EcommercePageContent'

export const metadata: Metadata = {
  title: 'E-commerce Translation & Localization Services',
  description: 'E-commerce translation for product listings, descriptions, customer service & marketing. Amazon, Shopify, Magento integration. Multilingual SEO included.',
  keywords: ['ecommerce translation', 'product listing translation', 'amazon translation', 'shopify localization', 'ecommerce localization', 'multilingual ecommerce'],
  alternates: {
    canonical: 'https://cethos.com/industries/ecommerce',
  },
  openGraph: {
    title: 'E-commerce Translation & Localization | Cethos',
    description: 'E-commerce translation for product listings, customer service, and marketing with multilingual SEO.',
    url: 'https://cethos.com/industries/ecommerce',
  },
}

const faqs = [
  {
    question: 'Do you integrate with e-commerce platforms?',
    answer: 'Yes, we integrate with Shopify, Magento, WooCommerce, BigCommerce, Amazon, and other platforms. We can pull content directly from your store and push translations back automatically.',
  },
  {
    question: 'Do you optimize translations for multilingual SEO?',
    answer: 'Yes, our e-commerce translations include keyword research and SEO optimization for each target market. We ensure your products rank well in local search results.',
  },
  {
    question: 'Can you handle large product catalogs?',
    answer: 'Yes, we use translation memory and machine translation with human review to efficiently handle large catalogs. We maintain consistency across thousands of SKUs.',
  },
  {
    question: 'Do you translate customer reviews?',
    answer: 'Yes, we can translate customer reviews and user-generated content to build trust with international customers. We also translate customer service communications.',
  },
  {
    question: 'What about marketplace listings (Amazon, eBay)?',
    answer: 'We specialize in marketplace optimization, translating and localizing listings for Amazon, eBay, Etsy, and other marketplaces while following their specific guidelines.',
  },
]

export default function EcommercePage() {
  return (
    <>
      <ServiceJsonLd
        name="E-commerce Translation & Localization Services"
        description="E-commerce translation for product listings, customer service, and marketing with multilingual SEO."
        url="https://cethos.com/industries/ecommerce"
      />
      <FAQJsonLd faqs={faqs} />
      <EcommercePageContent />
    </>
  )
}
