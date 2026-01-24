'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Phone,
  Mail,
  CheckCircle,
  Shield,
  Clock,
  Award,
  Star,
  BadgeCheck,
  Upload,
  FileText,
  Download,
  DollarSign,
  Car,
  CreditCard,
  Building2
} from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { CertifiedQuoteForm } from '@/components/forms/CertifiedQuoteForm'

// =============================================================================
// DATA
// =============================================================================

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Government Approved',
    description: 'Officially recognized by the Government of Alberta for translation services. Your documents will be accepted at any Alberta Registry.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Standard 2-3 business days, rush 24-hour, or same-day service available for urgent registry appointments.',
  },
  {
    icon: Award,
    title: 'Certified & Stamped',
    description: 'Every translation includes our official certification stamp, translator declaration, and notarization upon request.',
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'Flat rate from $65 per document. No hidden fees. Price includes certification and digital delivery.',
  },
]

const driversLicenseDocuments = [
  'Foreign driver\'s licenses (all countries)',
  'International driving permits',
  'National ID cards',
  'Passport bio pages',
  'Residency permits',
]

const vehicleDocuments = [
  'Vehicle registration certificates',
  'Vehicle ownership documents',
  'Insurance documents',
  'Import/export permits',
  'Inspection certificates',
]

const acceptedByLocations = [
  { name: 'Service Alberta', icon: Building2 },
  { name: 'Alberta Registries', icon: Building2 },
  { name: 'Alberta Transportation', icon: Car },
  { name: 'All Registry Agent Locations', icon: Building2 },
  { name: 'Insurance Providers', icon: CreditCard },
]

const howItWorks = [
  {
    step: 1,
    icon: Upload,
    title: 'Upload Your Document',
    description: 'Take a clear photo or scan of your driver\'s license or vehicle document. We accept all image formats and PDFs.',
  },
  {
    step: 2,
    icon: FileText,
    title: 'We Translate & Certify',
    description: 'Our certified translators accurately translate your document and apply our official certification stamp.',
  },
  {
    step: 3,
    icon: Shield,
    title: 'Quality Review',
    description: 'Every translation undergoes quality review to ensure accuracy and compliance with Alberta Registry requirements.',
  },
  {
    step: 4,
    icon: Download,
    title: 'Receive Your Translation',
    description: 'Get your certified translation by secure email (PDF) and optional physical copy by mail or pickup.',
  },
]

const pricingTable = [
  { service: "Driver's License", price: 'From $65', turnaround: '2-3 business days' },
  { service: 'Vehicle Registration', price: 'From $65', turnaround: '2-3 business days' },
  { service: 'ID Card', price: 'From $65', turnaround: '2-3 business days' },
  { service: 'Rush Service', price: '+$30', turnaround: '24 hours' },
  { service: 'Same-Day Service', price: '+$50', turnaround: 'Same day' },
  { service: 'Notarization', price: '+$25', turnaround: 'Included with delivery' },
  { service: 'Physical Mail Copy', price: '+$15', turnaround: '2-3 days Canada Post' },
]

const faqs = [
  {
    question: 'Will my translated driver\'s license be accepted at Alberta Registries?',
    answer: 'Yes. Cethos Solutions Inc. is approved by the Government of Alberta to provide certified translation services. Our translations are accepted at all Service Alberta locations, Alberta Registry agents, and Alberta Transportation offices.',
  },
  {
    question: 'Can I use my translated license to drive in Alberta?',
    answer: 'A translated license alone does not permit you to drive. New Alberta residents must exchange their foreign license for an Alberta driver\'s license within 90 days of becoming a resident. Our translation is required as part of the exchange process at Alberta Registries.',
  },
  {
    question: 'What if my license is in a non-Latin script (Chinese, Arabic, Korean, etc.)?',
    answer: 'We translate from all languages and scripts, including Chinese, Arabic, Korean, Farsi, Hindi, Punjabi, Ukrainian, and 200+ others. The original script will be accurately transliterated and translated.',
  },
  {
    question: 'How do I submit my document?',
    answer: 'Simply take a clear photo or scan of your driver\'s license (front and back) and upload it through our quote form. We accept JPG, PNG, and PDF formats.',
  },
  {
    question: 'Do you offer notarization?',
    answer: 'Yes. Notarization is available for an additional $25 and can be completed the same day. Some registry agents may request notarized translations for certain foreign documents.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Certified Translation', url: '/services/certified' },
  { name: "Driver's License Translation", url: '/services/certified/drivers-license-translation' },
]

// =============================================================================
// COMPONENT
// =============================================================================

export default function DriversLicenseContent() {
  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <LandingLocalBusinessJsonLd areaServed={['Calgary', 'Edmonton', 'Alberta', 'Canada']} />
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* ===================================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================================== */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-16 md:py-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div className="max-w-xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0891B2]/10 rounded-full mb-4"
              >
                <BadgeCheck className="w-4 h-4 text-[#0891B2]" />
                <span className="text-sm font-semibold text-[#0891B2]">Government of Alberta Approved</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[36px] md:text-[44px] font-bold text-[#0C2340] leading-[1.1] mb-4"
              >
                Driver&apos;s License Translation Services in Alberta
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-6"
              >
                Certified translations accepted by Service Alberta, Alberta Registries, and all provincial licensing authorities. Fast, accurate, and officially recognized.
              </motion.p>

              {/* Price Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0891B2]/10 rounded-full mb-6"
              >
                <span className="text-[#0891B2] font-bold text-lg">From $65</span>
                <span className="text-slate-600">per document</span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <button
                  onClick={scrollToForm}
                  className="px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
                >
                  Get Your Translation
                </button>
                <a
                  href="tel:5876000786"
                  className="px-6 py-3 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> (587) 600-0786
                </a>
              </motion.div>

              {/* Trust Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-3"
              >
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#0891B2]" />
                    Government of Alberta Approved
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#0891B2]" />
                    100% Acceptance Guaranteed
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    139 Five-Star Reviews
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0891B2]" />
                    Same-Day Available
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Quote Form */}
            <motion.div
              id="quote-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-[#0C2340] mb-2">Get Your Free Quote</h2>
              <p className="text-slate-600 mb-6">Upload your driver&apos;s license for a quick quote.</p>
              <CertifiedQuoteForm
                defaultDocumentType="drivers-license"
                formLocation="drivers-license-translation"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* WHY CHOOSE US */}
      {/* ===================================================================== */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Why Choose Cethos for Your Translation</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Trusted by thousands of Alberta residents for official document translations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-[#0891B2]" />
                  </div>
                  <h3 className="font-semibold text-[#0C2340] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* DOCUMENTS WE TRANSLATE */}
      {/* ===================================================================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Documents We Translate for Alberta Registries</h2>
            <p className="text-slate-600">All document types accepted by Service Alberta and Alberta Registry Agents</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Driver's Licenses & IDs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full p-6">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-[#0891B2]/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#0891B2]" />
                  </div>
                  <h3 className="font-semibold text-[#0C2340]">Driver&apos;s Licenses & IDs</h3>
                </div>
                <ul className="space-y-3">
                  {driversLicenseDocuments.map((item, i) => (
                    <li key={i} className="text-slate-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0891B2] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* Vehicle Documents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full p-6">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-[#0891B2]/10 flex items-center justify-center">
                    <Car className="w-5 h-5 text-[#0891B2]" />
                  </div>
                  <h3 className="font-semibold text-[#0C2340]">Vehicle Documents</h3>
                </div>
                <ul className="space-y-3">
                  {vehicleDocuments.map((item, i) => (
                    <li key={i} className="text-slate-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0891B2] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* ACCEPTED BY */}
      {/* ===================================================================== */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Accepted at All Alberta Locations</h2>
            <p className="text-slate-600">Our certified translations are recognized province-wide</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-8">
            {acceptedByLocations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <location.icon className="w-5 h-5 text-[#0891B2]" />
                <span className="font-medium text-[#0C2340]">{location.name}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-slate-600 text-sm max-w-2xl mx-auto">
            Cethos Solutions Inc. is approved by the Government of Alberta to provide certified translation services.
          </p>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* HOW IT WORKS */}
      {/* ===================================================================== */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-4">Get Your Translation in 4 Easy Steps</h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Simple, fast, and hassle-free process from start to finish.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative"
              >
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-[#0891B2]/30" />
                )}
                <div className="w-14 h-14 rounded-full bg-[#0891B2] text-white flex items-center justify-center mx-auto mb-4 relative z-10">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* PRICING */}
      {/* ===================================================================== */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-600">Flat rates for all driver&apos;s license and vehicle document translations</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2340]">Document Type</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[#0C2340]">Price</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-[#0C2340]">Turnaround</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingTable.map((row, index) => (
                    <tr key={index} className={index > 0 ? 'border-t border-slate-200' : ''}>
                      <td className="px-6 py-4 text-slate-700">{row.service}</td>
                      <td className="px-6 py-4 text-center font-semibold text-[#0891B2]">{row.price}</td>
                      <td className="px-6 py-4 text-right text-slate-600 text-sm">{row.turnaround}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <p className="text-center text-sm text-slate-500 mt-4">
              All prices include certification stamp and digital PDF delivery.
            </p>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* FAQ */}
      {/* ===================================================================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">Frequently Asked Questions</h2>
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
      {/* FINAL CTA */}
      {/* ===================================================================== */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Exchange Your Foreign License?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Get your Government of Alberta approved translation today. Fast turnaround, guaranteed acceptance.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={scrollToForm}
                className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
              >
                Start Your Translation
              </button>
              <a
                href="tel:5876000786"
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> (587) 600-0786
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4" />
                Government of Alberta Approved
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                100% Acceptance Guarantee
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Same-Day Available
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* RELATED LINKS */}
      {/* ===================================================================== */}
      <section className="py-12 bg-white border-t">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Related Services</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/certified/immigration-translation-services" className="text-[#0891B2] hover:underline">
              Immigration Translation Services
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/birth-certificate-translation" className="text-[#0891B2] hover:underline">
              Birth Certificate Translation
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/pr-citizenship-translation" className="text-[#0891B2] hover:underline">
              PR & Citizenship Packages
            </Link>
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
