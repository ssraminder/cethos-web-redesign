import { Metadata } from 'next'
import Link from 'next/link'
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

export const metadata: Metadata = {
  title: 'Legal Translation Services | Cethos Solutions Inc.',
  description:
    'Certified legal translation services for contracts, court documents, patents, immigration documents, and regulatory filings. Precise, confidential, and certified.',
  alternates: {
    canonical: 'https://cethos.com/services/legal',
  },
  openGraph: {
    title: 'Legal Translation Services | Cethos Solutions Inc.',
    description:
      'Certified legal translation services for contracts, court documents, patents, immigration documents, and regulatory filings. Precise, confidential, and certified.',
    url: 'https://cethos.com/services/legal',
    siteName: 'Cethos Solutions Inc.',
    locale: 'en_CA',
    type: 'website',
  },
}

const services = [
  {
    icon: FileText,
    title: 'Contracts & Agreements',
    description:
      'Precise translation of commercial contracts, NDAs, licensing agreements, and terms of service with meticulous attention to legal terminology.',
  },
  {
    icon: Scale,
    title: 'Court Documents',
    description:
      'Certified translation of court filings, depositions, witness statements, judgments, and litigation support materials for legal proceedings.',
  },
  {
    icon: Stamp,
    title: 'Patents & IP',
    description:
      'Specialized patent translation and intellectual property documentation including claims, specifications, and prosecution histories.',
  },
  {
    icon: Users,
    title: 'Immigration Documents',
    description:
      'IRCC-accepted translations for immigration applications, visas, work permits, and citizenship documents with certification.',
  },
  {
    icon: Landmark,
    title: 'Regulatory Filings',
    description:
      'Accurate translation of regulatory submissions, compliance documentation, and government filings across multiple jurisdictions.',
  },
  {
    icon: BookOpen,
    title: 'Corporate Governance',
    description:
      'Translation of board resolutions, shareholder agreements, articles of incorporation, bylaws, and corporate governance documents.',
  },
]

const trustSignals = [
  { icon: BadgeCheck, label: 'Certified Translators' },
  { icon: Lock, label: 'Confidential & Secure' },
  { icon: ShieldCheck, label: 'Legal Terminology Experts' },
]

export default function LegalTranslationPage() {
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
              LEGAL TRANSLATION
            </div>

            <h1 className="text-[40px] md:text-[52px] font-bold text-white leading-[1.1] mb-6">
              Legal Translation Services
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-3xl">
              Certified, precise translations for legal documents and
              proceedings. Our legal linguists deliver translations you can trust
              for courts, regulatory bodies, and international transactions.
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
              Our Legal Translation Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Specialized translation services for the legal industry, delivered
              by linguists with legal expertise.
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
              Why Choose Cethos for Legal Translation
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Precision and confidentiality are non-negotiable in legal
              translation. Here is how we deliver both.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Legal-Trained Linguists',
                description:
                  'Our translators hold legal qualifications or have extensive experience in legal translation, ensuring accurate use of jurisdiction-specific terminology.',
              },
              {
                title: 'Strict Confidentiality',
                description:
                  'All projects are protected by NDAs, encrypted file transfer, and secure workflows. Your sensitive legal documents are handled with the utmost discretion.',
              },
              {
                title: 'Certified & Notarized',
                description:
                  'We provide certified translations accepted by courts, government agencies, and regulatory bodies worldwide, with notarization available.',
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
            Need Legal Translation Services?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Get a free quote for your legal translation project. Confidential,
            certified, and delivered on time.
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
