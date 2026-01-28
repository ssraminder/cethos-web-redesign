'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle,
  Globe,
  ShoppingCart,
  Building2,
  Laptop,
  Megaphone,
  FileText,
  Smartphone,
  Search,
  Settings,
  Palette,
  ClipboardCheck,
  Plane,
  Stethoscope,
  Wallet,
  Factory,
  TrendingUp,
  Award,
  Shield,
  Users,
  Zap,
} from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import { StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { WebsiteQuoteForm } from '@/components/forms/WebsiteQuoteForm'

// What We Localize Data
const whatWeLocalize = [
  {
    icon: ShoppingCart,
    title: 'E-commerce Websites',
    description: 'Product descriptions, checkout flows, payment pages, and customer reviews.',
  },
  {
    icon: Building2,
    title: 'Corporate Websites',
    description: 'Company info, investor relations, press releases, and leadership bios.',
  },
  {
    icon: Laptop,
    title: 'SaaS Platforms',
    description: 'UI strings, help documentation, onboarding flows, and error messages.',
  },
  {
    icon: Megaphone,
    title: 'Marketing Landing Pages',
    description: 'Campaign pages, lead capture forms, CTAs, and promotional content.',
  },
  {
    icon: FileText,
    title: 'Blogs & Content Sites',
    description: 'Articles, multimedia content, comments, and user-generated content.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-Responsive Sites',
    description: 'Cross-device testing, viewport optimization, and touch-friendly interfaces.',
  },
]

// Our Approach Steps
const ourApproach = [
  {
    step: 1,
    title: 'Discovery & Analysis',
    description: 'Technical audit, content inventory, SEO baseline assessment, and CMS evaluation.',
  },
  {
    step: 2,
    title: 'Translation & Localization',
    description: 'Native linguists, cultural adaptation, in-context review, and keyword research.',
  },
  {
    step: 3,
    title: 'Technical Implementation',
    description: 'CMS integration, hreflang setup, URL structure optimization, and schema markup.',
  },
  {
    step: 4,
    title: 'QA & Launch',
    description: 'Functional testing, SEO validation, performance monitoring, and go-live support.',
  },
]

// Key Features
const keyFeatures = [
  {
    title: 'Technical SEO',
    icon: Search,
    items: [
      'Hreflang tag implementation',
      'Localized URL structures',
      'Multilingual XML sitemaps',
      'International schema markup',
    ],
  },
  {
    title: 'CMS Integration',
    icon: Settings,
    items: [
      'WordPress, Drupal, Joomla',
      'Shopify, WooCommerce, Magento',
      'Webflow, Wix, Squarespace',
      'Custom CMS platforms',
    ],
  },
  {
    title: 'Content Adaptation',
    icon: Palette,
    items: [
      'Cultural localization (colors, images, symbols)',
      'Right-to-left (RTL) language support',
      'Currency and date formatting',
      'Local payment methods',
    ],
  },
  {
    title: 'Quality Assurance',
    icon: ClipboardCheck,
    items: [
      'Linguistic review by native speakers',
      'Functional testing (forms, checkout)',
      'Cross-browser compatibility',
      'Mobile responsiveness',
    ],
  },
]

// Industries
const industries = [
  { name: 'E-commerce & Retail', icon: ShoppingCart },
  { name: 'Technology & SaaS', icon: Laptop },
  { name: 'Healthcare & Life Sciences', icon: Stethoscope },
  { name: 'Financial Services', icon: Wallet },
  { name: 'Travel & Hospitality', icon: Plane },
  { name: 'Manufacturing', icon: Factory },
]

// Pricing Tiers
const pricingTiers = [
  {
    level: 'Basic Translation',
    bestFor: 'Static websites, blogs',
    price: '$0.12/word',
  },
  {
    level: 'Standard Localization',
    bestFor: 'E-commerce, corporate sites',
    price: '$0.18/word',
  },
  {
    level: 'Premium Localization',
    bestFor: 'SaaS, multilingual SEO',
    price: 'Custom quote',
  },
]

const additionalServices = [
  { service: 'CMS Integration', price: 'From $500' },
  { service: 'SEO Optimization', price: 'From $1,000/language' },
  { service: 'Ongoing Content Updates', price: 'Monthly retainer' },
]

// Technologies
const technologies = [
  { category: 'CMS', items: ['WordPress', 'Drupal', 'Joomla'] },
  { category: 'E-commerce', items: ['Shopify', 'WooCommerce', 'Magento'] },
  { category: 'JavaScript', items: ['React', 'Vue', 'Angular'] },
  { category: 'Website Builders', items: ['Webflow', 'Wix', 'Squarespace'] },
]

// Case Study
const caseStudy = {
  title: 'E-commerce Expansion Success',
  client: 'International fashion retailer',
  challenge: 'Launch in 5 European markets simultaneously',
  solution: 'Localized 10,000+ products with full SEO optimization',
  results: '340% increase in international revenue',
}

// FAQs
const faqs = [
  {
    question: 'How long does website localization take?',
    answer: 'Timeline depends on website size and complexity. A typical 50-page website takes 2-4 weeks for full localization including QA. Larger e-commerce sites with thousands of products may take 6-8 weeks. We provide detailed timelines after analyzing your specific requirements.',
  },
  {
    question: 'Do you handle technical SEO for international sites?',
    answer: 'Yes, technical SEO is a core part of our website localization service. We implement hreflang tags, create localized URL structures, set up multilingual sitemaps, and add international schema markup to ensure search engines properly index and serve your content to the right audiences.',
  },
  {
    question: 'Can you integrate with our CMS?',
    answer: 'We work with all major CMS platforms including WordPress, Drupal, Shopify, Magento, and custom solutions. Our technical team handles the integration, ensuring translated content flows seamlessly into your existing workflow and publishing processes.',
  },
  {
    question: "What's the difference between translation and localization?",
    answer: 'Translation converts text from one language to another. Localization goes further by adapting content for cultural context, including imagery, colors, date formats, currencies, and cultural references. For websites, localization also includes technical elements like RTL support and local payment methods.',
  },
  {
    question: 'Do you support right-to-left (RTL) languages?',
    answer: 'Yes, we have extensive experience with RTL languages including Arabic, Hebrew, Persian, and Urdu. Our team handles not just the translation but also the UI/UX adjustments needed for proper RTL display, including mirrored layouts and bidirectional text handling.',
  },
  {
    question: 'How do you handle ongoing content updates?',
    answer: 'We offer monthly retainer plans for continuous content updates. When you publish new content, our team translates it into all your target languages, maintaining consistency with existing terminology. We can integrate with your CMS for automated workflow triggers.',
  },
  {
    question: 'What about mobile app localization?',
    answer: 'While this page focuses on website localization, we also offer comprehensive mobile app localization services. This includes UI strings, app store listings, in-app content, and push notifications. Contact us for a separate quote on app localization projects.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes, we provide 30 days of post-launch support included with every project. This covers bug fixes, minor text adjustments, and technical issues. Extended support and maintenance plans are available for long-term partnerships.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Website Localization', url: '/services/website' },
]

const trustItems = [
  { text: 'ISO 17100 Compliant', icon: Shield },
  { text: '200+ Languages', icon: Globe },
  { text: '5,000+ Linguists', icon: Users },
  { text: 'SEO Optimization', icon: TrendingUp },
]

export default function WebsiteLocalizationContent() {
  return (
    <>
      <LandingLocalBusinessJsonLd areaServed={['Worldwide', 'North America', 'Europe', 'Asia']} />
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ServiceJsonLd
        name="Website Localization Services"
        description="Professional website localization in 200+ languages. E-commerce, SaaS, and corporate website translation with SEO optimization."
        url="https://cethos.com/services/website"
      />

      {/* Hero Section */}
      <section className="pt-20 bg-[#0C2340]">
        <div className="max-w-[1200px] mx-auto px-8 py-16 md:py-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-6 [&_a]:text-gray-300 [&_span]:text-gray-400 [&_svg]:text-gray-500" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="max-w-xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[36px] md:text-[48px] font-bold text-white leading-[1.1] mb-4"
              >
                Website Localization Services
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8"
              >
                Launch Your Website in New Markets with Culturally Adapted, SEO-Optimized Translations
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <a
                  href="#quote-form"
                  className="px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
                >
                  Get a Free Quote <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#approach"
                  className="px-6 py-3 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  View Our Process
                </a>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-6 text-gray-300 text-sm"
              >
                {trustItems.map((item) => (
                  <span key={item.text} className="flex items-center gap-2">
                    <item.icon className="w-5 h-5 text-[#0891B2]" />
                    {item.text}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Quote Form */}
            <motion.div
              id="quote-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-[#0C2340] mb-2">Get a Free Quote</h2>
              <p className="text-slate-600 mb-6">Tell us about your website localization project.</p>
              <WebsiteQuoteForm formLocation="website-localization-hero" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 bg-slate-50 border-b">
        <Container>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {trustItems.map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-[#0C2340]">
                <item.icon className="w-6 h-6 text-[#0891B2]" />
                <span className="font-semibold">{item.text}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What We Localize */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">What We Localize</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From e-commerce storefronts to enterprise SaaS platforms, we localize every type of web presence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeLocalize.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full" hover>
                  <item.icon className="w-10 h-10 text-[#0891B2] mb-4" />
                  <h3 className="text-lg font-semibold text-[#0C2340] mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Approach */}
      <section id="approach" className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">Our Approach</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A proven 4-step process to ensure successful website localization.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ourApproach.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#0891B2] text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-[#0C2340] mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">Key Features</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive localization that goes beyond translation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <feature.icon className="w-8 h-8 text-[#0891B2]" />
                    <h3 className="text-xl font-semibold text-[#0C2340]">{feature.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {feature.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">Industries We Serve</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Specialized expertise across diverse sectors.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="p-4 text-center h-full">
                  <industry.icon className="w-8 h-8 text-[#0891B2] mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#0C2340]">{industry.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-[#0C2340]">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transparent, Value-Based Pricing</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Choose the service level that fits your needs.
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center"
              >
                <h3 className="text-lg font-semibold text-[#0C2340] mb-2">{tier.level}</h3>
                <p className="text-sm text-slate-500 mb-4">{tier.bestFor}</p>
                <p className="text-2xl font-bold text-[#0891B2]">{tier.price}</p>
              </motion.div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="max-w-md mx-auto bg-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Additional Services</h3>
            <div className="space-y-3">
              {additionalServices.map((service) => (
                <div key={service.service} className="flex justify-between text-gray-200">
                  <span>{service.service}</span>
                  <span className="font-semibold text-[#0891B2]">{service.price}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">Technologies We Work With</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Seamless integration with your existing tech stack.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  {tech.category}
                </h3>
                <div className="space-y-2">
                  {tech.items.map((item) => (
                    <p key={item} className="text-[#0C2340] font-medium">{item}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-8 h-8 text-[#0891B2]" />
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0C2340]">{caseStudy.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-500 uppercase">Client</p>
                      <p className="text-lg text-[#0C2340]">{caseStudy.client}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500 uppercase">Challenge</p>
                      <p className="text-lg text-[#0C2340]">{caseStudy.challenge}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-500 uppercase">Solution</p>
                      <p className="text-lg text-[#0C2340]">{caseStudy.solution}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500 uppercase">Results</p>
                      <p className="text-2xl font-bold text-[#0891B2]">{caseStudy.results}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about website localization.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-[#0C2340] mb-3">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0C2340] via-[#1A365D] to-[#0891B2]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Go Global?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Let&apos;s localize your website for international success. Get a free consultation today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/get-quote"
                className="px-8 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Schedule Consultation
              </Link>
            </div>
            <p className="text-white/60 text-sm mt-8">
              No commitment required • Response within 24 hours • 200+ languages
            </p>
          </div>
        </Container>
      </section>

      {/* Related Services */}
      <section className="py-12 bg-white border-t">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Related Services</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/software" className="text-[#0891B2] hover:underline">
              Software Localization
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/services/multimedia" className="text-[#0891B2] hover:underline">
              Multimedia Localization
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/services/business" className="text-[#0891B2] hover:underline">
              Business Translation
            </Link>
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
