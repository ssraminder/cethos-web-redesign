'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  Mail,
  CheckCircle,
  Shield,
  Clock,
  Award,
  FileText,
  GraduationCap,
  Heart,
  Scale,
  Globe,
  BadgeCheck,
  Star,
  Car,
  FileBadge,
  Plane,
  Users,
  ScrollText,
  HeartHandshake,
  School,
  FilePen,
} from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { StickyMobileCTA } from '@/components/landing'
import { EmbeddedCertifiedQuoteForm } from '@/components/forms/EmbeddedCertifiedQuoteForm'

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Certified Translation', url: '/services/certified' },
  { name: 'Documents', url: '/services/certified/documents' },
]

const documentCategories = [
  {
    heading: 'Personal Documents',
    icon: FileText,
    docs: [
      {
        icon: FileText,
        title: 'Birth Certificate',
        desc: 'IRCC-accepted certified translation for immigration, passport, and PR applications.',
        price: 'From $55',
        href: '/services/certified/birth-certificate-translation',
        popular: true,
      },
      {
        icon: Heart,
        title: 'Marriage Certificate',
        desc: 'Required for spousal sponsorship, name changes, and legal proceedings.',
        price: 'From $55',
        href: '/services/certified/marriage-certificate-translation',
        popular: true,
      },
      {
        icon: HeartHandshake,
        title: 'Divorce Certificate',
        desc: 'Certified divorce decrees and dissolution orders translated for IRCC and courts.',
        price: 'From $55',
        href: '/services/certified/divorce-certificate-translation',
      },
      {
        icon: Car,
        title: "Driver's License",
        desc: 'Accepted at all Alberta Registries — both sides translated, certified.',
        price: 'From $55',
        href: '/services/certified/drivers-license-translation',
        popular: true,
      },
    ],
  },
  {
    heading: 'Academic Documents',
    icon: GraduationCap,
    docs: [
      {
        icon: GraduationCap,
        title: 'Academic Transcripts',
        desc: 'Diplomas, degrees, and transcripts translated for WES, IQAS, and Canadian universities.',
        price: 'From $55',
        href: '/services/certified/academic-transcript-translation',
      },
      {
        icon: School,
        title: 'IQAS Alberta',
        desc: 'Translations formatted for International Qualifications Assessment Service (Alberta).',
        price: 'From $55',
        href: '/services/certified/iqas-alberta',
      },
      {
        icon: FileBadge,
        title: 'WES Evaluation',
        desc: 'Certified translations meeting World Education Services document requirements.',
        price: 'From $55',
        href: '/services/certified/wes-evaluation',
      },
    ],
  },
  {
    heading: 'Immigration & Legal',
    icon: Scale,
    docs: [
      {
        icon: Shield,
        title: 'Police Clearance Certificate',
        desc: 'Background check translations for IRCC, work permits, and study permits.',
        price: 'From $55',
        href: '/services/certified/police-clearance-translation',
      },
      {
        icon: Globe,
        title: 'Immigration Documents',
        desc: 'Full document packages translated for IRCC, refugee, and work permit applications.',
        price: 'From $55',
        href: '/services/certified/immigration-translation-services',
        popular: true,
      },
      {
        icon: Award,
        title: 'PR & Citizenship',
        desc: 'Document translations for permanent residency renewals and citizenship applications.',
        price: 'From $55',
        href: '/services/certified/pr-citizenship-translation',
      },
      {
        icon: Plane,
        title: 'Express Entry',
        desc: 'Fast-tracked translations meeting Express Entry timeline requirements.',
        price: 'From $55',
        href: '/services/certified/express-entry',
      },
      {
        icon: Users,
        title: 'Spousal Sponsorship',
        desc: 'Complete document packages for inland and outland spousal sponsorship applications.',
        price: 'From $55',
        href: '/services/certified/spousal-sponsorship',
      },
    ],
  },
]

const faqs = [
  {
    question: 'What is a certified translated document?',
    answer:
      'A certified translated document is a translation accompanied by a signed certificate of accuracy from a qualified translator, confirming that the translation is true and complete. In Canada, certified translations are required by IRCC, Alberta Registries, universities, courts, and most government bodies. Cethos translations include the certificate, translator credentials, and notarization on request.',
  },
  {
    question: 'Which documents do you offer certified translation for?',
    answer:
      'We translate any document — birth certificates, marriage certificates, divorce decrees, driver’s licenses, passports, academic transcripts, diplomas, police clearance certificates, employment letters, bank statements, medical records, court documents, immigration paperwork, and more. If you do not see your document type listed, send us the document and we will provide a quote within hours.',
  },
  {
    question: 'How long does certified translation take?',
    answer:
      'Standard turnaround is 1–2 business days for most single-page documents. Same-day rush service is available — submit before noon to receive your translation by end of day. Multi-page packages typically take 2–4 business days. Express Entry and time-sensitive immigration deadlines can be accommodated.',
  },
  {
    question: 'Will my certified translation be accepted by IRCC?',
    answer:
      'Yes. All Cethos certified translations are accepted by Immigration, Refugees and Citizenship Canada (IRCC), Alberta Registries, the Government of Alberta, Canadian universities, WES, IQAS, courts, and notaries. We provide a 100% acceptance guarantee — if any government body rejects our translation for certification reasons, we will correct it free of charge.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Certified translations start at $55 per page. Multi-page orders receive automatic discounts: 5% off 2-page orders, 10% off 3+ page orders. Notarization is included free of charge. Same-day rush service is available with a small surcharge. Get an exact quote in under 60 seconds using the form on this page.',
  },
  {
    question: 'Do I need to mail you the original document?',
    answer:
      'No. Send us a clear scan or photo of your document by email or upload through our quote form. We translate from the digital copy and email you the certified PDF. If you need a hard-copy with raised seal, we can mail it to your address — most clients are fine with the digital certified PDF.',
  },
  {
    question: 'What languages do you translate?',
    answer:
      'We work in over 60 languages including Punjabi, Hindi, Urdu, Mandarin, Cantonese, Arabic, Tagalog, Spanish, French, Vietnamese, Korean, Japanese, Farsi, Russian, Portuguese, German, Italian, Polish, Ukrainian, Turkish, Tamil, Telugu, Bengali, and Gujarati. Tell us your source and target languages on the quote form.',
  },
]

const trustItems = [
  { icon: Shield, label: 'IRCC Accepted' },
  { icon: BadgeCheck, label: 'Government of Alberta Approved' },
  { icon: Award, label: 'Notarization Included' },
  { icon: Clock, label: 'Same-Day Available' },
  { icon: Star, label: '139+ Five-Star Reviews' },
]

const processSteps = [
  {
    step: 1,
    title: 'Send Your Document',
    desc: 'Upload a scan or photo. No need to mail the original.',
  },
  {
    step: 2,
    title: 'Get Your Quote',
    desc: 'Exact price in under 60 seconds. No surprises.',
  },
  {
    step: 3,
    title: 'We Translate & Certify',
    desc: 'Standard 1–2 business days. Same-day rush available.',
  },
  {
    step: 4,
    title: 'Receive Certified PDF',
    desc: 'Print-ready, signed, and stamped. Hard copies on request.',
  },
]

export default function DocumentsHubContent() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Hero with embedded form */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-16 md:py-20">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4"
              >
                Certified Translated Documents
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[36px] md:text-[44px] font-bold text-[#0C2340] leading-[1.1] mb-6"
              >
                Get Your Document Certified Translated in Calgary
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-4"
              >
                Birth certificates, marriage certificates, driver’s licenses, transcripts, immigration documents — every certified translation we deliver is accepted by IRCC, Alberta Registries, universities, and Canadian government bodies.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-6"
              >
                From $55 per page. Notarization included. Same-day rush service available.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0891B2]/10 rounded-full mb-6"
              >
                <span className="text-[#0891B2] font-bold text-lg">From $55</span>
                <span className="text-slate-600">per page · all certifications included</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <a
                  href="tel:5876000786"
                  className="px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> (587) 600-0786
                </a>
                <a
                  href="#document-types"
                  className="px-6 py-3 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  Choose Document Type <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#4B5563]"
              >
                {trustItems.map((item) => (
                  <span key={item.label} className="flex items-center gap-2">
                    <item.icon className={`w-5 h-5 ${item.label.includes('Reviews') ? 'text-yellow-500 fill-yellow-500' : 'text-[#0891B2]'}`} />
                    {item.label}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              id="quote-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            >
              <EmbeddedCertifiedQuoteForm formLocation="certified-documents-hub" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Document type cards — the main funnel */}
      <section id="document-types" className="py-16 bg-slate-50 scroll-mt-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              What document do you need translated?
            </h2>
            <p className="text-slate-600 text-lg">
              Choose your document type below for pricing, requirements, and turnaround time.
            </p>
          </div>

          {documentCategories.map((category) => (
            <div key={category.heading} className="mb-12 last:mb-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#0891B2]/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-[#0891B2]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0C2340]">{category.heading}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.docs.map((doc, index) => (
                  <motion.div
                    key={doc.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link href={doc.href}>
                      <Card hover className="h-full p-6 group relative">
                        {doc.popular && (
                          <div className="absolute -top-3 right-4 px-3 py-1 bg-[#0891B2] text-white text-xs font-semibold rounded-full">
                            Popular
                          </div>
                        )}

                        <div className="w-12 h-12 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mb-4 group-hover:bg-[#0891B2] transition-colors">
                          <doc.icon className="w-6 h-6 text-[#0891B2] group-hover:text-white transition-colors" />
                        </div>

                        <h4 className="font-semibold text-[#0C2340] mb-2 group-hover:text-[#0891B2] transition-colors">
                          {doc.title}
                        </h4>

                        <p className="text-sm text-slate-600 mb-4">{doc.desc}</p>

                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-[#0891B2]">{doc.price}</span>
                          <span className="flex items-center gap-1 text-sm text-[#0891B2] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            View details <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">Don’t see your document type?</p>
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
            >
              Get a custom quote <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Container>
      </section>

      {/* Pricing strip */}
      <section className="py-12 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-50 to-[#E0F2FE]/50 border border-slate-200 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="text-sm font-semibold uppercase tracking-wide text-[#0891B2] mb-2">
                Transparent Pricing
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0C2340]">
                Every document, one simple price
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-[#0C2340]">From $55</div>
                <div className="text-sm text-slate-600">per page</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0C2340]">5%</div>
                <div className="text-sm text-slate-600">off 2-page orders</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0C2340]">10%</div>
                <div className="text-sm text-slate-600">off 3+ page orders</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#0C2340]">FREE</div>
                <div className="text-sm text-slate-600">notarization</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-4">How it works</h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            From document upload to certified translation, in four simple steps.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative"
              >
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-[#0891B2]/30" />
                )}

                <div className="w-14 h-14 rounded-full bg-[#0891B2] text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold relative z-10">
                  {item.step}
                </div>

                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* What "certified" means */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">
              What makes a translation “certified”?
            </h2>
            <p className="text-slate-600 text-lg">
              A certified translated document includes everything Canadian government bodies need to verify and accept it.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6">
              <ScrollText className="w-10 h-10 text-[#0891B2] mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Certificate of Accuracy</h3>
              <p className="text-sm text-slate-600">
                A signed declaration from the translator confirming the translation is true and complete.
              </p>
            </Card>
            <Card className="p-6">
              <FilePen className="w-10 h-10 text-[#0891B2] mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Translator Credentials</h3>
              <p className="text-sm text-slate-600">
                Full name, contact information, and credentials of the certified translator on the document.
              </p>
            </Card>
            <Card className="p-6">
              <BadgeCheck className="w-10 h-10 text-[#0891B2] mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Notarization Included</h3>
              <p className="text-sm text-slate-600">
                Notary stamp and seal at no extra charge for documents that require it.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-[#0C2340] mb-3 flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-1" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-slate-600 ml-7">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0C2340] to-[#164e63]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to get your document certified translated?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Upload your document for a quote in under 60 seconds — or call us directly. Same-day rush service available.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:5876000786"
                className="px-8 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> (587) 600-0786
              </a>
              <a
                href="#quote-form"
                className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
              >
                <Mail className="w-5 h-5" /> Get a Free Quote
              </a>
            </div>

            <p className="text-white/60 text-sm mt-6">
              IRCC accepted · Alberta Registries approved · 100% acceptance guarantee
            </p>
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
