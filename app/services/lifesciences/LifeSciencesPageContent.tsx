'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  CheckCircle,
  Shield,
  Clock,
  Award,
  FileText,
  Users,
  Microscope,
  Pill,
  ClipboardList,
  Stethoscope,
  Activity,
  Monitor,
  Heart,
  FlaskConical,
  BadgeCheck,
  Globe
} from 'lucide-react'
import { Container, Card, SectionHeading } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

// =============================================================================
// DATA
// =============================================================================

const stats = [
  { value: '5,000+', label: 'Specialized Linguists' },
  { value: '1,000+', label: 'CD Moderators' },
  { value: '300+', label: 'Medical Professionals' },
  { value: '25+', label: 'Therapeutic Areas' },
]

const services = [
  {
    id: 'linguistic-validation',
    icon: ClipboardList,
    title: 'Linguistic Validation Services',
    description: 'ISPOR-compliant 9-step methodology for Clinical Outcome Assessments (COAs). Ensuring conceptual equivalence while maintaining psychometric properties across all target languages.',
    href: '/services/lifesciences/linguistic-validation',
    features: [
      'PRO, ClinRO, ObsRO, PerfO instruments',
      'Forward & Back Translation',
      'Reconciliation & Harmonization',
      'Full audit trail documentation'
    ],
  },
  {
    id: 'cognitive-debriefing',
    icon: Users,
    title: 'Cognitive Debriefing Services',
    description: '1,000+ trained moderators across 150+ languages. Patient interviews to assess comprehension and cultural appropriateness of translated instruments as required by FDA and EMA.',
    href: '/services/lifesciences/cognitive-debriefing',
    features: [
      'In-Person, VRI & Telephone interviews',
      'Pediatric & Geriatric specialists',
      'Rare disease population expertise',
      'IRB/Ethics submission support'
    ],
  },
  {
    id: 'clinician-review',
    icon: Stethoscope,
    title: 'Clinician Review Services',
    description: '300+ medical professionals across 25+ therapeutic areas providing expert clinical review of translated ClinRO instruments, protocols, and regulatory documents.',
    href: '/services/lifesciences/clinician-review',
    features: [
      'Board-certified physicians (MDs, DOs)',
      'PharmDs & Specialist nurses',
      'Therapeutic area experts',
      'Psychologists & Psychiatrists'
    ],
  },
  {
    id: 'clinical-trials',
    icon: FlaskConical,
    title: 'Clinical Trial Documentation',
    description: 'Complete translation of the full spectrum of clinical trial documentation to support global studies from Phase I through post-marketing.',
    href: '/services/lifesciences/clinical-trials',
    features: [
      'Protocols & Investigator Brochures',
      'Informed Consent Forms (ICFs)',
      'Case Report Forms (CRFs/eCRFs)',
      'Patient-facing materials'
    ],
  },
  {
    id: 'regulatory-affairs',
    icon: Shield,
    title: 'Regulatory Affairs Translation',
    description: 'CTD Modules 1-5, product labeling, and regulatory submissions for FDA, EMA, Health Canada, PMDA, NMPA and regulatory agencies worldwide.',
    href: '/services/lifesciences/regulatory-affairs',
    features: [
      'CTD Module 1-5 translation',
      'SmPC, PILs, IMP Labels',
      'NDS, ANDA, BLA submissions',
      'Variation & renewal dossiers'
    ],
  },
  {
    id: 'pharmacovigilance',
    icon: Activity,
    title: 'Pharmacovigilance Translation',
    description: 'Dedicated PV translation services with rapid turnaround and strict regulatory compliance for adverse event reporting and aggregate safety reports.',
    href: '/services/lifesciences/pharmacovigilance',
    features: [
      'ICSRs & SAE reports',
      'PSURs, DSURs, PBRERs',
      'Risk Management Plans',
      '24/7 urgent support available'
    ],
  },
  {
    id: 'ecoa-migration',
    icon: Monitor,
    title: 'eCOA Migration Services',
    description: 'Electronic Clinical Outcome Assessment migration adapts paper-based instruments for electronic administration on tablets, smartphones, and IVRS systems.',
    href: '/services/lifesciences/ecoa-migration',
    features: [
      'Platform UI string translation',
      'Screenshot review & certification',
      'Audio recording for IVRS',
      'Format & locale adaptation'
    ],
  },
  {
    id: 'medical-devices',
    icon: Heart,
    title: 'Medical Device & IVD Translation',
    description: 'Specialized translation for EU MDR/IVDR compliance and global medical device markets including IFUs, labeling, and technical documentation.',
    href: '/services/lifesciences/medical-devices',
    features: [
      'EU MDR/IVDR compliance',
      'Instructions for Use (IFUs)',
      'UDI labels & packaging',
      'Technical files & CERs'
    ],
  },
]

const therapeuticAreas = [
  'Oncology & Hematology',
  'Central Nervous System',
  'Cardiology',
  'Dermatology',
  'Endocrinology & Diabetes',
  'Gastroenterology',
  'Respiratory',
  'Rheumatology',
  'Ophthalmology',
  'Rare Diseases',
  'Pediatrics',
  'Psychiatry',
  'Infectious Disease',
  'Immunology',
  'Nephrology'
]

const regulatoryAgencies = [
  { name: 'FDA', country: 'USA' },
  { name: 'EMA', country: 'EU' },
  { name: 'Health Canada', country: 'Canada' },
  { name: 'MHRA', country: 'UK' },
  { name: 'PMDA', country: 'Japan' },
  { name: 'NMPA', country: 'China' },
  { name: 'Swissmedic', country: 'Switzerland' },
  { name: 'TGA', country: 'Australia' },
]

const complianceStandards = [
  'ISO 17100:2015',
  'ISO 9001:2015',
  'GCP (ICH E6)',
  'ISPOR Guidelines',
  'FDA 21 CFR Part 11',
  'HIPAA',
  'GDPR'
]

const faqs = [
  {
    question: 'What is linguistic validation?',
    answer: 'Linguistic validation is the gold standard methodology for translating Clinical Outcome Assessments (COAs) used in clinical trials. It ensures conceptual equivalence across all target languages while maintaining the psychometric properties of the original instrument, following ISPOR guidelines. The process includes forward translation, reconciliation, back translation, back translation review, cognitive debriefing, and harmonization.',
  },
  {
    question: 'How many cognitive debriefing interviews are required?',
    answer: 'ISPOR guidelines recommend 5-8 cognitive debriefing interviews per language to ensure adequate assessment of patient comprehension. For pediatric populations, cognitively impaired patients, or complex instruments, additional interviews may be recommended. Our team can advise on the optimal sample size for your specific project.',
  },
  {
    question: 'What regulatory agencies accept your translations?',
    answer: 'Our translations are accepted by FDA, EMA, PMDA, NMPA, Health Canada, MHRA, Swissmedic, TGA, and other regulatory agencies worldwide. We maintain ISO 17100 compliance and follow GCP guidelines. All projects include complete audit trails and certification documentation.',
  },
  {
    question: 'Do you provide back translation services?',
    answer: 'Yes, back translation is a standard part of our linguistic validation process. Back translations are performed by independent translators who have not seen the original source text, ensuring an unbiased review of conceptual equivalence. Back translation review meetings are conducted with the client to resolve any discrepancies.',
  },
  {
    question: 'What therapeutic areas do you cover?',
    answer: 'We have specialized linguists and medical reviewers across 25+ therapeutic areas including oncology, CNS, cardiology, dermatology, endocrinology, gastroenterology, respiratory, rheumatology, ophthalmology, rare diseases, pediatrics, and psychiatry. Our team is matched to your specific therapeutic area for every project.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Life Sciences', url: '/services/lifesciences' },
]

// =============================================================================
// COMPONENT
// =============================================================================

export default function LifeSciencesPageContent() {
  const [activeTab, setActiveTab] = useState('linguistic-validation')

  return (
    <>
      {/* Structured Data */}
      <ServiceJsonLd
        name="Life Sciences Translation Services"
        description="End-to-end language services for clinical development including linguistic validation, cognitive debriefing, regulatory translation, and pharmacovigilance."
        url="https://cethos.com/services/lifesciences"
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
              LIFE SCIENCES TRANSLATION
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[40px] md:text-[52px] font-bold text-white leading-[1.1] mb-6"
            >
              End-to-End Language Services for Clinical Development
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-white/80 leading-relaxed mb-8 max-w-3xl"
            >
              From linguistic validation of patient-reported outcomes to regulatory submissions
              and pharmacovigilance—comprehensive language solutions for the pharmaceutical,
              biotechnology, and medical device industries.
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
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:5876000786"
                className="px-6 py-4 bg-white/10 text-white border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> (587) 600-0786
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
                ISPOR Guidelines
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-[#0891B2]" />
                GCP Compliant
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* STATS BAR */}
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
      {/* STICKY NAVIGATION TABS */}
      {/* ===================================================================== */}
      <section className="py-6 bg-slate-50 border-b lg:sticky lg:top-20 z-40">
        <Container>
          <div className="flex flex-wrap justify-center gap-3">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                onClick={() => setActiveTab(service.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === service.id
                    ? 'bg-[#0891B2] text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {service.title.replace(' Services', '').replace(' Translation', '')}
              </a>
            ))}
            <a
              href="#quote-form"
              className="px-4 py-2 rounded-full text-sm font-medium bg-[#0C2340] text-white hover:bg-[#1a3a5c] transition-colors"
            >
              Get a Quote
            </a>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* SERVICE SECTIONS (8 sections) */}
      {/* ===================================================================== */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={index % 2 === 1 ? 'lg:order-2' : ''}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#0891B2]/10 flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-[#0891B2]" />
                </div>
                <h2 className="text-3xl font-bold text-[#0C2340] mb-4">{service.title}</h2>
                <p className="text-lg text-slate-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-[#0891B2] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
                >
                  Learn More <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={index % 2 === 1 ? 'lg:order-1' : ''}
              >
                <div className="aspect-square max-w-[400px] mx-auto bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 rounded-2xl flex items-center justify-center">
                  <service.icon className="w-32 h-32 text-[#0891B2]" strokeWidth={1} />
                </div>
              </motion.div>
            </div>
          </Container>
        </section>
      ))}

      {/* ===================================================================== */}
      {/* THERAPEUTIC AREAS */}
      {/* ===================================================================== */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-4">Therapeutic Areas</h2>
          <p className="text-white/70 text-center mb-10 max-w-2xl mx-auto">
            Deep expertise across 25+ therapeutic areas with specialized linguists and medical reviewers.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {therapeuticAreas.map((area, index) => (
              <motion.span
                key={area}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/20 hover:bg-white/20 transition-colors"
              >
                {area}
              </motion.span>
            ))}
            <span className="px-4 py-2 bg-[#0891B2] text-white rounded-full text-sm font-medium">
              + 10 more
            </span>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* REGULATORY AGENCIES */}
      {/* ===================================================================== */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title="Regulatory Agencies Supported"
            subtitle="Global regulatory expertise for your submissions worldwide."
            className="mb-12"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regulatoryAgencies.map((agency, index) => (
              <motion.div
                key={agency.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="p-6 text-center hover:shadow-md transition-shadow">
                  <div className="text-xl font-bold text-[#0C2340] mb-1">{agency.name}</div>
                  <div className="text-sm text-slate-500">{agency.country}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* COMPLIANCE STANDARDS */}
      {/* ===================================================================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <SectionHeading
            title="Compliance & Certifications"
            subtitle="Meeting the highest industry standards for quality and security."
            className="mb-12"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {complianceStandards.map((standard, index) => (
              <motion.div
                key={standard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-2 px-5 py-3 bg-white rounded-lg border border-slate-200 shadow-sm"
              >
                <BadgeCheck className="w-5 h-5 text-[#0891B2]" />
                <span className="font-medium text-[#0C2340]">{standard}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* QUOTE FORM SECTION */}
      {/* ===================================================================== */}
      <section id="quote-form" className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              title="Request a Quote"
              subtitle="Tell us about your project and receive a detailed quote within 2 hours during business hours."
              className="mb-10"
            />
            <Card className="p-8 border-2 border-slate-100">
              <div className="text-center mb-8">
                <p className="text-slate-600">
                  Contact us directly to discuss your life sciences translation project.
                  Our team of specialists will provide a customized solution for your needs.
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
                  href="mailto:lifesciences@cethos.com?subject=Life Sciences Translation Quote Request"
                  className="px-8 py-4 bg-[#0C2340] text-white rounded-lg font-semibold hover:bg-[#1a3a5c] transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" /> Email Us
                </a>
              </div>
              <p className="text-center text-sm text-slate-500 mt-6">
                Or email us at <a href="mailto:lifesciences@cethos.com" className="text-[#0891B2] hover:underline">lifesciences@cethos.com</a>
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* FAQ */}
      {/* ===================================================================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Common questions about our life sciences translation services."
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
      {/* CTA */}
      {/* ===================================================================== */}
      <section className="py-16 bg-gradient-to-r from-[#0C2340] to-[#164e63]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Your Clinical Translation Project
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Partner with a team that understands clinical development. ISO 17100 compliant
              with specialized expertise across 25+ therapeutic areas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:5876000786"
                className="px-8 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> (587) 600-0786
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
              >
                Contact Us <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-white/60 text-sm mt-6">
              ISO 17100 Compliant • ISPOR Guidelines • GCP Compliant • HIPAA Compliant
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
