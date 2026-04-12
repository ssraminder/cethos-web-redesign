'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  ArrowRight,
  FileText,
  Scale,
  Stamp,
  Users,
  Landmark,
  ShieldCheck,
  BadgeCheck,
  Lock,
  BookOpen,
  CheckCircle,
} from 'lucide-react'
import ClientTestimonials from '@/components/ClientTestimonials'
import { ServiceJsonLd } from '@/components/JsonLd'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'

export default function LegalPageContent() {
  const tHero = useTranslations('service.legal.hero')
  const tServices = useTranslations('service.legal.services')
  const tWhy = useTranslations('service.legal.why')
  const tCta = useTranslations('service.legal.cta')

  const services = [
    { icon: FileText, titleKey: 'contracts_title', descKey: 'contracts_desc' },
    { icon: Scale, titleKey: 'court_title', descKey: 'court_desc' },
    { icon: Stamp, titleKey: 'patents_title', descKey: 'patents_desc' },
    { icon: Users, titleKey: 'immigration_title', descKey: 'immigration_desc' },
    { icon: Landmark, titleKey: 'regulatory_title', descKey: 'regulatory_desc' },
    { icon: BookOpen, titleKey: 'governance_title', descKey: 'governance_desc' },
  ]

  const trustSignals = [
    { icon: BadgeCheck, labelKey: 'trust_1' },
    { icon: Lock, labelKey: 'trust_2' },
    { icon: ShieldCheck, labelKey: 'trust_3' },
  ]

  const whyItems = [
    { titleKey: 'trained_title', descKey: 'trained_desc' },
    { titleKey: 'confidential_title', descKey: 'confidential_desc' },
    { titleKey: 'certified_title', descKey: 'certified_desc' },
  ]

  return (
    <>
      <ServiceJsonLd
        name="Legal Translation Services"
        description="Certified legal translation for contracts, court documents, patents, immigration documents, and regulatory filings. Confidential, accurate, and fast."
        url="https://cethos.com/services/legal"
      />
      <BreadcrumbJsonLd items={[
        { name: 'Services', url: 'https://cethos.com/services' },
        { name: 'Legal Translation', url: 'https://cethos.com/services/legal' },
      ]} />
      {/* HERO SECTION */}
      <section className="pt-20 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#164e63]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
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
              {trustSignals.map((signal) => (
                <span key={signal.labelKey} className="flex items-center gap-2">
                  <signal.icon className="w-5 h-5 text-[#0891B2]" />
                  {tHero(signal.labelKey)}
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
            {services.map((service) => (
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
