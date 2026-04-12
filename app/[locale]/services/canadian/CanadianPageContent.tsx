'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  CheckCircle,
  ArrowRight,
  MapPin,
  FileText,
  Shield,
  Building2,
  Scale,
  Globe,
  Heart,
  Users,
  Languages
} from 'lucide-react'
import { Container, Card, SectionHeading } from '@/components/ui'
import { CTA } from '@/components/sections'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

export default function CanadianPageContent() {
  const tHero = useTranslations('service.canadian.hero')
  const tNav = useTranslations('service.canadian.nav')
  const tQuebec = useTranslations('service.canadian.quebec')
  const tBill96 = useTranslations('service.canadian.bill96')
  const tGov = useTranslations('service.canadian.government')
  const tHealth = useTranslations('service.canadian.health')
  const tIndigenous = useTranslations('service.canadian.indigenous')
  const tFaq = useTranslations('service.canadian.faq')

  const quebecServices = [
    tQuebec('svc_1'),
    tQuebec('svc_2'),
    tQuebec('svc_3'),
    tQuebec('svc_4'),
    tQuebec('svc_5'),
  ]

  const bill96Services = [
    { title: tBill96('svc1_title'), description: tBill96('svc1_desc') },
    { title: tBill96('svc2_title'), description: tBill96('svc2_desc') },
    { title: tBill96('svc3_title'), description: tBill96('svc3_desc') },
    { title: tBill96('svc4_title'), description: tBill96('svc4_desc') },
    { title: tBill96('svc5_title'), description: tBill96('svc5_desc') },
  ]

  const governmentServices = [
    tGov('svc_1'),
    tGov('svc_2'),
    tGov('svc_3'),
    tGov('svc_4'),
    tGov('svc_5'),
    tGov('svc_6'),
  ]

  const healthCanadaServices = [
    { title: tHealth('svc1_title'), description: tHealth('svc1_desc') },
    { title: tHealth('svc2_title'), description: tHealth('svc2_desc') },
    { title: tHealth('svc3_title'), description: tHealth('svc3_desc') },
    { title: tHealth('svc4_title'), description: tHealth('svc4_desc') },
    { title: tHealth('svc5_title'), description: tHealth('svc5_desc') },
  ]

  const indigenousLanguages = [
    { name: tIndigenous('lang1_name'), dialects: tIndigenous('lang1_dialects') },
    { name: tIndigenous('lang2_name'), dialects: tIndigenous('lang2_dialects') },
    { name: tIndigenous('lang3_name'), dialects: tIndigenous('lang3_dialects') },
    { name: tIndigenous('lang4_name'), dialects: tIndigenous('lang4_dialects') },
    { name: tIndigenous('lang5_name'), dialects: tIndigenous('lang5_dialects') },
  ]

  const indigenousServices = [
    tIndigenous('isvc_1'),
    tIndigenous('isvc_2'),
    tIndigenous('isvc_3'),
    tIndigenous('isvc_4'),
    tIndigenous('isvc_5'),
    tIndigenous('isvc_6'),
  ]

  const faqs = [
    { question: tFaq('q1'), answer: tFaq('a1') },
    { question: tFaq('q2'), answer: tFaq('a2') },
    { question: tFaq('q3'), answer: tFaq('a3') },
    { question: tFaq('q4'), answer: tFaq('a4') },
  ]

  return (
    <>
      <ServiceJsonLd
        name="Canadian Translation Services"
        description="Specialized Canadian translation services including Quebec French, Bill 96 compliance, Health Canada submissions, and Indigenous language services."
        url="https://cethos.com/services/canadian"
      />
      <FAQJsonLd faqs={faqs} />

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
              <div className="flex items-center gap-4 text-sm text-[#4B5563]">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#0891B2]" />
                  {tHero('trust_location')}
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0891B2]" />
                  {tHero('trust_compliance')}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[400px] h-[400px] bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <div className="text-8xl mb-4">🍁</div>
                  <p className="text-red-600 font-semibold">{tHero('image_text')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Navigation */}
      <section className="py-8 bg-white border-b">
        <Container>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: tNav('quebec_french'), href: '#quebec-french' },
              { name: tNav('bill_96'), href: '#bill-96' },
              { name: tNav('government'), href: '#government' },
              { name: tNav('health_canada'), href: '#health-canada' },
              { name: tNav('indigenous'), href: '#indigenous' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 bg-slate-100 hover:bg-teal-100 text-slate-700 hover:text-teal-700 rounded-lg text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Quebec French Section */}
      <section id="quebec-french" className="section-padding">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                <Languages className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
                {tQuebec('heading')}
              </h2>
              <p className="text-lg text-[#4B5563] mb-6">
                {tQuebec('description')}
              </p>
              <div className="space-y-3">
                {quebecServices.map((service, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Card className="p-6 bg-blue-50 border-blue-200">
                <h3 className="text-xl font-bold text-[#0C2340] mb-4">{tQuebec('oqlf_title')}</h3>
                <p className="text-slate-600 mb-4">
                  {tQuebec('oqlf_desc')}
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                    <span>{tQuebec('oqlf_1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                    <span>{tQuebec('oqlf_2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                    <span>{tQuebec('oqlf_3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                    <span>{tQuebec('oqlf_4')}</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Bill 96 Section */}
      <section id="bill-96" className="section-padding bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-6">
              <Scale className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              {tBill96('heading')}
            </h2>
            <p className="text-lg text-[#4B5563]">
              {tBill96('description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bill96Services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6">
                  <h3 className="font-semibold text-[#0C2340] mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-600">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-200 flex items-center justify-center flex-shrink-0">
                <Scale className="w-6 h-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0C2340] mb-2">{tBill96('req_title')}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-700">
                  <li>{tBill96('req_1')}</li>
                  <li>{tBill96('req_2')}</li>
                  <li>{tBill96('req_3')}</li>
                  <li>{tBill96('req_4')}</li>
                  <li>{tBill96('req_5')}</li>
                  <li>{tBill96('req_6')}</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Government Services Section */}
      <section id="government" className="section-padding">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
                {tGov('heading')}
              </h2>
              <p className="text-lg text-[#4B5563] mb-6">
                {tGov('description')}
              </p>
              <div className="space-y-3">
                {governmentServices.map((service, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Card className="p-6 bg-red-50 border-red-200">
                <Shield className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-[#0C2340] mb-4">{tGov('security_title')}</h3>
                <p className="text-slate-600 mb-4">
                  {tGov('security_desc')}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-slate-700">{tGov('clearance_1')}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-slate-700">{tGov('clearance_2')}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-slate-700">{tGov('clearance_3')}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Health Canada Section */}
      <section id="health-canada" className="section-padding bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              {tHealth('heading')}
            </h2>
            <p className="text-lg text-[#4B5563]">
              {tHealth('description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthCanadaServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6">
                  <FileText className="w-8 h-8 text-green-600 mb-4" />
                  <h3 className="font-semibold text-[#0C2340] mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-600">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">
              {tHealth('note')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[tHealth('badge_1'), tHealth('badge_2'), tHealth('badge_3'), tHealth('badge_4')].map((item) => (
                <span key={item} className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Indigenous Languages Section */}
      <section id="indigenous" className="section-padding">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              {tIndigenous('heading')}
            </h2>
            <p className="text-lg text-[#4B5563]">
              {tIndigenous('description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#0C2340] mb-6">{tIndigenous('languages_heading')}</h3>
              <div className="space-y-4">
                {indigenousLanguages.map((lang) => (
                  <Card key={lang.name} className="p-4">
                    <h4 className="font-semibold text-[#0C2340] mb-1">{lang.name}</h4>
                    <p className="text-sm text-slate-600">{lang.dialects}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#0C2340] mb-6">{tIndigenous('services_heading')}</h3>
              <div className="space-y-3">
                {indigenousServices.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{service}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-purple-100 rounded-lg">
                <p className="text-purple-800 text-sm">
                  <strong>{tIndigenous('sensitivity_label')}</strong> {tIndigenous('sensitivity_note')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-slate-50">
        <Container>
          <SectionHeading
            title={tFaq('heading')}
            subtitle={tFaq('subtitle')}
            className="mb-12"
          />
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-[#0C2340] mb-3">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  )
}
