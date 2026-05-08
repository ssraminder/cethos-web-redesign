'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Phone,
  CheckCircle,
  Shield,
  Clock,
  Award,
  Star,
  BadgeCheck,
  Upload,
  FileText,
  Download,
  Globe,
  Stamp,
  MapPin,
  Building2,
  GraduationCap,
  Heart,
  Briefcase,
  FileSignature,
  Truck,
  Landmark,
  Calendar,
} from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { LandingLocalBusinessJsonLd } from '@/components/landing'
import { ApostilleQuoteForm } from './ApostilleQuoteForm'
import { ApostilleStickyConsultBar } from './ApostilleStickyConsultBar'
import { ApostilleExitIntent } from './ApostilleExitIntent'
import { ApostilleCallbackModal } from './ApostilleCallbackModal'
import { trackConsultEvent, type ConsultPlacement } from '@/lib/tracking'

export default function ApostilleContent() {
  const breadcrumbItems = [
    { name: 'Services', url: '/services' },
    { name: 'Apostille Services', url: '/services/apostille' },
  ]

  // The page now has exactly two paths:
  //   - Book a consultation (right-side form → Cal.com picker) — always visible
  //   - Request a callback (left-side hero CTA → modal)
  // The previous "Get Apostille Quote" path was removed; the actual price is
  // confirmed on the consultation call after document review.
  const [hasInteracted, setHasInteracted] = useState(false)
  const [callbackOpen, setCallbackOpen] = useState(false)
  const [callbackPlacement, setCallbackPlacement] = useState<ConsultPlacement>('hero')

  // Pick a stable A/B variant for placement B headline (persists per visitor).
  const [sectionVariant, setSectionVariant] = useState<'A' | 'B'>('A')
  useEffect(() => {
    if (typeof window === 'undefined') return
    const KEY = 'cethos_apostille_consult_section_variant'
    const existing = localStorage.getItem(KEY)
    if (existing === 'A' || existing === 'B') {
      setSectionVariant(existing)
    } else {
      const v = Math.random() < 0.5 ? 'A' : 'B'
      localStorage.setItem(KEY, v)
      setSectionVariant(v)
    }
  }, [])

  const scrollToForm = (placement: ConsultPlacement = 'hero') => {
    setHasInteracted(true)
    trackConsultEvent('free_consult_cta_clicked', {
      placement,
      variant: placement === 'section' ? sectionVariant : undefined,
    })
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const openCallback = (placement: ConsultPlacement) => {
    setHasInteracted(true)
    setCallbackPlacement(placement)
    setCallbackOpen(true)
    trackConsultEvent('free_consult_cta_clicked', {
      placement,
      consult_method: 'callback',
    })
  }

  const whyChooseUs = [
    {
      icon: Globe,
      title: 'Any Province in Canada',
      description: 'Send your documents from any city in Canada. We email you a prepaid Purolator label — drop at any counter, tracked end-to-end.',
    },
    {
      icon: Clock,
      title: 'Realistic Turnaround',
      description: 'Total time depends on the issuing authority: ~2–3 weeks for Alberta or Saskatchewan documents, ~4 weeks for Ontario, ~4–5 weeks for federal documents through Global Affairs Canada.',
    },
    {
      icon: Award,
      title: 'Hague Convention',
      description: 'Canada joined the Hague Apostille Convention in January 2024. Our apostilles are recognized in 120+ countries.',
    },
    {
      icon: Shield,
      title: 'We Handle the Government',
      description: 'We submit to Global Affairs Canada or the correct provincial authority on your behalf. You never deal with government desks, paperwork, or queues.',
    },
  ]

  const personalDocuments = [
    'Birth Certificates',
    'Marriage Certificates',
    'Divorce Certificates / Decrees',
    'Death Certificates',
    'Adoption Papers',
    "Driver's License Copies",
  ]

  const educationDocuments = [
    'Diplomas & Degrees',
    'Academic Transcripts',
    'Letters of Enrollment',
    'TEFL/TESL Certificates',
    'Professional Credentials',
    'WES / IQAS Reports',
  ]

  const corporateDocuments = [
    'Articles of Incorporation',
    'Certificate of Good Standing',
    'Power of Attorney',
    'Commercial Invoices',
    'Board Resolutions',
    'Contracts & Agreements',
  ]

  const legalDocuments = [
    'RCMP Police Clearance',
    'Provincial Background Checks',
    'Notarized Affidavits',
    'Court Orders & Judgments',
    'Statutory Declarations',
    'Translated Certified Documents',
  ]

  const acceptedByLocations = [
    { name: 'Global Affairs Canada (GAC)', icon: Building2 },
    { name: 'Provincial Apostille Offices', icon: MapPin },
    { name: 'Embassies & Consulates', icon: Globe },
    { name: 'Foreign Government Authorities', icon: Stamp },
    { name: 'International Universities', icon: GraduationCap },
  ]

  const howItWorks = [
    {
      step: 1,
      icon: Calendar,
      title: 'Book a Free 15-Min Consultation',
      description:
        'Pick a Zoom slot or request a callback. A specialist reviews your documents on the call and confirms scope, the right authority, and turnaround — no commitment, no quote forms.',
    },
    {
      step: 2,
      icon: Truck,
      title: 'We Send a Prepaid Courier Label',
      description: 'Emailed the same day. Drop your originals at any Purolator counter in Canada. Calgary clients can walk in to 421 7 Avenue SW, Floor 30.',
    },
    {
      step: 3,
      icon: FileSignature,
      title: 'Document Prep & Notarization (If Needed)',
      description: 'Public documents (birth certs, RCMP checks, court orders) go straight through. Private documents (POAs, affidavits, ID copies) get notarized in-house first. Certified true copies prepared where the destination requires them.',
    },
    {
      step: 4,
      icon: Stamp,
      title: 'Apostille — or Authentication + Embassy Legalization',
      description: 'Hague country? The Competent Authority issues a single apostille — done. Non-Hague country (UAE, Egypt, Saudi Arabia)? We add embassy legalization at the destination consulate. Government processing time is fixed: 1.5–4 weeks for apostille, plus 2–6 weeks at the embassy when applicable.',
    },
    {
      step: 5,
      icon: Download,
      title: 'Tracked Courier Back to You',
      description: 'Authenticated documents return to our Calgary office, then to your address via Purolator (FedEx International for overseas). Tracking link emailed at every step.',
    },
  ]

  const pricingTable = [
    { service: 'Apostille (out-of-Calgary, courier both ways included)', price: 'From $149', turnaround: 'Province-dependent (see turnaround guide)' },
    { service: 'Apostille (Calgary drop-off, no inbound courier)', price: 'From $99', turnaround: 'Province-dependent (see turnaround guide)' },
    { service: 'Notarization Add-On', price: 'From $35', turnaround: 'Built into turnaround' },
    { service: 'Translation + Apostille Bundle', price: 'From $199', turnaround: 'Same as apostille turnaround' },
    { service: 'Multi-Document (5+ docs)', price: '10% off per doc', turnaround: 'Varies by volume' },
    { service: 'International Return Courier', price: 'Quote on request', turnaround: 'Adds 2–7 days' },
    { service: 'Embassy Legalization (non-Hague)', price: 'Quote on request', turnaround: '4–8 weeks' },
  ]

  const pricingFooter = 'Prices include domestic tracked courier both ways for Canadian addresses. Government fees and embassy fees (where applicable) are billed at cost. Get an exact quote in 60 seconds.'

  const turnaroundTable = [
    { path: 'Alberta-issued (AB authority)', calgary: '2–2.5 weeks', other: '2.5–3.5 weeks' },
    { path: 'Saskatchewan-issued (SK authority)', calgary: '1.5–2 weeks', other: '2–3 weeks' },
    { path: 'Ontario-issued (ODS Toronto, mail-in)', calgary: '3.5–4 weeks', other: '4–4.5 weeks' },
    { path: 'BC-issued (BC authority)', calgary: '3–5 weeks', other: '3.5–5.5 weeks' },
    { path: 'Quebec-issued (notarial path)', calgary: '6–8 weeks', other: '6.5–8.5 weeks' },
    { path: 'Federal / GAC (RCMP, IRCC, federal docs)', calgary: '4–5 weeks', other: '4.5–5.5 weeks' },
  ]

  const faqs = [
    {
      question: 'What is an apostille?',
      answer:
        'An apostille is a certificate that authenticates the origin of a public document so it can be used in another country that is part of the Hague Apostille Convention. Canada joined the convention in January 2024. The apostille verifies the signature, capacity of the signer, and identity of any seal or stamp on the document.',
    },
    {
      question: 'Who actually issues the apostille?',
      answer:
        "The Competent Authority for your document — Global Affairs Canada for federal documents, or your province's Authentication Office (Ontario, Alberta, BC, Quebec, or Saskatchewan) for provincial documents and notarized documents from those provinces. Cethos is your end-to-end concierge: we collect, notarize if needed, submit on your behalf, track the process, and courier the authenticated documents back. You never deal with government desks.",
    },
    {
      question: 'How long does the apostille process take?',
      answer:
        'It depends on which authority issues the apostille. Alberta and Saskatchewan are the fastest at 1.5–2 weeks. Ontario is around 3 weeks for mail-in. British Columbia is 2–4 weeks. Federal documents through Global Affairs Canada take 3–4 weeks. Quebec notarized documents take longest, 5–7 weeks total. Add 2–6 days for courier transit. Same-day apostille is not possible — be wary of any service that claims it.',
    },
    {
      question: 'I am in Toronto, Vancouver, or Montreal — how do I send my documents?',
      answer:
        'We email you a prepaid Purolator label after you book. Drop your originals at any Purolator counter, or schedule a free home pickup. The package is tracked from the moment it leaves your hands until it reaches our Calgary office. Then we manage everything until the apostilled documents come back to you.',
    },
    {
      question: 'Is the courier cost included?',
      answer:
        'Yes. Our pricing is all-inclusive of domestic tracked courier both ways for orders shipping within Canada. International return courier is quoted separately because rates vary by destination country.',
    },
    {
      question: 'Do I need an apostille or a translation (or both)?',
      answer:
        "It depends on the destination country. If the receiving country requires the document in a different language, you typically need a certified translation first, then apostille. We offer both services and bundle them together to save you time. Tell us where you're sending the document and we'll advise on the right path.",
    },
    {
      question: 'Which Canadian documents can be apostilled?',
      answer:
        'Most public documents issued in Canada: birth/marriage/divorce certificates, education credentials, RCMP clearances, court documents, notarized affidavits, articles of incorporation, and powers of attorney. Some private documents must be notarized first before they can be apostilled.',
    },
    {
      question: "What if my destination country isn't in the Hague Convention?",
      answer:
        "We offer embassy legalization (also called \"authentication and legalization\") for countries that aren't part of the Hague Apostille Convention. The document goes through Global Affairs Canada first, then to the destination country's embassy or consulate in Canada. Timelines and fees vary by country.",
    },
    {
      question: 'Can you apostille my US-issued document?',
      answer:
        "We specialize in Canadian-issued documents. For US-issued documents (birth certificates, FBI background checks, etc.) you'll need a US apostille service that handles the relevant US Secretary of State or US Department of State. We can refer you to trusted partners.",
    },
  ]

  const heroBadge = 'Hague Convention · Canada-Wide Concierge'
  const heroHeading = 'Apostille Services Canada — We Handle the Whole Process'
  const heroDesc =
    'Canada-wide concierge service for Hague Convention apostille. We collect your documents, handle notarization, submit to the right Competent Authority on your behalf, and return your authenticated documents. From any province in Canada — tracked courier both ways.'
  const heroDescConsult =
    'Not sure where to start? Book a free 15-minute call with a Cethos apostille specialist to discuss your situation — no commitment, no quote needed.'
  const priceBadge = 'From $149'
  const priceUnit = 'all-inclusive · domestic courier both ways'

  return (
    <>
      <LandingLocalBusinessJsonLd areaServed={['Canada']} />
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* HERO SECTION */}
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
                <span className="text-sm font-semibold text-[#0891B2]">{heroBadge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[36px] md:text-[44px] font-bold text-[#0C2340] leading-[1.1] mb-4"
              >
                {heroHeading}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-3"
              >
                {heroDesc}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="text-base text-[#0C2340] leading-relaxed mb-6 font-medium"
              >
                {heroDescConsult}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0891B2]/10 rounded-full mb-6"
              >
                <span className="text-[#0891B2] font-bold text-lg">{priceBadge}</span>
                <span className="text-slate-600">{priceUnit}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-wrap gap-3 mb-3"
              >
                <button
                  type="button"
                  onClick={() => openCallback('hero')}
                  className="px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> Request a Callback
                </button>
                <a
                  href="tel:5876000786"
                  className="px-6 py-3 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> Call (587) 600-0786
                </a>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="text-sm text-slate-500 mb-8"
              >
                Prefer Zoom? <button
                  type="button"
                  onClick={() => scrollToForm('hero')}
                  className="text-[#0891B2] hover:text-[#06B6D4] underline-offset-2 hover:underline font-medium"
                >
                  Pick a 15-min slot on the right →
                </button>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-3"
              >
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#0891B2]" />
                    Recognized in 120+ Hague countries
                  </span>
                  <span className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#0891B2]" />
                    Tracked courier both ways
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    139 Five-Star Reviews
                  </span>
                  <span className="flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-[#0891B2]" />
                    We submit on your behalf
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
              <ApostilleQuoteForm formLocation="apostille-services" consultPlacement="hero" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Why Cethos for Canadian Apostille</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Calgary-based, Canada-wide concierge. We route documents to Global Affairs Canada or the correct provincial authority on your behalf.
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

      {/* DOCUMENTS WE APOSTILLE */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Documents We Apostille</h2>
            <p className="text-slate-600">Personal, education, corporate, and legal documents — Canada-wide.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Personal Documents', icon: Heart, items: personalDocuments },
              { title: 'Education Credentials', icon: GraduationCap, items: educationDocuments },
              { title: 'Corporate Documents', icon: Briefcase, items: corporateDocuments },
              { title: 'Legal & Police Records', icon: FileSignature, items: legalDocuments },
            ].map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.05 }}
              >
                <Card className="h-full p-6">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                    <div className="w-10 h-10 rounded-lg bg-[#0891B2]/10 flex items-center justify-center">
                      <group.icon className="w-5 h-5 text-[#0891B2]" />
                    </div>
                    <h3 className="font-semibold text-[#0C2340]">{group.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {group.items.map((item, i) => (
                      <li key={i} className="text-slate-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#0891B2] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ACCEPTED BY */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Accepted Worldwide</h2>
            <p className="text-slate-600">
              Apostilles issued through Cethos are accepted by:
            </p>
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
            For non-Hague Convention countries, we provide full embassy legalization services through Global Affairs Canada and the destination country&apos;s consulate.
          </p>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-4">How Apostille Works</h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            From your free 15-minute call to delivery — we manage the entire authentication process across every Canadian province.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
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

      {/* HOW IT WORKS FOR CLIENTS ACROSS CANADA */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">How It Works for Clients Across Canada</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4 text-slate-700 leading-relaxed">
            <p>
              Whether you are in Toronto, Vancouver, Montreal, Halifax, or anywhere else in Canada, the process is the same: we email you a prepaid Purolator label, you drop your documents at any counter, we route them to the correct issuing authority, and we courier the authenticated documents back. All tracked, all included in the price.
            </p>
            <p>
              <strong>Calgary clients:</strong> drop off in person at 421 7 Avenue SW, Floor 30 to save the inbound courier cost.
            </p>
            <p>
              <strong>Sending the apostille internationally?</strong> We use FedEx International with full tracking, quoted separately based on destination country.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mt-10">
            <h3 className="text-xl font-semibold text-[#0C2340] mb-4 text-center">Turnaround by Issuing Authority</h3>
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2340]">Document path</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[#0C2340]">Calgary drop-off</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-[#0C2340]">Out-of-Calgary (courier in + out)</th>
                  </tr>
                </thead>
                <tbody>
                  {turnaroundTable.map((row, index) => (
                    <tr key={index} className={index > 0 ? 'border-t border-slate-200' : ''}>
                      <td className="px-6 py-4 text-slate-700">{row.path}</td>
                      <td className="px-6 py-4 text-center font-semibold text-[#0891B2]">{row.calgary}</td>
                      <td className="px-6 py-4 text-right text-slate-700">{row.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <p className="text-center text-sm text-slate-500 mt-4">
              Government processing time is fixed and we cannot shortcut it. Total time includes 1–3 days inbound courier and 1–3 days outbound courier where applicable.
            </p>
          </div>
        </Container>
      </section>

      {/* THE FULL AUTHENTICATION PROCESS — DETAILED */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">
              The Full Apostille &amp; Authentication Process
            </h2>
            <p className="text-slate-600">
              Apostille isn&apos;t just &quot;notarize and send.&quot; Canadian authentication has a specific chain — federal vs provincial routing, conditional notarization, Hague vs non-Hague paths, translation sequencing. Here&apos;s exactly what happens at every stage.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">1. Document Vetting &amp; Path Determination</h3>
              <p className="text-slate-700 mb-4">
                Before anything goes to a government desk, we review every document to determine the right path:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" /> Is it a public document, or a private document that needs notarization first?</li>
                <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" /> Is the destination country a Hague Convention signatory? (Determines apostille-only vs apostille + embassy legalization.)</li>
                <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" /> Which Canadian Competent Authority handles it — federal Global Affairs Canada or the issuing province?</li>
                <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" /> Does it need a certified true copy first? (Common for school transcripts and ID copies.)</li>
                <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" /> Does the destination country require translation — and does the translation also need authentication?</li>
              </ul>
              <p className="text-slate-700 mt-4">
                We confirm all of this in writing — and lock in price + timeline — before you ship anything.
              </p>
            </Card>

            <Card className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">2. Notarization (When It&apos;s Required)</h3>
              <p className="text-slate-700 mb-4">
                Public documents (issued by a Canadian government body) can go straight to the Competent Authority. Private documents must be notarized first by a Canadian notary public or commissioner of oaths in the right province.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#0C2340] mb-2">Need notarization first</h4>
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    <li>• Photocopies of passports, IDs, driver&apos;s licenses</li>
                    <li>• Affidavits and statutory declarations</li>
                    <li>• Power of attorney</li>
                    <li>• Letters or statements (&quot;to whom it may concern&quot;)</li>
                    <li>• Educational documents from private institutions</li>
                    <li>• Certified translations (translator&apos;s affidavit gets notarized)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0C2340] mb-2">Don&apos;t need notarization (already public)</h4>
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    <li>• Provincial long-form vital statistics certificates</li>
                    <li>• RCMP / provincial police criminal record checks</li>
                    <li>• Court orders &amp; judgments (with court seal)</li>
                    <li>• Articles of incorporation (with corporate registry seal)</li>
                    <li>• Diplomas / transcripts with the registrar&apos;s seal (varies by province)</li>
                  </ul>
                </div>
              </div>
              <p className="text-slate-700 mt-4">
                Cethos has in-house Alberta notary services for documents that need them.
              </p>
            </Card>

            <Card className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">3. The Competent Authority Layer</h3>
              <p className="text-slate-700 mb-4">
                Under the Hague Apostille Convention, each country designates &quot;Competent Authorities&quot; that can issue apostilles. Canada has two layers — federal and provincial — and getting routing wrong is the #1 cause of rejected applications.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-[#0891B2] pl-4">
                  <h4 className="font-semibold text-[#0C2340] mb-1">Federal — Global Affairs Canada (Ottawa)</h4>
                  <p className="text-sm text-slate-700">RCMP background checks, IRCC immigration documents, Federal Court orders, federal articles of incorporation, all federal department documents — plus any document from a province without its own Authentication Office.</p>
                </div>
                <div className="border-l-4 border-[#0891B2] pl-4">
                  <h4 className="font-semibold text-[#0C2340] mb-1">Provincial — Authentication Offices</h4>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• <strong>Alberta:</strong> Justice &amp; Solicitor General Authentication Office (Edmonton)</li>
                    <li>• <strong>Ontario:</strong> ODS — Ontario Document Services (Toronto)</li>
                    <li>• <strong>British Columbia:</strong> Order in Council Administration Office (Victoria)</li>
                    <li>• <strong>Saskatchewan:</strong> Authentications &amp; Legalizations Unit</li>
                    <li>• <strong>Quebec:</strong> Notarial certification path (see step 6 below)</li>
                  </ul>
                  <p className="text-xs text-slate-500 mt-2">Manitoba, New Brunswick, Newfoundland &amp; Labrador, Nova Scotia, PEI, and the territories don&apos;t operate their own Authentication Office — those documents go to Global Affairs Canada federally.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">4. Apostille vs Authentication &amp; Legalization</h3>
              <p className="text-slate-700 mb-4">
                What gets issued depends on whether your destination country is a Hague Convention signatory.
              </p>
              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-[#0C2340]"></th>
                      <th className="px-3 py-2 text-left font-semibold text-[#0C2340]">Hague country</th>
                      <th className="px-3 py-2 text-left font-semibold text-[#0C2340]">Non-Hague country</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-t border-slate-200">
                      <td className="px-3 py-2.5 font-medium">What&apos;s issued</td>
                      <td className="px-3 py-2.5">Apostille certificate</td>
                      <td className="px-3 py-2.5">Authentication + embassy legalization</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-3 py-2.5 font-medium">Steps</td>
                      <td className="px-3 py-2.5">1 — Competent Authority only</td>
                      <td className="px-3 py-2.5">2 — Competent Authority + destination embassy</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-3 py-2.5 font-medium">Example destinations</td>
                      <td className="px-3 py-2.5">US, UK, EU, India, Mexico, Brazil, Australia, Japan, China</td>
                      <td className="px-3 py-2.5">UAE, Egypt, Saudi Arabia, Qatar, Iran, Cuba</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-3 py-2.5 font-medium">Embassy fees</td>
                      <td className="px-3 py-2.5">None</td>
                      <td className="px-3 py-2.5">$25–$300+ per document, varies by country</td>
                    </tr>
                    <tr className="border-t border-slate-200">
                      <td className="px-3 py-2.5 font-medium">Total turnaround</td>
                      <td className="px-3 py-2.5">1.5–5 weeks</td>
                      <td className="px-3 py-2.5">4–8 weeks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-3">Hague Convention status as of 2026 — Canada joined January 2024, Vietnam joined April 2025. Ask us if your destination is borderline.</p>
            </Card>

            <Card className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">5. Translation — Before, After, or Both?</h3>
              <p className="text-slate-700 mb-4">
                Translation timing depends on the destination country&apos;s rules. Get this wrong and the document is rejected at the destination.
              </p>
              <ul className="space-y-3 text-slate-700">
                <li>
                  <strong>Translate first, then apostille:</strong> Most EU countries, Germany, Italy, Spain, Mexico, Brazil. The certified translator&apos;s affidavit is notarized; the apostille covers the translated package.
                </li>
                <li>
                  <strong>Apostille first, then translate:</strong> US, UK, Australia, India in many cases. The original is apostilled and a certified translation is provided alongside.
                </li>
                <li>
                  <strong>Both, with embassy legalization on the translation:</strong> UAE, Egypt, several Gulf states. The translation itself goes through embassy legalization, sometimes with a sworn translator at the consulate.
                </li>
              </ul>
              <p className="text-slate-700 mt-4">
                We bundle <Link href="/services/certified" className="text-[#0891B2] hover:underline">certified translation</Link> + apostille as a single package and sequence the timing for your destination.
              </p>
            </Card>

            <Card className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">6. Quebec — The Notarial Path</h3>
              <p className="text-slate-700 mb-4">
                Quebec uses civil law and treats notaries as legal officers, not just witnesses to signatures. Quebec-issued documents follow a different path than the rest of Canada:
              </p>
              <ol className="space-y-2 text-slate-700 list-decimal pl-5">
                <li>A Quebec notary issues a <em>notarial certification</em> (acte notarié) attesting to the document.</li>
                <li>The notarized document is submitted to the Quebec Ministry of Justice for the apostille.</li>
              </ol>
              <p className="text-slate-700 mt-4">
                Total time: 6–8 weeks (the longest of any Canadian province). Cethos coordinates with Quebec notaries on your behalf — you don&apos;t need a Quebec contact.
              </p>
            </Card>

            <Card className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">7. Common Document → Authority Mapping</h3>
              <p className="text-slate-700 mb-4">
                The most common Canadian documents and exactly where they go:
              </p>
              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-[#0C2340]">Document</th>
                      <th className="px-3 py-2 text-left font-semibold text-[#0C2340]">Notary first?</th>
                      <th className="px-3 py-2 text-left font-semibold text-[#0C2340]">Routes to</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {[
                      { doc: 'Long-form birth / marriage / death certificate (provincial)', notary: 'No', auth: 'Issuing province’s Authentication Office' },
                      { doc: 'RCMP criminal record check', notary: 'No', auth: 'Global Affairs Canada' },
                      { doc: 'IRCC document (PR card, citizenship, status confirmation)', notary: 'No', auth: 'Global Affairs Canada' },
                      { doc: 'Federal Court order or judgment', notary: 'No', auth: 'Global Affairs Canada' },
                      { doc: 'Federal articles of incorporation', notary: 'No', auth: 'Global Affairs Canada' },
                      { doc: 'Provincial corporate documents (e.g. AB Corporate Registry)', notary: 'No', auth: 'Issuing province’s Authentication Office' },
                      { doc: 'Power of attorney', notary: 'Yes', auth: 'Province where notarized' },
                      { doc: 'Notarized affidavit / statutory declaration', notary: 'Yes', auth: 'Province where notarized' },
                      { doc: 'University transcript (most provinces, with registrar seal)', notary: 'Sometimes', auth: 'Province of the institution' },
                      { doc: 'Quebec-issued document', notary: 'Yes (notarial certification)', auth: 'Quebec Ministry of Justice' },
                      { doc: 'Driver’s license / passport copy', notary: 'Yes (true-copy notarization)', auth: 'Province where notarized' },
                      { doc: 'US-issued document (FBI check, US birth certificate)', notary: '—', auth: 'Not handled in Canada — refer to a US apostille service' },
                    ].map((row, i) => (
                      <tr key={i} className="border-t border-slate-200">
                        <td className="px-3 py-2.5">{row.doc}</td>
                        <td className="px-3 py-2.5">{row.notary}</td>
                        <td className="px-3 py-2.5">{row.auth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Not sure which path applies to your document?{' '}
                <button
                  type="button"
                  onClick={() => scrollToForm('section')}
                  className="text-[#0891B2] hover:underline font-medium"
                >
                  Book a free 15-min consultation
                </button>{' '}
                or{' '}
                <button
                  type="button"
                  onClick={() => openCallback('section')}
                  className="text-[#0891B2] hover:underline font-medium"
                >
                  request a callback
                </button>{' '}
                and we&apos;ll confirm the routing before you ship anything.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* PRICING */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Apostille Pricing</h2>
            <p className="text-slate-600">All-inclusive pricing. Domestic courier both ways included. Final price confirmed on your free 15-min consultation.</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2340]">Service</th>
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
            <p className="text-center text-sm text-slate-500 mt-4">{pricingFooter}</p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">Apostille FAQ</h2>
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

      {/* PLACEMENT B — DEDICATED CONSULT SECTION */}
      <section id="apostille-consult-section" className="py-16 bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full mb-4">
              <Calendar className="w-4 h-4 text-[#0891B2]" />
              <span className="text-sm font-semibold text-[#0C2340]">Free 15-Min Consultation</span>
            </div>
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">
              {sectionVariant === 'A'
                ? 'Complex case? Get clarity in 15 minutes — free.'
                : 'Talk to a Cethos apostille specialist — free, 15 minutes, no commitment.'}
            </h2>
            <p className="text-slate-600 mb-6">
              Quebec-issued document? Tight deadline? Multi-country use? Apostille vs. authentication confusion? Book a free 15-minute call with a Cethos apostille specialist. No quote needed. Just real answers.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['15 minutes', 'Real specialist', 'Zero commitment'].map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-[#0C2340] font-medium"
                >
                  <CheckCircle className="w-4 h-4 text-[#0891B2]" />
                  {pill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3" data-variant={sectionVariant}>
              <button
                type="button"
                onClick={() => scrollToForm('section')}
                className="px-8 py-4 bg-[#0C2340] hover:bg-[#0C2340]/90 text-white rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" /> Book a Time
              </button>
              <button
                type="button"
                onClick={() => openCallback('section')}
                className="px-8 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg font-semibold hover:bg-slate-50 transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> Request a Callback
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-500">Calls available Mon–Fri, 9–5 Mountain Time</p>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Apostille Your Documents?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Start with a free 15-minute consultation. Pick a Zoom slot or have us call you — we&apos;ll review your case and confirm the right path before you commit.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                type="button"
                onClick={() => scrollToForm('hero')}
                className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors inline-flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" /> Book a Free Consultation
              </button>
              <button
                type="button"
                onClick={() => openCallback('section')}
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> Request a Callback
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4" />
                Hague Convention
              </span>
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Tracked Courier Both Ways
              </span>
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Canada-Wide Concierge
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVING ACROSS CANADA */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">Apostille Services Across Canada</h2>
          <p className="text-slate-600 text-center mb-8">
            Send your documents to our Calgary office from any Canadian city via prepaid Purolator label. Tracked return courier included.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Calgary', href: '/locations/calgary' },
              { label: 'Edmonton', href: '/locations/edmonton' },
              { label: 'Toronto', href: '/locations/toronto' },
              { label: 'Vancouver', href: '/locations/vancouver' },
              { label: 'Ottawa', href: '/locations/ottawa' },
              { label: 'Montreal', href: '/locations/montreal' },
              { label: 'Winnipeg', href: '/locations/winnipeg' },
              { label: 'Halifax', href: '/locations/halifax' },
              { label: 'Saskatoon', href: '/locations/saskatoon' },
            ].map((location) => (
              <Link
                key={location.href}
                href={location.href}
                className="bg-white px-6 py-3 rounded-lg text-gray-800 font-medium hover:bg-[#0891B2] hover:text-white transition-colors shadow-sm"
              >
                {location.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* RELATED LINKS */}
      <section className="py-12 bg-white border-t">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Related Services</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/certified" className="text-[#0891B2] hover:underline">
              Certified Translation
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/immigration-translation-services" className="text-[#0891B2] hover:underline">
              Immigration Translation
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/birth-certificate-translation" className="text-[#0891B2] hover:underline">
              Birth Certificate Translation
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/pr-citizenship-translation" className="text-[#0891B2] hover:underline">
              PR / Citizenship Translation
            </Link>
          </div>
        </Container>
      </section>

      {/* Placement C — sticky mobile bar */}
      <ApostilleStickyConsultBar
        onConsultClick={() => scrollToForm('sticky')}
        onQuoteClick={() => openCallback('sticky')}
      />

      {/* Placement D — exit-intent (desktop) — opens callback modal */}
      <ApostilleExitIntent
        hasInteracted={hasInteracted}
        onConsultClick={() => openCallback('exit_intent')}
      />

      {/* Callback modal (triggered from hero, section, sticky, exit-intent) */}
      <ApostilleCallbackModal
        open={callbackOpen}
        onClose={() => setCallbackOpen(false)}
        placement={callbackPlacement}
        onSwitchToBooking={() => scrollToForm(callbackPlacement)}
      />
    </>
  )
}
