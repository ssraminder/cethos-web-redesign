'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
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
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'

const serviceItems = [
  { icon: Code, titleKey: 'uiux_title', descKey: 'uiux_desc' },
  { icon: FileText, titleKey: 'docs_title', descKey: 'docs_desc' },
  { icon: Terminal, titleKey: 'api_title', descKey: 'api_desc' },
  { icon: HelpCircle, titleKey: 'help_title', descKey: 'help_desc' },
  { icon: Smartphone, titleKey: 'appstore_title', descKey: 'appstore_desc' },
  { icon: TestTube2, titleKey: 'qa_title', descKey: 'qa_desc' },
]

const trustItems = [
  { icon: BadgeCheck, key: 'trust_1' },
  { icon: Brain, key: 'trust_2' },
  { icon: RefreshCw, key: 'trust_3' },
]

const whyItems = [
  { titleKey: 'dev_title', descKey: 'dev_desc' },
  { titleKey: 'format_title', descKey: 'format_desc' },
  { titleKey: 'context_title', descKey: 'context_desc' },
]

export default function SoftwarePageContent() {
  const tHero = useTranslations('service.software.hero')
  const tServices = useTranslations('service.software.services')
  const tWhy = useTranslations('service.software.why')
  const tCta = useTranslations('service.software.cta')

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
          <Breadcrumbs
            items={[
              { name: 'Services', url: '/services' },
              { name: 'Software Localization', url: '/services/software' },
            ]}
            className="mb-6 text-white/60"
          />
          <div className="max-w-4xl">
            <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
              {tHero('eyebrow')}
            </div>

            <h1 className="text-[40px] md:text-[52px] font-bold text-white leading-[1.1] mb-6">
              {tHero('heading')}
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-3xl">
              {tHero('description')}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/get-quote"
                className="px-6 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
              >
                {tHero('cta_primary')} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
              {trustItems.map((signal) => (
                <span key={signal.key} className="flex items-center gap-2">
                  <signal.icon className="w-5 h-5 text-[#0891B2]" />
                  {tHero(signal.key)}
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
              {tServices('heading')}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {tServices('description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceItems.map((service) => (
              <div
                key={service.titleKey}
                className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mb-5">
                  <service.icon className="w-7 h-7 text-[#0891B2]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0C2340] mb-3">
                  {tServices(service.titleKey)}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {tServices(service.descKey)}
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
              {tWhy('heading')}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {tWhy('description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyItems.map((item) => (
              <div key={item.titleKey} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#0891B2] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-[#0C2340] mb-2">
                    {tWhy(item.titleKey)}
                  </h3>
                  <p className="text-slate-600">{tWhy(item.descKey)}</p>
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
            {tCta('heading')}
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            {tCta('description')}
          </p>
          <Link
            href="/get-quote"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold text-lg hover:bg-[#06B6D4] transition-colors"
          >
            {tCta('cta_primary')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
