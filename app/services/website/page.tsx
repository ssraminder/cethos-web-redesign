import { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  FileText,
  Search,
  Puzzle,
  CheckSquare,
  Palette,
  RefreshCw,
  BadgeCheck,
  Globe,
  Languages,
  CheckCircle,
} from 'lucide-react'
import ClientTestimonials from '@/components/ClientTestimonials'
import { ServiceJsonLd } from '@/components/JsonLd'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Website Localization Services | Cethos Solutions Inc.',
  description:
    'Full website adaptation including content translation, SEO localization, and cultural optimization for global markets. Professional website localization in 200+ languages.',
  alternates: {
    canonical: 'https://cethos.com/services/website',
  },
  openGraph: {
    title: 'Website Localization Services | Cethos Solutions Inc.',
    description:
      'Full website adaptation including content translation, SEO localization, and cultural optimization for global markets. Professional website localization in 200+ languages.',
    url: 'https://cethos.com/services/website',
    siteName: 'Cethos Solutions Inc.',
    locale: 'en_CA',
    type: 'website',
  },
}

const services = [
  {
    icon: FileText,
    title: 'Content Translation',
    description:
      'Professional translation of all website content including pages, blog posts, product descriptions, and landing pages with consistent brand voice across languages.',
  },
  {
    icon: Search,
    title: 'SEO Localization',
    description:
      'Multilingual keyword research, meta tag optimization, hreflang implementation, and localized content strategies to maximize organic visibility in every market.',
  },
  {
    icon: Puzzle,
    title: 'CMS Integration',
    description:
      'Seamless integration with WordPress, Drupal, Shopify, and enterprise CMS platforms. Automated content extraction and re-import for efficient translation workflows.',
  },
  {
    icon: CheckSquare,
    title: 'Multilingual QA',
    description:
      'Comprehensive testing of localized websites including functional testing, layout validation, character encoding, and cross-browser compatibility checks.',
  },
  {
    icon: Palette,
    title: 'Cultural Adaptation',
    description:
      'Beyond translation — we adapt imagery, colors, layouts, date formats, currencies, and cultural references to resonate with local audiences.',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Updates',
    description:
      'Ongoing translation support for new content, blog posts, product launches, and seasonal updates. Keep your multilingual website always up to date.',
  },
]

const trustSignals = [
  { icon: Languages, label: '200+ Languages' },
  { icon: Globe, label: 'Global SEO Expertise' },
  { icon: BadgeCheck, label: 'CMS Compatible' },
]

export default function WebsiteLocalizationPage() {
  return (
    <>
      <ServiceJsonLd
        name="Website Localization Services"
        description="Full website localization services including content translation, SEO localization, CMS integration, and cultural adaptation in 200+ languages."
        url="https://cethos.com/services/website"
      />
      <BreadcrumbJsonLd items={[
        { name: 'Services', url: 'https://cethos.com/services' },
        { name: 'Website Localization', url: 'https://cethos.com/services/website' },
      ]} />
      {/* HERO SECTION */}
      <section className="pt-20 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#164e63]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
              WEBSITE LOCALIZATION
            </div>

            <h1 className="text-[40px] md:text-[52px] font-bold text-white leading-[1.1] mb-6">
              Website Localization Services
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-3xl">
              Full website adaptation including content translation, SEO
              localization, and cultural optimization for global markets.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/get-quote"
                className="px-6 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
              >
                Get a Website Localization Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
              {trustSignals.map((signal) => (
                <span key={signal.label} className="flex items-center gap-2">
                  <signal.icon className="w-5 h-5 text-[#0891B2]" />
                  {signal.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              Our Website Localization Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to take your website global — from content
              translation to ongoing multilingual maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mb-5">
                  <service.icon className="w-7 h-7 text-[#0891B2]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0C2340] mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              Why Choose Cethos for Website Localization
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We combine translation expertise with technical web knowledge to
              deliver websites that perform in every market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'SEO-First Approach',
                description:
                  'Every localized page is optimized for local search engines with native keyword research, proper hreflang tags, and market-specific meta content.',
              },
              {
                title: 'Platform Agnostic',
                description:
                  'We work with any CMS or web framework — WordPress, Shopify, Drupal, Next.js, custom platforms — with automated workflows for each.',
              },
              {
                title: 'Scalable & Continuous',
                description:
                  'From initial full-site translation to ongoing content updates, our workflows scale with your publishing cadence and market expansion.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#0891B2] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-[#0C2340] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <ClientTestimonials />

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#164e63]">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Take Your Website Global
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Get a free quote for your website localization project. We will help
            you reach customers in every market with a fully localized web
            presence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-quote"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold text-lg hover:bg-[#06B6D4] transition-colors"
            >
              Get a Website Localization Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
