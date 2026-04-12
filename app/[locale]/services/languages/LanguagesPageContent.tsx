'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Globe, CheckCircle, Phone } from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { useTranslations } from 'next-intl'

const allLanguages = [
  // A
  'Acehnese', 'Afar', 'Afrikaans', 'Akan', 'Albanian', 'Amharic', 'Arabic', 'Arabic (Egyptian)', 'Arabic (Gulf)', 'Arabic (Levantine)', 'Arabic (Maghrebi)', 'Arabic (Sudanese)', 'Armenian', 'Assamese', 'Austronesian', 'Azerbaijani',
  // B
  'Balochi', 'Bambara', 'Basque', 'Belarusian', 'Bengali', 'Bhojpuri', 'Bosnian', 'Breton', 'Bulgarian', 'Burmese',
  // C
  'Cantonese', 'Catalan', 'Cebuano', 'Chamorro', 'Chechen', 'Cherokee', 'Chichewa', 'Chittagonian', 'Cree', 'Croatian', 'Czech',
  // D
  'Danish', 'Dinka', 'Divehi (Maldivian)', 'Dogri', 'Dutch', 'Dzongkha',
  // E
  'Edo', 'Estonian', 'Ewe',
  // F
  'Fang', 'Fijian', 'Filipino (Tagalog)', 'Finnish', 'Flemish', 'Fon', 'French', 'French (Canadian)', 'Friulian', 'Fula',
  // G
  'Ga', 'Galician', 'Ganda (Luganda)', 'Georgian', 'German', 'Greek', 'Guarani', 'Gujarati',
  // H
  'Haitian Creole', 'Hakka', 'Harari', 'Hausa', 'Hawaiian', 'Hebrew', 'Hiligaynon', 'Hindi', 'Hmong', 'Hokkien', 'Hungarian',
  // I
  'Icelandic', 'Igbo', 'Ilocano', 'Indonesian', 'Inuktitut', 'Irish (Gaeilge)', 'Italian',
  // J
  'Japanese', 'Javanese', 'Juba Arabic',
  // K
  'Kabyle', 'Kamba', 'Kannada', 'Karen', 'Kashmiri', 'Kazakh', 'Khmer', 'Kiche', 'Kikuyu', 'Kinyarwanda', 'Kirundi', 'Konkani', 'Korean', 'Krio', 'Kurdish (Kurmanji)', 'Kurdish (Sorani)', 'Kyrgyz',
  // L
  'Lao', 'Latvian', 'Lingala', 'Lithuanian', 'Luba-Katanga', 'Luxembourgish',
  // M
  'Macedonian', 'Maithili', 'Malagasy', 'Malay', 'Malayalam', 'Maltese', 'Mandarin Chinese', 'Mandinka', 'Manipuri (Meitei)', 'Maori', 'Marathi', 'Marshallese', 'Mien', 'Mizo', 'Moldovan', 'Mongolian', 'Montenegrin', 'Mossi',
  // N
  'Ndebele', 'Nepali', 'Newari', 'Norwegian', 'Nuer', 'Nyanja',
  // O
  'Odia (Oriya)', 'Ojibwe', 'Oromo',
  // P
  'Pashto', 'Persian (Dari)', 'Persian (Farsi)', 'Polish', 'Portuguese', 'Portuguese (Brazilian)', 'Punjabi (Gurmukhi)', 'Punjabi (Shahmukhi)',
  // Q
  'Quechua',
  // R
  'Romani', 'Romanian', 'Romansh', 'Russian', 'Rwandan',
  // S
  'Samoan', 'Sango', 'Sanskrit', 'Santali', 'Saraiki', 'Serbian', 'Shanghainese', 'Shan', 'Shona', 'Sindhi', 'Sinhala', 'Slovak', 'Slovenian', 'Somali', 'Somali (Maay)', 'Sotho', 'Spanish', 'Spanish (Latin American)', 'Sundanese', 'Susu', 'Swahili', 'Swati', 'Swedish', 'Sylheti',
  // T
  'Tajik', 'Tamil', 'Tatar', 'Telugu', 'Temne', 'Teochew', 'Thai', 'Tibetan', 'Tigrinya', 'Tiv', 'Tok Pisin', 'Tongan', 'Tsonga', 'Tswana', 'Tulu', 'Turkish', 'Turkmen', 'Twi',
  // U
  'Ukrainian', 'Urdu', 'Uyghur', 'Uzbek',
  // V
  'Venda', 'Vietnamese',
  // W
  'Welsh', 'Wolof',
  // X
  'Xhosa',
  // Y
  'Yiddish', 'Yoruba',
  // Z
  'Zulu',
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Languages', url: '/services/languages' },
]

export default function LanguagesPageContent() {
  const tHero = useTranslations('service.languages.hero')
  const tFeatured = useTranslations('service.languages.featured')
  const tAll = useTranslations('service.languages.all')
  const tWhy = useTranslations('service.languages.why')
  const tCta = useTranslations('service.languages.cta')
  const tRelated = useTranslations('service.languages.related')

  const featuredLanguages = [
    { name: 'Arabic', href: '/services/certified/arabic-translation', description: tFeatured('arabic_desc') },
    { name: 'French', href: '/services/certified/french-translation', description: tFeatured('french_desc') },
    { name: 'Hindi', href: '/services/certified/hindi-translation', description: tFeatured('hindi_desc') },
    { name: 'Mandarin (Simplified Chinese)', href: '/services/certified/mandarin-translation', description: tFeatured('mandarin_desc') },
    { name: 'Punjabi', href: '/services/certified/punjabi-translation', description: tFeatured('punjabi_desc') },
    { name: 'Spanish', href: '/services/certified/spanish-translation', description: tFeatured('spanish_desc') },
  ]

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Hero */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-16 md:py-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[36px] md:text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6"
          >
            {tHero('heading')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-[#4B5563] leading-relaxed max-w-3xl mb-8"
          >
            {tHero('description')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/get-quote"
              className="px-6 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
            >
              {tHero('cta_primary')} <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:5876000786"
              className="px-6 py-4 bg-white border border-slate-200 text-[#0C2340] rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <Phone className="w-5 h-5" /> (587) 600-0786
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Languages */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">{tFeatured('heading')}</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            {tFeatured('description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredLanguages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={lang.href}>
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="w-6 h-6 text-[#0891B2]" />
                      <h3 className="text-lg font-semibold text-[#0C2340]">{lang.name} {tFeatured('translation_suffix')}</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">{lang.description}</p>
                    <span className="text-[#0891B2] font-medium text-sm flex items-center gap-1">
                      {tFeatured('view_details')} <ArrowRight className="w-4 h-4" />
                    </span>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* All Supported Languages */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">{tAll('heading')}</h2>
          <p className="text-center text-slate-600 mb-8">
            {tAll('description')}
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
            {allLanguages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1.5 bg-white text-slate-700 rounded-full text-sm border border-slate-200"
              >
                {lang}
              </span>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-6">
            {tAll('note')} <Link href="/contact" className="text-[#0891B2] hover:underline">{tAll('contact_link')}</Link>
          </p>
        </Container>
      </section>

      {/* Why Cethos */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">{tWhy('heading')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: tWhy('ircc_title'), desc: tWhy('ircc_desc') },
              { title: tWhy('native_title'), desc: tWhy('native_desc') },
              { title: tWhy('sameday_title'), desc: tWhy('sameday_desc') },
              { title: tWhy('notary_title'), desc: tWhy('notary_desc') },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <CheckCircle className="w-8 h-8 text-[#0891B2] mx-auto mb-3" />
                <h3 className="font-semibold text-[#0C2340] mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0891B2]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{tCta('heading')}</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              {tCta('description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/get-quote"
                className="px-6 py-4 bg-white text-[#0891B2] rounded-lg font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2"
              >
                {tCta('cta_primary')} <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:5876000786"
                className="px-6 py-4 bg-white/10 text-white border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> (587) 600-0786
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-white border-t">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">{tRelated('heading')}</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/certified" className="text-[#0891B2] hover:underline">
              {tRelated('certified')}
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/immigration-translation-services" className="text-[#0891B2] hover:underline">
              {tRelated('immigration')}
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/birth-certificate-translation" className="text-[#0891B2] hover:underline">
              {tRelated('birth')}
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/interpretation" className="text-[#0891B2] hover:underline">
              {tRelated('interpretation')}
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
