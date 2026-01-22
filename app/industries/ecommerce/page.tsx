import { Metadata } from 'next'
import Link from 'next/link'
import { ShoppingCart, Search, Globe, Users, CheckCircle, ArrowRight, TrendingUp, Clock } from 'lucide-react'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

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

const challenges = [
  {
    title: 'Product Catalog Scale',
    description: 'Efficiently translate thousands of product listings while maintaining consistency and quality.',
  },
  {
    title: 'Multilingual SEO',
    description: 'Optimize product content for local search engines to maximize organic visibility in each market.',
  },
  {
    title: 'Customer Experience',
    description: 'Provide seamless shopping experiences with localized checkout, support, and communications.',
  },
  {
    title: 'Platform Integration',
    description: 'Connect with your e-commerce platform for streamlined content management and updates.',
  },
]

const services = [
  'Product Listings & Descriptions',
  'Category & Navigation Content',
  'Customer Reviews Translation',
  'Email Marketing Campaigns',
  'Customer Support Content',
  'Return & Shipping Policies',
  'Store & App Localization',
  'Multilingual SEO Optimization',
]

const stats = [
  { value: '100+', label: 'E-commerce Clients' },
  { value: '5M+', label: 'Products Translated' },
  { value: '40%', label: 'Avg. Sales Increase' },
  { value: '50+', label: 'Languages' },
]

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

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
                E-COMMERCE & RETAIL
              </div>
              <h1 className="text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6">
                E-commerce Localization Services
              </h1>
              <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
                Expand your online store globally with localized product content,
                multilingual SEO, and seamless platform integrations. Trusted by
                100+ e-commerce brands worldwide.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <Link href="/get-quote" className="px-6 py-4 bg-[#0891B2] text-white rounded-lg hover:bg-[#06B6D4] transition-colors text-base font-semibold flex items-center gap-2">
                  Get a Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="px-6 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg hover:bg-[#F8FAFC] transition-colors text-base font-semibold">
                  Contact Us
                </Link>
              </div>
              {/* Platform Badges */}
              <div className="flex items-center gap-6 text-sm text-[#4B5563]">
                <span className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#0891B2]" />
                  Shopify
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#0891B2]" />
                  Amazon
                </span>
                <span className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#0891B2]" />
                  SEO Included
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[400px] h-[400px] bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 rounded-2xl flex items-center justify-center">
                <ShoppingCart className="w-32 h-32 text-[#0891B2]" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0C2340] py-12">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              E-commerce Localization Challenges We Solve
            </h2>
            <p className="text-lg text-[#4B5563] max-w-[600px] mx-auto">
              We understand the fast-moving world of e-commerce
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-[#F8FAFC] rounded-lg p-8">
                <h3 className="text-xl font-semibold text-[#0C2340] mb-3">
                  {challenge.title}
                </h3>
                <p className="text-base text-[#4B5563] leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[40px] font-bold text-[#0C2340] mb-6">
                E-commerce Content We Translate
              </h2>
              <p className="text-lg text-[#4B5563] mb-8">
                Complete e-commerce localization services to help you
                sell more in international markets.
              </p>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#0891B2] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#4B5563]">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-[#0C2340] mb-6">
                Why Choose Cethos for E-commerce
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">E-commerce Specialists</div>
                    <div className="text-sm text-[#4B5563]">Translators with retail and marketing experience</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">SEO Optimization</div>
                    <div className="text-sm text-[#4B5563]">Local keyword research included</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Fast Turnaround</div>
                    <div className="text-sm text-[#4B5563]">Launch in new markets quickly</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24">
        <div className="max-w-[800px] mx-auto px-8">
          <h2 className="text-[40px] font-bold text-[#0C2340] text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#E5E7EB] pb-6">
                <h3 className="text-lg font-semibold text-[#0C2340] mb-3">
                  {faq.question}
                </h3>
                <p className="text-base text-[#4B5563] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0C2340] via-[#1A365D] to-[#0891B2] py-24">
        <div className="max-w-[800px] mx-auto px-8 text-center">
          <h2 className="text-[40px] font-bold text-white mb-4">
            Ready to Sell Globally?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Get a free quote for your e-commerce localization project
          </p>
          <Link href="/get-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0C2340] rounded-lg hover:bg-gray-100 transition-colors text-base font-semibold">
            Get Your Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
