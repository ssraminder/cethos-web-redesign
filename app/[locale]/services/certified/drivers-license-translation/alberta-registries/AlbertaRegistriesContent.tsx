'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Phone,
  CheckCircle,
  Shield,
  Clock,
  BadgeCheck,
  Upload,
  FileText,
  Download,
  Car,
  MapPin,
  Star,
  Building2,
  ArrowRight,
} from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { StickyMobileCTA } from '@/components/landing'
import { EmbeddedCertifiedQuoteForm } from '@/components/forms/EmbeddedCertifiedQuoteForm'

const REGISTRY_PARTNERS = [
  {
    city: 'Calgary',
    registries: [
      { name: 'North Hill Centre Registry Express Inc.', url: 'https://registryexpressinc.ca/' },
    ],
  },
  {
    city: 'Lethbridge',
    registries: [
      { name: 'Schwartz Reliance Insurance & Registry Services', url: 'https://schwartzrelianceinsurance.com/' },
    ],
  },
  {
    city: 'Edmonton',
    registries: [
      { name: 'Accu-Search', url: 'https://www.accu-search.com/' },
    ],
  },
  {
    city: 'Central Alberta',
    registries: [
      { name: 'Mayerthorpe Registries', url: 'https://mayerthorperegistries.ca/' },
    ],
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Certified Translation', url: '/services/certified' },
  { name: "Driver's License Translation", url: '/services/certified/drivers-license-translation' },
  { name: 'Alberta Registries', url: '/services/certified/drivers-license-translation/alberta-registries' },
]

const faqs = [
  {
    question: 'Will Alberta Registries accept your certified translation?',
    answer:
      'Yes. Cethos is a Government of Alberta–approved translation provider. Our certified translations include a signed certificate of accuracy and are accepted at all Alberta Registries locations across Calgary, Lethbridge, Edmonton, and the rest of the province.',
  },
  {
    question: 'How quickly can I get my translation before visiting the registry?',
    answer:
      'Standard turnaround is 1–2 business days. Same-day rush service is available — order by noon and receive your translation by end of day. Most clients order the evening before their registry appointment.',
  },
  {
    question: "Do I need both sides of my driver's license translated?",
    answer:
      "Yes. Alberta Registries requires a translation of both the front and back of your foreign driver's license. Our standard price covers both sides — no hidden fees.",
  },
  {
    question: 'What format do I receive the translation in?',
    answer:
      "You receive a certified PDF by email, ready to print and bring to the registry. Hard-copy mail delivery is also available. The document includes our translator's signature, certification stamp, and contact details for registry verification.",
  },
  {
    question: 'Can I use the same translation for insurance and vehicle registration?',
    answer:
      'Yes. A single certified translation from Cethos is accepted by Alberta Registries for licensing, insurance companies for driving history verification, and for vehicle registration purposes.',
  },
  {
    question: 'What languages do you translate from?',
    answer:
      "We translate driver's licenses from all languages — Arabic, Mandarin, Hindi, Punjabi, Spanish, French, Filipino, Farsi, Ukrainian, and 100+ more. If your license is in a language not listed, contact us and we'll confirm availability same day.",
  },
]

const howItWorks = [
  {
    step: 1,
    icon: Upload,
    title: 'Upload Photos',
    description: 'Send clear photos of the front and back of your license via our form or email.',
  },
  {
    step: 2,
    icon: FileText,
    title: 'Get Quoted & Pay',
    description: 'Instant quote, secure payment. No surprises.',
  },
  {
    step: 3,
    icon: Shield,
    title: 'Certified in Hours',
    description: 'A certified translator completes your document with signed certificate of accuracy.',
  },
  {
    step: 4,
    icon: Download,
    title: 'Ready for the Registry',
    description: 'PDF delivered by email. Print it and walk into any Alberta Registries office.',
  },
]

export default function AlbertaRegistriesContent() {
  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* HERO */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-16 md:py-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0891B2]/10 rounded-full mb-4"
              >
                <BadgeCheck className="w-4 h-4 text-[#0891B2]" />
                <span className="text-sm font-semibold text-[#0891B2]">
                  Government of Alberta Approved
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[36px] md:text-[44px] font-bold text-[#0C2340] leading-[1.1] mb-4"
              >
                Driver&apos;s License Translation for Alberta Registries
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-6"
              >
                Certified translations accepted at every Alberta Registries location. Trusted
                partners in Calgary, Lethbridge, and Edmonton. Order today, walk into the registry
                tomorrow.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0891B2]/10 rounded-full mb-6"
              >
                <span className="text-[#0891B2] font-bold text-lg">From $35</span>
                <span className="text-slate-600">per document · same-day available</span>
              </motion.div>

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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#0891B2]" />
                  Gov of Alberta Approved
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#0891B2]" />
                  Acceptance Guaranteed
                </span>
                <span className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  5-Star Google Reviews
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#0891B2]" />
                  Same-Day Available
                </span>
              </motion.div>
            </div>

            <motion.div
              id="quote-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            >
              <EmbeddedCertifiedQuoteForm
                defaultDocumentType="drivers-license"
                formLocation="alberta-registries-drivers-license"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* GOVERNMENT APPROVAL BANNER */}
      <section className="py-8 bg-[#0C2340]">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
            <div className="flex items-center gap-3">
              <BadgeCheck className="w-8 h-8 text-[#0891B2] flex-shrink-0" />
              <div>
                <p className="text-white font-semibold">Government of Alberta Approved</p>
                <p className="text-white/60 text-sm">Certified translation provider recognized by Service Alberta</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#0891B2] flex-shrink-0" />
              <div>
                <p className="text-white font-semibold">100% Acceptance Guarantee</p>
                <p className="text-white/60 text-sm">If rejected, we redo it free or refund in full</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8 text-[#0891B2] flex-shrink-0" />
              <div>
                <p className="text-white font-semibold">Calgary · Lethbridge · Edmonton</p>
                <p className="text-white/60 text-sm">Partners in Calgary, Lethbridge, Edmonton & more</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* REGISTRY PARTNERS */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">
              Trusted by Alberta Registries Across the Province
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Cethos has established working relationships with registry offices across Alberta —
              including Registry Express in Calgary, Schwartz Reliance in Lethbridge, Accu-Search in
              Edmonton, and Mayerthorpe Registries in central Alberta. Registry staff know our format
              and accept our translations with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {REGISTRY_PARTNERS.map((cityGroup, i) => (
              <motion.div
                key={cityGroup.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full p-6">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                    <div className="w-10 h-10 rounded-lg bg-[#0891B2]/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#0891B2]" />
                    </div>
                    <h3 className="font-bold text-[#0C2340] text-base">{cityGroup.city}</h3>
                  </div>
                  <ul className="space-y-3">
                    {cityGroup.registries.map((reg, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Building2 className="w-4 h-4 text-[#0891B2] flex-shrink-0 mt-0.5" />
                        <a
                          href={reg.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0891B2] text-sm hover:underline"
                        >
                          {reg.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 max-w-2xl mx-auto text-center bg-[#0891B2]/5 border border-[#0891B2]/20 rounded-xl px-6 py-4">
            <p className="text-slate-700 text-sm">
              <span className="font-semibold text-[#0C2340]">Valid at every Alberta Registries location.</span>{' '}
              Our certified translations are accepted province-wide — not limited to our partner offices.
              Walk into any authorized registry agent in Alberta with confidence.
            </p>
          </div>
        </Container>
      </section>

      {/* CITY SECTIONS */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">
              Serving Drivers in Calgary, Lethbridge & Edmonton
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Whether you&apos;re a new Albertan exchanging an international license or a temporary
              resident driving in the province, we&apos;ve got you covered in all three major markets.
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Calgary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0891B2]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#0891B2]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0C2340] mb-2">
                      Calgary — Driver&apos;s License Translation
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Calgary has over 30 Alberta Registries agent locations. Whether you&apos;re in the
                      NE, NW, SE, or SW, our certified translations are accepted at every one of
                      them. As Calgary&apos;s most-reviewed translation service, we help hundreds of new
                      Calgarians get their Alberta license each year — across the city&apos;s diverse,
                      internationally-educated population.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Arabic', 'Hindi', 'Punjabi', 'Mandarin', 'Tagalog', 'Spanish', 'Farsi', 'Ukrainian'].map((lang) => (
                        <span key={lang} className="px-3 py-1 bg-[#0891B2]/10 text-[#0891B2] rounded-full text-sm font-medium">
                          {lang}
                        </span>
                      ))}
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                        + 100 more languages
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Lethbridge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0891B2]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#0891B2]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0C2340] mb-2">
                      Lethbridge — Driver&apos;s License Translation
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Lethbridge is home to a growing immigrant and international student community
                      through the University of Lethbridge and Lethbridge College. We serve drivers
                      exchanging licenses from Mexico, South Korea, the Philippines, India, and
                      across South and Central America — all common in the Lethbridge area. Our
                      online process means you never need to visit our office: upload from home,
                      receive by email, walk into the registry.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#0891B2]">
                      <Car className="w-4 h-4" />
                      <span>Fully remote — no in-person visit required</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Edmonton */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0891B2]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#0891B2]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0C2340] mb-2">
                      Edmonton — Driver&apos;s License Translation
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Edmonton is one of Canada&apos;s most ethnically diverse cities and sees high
                      demand for driver&apos;s license translation — particularly from newcomers arriving
                      through the Edmonton Region Immigrant Employment Council (ERIEC) and
                      settlement agencies. Our translations are accepted at all Edmonton-area
                      Alberta Registries locations and are formatted to meet the specific
                      requirements of Service Alberta.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#0891B2]">
                      <Clock className="w-4 h-4" />
                      <span>Same-day service available — order before noon</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Order Before Your Registry Appointment
          </h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Most clients order the evening before their appointment and receive their certified
            translation by morning.
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

      {/* WHAT'S INCLUDED */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">
              What Alberta Registries Need to See
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Every Cethos translation is formatted specifically for registry submission and includes
              all required elements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'Certified Translator Signature',
                desc: 'Signed by a qualified translator with professional credentials.',
              },
              {
                title: 'Certificate of Accuracy',
                desc: 'Formal declaration that the translation is complete and accurate.',
              },
              {
                title: 'Translator Contact Info',
                desc: 'Registry staff can contact us directly to verify any document.',
              },
              {
                title: 'Front & Back Translation',
                desc: 'Both sides of your license included in the standard price.',
              },
              {
                title: 'Registry-Ready Format',
                desc: 'Formatted and laid out to match what Alberta Registries expect.',
              },
              {
                title: 'Instant PDF Delivery',
                desc: 'Print-ready PDF by email — no waiting for physical mail unless you want it.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Card className="p-6 h-full">
                  <CheckCircle className="w-6 h-6 text-[#0891B2] mb-3" />
                  <h3 className="font-semibold text-[#0C2340] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">
            Frequently Asked Questions
          </h2>
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

      {/* FINAL CTA */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready for Your Alberta Registry Appointment?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Get your certified translation today. Order by noon for same-day delivery. Government
              of Alberta approved, acceptance guaranteed.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={scrollToForm}
                className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
              >
                Get My Translation Now
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
                Gov of Alberta Approved
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

      {/* RELATED */}
      <section className="py-12 bg-white border-t">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Related Services</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Link
              href="/services/certified/drivers-license-translation"
              className="flex items-center gap-1 text-[#0891B2] hover:underline"
            >
              Driver&apos;s License Translation (Canada-wide)
              <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/immigration-translation-services" className="text-[#0891B2] hover:underline">
              Immigration Translation Services
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/edmonton-translation-agency" className="text-[#0891B2] hover:underline">
              Edmonton Translation Agency
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/iqas-alberta" className="text-[#0891B2] hover:underline">
              IQAS Alberta
            </Link>
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
