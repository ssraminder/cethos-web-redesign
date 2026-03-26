import { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Code,
  FileText,
  Terminal,
  HelpCircle,
  Smartphone,
  TestTube2,
  BadgeCheck,
  Brain,
  RefreshCw,
  CheckCircle,
} from 'lucide-react'
import ClientTestimonials from '@/components/ClientTestimonials'
import { ServiceJsonLd } from '@/components/JsonLd'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Software Localization Services | Cethos Solutions Inc.',
  description:
    'Expert software localization services. Adapt your apps, websites, and digital products for global markets. UI/UX localization, documentation, and QA testing.',
  alternates: {
    canonical: 'https://cethos.com/services/software',
  },
  openGraph: {
    title: 'Software Localization Services | Cethos Solutions Inc.',
    description:
      'Expert software localization services. Adapt your apps, websites, and digital products for global markets. UI/UX localization, documentation, and QA testing.',
    url: 'https://cethos.com/services/software',
    siteName: 'Cethos Solutions Inc.',
    locale: 'en_CA',
    type: 'website',
  },
}

const services = [
  {
    icon: Code,
    title: 'UI/UX String Localization',
    description:
      'Context-aware translation of user interface strings, buttons, menus, error messages, and tooltips while preserving variables, placeholders, and formatting tags.',
  },
  {
    icon: FileText,
    title: 'Documentation Translation',
    description:
      'Technical documentation, user guides, release notes, and knowledge base articles translated with consistent terminology across all your product docs.',
  },
  {
    icon: Terminal,
    title: 'API & SDK Content',
    description:
      'Translation of API documentation, SDK references, developer guides, and code comments to make your platform accessible to developers worldwide.',
  },
  {
    icon: HelpCircle,
    title: 'Help Center Localization',
    description:
      'Localize your support articles, FAQs, chatbot responses, and in-app help content to reduce support tickets and improve user satisfaction.',
  },
  {
    icon: Smartphone,
    title: 'App Store Descriptions',
    description:
      'Optimized localization of app store listings, screenshots text, and promotional content for Apple App Store and Google Play to boost downloads.',
  },
  {
    icon: TestTube2,
    title: 'QA & Linguistic Testing',
    description:
      'In-context linguistic review and functional QA testing to catch truncation, encoding issues, layout problems, and cultural mismatches before launch.',
  },
]

const trustSignals = [
  { icon: BadgeCheck, label: '40+ File Formats' },
  { icon: Brain, label: 'Context-Aware Translation' },
  { icon: RefreshCw, label: 'Continuous Localization' },
]

export default function SoftwareLocalizationPage() {
  return (
    <>
      <ServiceJsonLd
        name="Software Localization Services"
        description="Software and app localization services. UI/UX string translation, documentation, QA testing, and continuous localization in 40+ file formats."
        url="https://cethos.com/services/software"
      />
      <BreadcrumbJsonLd items={[
        { name: 'Services', url: 'https://cethos.com/services' },
        { name: 'Software Localization', url: 'https://cethos.com/services/software' },
      ]} />
      {/* HERO SECTION */}
      <section className="pt-20 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#164e63]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
              SOFTWARE LOCALIZATION
            </div>

            <h1 className="text-[40px] md:text-[52px] font-bold text-white leading-[1.1] mb-6">
              Software Localization Services
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-3xl">
              Adapt your software, apps, and digital products for global
              markets. From UI strings to documentation, we ensure your product
              feels native in every language and locale.
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
              Our Software Localization Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              End-to-end localization services designed for modern software teams
              and agile workflows.
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
              Why Choose Cethos for Software Localization
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We understand software development workflows and integrate
              seamlessly into your pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Developer-Friendly Workflows',
                description:
                  'Integrate with your CI/CD pipeline, Git repositories, and localization platforms like Crowdin, Lokalise, and Phrase for continuous localization.',
              },
              {
                title: 'Format-Aware Processing',
                description:
                  'We handle JSON, XLIFF, PO, RESX, ARB, strings files, and 40+ other formats natively, preserving variables, plurals, and ICU message syntax.',
              },
              {
                title: 'In-Context Review',
                description:
                  'Linguists review translations within your actual UI to catch truncation, layout issues, and contextual errors before they reach users.',
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
            Ready to Localize Your Product?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Get a free quote for your software localization project. We will
            match you with linguists who know your tech stack.
          </p>
          <Link
            href="/get-quote"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold text-lg hover:bg-[#06B6D4] transition-colors"
          >
            Get a Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
