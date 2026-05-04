'use client'

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
} from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { ApostilleQuoteForm } from './ApostilleQuoteForm'

export default function ApostilleContent() {
  const breadcrumbItems = [
    { name: 'Services', url: '/services' },
    { name: 'Apostille Services', url: '/services/apostille' },
  ]

  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })
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
      icon: Upload,
      title: 'Get Your Quote (60 seconds)',
      description: 'Upload digital copies. We confirm scope, document type, issuing province, destination country, and exact price.',
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
      title: 'We Notarize & Route to the Right Authority',
      description: 'In-house notarization if needed. We then submit to Global Affairs Canada (federal docs) or the correct provincial authority — Ontario, Alberta, BC, Quebec, or Saskatchewan.',
    },
    {
      step: 4,
      icon: Stamp,
      title: 'The Authority Issues the Apostille',
      description: 'Processing time depends on the authority (typical range: 1.5–4 weeks). Government processing time is fixed and we cannot shortcut it — be wary of any service claiming same-day.',
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
                className="text-lg text-[#4B5563] leading-relaxed mb-6"
              >
                {heroDesc}
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
                className="flex flex-wrap gap-3 mb-8"
              >
                <button
                  onClick={scrollToForm}
                  className="px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
                >
                  Get Apostille Quote
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
              <ApostilleQuoteForm formLocation="apostille-services" />
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
            From quote to delivery — we manage the entire authentication process across every Canadian province.
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

      {/* PRICING */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Apostille Pricing</h2>
            <p className="text-slate-600">All-inclusive pricing. Domestic courier both ways included. Get an exact quote in 60 seconds.</p>
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

      {/* FINAL CTA */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Apostille Your Documents?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Get a quote in 60 seconds. Hague Convention apostille for Canadian documents — recognized in 120+ countries.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={scrollToForm}
                className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
              >
                Start My Apostille Quote
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

      <StickyMobileCTA />
    </>
  )
}
