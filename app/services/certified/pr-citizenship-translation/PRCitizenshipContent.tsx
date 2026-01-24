'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, CheckCircle, Package, Star, Shield, Users, Clock, Award, BadgeCheck } from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { TrustBar, StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { CertifiedQuoteForm } from '@/components/forms/CertifiedQuoteForm'

const packages = [
  {
    name: 'Basic PR Package',
    price: '$120',
    documents: ['Birth Certificate', 'Marriage Certificate'],
    popular: false,
  },
  {
    name: 'Standard PR Package',
    price: '$175',
    documents: ['Birth Certificate', 'Marriage Certificate', 'Diploma or Degree'],
    popular: true,
  },
  {
    name: 'Complete PR Package',
    price: '$280',
    documents: ['Birth Certificate', 'Marriage Certificate', 'Diploma or Degree', 'Transcript (up to 3 pages)', 'Police Clearance'],
    popular: false,
  },
  {
    name: 'Citizenship Package',
    price: 'Custom',
    documents: ['All required citizenship documents', 'Personalized based on your needs'],
    popular: false,
  },
]

const includedFeatures = [
  'Certified translation by IRCC-compliant translators',
  'Commissioner certification for all documents',
  'Consistent formatting across all translations',
  'Single point of contact for all documents',
  'Bundled pricing savings',
  'Digital and physical copies',
  'Lifetime accuracy guarantee',
  'Priority processing available',
]

const applicationTypes = [
  { title: 'Express Entry', description: 'Federal Skilled Worker, CEC, Federal Skilled Trades' },
  { title: 'Provincial Nominee', description: 'Alberta AINP, Ontario OINP, BC PNP, and more' },
  { title: 'Spousal Sponsorship', description: 'Spouse or common-law partner sponsorship' },
  { title: 'Citizenship', description: 'Canadian citizenship applications' },
  { title: 'Family Sponsorship', description: 'Parents, grandparents, dependents' },
  { title: 'Study/Work Permits', description: 'International students and workers' },
]

const faqs = [
  {
    question: 'Why choose a package over individual translations?',
    answer: 'Packages offer significant savings—up to 20% compared to individual pricing. Plus, you get consistent formatting, a single point of contact, and coordinated delivery of all your documents.',
  },
  {
    question: 'What documents are typically needed for PR applications?',
    answer: 'Most PR applications require: birth certificate, marriage/divorce certificates (if applicable), educational credentials (degrees, transcripts), police clearance certificates, and employment letters. The exact requirements depend on your immigration program.',
  },
  {
    question: 'Can you customize a package for my specific needs?',
    answer: 'Absolutely. Contact us with your document list and we\'ll create a custom package with bundled pricing. We handle applications for Express Entry, PNP, sponsorship, and more.',
  },
  {
    question: 'How long does it take to translate a full document package?',
    answer: 'Standard service for a complete package is 3-5 business days. Rush service is available if you need it faster. We coordinate all translations to ensure consistent delivery.',
  },
  {
    question: 'Do you handle documents for the whole family?',
    answer: 'Yes, we regularly translate documents for principal applicants and all accompanying family members. We can create a family package with all the documents you need.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Certified Translation', url: '/services/certified' },
  { name: 'PR & Citizenship Translation', url: '/services/certified/pr-citizenship-translation' },
]

export default function PRCitizenshipContent() {
  return (
    <>
      <LandingLocalBusinessJsonLd areaServed={['Calgary', 'Edmonton', 'Alberta', 'Canada']} />
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-16 md:py-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="max-w-xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[36px] md:text-[44px] font-bold text-[#0C2340] leading-[1.1] mb-4"
              >
                PR & Citizenship Translation Packages
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-4"
              >
                Complete document translation for permanent residence and citizenship applications. Birth certificates, marriage documents, academic credentials, police clearances—all translated and certified.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-6"
              >
                Save up to 20% with bundled packages. All documents include commissioner certification and are IRCC-ready.
              </motion.p>

              {/* Price Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0891B2]/10 rounded-full mb-6"
              >
                <span className="text-[#0891B2] font-bold text-lg">From $120</span>
                <span className="text-slate-600">per package</span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <a
                  href="tel:5876000786"
                  className="px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> (587) 600-0786
                </a>
                <a
                  href="mailto:info@cethos.com"
                  className="px-6 py-3 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  Email Us
                </a>
              </motion.div>

              {/* Trust Badges - 2 rows */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-3"
              >
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#0891B2]" />
                    100% IRCC Accepted
                  </span>
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-[#0891B2]" />
                    Gov&apos;t of Alberta Approved
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0891B2]" />
                    Same-Day Available
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#0891B2]" />
                    Notarization Included
                  </span>
                  <span className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    139 Five-Star Reviews
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.div
              id="quote-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-[#0C2340] mb-2">Get a Custom Quote</h2>
              <p className="text-slate-600 mb-6">Tell us about your documents for package pricing.</p>
              <CertifiedQuoteForm formLocation="pr-citizenship-translation" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">Translation Packages</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Save up to 20% with our bundled packages. All packages include commissioner certification.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-teal-600 text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <Card className={`h-full p-6 ${pkg.popular ? 'border-2 border-teal-600 ring-2 ring-teal-100' : ''}`}>
                  <h3 className="font-bold text-[#0C2340] mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-teal-600 mb-4">{pkg.price}</div>
                  <ul className="space-y-2 mb-6">
                    {pkg.documents.map((doc, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#quote-form"
                    className={`block w-full py-2 rounded-lg font-medium text-center transition-colors ${
                      pkg.popular
                        ? 'bg-teal-600 text-white hover:bg-teal-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Select Package
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">What&apos;s Included in Every Package</h2>
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {includedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Application Types */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">Immigration Programs We Support</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            We provide translation packages for all Canadian immigration programs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {applicationTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="p-4">
                  <h3 className="font-semibold text-[#0C2340] mb-1">{type.title}</h3>
                  <p className="text-sm text-slate-600">{type.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Packages */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose a Translation Package?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Package className="w-7 h-7 text-teal-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Bundle Savings</h3>
              <p className="text-white/70 text-sm">Save up to 20% compared to individual document pricing.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-teal-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Single Point of Contact</h3>
              <p className="text-white/70 text-sm">One project manager handles all your documents.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-teal-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Consistent Quality</h3>
              <p className="text-white/70 text-sm">All documents formatted consistently for your application.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">Frequently Asked Questions</h2>
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

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0C2340] to-[#164e63]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Start Your PR or Citizenship Application Today</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Complete document packages from $120. All translations IRCC-accepted with notarization included.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:5876000786"
                className="px-8 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> (587) 600-0786
              </a>
              <a
                href="mailto:info@cethos.com"
                className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
              >
                Email for Quote
              </a>
            </div>
            <p className="text-white/60 text-sm mt-6">
              From $120 • Same-day service • Government of Alberta approved
            </p>
          </div>
        </Container>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-white border-t">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Individual Document Translation</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/certified/birth-certificate-translation" className="text-[#0891B2] hover:underline">
              Birth Certificate Translation
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/marriage-certificate-translation" className="text-[#0891B2] hover:underline">
              Marriage Certificate Translation
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/academic-transcript-translation" className="text-[#0891B2] hover:underline">
              Academic Transcript Translation
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/immigration-translation-services" className="text-[#0891B2] hover:underline">
              Immigration Translation Services
            </Link>
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
