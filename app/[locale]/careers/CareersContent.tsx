'use client'

import Link from 'next/link'
import { Briefcase, Globe, TrendingUp, Heart, Layers, MapPin, Clock, Building, Languages, Headphones, Headset, Mic, Stethoscope, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

const APPLY_URL = 'https://join.cethos.com/apply'

const vendorRoles = [
  {
    icon: Languages,
    title: 'Translator / Reviewer',
    description: 'Translation, review, proofreading, and MTPE across 48 vendor-facing services.',
    query: 'role=translator',
  },
  {
    icon: Headset,
    title: 'Interpreter',
    description: 'Consecutive, simultaneous, OPI, VRI, sign language, and escort interpretation.',
    query: 'role=interpreter',
  },
  {
    icon: Headphones,
    title: 'Transcriber',
    description: 'Audio transcription for medical, legal, research, and media contexts.',
    query: 'role=transcriber',
  },
  {
    icon: Stethoscope,
    title: 'Clinician Reviewer',
    description: 'Clinical review for linguistic validation projects (RN, MD, PharmD, PsyD).',
    query: 'role=clinician_reviewer',
  },
  {
    icon: Mic,
    title: 'Cognitive Debriefing Consultant',
    description: 'COA/PRO patient interviewing and linguistic validation reporting.',
    query: 'role=cognitive_debriefing',
  },
]

const benefitIcons = [Globe, TrendingUp, Heart, Layers]

const positions = [
  { key: 'pos1', emailSubject: 'Application: Senior Medical Translator (German)' },
  { key: 'pos2', emailSubject: 'Application: Project Manager' },
  { key: 'pos3', emailSubject: 'Application: Linguistic Validator (Spanish)' },
  { key: 'pos4', emailSubject: 'Application: Quality Assurance Specialist' },
]

export default function CareersContent() {
  const tHero = useTranslations('careers.hero')
  const tBenefits = useTranslations('careers.benefits')
  const tPositions = useTranslations('careers.positions')
  const tFreelance = useTranslations('careers.freelance')
  const tContact = useTranslations('careers.contact')

  const benefits = [
    { icon: Globe, title: tBenefits('benefit1_title'), description: tBenefits('benefit1_desc') },
    { icon: TrendingUp, title: tBenefits('benefit2_title'), description: tBenefits('benefit2_desc') },
    { icon: Heart, title: tBenefits('benefit3_title'), description: tBenefits('benefit3_desc') },
    { icon: Layers, title: tBenefits('benefit4_title'), description: tBenefits('benefit4_desc') },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#0C2340] to-[#1a3a5c]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-3xl">
            <p className="text-[#06B6D4] text-sm font-semibold uppercase tracking-widest mb-4">
              {tHero('label')}
            </p>
            <h1 className="text-[48px] font-bold text-white leading-[1.1] mb-6">
              {tHero('heading')}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {tHero('description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#vendor-network"
                className="inline-flex items-center justify-center px-6 py-4 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#06B6D4] transition-colors"
              >
                Join our vendor network
              </a>
              <a
                href="#positions"
                className="inline-flex items-center justify-center px-6 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                {tHero('cta_positions')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-bold text-[#0C2340] mb-4">
              {tBenefits('heading')}
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              {tBenefits('description')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-[#F8FAFC] rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-[#0891B2]/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-[#0891B2]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0C2340] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-[#4B5563]">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-bold text-[#0C2340] mb-4">
              {tPositions('heading')}
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              {tPositions('description')}
            </p>
          </div>
          <div className="space-y-4">
            {positions.map((position) => (
              <div
                key={position.key}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#0C2340] mb-2">
                      {tPositions(`${position.key}_title`)}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-[#4B5563]">
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {tPositions(`${position.key}_department`)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {tPositions(`${position.key}_location`)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tPositions(`${position.key}_type`)}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:careers@cethos.com?subject=${encodeURIComponent(position.emailSubject)}`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#06B6D4] transition-colors whitespace-nowrap"
                  >
                    {tPositions('apply_now')}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Network — roles we're currently recruiting for */}
      <section id="vendor-network" className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[#06B6D4] text-sm font-semibold uppercase tracking-widest mb-3">
              Vendor Network
            </p>
            <h2 className="text-[36px] font-bold text-[#0C2340] mb-4">
              Join our global network of language professionals
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              We partner with freelance translators, interpreters, transcribers, clinician reviewers, and cognitive debriefing consultants across 130+ languages. One application for any role below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {vendorRoles.map((role) => (
              <a
                key={role.title}
                href={`${APPLY_URL}?${role.query}`}
                className="group bg-[#F8FAFC] rounded-xl p-6 hover:shadow-lg transition-all border border-transparent hover:border-[#0891B2]"
              >
                <div className="w-12 h-12 bg-[#0891B2]/10 rounded-lg flex items-center justify-center mb-4">
                  <role.icon className="w-6 h-6 text-[#0891B2]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0C2340] mb-2">
                  {role.title}
                </h3>
                <p className="text-[#4B5563] mb-4 text-sm leading-relaxed">
                  {role.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[#0891B2] font-semibold text-sm group-hover:gap-2 transition-all">
                  Apply for this role
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a
              href={APPLY_URL}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#06B6D4] transition-colors"
            >
              Start your application
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-sm text-[#4B5563] mt-3">
              The full form takes ~10 minutes. Decision typically within 3–7 business days.
            </p>
          </div>
        </div>
      </section>

      {/* Freelance Linguists Section */}
      <section id="freelance" className="py-24 bg-[#0C2340]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="rounded-2xl p-12 text-center bg-gradient-to-br from-[#0C2340] to-[#1a3a5c]">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-[#06B6D4]" />
            </div>
            <h2 className="text-[36px] font-bold text-white mb-4">
              {tFreelance('heading')}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              {tFreelance('description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={APPLY_URL}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#06B6D4] transition-colors"
              >
                {tFreelance('cta')}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              {tFreelance('note')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[800px] mx-auto px-8 text-center">
          <h2 className="text-[36px] font-bold text-[#0C2340] mb-4">
            {tContact('heading')}
          </h2>
          <p className="text-lg text-[#4B5563] mb-8">
            {tContact('description')}
          </p>
          <div className="bg-gray-50 rounded-xl p-8 inline-block">
            <p className="text-[#4B5563] mb-2">{tContact('label')}</p>
            <a
              href="mailto:careers@cethos.com"
              className="text-xl font-semibold text-[#0891B2] hover:text-[#06B6D4] transition-colors"
            >
              careers@cethos.com
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
