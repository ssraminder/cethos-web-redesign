import { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  FileText,
  Megaphone,
  Building2,
  BookOpen,
  Globe,
  MessageSquare,
  BadgeCheck,
  Languages,
  Award,
  CheckCircle,
} from 'lucide-react'
import ClientTestimonials from '@/components/ClientTestimonials'
import { ServiceJsonLd } from '@/components/JsonLd'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Business Translation Services | Cethos Solutions Inc.',
  description:
    'Professional business translation services in 200+ languages. Annual reports, marketing materials, corporate communications, and more. ISO 17100 compliant.',
  alternates: {
    canonical: 'https://cethos.com/services/business',
  },
  openGraph: {
    title: 'Business Translation Services | Cethos Solutions Inc.',
    description:
      'Professional business translation services in 200+ languages. Annual reports, marketing materials, corporate communications, and more. ISO 17100 compliant.',
    url: 'https://cethos.com/services/business',
    siteName: 'Cethos Solutions Inc.',
    locale: 'en_CA',
    type: 'website',
  },
}

const services = [
  {
    icon: FileText,
    title: 'Annual Reports',
    description:
      'Accurate translation of annual reports, financial statements, and investor communications that maintain the precision and tone of the original.',
  },
  {
    icon: Megaphone,
    title: 'Marketing Materials',
    description:
      'Culturally adapted translations for brochures, advertisements, campaigns, and brand messaging that resonate with local audiences.',
  },
  {
    icon: Building2,
    title: 'Corporate Communications',
    description:
      'Professional translation of press releases, executive communications, and stakeholder updates for consistent global messaging.',
  },
  {
    icon: BookOpen,
    title: 'Training Documents',
    description:
      'Localized employee training manuals, onboarding materials, compliance guides, and e-learning content for multinational teams.',
  },
  {
    icon: Globe,
    title: 'Website Content',
    description:
      'SEO-optimized website translation and localization to help your business connect with customers in every market.',
  },
  {
    icon: MessageSquare,
    title: 'Internal Communications',
    description:
      'Translation of internal memos, HR policies, company newsletters, and intranet content to keep global teams aligned.',
  },
]

const trustSignals = [
  { icon: Languages, label: '200+ Languages' },
  { icon: Award, label: 'ISO 17100 Compliant' },
  { icon: BadgeCheck, label: 'Industry Expertise' },
]

export default function BusinessTranslationPage() {
  return (
    <>
      <ServiceJsonLd
        name="Business Translation Services"
        description="Professional business translation for corporate communications, marketing materials, annual reports, and training documents in 200+ languages."
        url="https://cethos.com/services/business"
      />
      <BreadcrumbJsonLd items={[
        { name: 'Services', url: 'https://cethos.com/services' },
        { name: 'Business Translation', url: 'https://cethos.com/services/business' },
      ]} />
      {/* HERO SECTION */}
      <section className="pt-20 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#164e63]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
              BUSINESS TRANSLATION
            </div>

            <h1 className="text-[40px] md:text-[52px] font-bold text-white leading-[1.1] mb-6">
              Business Translation Services
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-3xl">
              Accurate, culturally adapted translations for global business
              communication. From annual reports to marketing campaigns, we help
              your business speak every language with confidence.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/get-quote"
                className="px-6 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
              >
                Get a Quote <ArrowRight className="w-5 h-5" />
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
              Our Business Translation Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive translation solutions tailored for every aspect of
              your business operations.
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
              Why Choose Cethos for Business Translation
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We combine linguistic expertise with industry knowledge to deliver
              translations that drive results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Native-Speaking Experts',
                description:
                  'Every translation is handled by native-speaking linguists with subject-matter expertise in your industry.',
              },
              {
                title: 'Culturally Adapted',
                description:
                  'We go beyond word-for-word translation to ensure your message resonates with local audiences and cultural norms.',
              },
              {
                title: 'Fast Turnaround',
                description:
                  'Scalable teams and efficient workflows deliver high-quality translations on your timeline, with rush options available.',
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
            Translate Your Business Content
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Professional translations for corporate communications, marketing materials, and internal documents.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-quote"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold text-lg hover:bg-[#06B6D4] transition-colors"
            >
              Get a Business Quote <ArrowRight className="w-5 h-5" />
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
