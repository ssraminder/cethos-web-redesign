'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Factory, FileText, Shield, Users, CheckCircle, ArrowRight, Settings, Clock } from 'lucide-react'

export default function ManufacturingPageContent() {
  const tHero = useTranslations('industry.manufacturing.hero')
  const tStats = useTranslations('industry.manufacturing.stats')
  const tChallenges = useTranslations('industry.manufacturing.challenges')
  const tServices = useTranslations('industry.manufacturing.services')
  const tFaq = useTranslations('industry.manufacturing.faq')
  const tCta = useTranslations('industry.manufacturing.cta')

  const stats = [
    { value: tStats('stat1_value'), label: tStats('stat1_label') },
    { value: tStats('stat2_value'), label: tStats('stat2_label') },
    { value: tStats('stat3_value'), label: tStats('stat3_label') },
    { value: tStats('stat4_value'), label: tStats('stat4_label') },
  ]

  const challenges = [
    { title: tChallenges('ch1_title'), description: tChallenges('ch1_desc') },
    { title: tChallenges('ch2_title'), description: tChallenges('ch2_desc') },
    { title: tChallenges('ch3_title'), description: tChallenges('ch3_desc') },
    { title: tChallenges('ch4_title'), description: tChallenges('ch4_desc') },
  ]

  const services = [
    tServices('svc_1'),
    tServices('svc_2'),
    tServices('svc_3'),
    tServices('svc_4'),
    tServices('svc_5'),
    tServices('svc_6'),
    tServices('svc_7'),
    tServices('svc_8'),
  ]

  const faqs = [
    { question: tFaq('q1'), answer: tFaq('a1') },
    { question: tFaq('q2'), answer: tFaq('a2') },
    { question: tFaq('q3'), answer: tFaq('a3') },
    { question: tFaq('q4'), answer: tFaq('a4') },
    { question: tFaq('q5'), answer: tFaq('a5') },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
                {tHero('eyebrow')}
              </div>
              <h1 className="text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6">
                {tHero('heading')}
              </h1>
              <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
                {tHero('description')}
              </p>
              <div className="flex items-center gap-4 mb-8">
                <Link href="/get-quote" className="px-6 py-4 bg-[#0891B2] text-white rounded-lg hover:bg-[#06B6D4] transition-colors text-base font-semibold flex items-center gap-2">
                  {tHero('cta_primary')} <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="px-6 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg hover:bg-[#F8FAFC] transition-colors text-base font-semibold">
                  {tHero('cta_secondary')}
                </Link>
              </div>
              {/* Compliance Badges */}
              <div className="flex items-center gap-6 text-sm text-[#4B5563]">
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0891B2]" />
                  {tHero('trust_1')}
                </span>
                <span className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#0891B2]" />
                  {tHero('trust_2')}
                </span>
                <span className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0891B2]" />
                  {tHero('trust_3')}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[400px] h-[400px] bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 rounded-2xl flex items-center justify-center">
                <Factory className="w-32 h-32 text-[#0891B2]" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0C2340] py-12">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              {tChallenges('heading')}
            </h2>
            <p className="text-lg text-[#4B5563] max-w-[600px] mx-auto">
              {tChallenges('description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-[#F8FAFC] rounded-lg p-8">
                <h3 className="text-xl font-semibold text-[#0C2340] mb-3">
                  {challenge.title}
                </h3>
                <p className="text-base text-[#4B5563] leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[40px] font-bold text-[#0C2340] mb-6">
                {tServices('heading')}
              </h2>
              <p className="text-lg text-[#4B5563] mb-8">
                {tServices('description')}
              </p>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#0891B2] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#4B5563]">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-[#0C2340] mb-6">
                {tServices('why_title')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">{tServices('why1_title')}</div>
                    <div className="text-sm text-[#4B5563]">{tServices('why1_desc')}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">{tServices('why2_title')}</div>
                    <div className="text-sm text-[#4B5563]">{tServices('why2_desc')}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">{tServices('why3_title')}</div>
                    <div className="text-sm text-[#4B5563]">{tServices('why3_desc')}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24">
        <div className="max-w-[800px] mx-auto px-8">
          <h2 className="text-[40px] font-bold text-[#0C2340] text-center mb-12">
            {tFaq('heading')}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#E5E7EB] pb-6">
                <h3 className="text-lg font-semibold text-[#0C2340] mb-3">
                  {faq.question}
                </h3>
                <p className="text-base text-[#4B5563] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0C2340] via-[#1A365D] to-[#0891B2] py-24">
        <div className="max-w-[800px] mx-auto px-8 text-center">
          <h2 className="text-[40px] font-bold text-white mb-4">
            {tCta('heading')}
          </h2>
          <p className="text-xl text-white/80 mb-8">
            {tCta('description')}
          </p>
          <Link href="/get-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0C2340] rounded-lg hover:bg-gray-100 transition-colors text-base font-semibold">
            {tCta('cta_primary')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
