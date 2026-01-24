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
  Users,
  MapPin,
  Scale,
  Globe,
  BadgeCheck,
  Star,
  Building,
  Languages
} from 'lucide-react'
import { Container, Card, SectionHeading } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

// =============================================================================
// DATA
// =============================================================================

const specializedServices = [
  {
    icon: Users,
    title: 'Immigration Translation Services',
    description: 'Complete translation services for IRCC applications including Express Entry, PNP, family sponsorship, and refugee claims.',
    href: '/services/certified/immigration-translation-services',
    price: 'From $65',
    popular: true,
  },
  {
    icon: FileText,
    title: 'Birth Certificate Translation',
    description: 'IRCC-certified birth certificate translations for PR, citizenship, sponsorship applications, and WES evaluations.',
    href: '/services/certified/birth-certificate-translation',
    price: 'From $65',
    popular: false,
  },
  {
    icon: Heart,
    title: 'Marriage Certificate Translation',
    description: 'Certified translations for marriage certificates, divorce decrees, and annulment documents for spousal sponsorship.',
    href: '/services/certified/marriage-certificate-translation',
    price: 'From $65',
    popular: false,
  },
  {
    icon: GraduationCap,
    title: 'Academic Transcript Translation',
    description: 'WES, IQAS, and Express Entry certified translations for diplomas, degrees, transcripts, and professional credentials.',
    href: '/services/certified/academic-transcript-translation',
    price: 'From $65',
    popular: false,
  },
  {
    icon: Award,
    title: 'PR & Citizenship Packages',
    description: 'Complete document packages for permanent residence and citizenship applications. Bundle pricing for multiple documents.',
    href: '/services/certified/pr-citizenship-translation',
    price: 'From $120',
    popular: true,
  },
  {
    icon: MapPin,
    title: 'Edmonton Translation Services',
    description: 'IRCC-certified translations delivered to Edmonton and area by secure email or courier. No travel to Calgary required.',
    href: '/services/certified/edmonton-translation-agency',
    price: 'From $65',
    popular: false,
  },
]

const features = [
  {
    icon: Shield,
    title: '100% IRCC Acceptance Guarantee',
    description: 'All translations accepted by Immigration, Refugees and Citizenship Canada. Full refund if rejected.',
  },
  {
    icon: BadgeCheck,
    title: 'Government of Alberta Approved',
    description: 'Officially approved translator for Government of Alberta and provincial document requirements.',
  },
  {
    icon: Clock,
    title: 'Same-Day Service Available',
    description: 'Urgent deadline? Rush and same-day service delivers certified translations within hours.',
  },
  {
    icon: Award,
    title: 'Notarization Included',
    description: 'Commissioner of Oaths certification included free with every translation. Additional notarization available.',
  },
]

const documentCategories = [
  {
    title: 'Personal Documents',
    icon: FileText,
    items: [
      'Birth Certificates',
      'Marriage Certificates',
      'Divorce Decrees',
      'Death Certificates',
      'Name Change Documents',
      'Adoption Papers'
    ],
  },
  {
    title: 'Academic Documents',
    icon: GraduationCap,
    items: [
      'Diplomas & Degrees',
      'Academic Transcripts',
      'Course Descriptions',
      'Professional Certificates',
      'Letters of Recommendation',
      'Enrollment Letters'
    ],
  },
  {
    title: 'Legal Documents',
    icon: Scale,
    items: [
      'Contracts & Agreements',
      'Court Documents',
      'Powers of Attorney',
      'Affidavits',
      'Corporate Documents',
      'Notarized Statements'
    ],
  },
  {
    title: 'Immigration Documents',
    icon: Globe,
    items: [
      'Police Clearances',
      'Employment Letters',
      'Bank Statements',
      'Reference Letters',
      'Medical Records',
      'Military Records'
    ],
  },
]

const languages = [
  'Punjabi', 'Hindi', 'Urdu', 'Gujarati', 'Tamil',
  'Arabic', 'Farsi', 'Dari', 'Pashto',
  'Mandarin', 'Cantonese', 'Vietnamese', 'Korean', 'Japanese', 'Tagalog',
  'Spanish', 'Portuguese', 'French', 'Italian', 'German',
  'Russian', 'Ukrainian', 'Polish', 'Romanian',
  'Amharic', 'Tigrinya', 'Somali', 'Swahili'
]

const processSteps = [
  {
    step: 1,
    title: 'Submit Your Document',
    description: 'Upload a clear photo or scan via our secure form, email, or bring it to our Calgary office.',
  },
  {
    step: 2,
    title: 'Receive Your Quote',
    description: 'Get an exact quote within 2 hours during business hours. No hidden fees.',
  },
  {
    step: 3,
    title: 'We Translate & Certify',
    description: 'A certified translator completes your translation with official certification.',
  },
  {
    step: 4,
    title: 'Pick Up or Delivery',
    description: 'Collect from our downtown Calgary office or receive by secure email or courier.',
  },
]

const stats = [
  { value: '139', label: 'Five-Star Reviews', icon: Star },
  { value: '95+', label: 'Languages', icon: Languages },
  { value: '10+', label: 'Years Experience', icon: Building },
  { value: '50K+', label: 'Documents Translated', icon: FileText },
]

const faqs = [
  {
    question: 'What is a certified translation?',
    answer: 'A certified translation includes a signed statement from a qualified translator attesting to the accuracy and completeness of the translation. This certification is required by IRCC, courts, WES, IQAS, and government agencies. Our certifications include the translator\'s credentials, signature, date, and official stamp.',
  },
  {
    question: 'Are your translations accepted by IRCC?',
    answer: 'Yes, all our translations are 100% accepted by Immigration, Refugees and Citizenship Canada (IRCC). We provide a full money-back guarantee if IRCC ever rejects our translation for any reason related to translation quality or certification.',
  },
  {
    question: 'How fast can I get a certified translation?',
    answer: 'Standard service is 2-3 business days. Rush service (24 hours) and same-day service are available for urgent deadlines. Contact us directly for same-day requests to confirm availability.',
  },
  {
    question: 'Do you provide notarization?',
    answer: 'Yes, Commissioner of Oaths certification (equivalent to notarization for IRCC purposes) is included FREE with every translation. If you need additional notarization by a Notary Public, this service is available for an additional fee.',
  },
  {
    question: 'What is your pricing?',
    answer: 'Our certified translations start at $65 per document. Pricing depends on document length, complexity, and language pair. Multi-document packages (like PR or citizenship applications) offer discounted bundle pricing starting at $120. Contact us for an exact quote.',
  },
  {
    question: 'What languages do you translate?',
    answer: 'We translate from 95+ languages including Punjabi, Hindi, Urdu, Mandarin, Cantonese, Arabic, Farsi, Spanish, French, Vietnamese, Korean, Japanese, Tagalog, Russian, Ukrainian, and many more. All translators are native speakers with professional certification.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Certified Translation', url: '/services/certified' },
]

// =============================================================================
// COMPONENT
// =============================================================================

export default function CertifiedTranslationContent() {
  return (
    <>
      {/* Structured Data */}
      <ServiceJsonLd
        name="Certified Translation Services Calgary"
        description="IRCC-certified translation services for immigration, legal, and academic documents. Government of Alberta approved. 100% acceptance guarantee. From $65."
        url="https://cethos.com/services/certified"
      />
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* ===================================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================================== */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-20">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4"
              >
                CERTIFIED TRANSLATION SERVICES
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[36px] md:text-[44px] font-bold text-[#0C2340] leading-[1.1] mb-6"
              >
                IRCC-Certified Translation Services Calgary
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-4"
              >
                Official document translations accepted by IRCC, courts, WES, IQAS, and government
                agencies across Canada. Birth certificates, marriage documents, academic credentials,
                and immigration papers—translated and certified same-day.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-6"
              >
                Government of Alberta approved translator. Notarization included with every translation.
              </motion.p>

              {/* Price Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0891B2]/10 rounded-full mb-6"
              >
                <span className="text-[#0891B2] font-bold text-lg">From $65</span>
                <span className="text-slate-600">per document</span>
              </motion.div>

              {/* CTAs */}
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
                  href="mailto:info@cethos.com?subject=Certified Translation Quote"
                  className="px-6 py-3 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" /> Email Us
                </a>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-3"
              >
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#0891B2]" />
                    100% IRCC Accepted
                  </span>
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-[#0891B2]" />
                    Government of Alberta Approved
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0891B2]" />
                    Same-Day Available
                  </span>
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

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-[420px] h-[420px] bg-gradient-to-br from-[#E0F2FE] via-white to-[#0891B2]/20 rounded-2xl flex items-center justify-center shadow-lg border border-slate-100">
                <div className="text-center">
                  <FileText className="w-24 h-24 text-[#0891B2] mx-auto mb-4" strokeWidth={1} />
                  <div className="text-2xl font-bold text-[#0C2340] mb-2">Certified & Notarized</div>
                  <div className="text-slate-600">Ready for IRCC submission</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* STATS BAR */}
      {/* ===================================================================== */}
      <section className="bg-[#0C2340] py-8">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-6 h-6 text-[#0891B2]" />
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* FEATURES */}
      {/* ===================================================================== */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-6 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-[#0891B2]" />
                  </div>
                  <h3 className="font-semibold text-[#0C2340] mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* SPECIALIZED SERVICES */}
      {/* ===================================================================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <SectionHeading
            title="Translation Services"
            subtitle="Choose the service that fits your needs. All translations include certification and notarization."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializedServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <Card hover className="h-full p-6 group relative">
                    {service.popular && (
                      <div className="absolute -top-3 right-4 px-3 py-1 bg-[#0891B2] text-white text-xs font-semibold rounded-full">
                        Popular
                      </div>
                    )}
                    <div className="w-12 h-12 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mb-4 group-hover:bg-[#0891B2] transition-colors">
                      <service.icon className="w-6 h-6 text-[#0891B2] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-[#0C2340] mb-2 group-hover:text-[#0891B2] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#0891B2]">{service.price}</span>
                      <span className="flex items-center gap-1 text-sm text-[#0891B2] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* DOCUMENT CATEGORIES */}
      {/* ===================================================================== */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title="Documents We Translate"
            subtitle="Comprehensive certified translation for all document types required by IRCC, WES, courts, and government agencies."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                    <div className="w-10 h-10 rounded-lg bg-[#0891B2]/10 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-[#0891B2]" />
                    </div>
                    <h3 className="font-semibold text-[#0C2340]">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
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

      {/* ===================================================================== */}
      {/* LANGUAGES */}
      {/* ===================================================================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <SectionHeading
            title="Languages We Translate"
            subtitle="95+ languages with native-speaking certified translators. All major South Asian, Middle Eastern, East Asian, and European languages."
            className="mb-12"
          />
          <div className="flex flex-wrap justify-center gap-3">
            {languages.map((lang, index) => (
              <motion.span
                key={lang}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-[#0C2340] border border-slate-200 hover:border-[#0891B2] hover:text-[#0891B2] transition-colors"
              >
                {lang}
              </motion.span>
            ))}
            <span className="px-4 py-2 bg-[#0891B2] text-white rounded-full text-sm font-medium">
              + 65 more languages
            </span>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* HOW IT WORKS */}
      {/* ===================================================================== */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-4">How It Works</h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Get your certified translation in 4 simple steps. Most documents completed within 2-3 business days.
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
                <p className="text-white/70 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* FAQ */}
      {/* ===================================================================== */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Common questions about our certified translation services."
            className="mb-12"
          />
          <div className="max-w-3xl mx-auto space-y-4">
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
      {/* CTA */}
      {/* ===================================================================== */}
      <section className="py-16 bg-gradient-to-r from-[#0C2340] to-[#164e63]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Get Your Documents Translated Today
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              IRCC-accepted certified translations from $65. Same-day service available.
              Government of Alberta approved with notarization included.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:5876000786"
                className="px-8 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> (587) 600-0786
              </a>
              <a
                href="mailto:info@cethos.com?subject=Certified Translation Quote"
                className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
              >
                <Mail className="w-5 h-5" /> Email for Quote
              </a>
            </div>
            <p className="text-white/60 text-sm mt-6">
              From $65 • Same-day available • Government of Alberta approved • Notarization included
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
