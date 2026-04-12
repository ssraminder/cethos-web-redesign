'use client'

import Link from 'next/link'
import { Briefcase, Globe, TrendingUp, Heart, Layers, MapPin, Clock, Building } from 'lucide-react'
import { useTranslations } from 'next-intl'

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
                href="#positions"
                className="inline-flex items-center justify-center px-6 py-4 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#06B6D4] transition-colors"
              >
                {tHero('cta_positions')}
              </a>
              <a
                href="#freelance"
                className="inline-flex items-center justify-center px-6 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                {tHero('cta_freelance')}
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

      {/* Freelance Linguists Section */}
      <section id="freelance" className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="bg-gradient-to-br from-[#0C2340] to-[#1a3a5c] rounded-2xl p-12 text-center">
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
                href="mailto:linguists@cethos.com?subject=Freelance Linguist Application"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#06B6D4] transition-colors"
              >
                {tFreelance('cta')}
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
