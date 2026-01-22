'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
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

const quebecServices = [
  'Quebec terminology standards (OQLF compliance)',
  'French-English bilingual documents',
  'European to Canadian French adaptation',
  'Quebec legal terminology',
  'Marketing transcreation for Quebec market',
]

const bill96Services = [
  { title: 'French-First Content Creation', description: 'Original content development in French following Bill 96 requirements' },
  { title: 'Consumer Contract Translation', description: 'All consumer-facing agreements and terms translated to French' },
  { title: 'Product Labeling Compliance', description: 'Product packaging and labeling meeting Quebec French requirements' },
  { title: 'Website & Digital Content', description: 'Full website localization with French prominence' },
  { title: 'Compliance Auditing', description: 'Review existing materials for Bill 96 compliance gaps' },
]

const governmentServices = [
  'Official Languages Act compliance',
  'CAN/CGSB-131.10 standard alignment',
  'Federal terminology standards',
  'Security-cleared translators available',
  'Bilingual document formatting',
  'Parliamentary and legislative translation',
]

const healthCanadaServices = [
  { title: 'New Drug Submissions (NDS)', description: 'Complete documentation packages for drug approval' },
  { title: 'Clinical Trial Applications (CTAs)', description: 'Clinical trial authorization documentation' },
  { title: 'Natural Health Products', description: 'NHP license applications and labeling' },
  { title: 'Medical Device Licensing', description: 'MDL applications and technical documentation' },
  { title: 'Product Monographs', description: 'Bilingual product monographs (English/French)' },
]

const indigenousLanguages = [
  { name: 'Cree', dialects: 'Plains Cree, Woods Cree, Swampy Cree, Moose Cree' },
  { name: 'Ojibwe/Anishinaabemowin', dialects: 'Various regional dialects' },
  { name: 'Inuktitut', dialects: 'Eastern and Western dialects' },
  { name: 'Dene', dialects: 'Multiple Dene languages' },
  { name: "Mi'kmaq", dialects: 'Atlantic Canada communities' },
]

const indigenousServices = [
  'Community engagement translation',
  'Health information translation',
  'Educational materials',
  'Oral interpretation services',
  'Cultural consultation',
  'Audio/video content localization',
]

const faqs = [
  {
    question: 'What is Bill 96 and how does it affect businesses?',
    answer: 'Bill 96 (Quebec\'s language law reform) strengthens French language requirements in Quebec. It mandates French-first communication, requires French versions of consumer contracts, and imposes French requirements for product labeling and workplace communications. Non-compliance can result in significant penalties.',
  },
  {
    question: 'What is the difference between Quebec French and European French?',
    answer: 'Quebec French has distinct vocabulary, expressions, and terminology that differ from European French. The Office québécois de la langue française (OQLF) maintains official terminology standards. Content translated for the Quebec market must use Quebec-specific terminology to resonate with local audiences and meet regulatory requirements.',
  },
  {
    question: 'Do you have security-cleared translators for government work?',
    answer: 'Yes, we maintain a network of translators with various Canadian government security clearances. We can provide translators cleared at Reliability, Secret, and Top Secret levels for sensitive government documentation.',
  },
  {
    question: 'Can you translate into Indigenous languages?',
    answer: 'Yes, we offer translation and interpretation services for several Indigenous languages including Cree (various dialects), Ojibwe/Anishinaabemowin, Inuktitut, Dene languages, and Mi\'kmaq. We work with native speakers from Indigenous communities to ensure cultural accuracy.',
  },
]

export default function CanadianPageContent() {
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
                CANADIAN SPECIALIZATIONS
              </div>
              <h1 className="text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6">
                Canadian Translation Services
              </h1>
              <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
                Specialized language services for the Canadian market—from Quebec French and Bill 96 compliance to Health Canada submissions and Indigenous language services.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <Link href="/get-quote" className="px-6 py-4 bg-[#0891B2] text-white rounded-lg hover:bg-[#06B6D4] transition-colors text-base font-semibold flex items-center gap-2">
                  Get a Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="px-6 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg hover:bg-[#F8FAFC] transition-colors text-base font-semibold">
                  Contact Us
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-[#4B5563]">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#0891B2]" />
                  Calgary Headquarters
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0891B2]" />
                  PIPEDA Compliant
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[400px] h-[400px] bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <div className="text-8xl mb-4">🍁</div>
                  <p className="text-red-600 font-semibold">Canadian Translation Experts</p>
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
              { name: 'Quebec French', href: '#quebec-french' },
              { name: 'Bill 96 Compliance', href: '#bill-96' },
              { name: 'Government Services', href: '#government' },
              { name: 'Health Canada', href: '#health-canada' },
              { name: 'Indigenous Languages', href: '#indigenous' },
            ].map((item) => (
              <a
                key={item.name}
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
                Canadian French Translation
              </h2>
              <p className="text-lg text-[#4B5563] mb-6">
                Expert Quebec French translation services with full OQLF terminology compliance. Our Canadian French linguists understand the nuances that differentiate Quebec French from European French.
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
                <h3 className="text-xl font-bold text-[#0C2340] mb-4">OQLF Compliance</h3>
                <p className="text-slate-600 mb-4">
                  The Office québécois de la langue française (OQLF) sets the standard for French terminology in Quebec. Our translations follow OQLF guidelines to ensure:
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Correct Quebec-specific terminology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Industry-specific term validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Regulatory acceptance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Cultural appropriateness</span>
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
              Bill 96 Compliance Services
            </h2>
            <p className="text-lg text-[#4B5563]">
              Quebec&apos;s Bill 96 strengthens French language requirements for businesses operating in Quebec. We help you achieve and maintain compliance.
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
                <h3 className="text-xl font-bold text-[#0C2340] mb-2">Bill 96 Key Requirements</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-700">
                  <li>• French must be predominant on signs and displays</li>
                  <li>• Consumer contracts must be in French</li>
                  <li>• Product labeling requires French</li>
                  <li>• Trademarks must include French descriptors</li>
                  <li>• Workplace communications in French</li>
                  <li>• Government interactions in French</li>
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
                Government Translation Services
              </h2>
              <p className="text-lg text-[#4B5563] mb-6">
                Translation services compliant with Official Languages Act and CAN/CGSB standards for federal, provincial, and municipal government clients.
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
                <h3 className="text-xl font-bold text-[#0C2340] mb-4">Security Clearances Available</h3>
                <p className="text-slate-600 mb-4">
                  For sensitive government documentation, we provide translators with appropriate security clearances:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-slate-700">Reliability Status</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-slate-700">Secret Clearance</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-slate-700">Top Secret Clearance</span>
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
              Health Canada Services
            </h2>
            <p className="text-lg text-[#4B5563]">
              Bilingual translation services for Health Canada regulatory submissions, product monographs, and clinical documentation.
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
              All Health Canada submissions require bilingual documentation (English and French).
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Drug Identification Number (DIN)', 'Medical Device License (MDL)', 'Natural Product Number (NPN)', 'Clinical Trial Application (CTA)'].map((item) => (
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
              Indigenous Language Services
            </h2>
            <p className="text-lg text-[#4B5563]">
              Translation and interpretation services for Canada&apos;s Indigenous languages, working with native speakers from Indigenous communities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#0C2340] mb-6">Languages Supported</h3>
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
              <h3 className="text-2xl font-bold text-[#0C2340] mb-6">Services</h3>
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
                  <strong>Cultural Sensitivity:</strong> We work directly with Indigenous community members to ensure translations are culturally appropriate and accurately represent Indigenous perspectives.
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
            title="Frequently Asked Questions"
            subtitle="Common questions about our Canadian translation services."
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
