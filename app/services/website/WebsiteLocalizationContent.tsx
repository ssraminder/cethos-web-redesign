'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  CheckCircle,
  Shield,
  Globe,
  ShoppingCart,
  Building2,
  Monitor,
  Megaphone,
  FileText,
  Smartphone,
  Search,
  Settings,
  Palette,
  CheckSquare,
  BadgeCheck,
  Languages,
  Users,
  Zap,
  Code2,
  Layers,
  BarChart3,
  Clock,
  Award
} from 'lucide-react'
import { Container, Card, SectionHeading } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import TrustedByLogos from '@/components/TrustedByLogos'

// =============================================================================
// DATA
// =============================================================================

const stats = [
  { value: 'ISO 17100', label: 'Compliant' },
  { value: '200+', label: 'Languages' },
  { value: '5,000+', label: 'Linguists' },
  { value: 'SEO', label: 'Optimization' },
]

const websiteTypes = [
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-commerce Websites',
    description: 'Product descriptions, checkout flows, payment pages, shipping information, and customer reviews localized for international buyers.',
  },
  {
    id: 'corporate',
    icon: Building2,
    title: 'Corporate Websites',
    description: 'Company information, investor relations, press releases, career pages, and corporate communications for global stakeholders.',
  },
  {
    id: 'saas',
    icon: Monitor,
    title: 'SaaS Platforms',
    description: 'UI strings, help documentation, onboarding flows, feature announcements, and knowledge base articles for global users.',
  },
  {
    id: 'marketing',
    icon: Megaphone,
    title: 'Marketing Landing Pages',
    description: 'Campaign pages, lead capture forms, CTAs, promotional content, and conversion-optimized landing pages.',
  },
  {
    id: 'content',
    icon: FileText,
    title: 'Blogs & Content Sites',
    description: 'Articles, multimedia content, comments, author bios, and SEO-optimized content for organic traffic growth.',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile-Responsive Sites',
    description: 'Cross-device testing, viewport optimization, touch-friendly interfaces, and mobile-first localization.',
  },
]

const processSteps = [
  {
    step: 1,
    icon: Search,
    title: 'Discovery & Analysis',
    description: 'Technical audit of your website architecture, content inventory, SEO baseline assessment, and internationalization readiness review.',
    features: ['Technical SEO audit', 'Content inventory', 'CMS assessment', 'Competitor analysis'],
  },
  {
    step: 2,
    icon: Languages,
    title: 'Translation & Localization',
    description: 'Native linguists translate and culturally adapt your content while conducting keyword research for each target market.',
    features: ['Native-speaking translators', 'Cultural adaptation', 'Keyword research', 'Terminology management'],
  },
  {
    step: 3,
    icon: Settings,
    title: 'Technical Implementation',
    description: 'CMS integration, hreflang tag setup, URL structure optimization, and multilingual sitemap configuration.',
    features: ['CMS integration', 'Hreflang setup', 'URL optimization', 'Sitemap configuration'],
  },
  {
    step: 4,
    icon: CheckSquare,
    title: 'QA & Launch',
    description: 'Comprehensive functional testing, SEO validation, cross-browser testing, and post-launch performance monitoring.',
    features: ['Functional testing', 'SEO validation', 'Browser testing', 'Performance monitoring'],
  },
]

const keyFeatures = [
  {
    category: 'Technical SEO',
    icon: BarChart3,
    items: [
      'Hreflang tag implementation',
      'Localized URL structures',
      'Multilingual XML sitemaps',
      'International schema markup',
    ],
  },
  {
    category: 'CMS Integration',
    icon: Layers,
    items: [
      'WordPress, Drupal, Joomla',
      'Shopify, WooCommerce, Magento',
      'Webflow, Wix, Squarespace',
      'Custom CMS platforms',
    ],
  },
  {
    category: 'Content Adaptation',
    icon: Palette,
    items: [
      'Cultural localization (colors, images, symbols)',
      'Right-to-left (RTL) language support',
      'Currency and date formatting',
      'Local payment methods',
    ],
  },
  {
    category: 'Quality Assurance',
    icon: Shield,
    items: [
      'Linguistic review by native speakers',
      'Functional testing (forms, checkout)',
      'Cross-browser compatibility',
      'Mobile responsiveness',
    ],
  },
]

const industries = [
  'E-commerce & Retail',
  'Technology & SaaS',
  'Healthcare & Life Sciences',
  'Financial Services',
  'Travel & Hospitality',
  'Manufacturing',
  'Education & E-learning',
  'Professional Services',
]

const pricingTiers = [
  {
    name: 'Basic Translation',
    bestFor: 'Static websites, blogs',
    price: '$0.12/word',
    features: ['Professional translation', 'Basic SEO keywords', 'Standard formats', 'Quality review'],
  },
  {
    name: 'Standard Localization',
    bestFor: 'E-commerce, corporate sites',
    price: '$0.18/word',
    features: ['Cultural adaptation', 'SEO optimization', 'CMS integration', 'Technical QA'],
    popular: true,
  },
  {
    name: 'Premium Localization',
    bestFor: 'SaaS, multilingual SEO',
    price: 'Custom quote',
    features: ['Full localization suite', 'Ongoing updates', 'Dedicated PM', 'Priority support'],
  },
]

const additionalServices = [
  { name: 'CMS Integration', price: 'From $500' },
  { name: 'SEO Optimization', price: 'From $1,000/language' },
  { name: 'Ongoing Content Updates', price: 'Monthly retainer' },
  { name: 'Technical Consulting', price: 'From $150/hour' },
]

const technologies = [
  { name: 'WordPress', category: 'CMS' },
  { name: 'Drupal', category: 'CMS' },
  { name: 'Shopify', category: 'E-commerce' },
  { name: 'WooCommerce', category: 'E-commerce' },
  { name: 'Magento', category: 'E-commerce' },
  { name: 'React', category: 'Framework' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'Vue', category: 'Framework' },
  { name: 'Webflow', category: 'Builder' },
  { name: 'Contentful', category: 'Headless CMS' },
  { name: 'Sanity', category: 'Headless CMS' },
  { name: 'Strapi', category: 'Headless CMS' },
]

const caseStudy = {
  title: 'E-commerce Expansion Success',
  client: 'International fashion retailer',
  challenge: 'Launch in 5 European markets with localized product catalog',
  solution: 'Localized 10,000+ products with SEO optimization for each market',
  results: [
    { metric: '340%', label: 'Increase in international revenue' },
    { metric: '5', label: 'New markets launched' },
    { metric: '10,000+', label: 'Products localized' },
    { metric: '3 months', label: 'Time to market' },
  ],
}

const faqs = [
  {
    question: 'How long does website localization take?',
    answer: 'Timeline depends on content volume, number of languages, and technical complexity. A typical 50-page corporate website takes 2-4 weeks per language. E-commerce sites with thousands of products may take 6-12 weeks. We provide detailed timelines after our initial assessment.',
  },
  {
    question: 'Do you handle technical SEO for international sites?',
    answer: 'Yes, our website localization includes comprehensive technical SEO: hreflang tag implementation, localized URL structures (subdirectories, subdomains, or ccTLDs), multilingual XML sitemaps, international schema markup, and keyword research for each target market.',
  },
  {
    question: 'Can you integrate with our CMS?',
    answer: 'We work with all major CMS platforms including WordPress, Drupal, Joomla, Shopify, Magento, WooCommerce, Webflow, and custom solutions. We can integrate via plugins, APIs, or direct file export/import depending on your setup.',
  },
  {
    question: "What's the difference between translation and localization?",
    answer: 'Translation converts text from one language to another. Localization goes further by adapting content for cultural context, including images, colors, date formats, currency, measurement units, and local regulations. We recommend full localization for maximum market impact.',
  },
  {
    question: 'Do you support right-to-left (RTL) languages?',
    answer: 'Yes, we have extensive experience with RTL languages including Arabic, Hebrew, Persian, and Urdu. Our technical team ensures proper RTL layout implementation, including mirrored UI elements, bidirectional text handling, and culturally appropriate design adjustments.',
  },
  {
    question: 'How do you handle ongoing content updates?',
    answer: 'We offer flexible maintenance options: per-project pricing for occasional updates, monthly retainer plans for regular content, and API integration for real-time translation of dynamic content. Translation memory ensures consistency across all updates.',
  },
  {
    question: 'What about mobile app localization?',
    answer: 'While this page focuses on website localization, we also offer comprehensive mobile app localization services including iOS and Android string files, app store optimization (ASO), and in-app content. Visit our Software Localization page for details.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer: 'Yes, all projects include 30 days of post-launch support for any translation issues. Extended support packages are available for ongoing maintenance, content updates, and SEO monitoring. We also provide monthly analytics reports for enterprise clients.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Website Localization', url: '/services/website' },
]

// =============================================================================
// COMPONENT
// =============================================================================

export default function WebsiteLocalizationContent() {
  return (
    <>
      {/* Structured Data */}
      <ServiceJsonLd
        name="Website Localization Services"
        description="Professional website localization in 200+ languages. E-commerce, SaaS, and corporate website translation with SEO optimization and CMS integration."
        url="https://cethos.com/services/website"
      />
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* ===================================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================================== */}
      <section className="pt-20 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#164e63]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-6 text-white/60" />

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4"
            >
              WEBSITE LOCALIZATION
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[40px] md:text-[52px] font-bold text-white leading-[1.1] mb-6"
            >
              Website Localization Services
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-white/80 leading-relaxed mb-8 max-w-3xl"
            >
              Launch your website in new markets with culturally adapted, SEO-optimized translations.
              From e-commerce platforms to SaaS applications, we deliver end-to-end website
              localization with technical expertise and linguistic precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                href="#quote-form"
                className="px-6 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
              >
                Get a Free Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#process"
                className="px-6 py-4 bg-white/10 text-white border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                View Our Process
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 text-sm text-white/70"
            >
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-[#0891B2]" />
                ISO 17100 Compliant
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-[#0891B2]" />
                200+ Languages
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-[#0891B2]" />
                SEO Optimization
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* TRUST BAR */}
      {/* ===================================================================== */}
      <section className="bg-white border-b">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#0891B2] mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* WHAT WE LOCALIZE */}
      {/* ===================================================================== */}
      <section className="py-20 bg-slate-50">
        <Container>
          <SectionHeading
            title="What We Localize"
            subtitle="Comprehensive website localization for every type of digital presence."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websiteTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mb-4">
                    <type.icon className="w-6 h-6 text-[#0891B2]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0C2340] mb-2">{type.title}</h3>
                  <p className="text-slate-600 text-sm">{type.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* OUR PROCESS */}
      {/* ===================================================================== */}
      <section id="process" className="py-20 bg-white">
        <Container>
          <SectionHeading
            title="Our Approach"
            subtitle="A proven 4-step methodology for successful website localization."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#0891B2] to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0891B2] to-[#06B6D4] flex items-center justify-center mb-6 mx-auto md:mx-0">
                    <span className="text-3xl font-bold text-white">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0C2340] mb-3">{step.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-[#0891B2] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* KEY FEATURES */}
      {/* ===================================================================== */}
      <section className="py-20 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-4">Key Features</h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Everything you need for successful international website expansion.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={feature.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 rounded-xl p-6 border border-white/20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0891B2] flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.category}</h3>
                </div>
                <ul className="space-y-3">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80">
                      <CheckCircle className="w-4 h-4 text-[#0891B2] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* INDUSTRIES */}
      {/* ===================================================================== */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title="Industries We Serve"
            subtitle="Website localization expertise across diverse sectors."
            className="mb-12"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <motion.span
                key={industry}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-5 py-3 bg-slate-100 rounded-full text-sm font-medium text-[#0C2340] border border-slate-200 hover:border-[#0891B2] hover:bg-[#0891B2]/5 transition-colors"
              >
                {industry}
              </motion.span>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* PRICING */}
      {/* ===================================================================== */}
      <section className="py-20 bg-slate-50">
        <Container>
          <SectionHeading
            title="Transparent, Value-Based Pricing"
            subtitle="Choose the service level that fits your needs and budget."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`p-6 h-full ${tier.popular ? 'border-2 border-[#0891B2] relative' : ''}`}>
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0891B2] text-white text-xs font-semibold rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-[#0C2340] mb-2">{tier.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{tier.bestFor}</p>
                  <div className="text-3xl font-bold text-[#0891B2] mb-6">{tier.price}</div>
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-[#0891B2] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h4 className="text-lg font-semibold text-[#0C2340] mb-4">Additional Services</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {additionalServices.map((service, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-700">{service.name}</span>
                  <span className="text-sm font-semibold text-[#0891B2]">{service.price}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* TECHNOLOGIES */}
      {/* ===================================================================== */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title="Technologies We Work With"
            subtitle="Seamless integration with your existing tech stack."
            className="mb-12"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="flex items-center gap-2 px-5 py-3 bg-slate-100 rounded-lg border border-slate-200 hover:border-[#0891B2] transition-colors"
              >
                <Code2 className="w-4 h-4 text-[#0891B2]" />
                <span className="font-medium text-[#0C2340]">{tech.name}</span>
                <span className="text-xs text-slate-500">({tech.category})</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* CASE STUDY */}
      {/* ===================================================================== */}
      <section className="py-20 bg-gradient-to-br from-[#0891B2] to-[#06B6D4]">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-semibold rounded-full mb-6">
                Case Study
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{caseStudy.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <div className="text-sm text-white/70 mb-2">Client</div>
                  <div className="text-white font-medium">{caseStudy.client}</div>
                </div>
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <div className="text-sm text-white/70 mb-2">Challenge</div>
                  <div className="text-white font-medium">{caseStudy.challenge}</div>
                </div>
                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <div className="text-sm text-white/70 mb-2">Solution</div>
                  <div className="text-white font-medium">{caseStudy.solution}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {caseStudy.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">{result.metric}</div>
                    <div className="text-sm text-white/70">{result.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* TRUSTED BY */}
      {/* ===================================================================== */}
      <TrustedByLogos
        title="Trusted by Global Brands"
        subtitle="Companies that trust us with their international web presence"
        bgClass="bg-white"
      />

      {/* ===================================================================== */}
      {/* FAQ */}
      {/* ===================================================================== */}
      <section className="py-20 bg-slate-50">
        <Container>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Common questions about our website localization services."
            className="mb-12"
          />
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

      {/* ===================================================================== */}
      {/* QUOTE FORM */}
      {/* ===================================================================== */}
      <section id="quote-form" className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              title="Get a Free Quote"
              subtitle="Tell us about your website localization project and receive a detailed quote within 2 hours during business hours."
              className="mb-10"
            />
            <Card className="p-8 border-2 border-slate-100">
              <div className="text-center mb-8">
                <Globe className="w-16 h-16 text-[#0891B2] mx-auto mb-4" />
                <p className="text-slate-600">
                  Contact us directly to discuss your website localization project.
                  Our team will provide a customized solution tailored to your technical requirements and target markets.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:5876000786"
                  className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" /> (587) 600-0786
                </a>
                <a
                  href="mailto:info@cethos.com?subject=Website Localization Quote Request"
                  className="px-8 py-4 bg-[#0C2340] text-white rounded-lg font-semibold hover:bg-[#1a3a5c] transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" /> Email Us
                </a>
              </div>
              <p className="text-center text-sm text-slate-500 mt-6">
                Or email us at <a href="mailto:info@cethos.com" className="text-[#0891B2] hover:underline">info@cethos.com</a>
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* CTA */}
      {/* ===================================================================== */}
      <section className="py-16 bg-gradient-to-r from-[#0C2340] to-[#164e63]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Go Global?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Let&apos;s localize your website for international success. ISO 17100 compliant
              with SEO optimization and CMS integration included.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#quote-form"
                className="px-8 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:5876000786"
                className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> Schedule Consultation
              </a>
            </div>
            <p className="text-white/60 text-sm mt-6">
              ISO 17100 Compliant | 200+ Languages | SEO Optimized | CMS Integration
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
