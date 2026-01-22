import { Metadata } from 'next'
import Link from 'next/link'
import { Gamepad2, Globe, Sparkles, Users, CheckCircle, ArrowRight, Languages, Clock } from 'lucide-react'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Video Game Localization Services | Gaming Translation',
  description: 'Expert video game localization for AAA & indie games. In-game text, UI, voiceover, subtitles & marketing. 50+ languages. Culturalization & LQA included.',
  keywords: ['game localization', 'video game translation', 'game translation services', 'gaming localization', 'game culturalization', 'game LQA'],
  alternates: {
    canonical: 'https://cethos.com/industries/gaming',
  },
  openGraph: {
    title: 'Video Game Localization Services | Cethos',
    description: 'Expert video game localization for AAA and indie games with culturalization and LQA.',
    url: 'https://cethos.com/industries/gaming',
  },
}

const challenges = [
  {
    title: 'Cultural Adaptation',
    description: 'Go beyond translation with full culturalization to ensure your game resonates with players in every market.',
  },
  {
    title: 'Context Matters',
    description: 'Translate strings accurately with full context awareness to maintain immersion and gameplay experience.',
  },
  {
    title: 'Live Ops Support',
    description: 'Keep up with frequent updates, events, and patches with rapid turnaround localization.',
  },
  {
    title: 'Quality Assurance',
    description: 'Comprehensive LQA testing to catch issues before your players do.',
  },
]

const services = [
  'In-Game Text & UI Strings',
  'Dialogue & Subtitles',
  'Voiceover & Audio Recording',
  'Marketing & Store Listings',
  'Player Support Content',
  'Culturalization Services',
  'Linguistic QA (LQA)',
  'DLC & Live Event Content',
]

const stats = [
  { value: '150+', label: 'Games Localized' },
  { value: '50+', label: 'Languages' },
  { value: '1B+', label: 'Words Translated' },
  { value: 'AAA', label: 'Quality Standards' },
]

const faqs = [
  {
    question: 'What game localization services do you offer?',
    answer: 'We offer full game localization including in-game text, UI strings, dialogue, subtitles, voiceover recording, marketing materials, store listings, and player support content.',
  },
  {
    question: 'Do you provide culturalization services?',
    answer: 'Yes, we go beyond translation to adapt content for cultural appropriateness. This includes adjusting humor, references, imagery, and gameplay elements for different markets.',
  },
  {
    question: 'What is your LQA process?',
    answer: 'Our Linguistic Quality Assurance (LQA) includes in-context review, functionality testing, and cultural verification. We test on actual devices to ensure translations work within your game.',
  },
  {
    question: 'Can you handle live games with frequent updates?',
    answer: 'Yes, we support live ops localization with rapid turnaround for events, updates, and patches. We integrate with your content management systems for continuous delivery.',
  },
  {
    question: 'Do you work with indie developers?',
    answer: 'Absolutely! We work with studios of all sizes, from indie developers to AAA publishers. Our flexible services scale to match your project needs and budget.',
  },
]

export default function GamingPage() {
  return (
    <>
      <ServiceJsonLd
        name="Video Game Localization Services"
        description="Expert video game localization for AAA and indie games with culturalization and LQA."
        url="https://cethos.com/industries/gaming"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
                GAMING & ENTERTAINMENT
              </div>
              <h1 className="text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6">
                Video Game Localization Services
              </h1>
              <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
                Level up your global reach with expert game localization.
                From indie titles to AAA blockbusters, we help you deliver
                authentic player experiences worldwide.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <Link href="/get-quote" className="px-6 py-4 bg-[#0891B2] text-white rounded-lg hover:bg-[#06B6D4] transition-colors text-base font-semibold flex items-center gap-2">
                  Get a Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="px-6 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg hover:bg-[#F8FAFC] transition-colors text-base font-semibold">
                  Contact Us
                </Link>
              </div>
              {/* Service Badges */}
              <div className="flex items-center gap-6 text-sm text-[#4B5563]">
                <span className="flex items-center gap-2">
                  <Languages className="w-5 h-5 text-[#0891B2]" />
                  50+ Languages
                </span>
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#0891B2]" />
                  Culturalization
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#0891B2]" />
                  LQA Included
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[400px] h-[400px] bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 rounded-2xl flex items-center justify-center">
                <Gamepad2 className="w-32 h-32 text-[#0891B2]" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0C2340] py-12">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              Game Localization Challenges We Solve
            </h2>
            <p className="text-lg text-[#4B5563] max-w-[600px] mx-auto">
              We understand the unique needs of game developers and players
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-[#F8FAFC] rounded-lg p-8">
                <h3 className="text-xl font-semibold text-[#0C2340] mb-3">
                  {challenge.title}
                </h3>
                <p className="text-base text-[#4B5563] leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[40px] font-bold text-[#0C2340] mb-6">
                Game Content We Localize
              </h2>
              <p className="text-lg text-[#4B5563] mb-8">
                End-to-end game localization services to bring your
                vision to players around the world.
              </p>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#0891B2] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#4B5563]">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-[#0C2340] mb-6">
                Why Choose Cethos for Gaming
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Gamer Linguists</div>
                    <div className="text-sm text-[#4B5563]">Translators who are passionate gamers</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Full Culturalization</div>
                    <div className="text-sm text-[#4B5563]">Cultural adaptation beyond translation</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Fast Turnaround</div>
                    <div className="text-sm text-[#4B5563]">Support live ops and frequent updates</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24">
        <div className="max-w-[800px] mx-auto px-8">
          <h2 className="text-[40px] font-bold text-[#0C2340] text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#E5E7EB] pb-6">
                <h3 className="text-lg font-semibold text-[#0C2340] mb-3">
                  {faq.question}
                </h3>
                <p className="text-base text-[#4B5563] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0C2340] via-[#1A365D] to-[#0891B2] py-24">
        <div className="max-w-[800px] mx-auto px-8 text-center">
          <h2 className="text-[40px] font-bold text-white mb-4">
            Ready to Take Your Game Global?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Get a free quote for your game localization project
          </p>
          <Link href="/get-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0C2340] rounded-lg hover:bg-gray-100 transition-colors text-base font-semibold">
            Get Your Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
