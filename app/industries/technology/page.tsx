import { Metadata } from 'next'
import Link from 'next/link'
import { Code2, GitBranch, Zap, Users, CheckCircle, ArrowRight, Globe, Clock } from 'lucide-react'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Technology Translation & Software Localization Services',
  description: 'Expert technology translation for software, apps, documentation, APIs & technical content. Continuous localization. 100+ languages. Agile-friendly workflows.',
  keywords: ['technology translation', 'software localization', 'technical translation', 'IT translation', 'app localization', 'API documentation translation'],
  alternates: {
    canonical: 'https://cethos.com/industries/technology',
  },
  openGraph: {
    title: 'Technology Translation & Software Localization | Cethos',
    description: 'Expert technology translation and software localization for apps, documentation, and technical content.',
    url: 'https://cethos.com/industries/technology',
  },
}

const challenges = [
  {
    title: 'Continuous Localization',
    description: 'Keep pace with agile development cycles and frequent releases with automated, continuous localization workflows.',
  },
  {
    title: 'Technical Accuracy',
    description: 'Maintain precise technical terminology across UI strings, documentation, and API references.',
  },
  {
    title: 'Context-Aware Translation',
    description: 'Understand where strings appear in your application to ensure translations make sense in context.',
  },
  {
    title: 'Developer Integration',
    description: 'Seamlessly integrate with your existing development tools and CI/CD pipelines.',
  },
]

const services = [
  'Software & App Localization',
  'Technical Documentation',
  'API & SDK Documentation',
  'Help Center & Knowledge Base',
  'Marketing Website Localization',
  'UI/UX String Translation',
  'Release Notes & Changelogs',
  'Developer Portal Content',
]

const stats = [
  { value: '200+', label: 'Tech Clients' },
  { value: '100+', label: 'Languages' },
  { value: '99.5%', label: 'On-Time Delivery' },
  { value: '24/7', label: 'Support Available' },
]

const faqs = [
  {
    question: 'Do you integrate with development workflows?',
    answer: 'Yes, we integrate with GitHub, GitLab, Bitbucket, and popular CI/CD pipelines. We support continuous localization workflows with automated string extraction and delivery.',
  },
  {
    question: 'What file formats do you support?',
    answer: 'We support all common formats including JSON, YAML, XML, PO/POT, XLIFF, iOS strings, Android XML, React i18n, and proprietary formats. Our engineers can work with your existing localization infrastructure.',
  },
  {
    question: 'Can you handle UI/UX localization?',
    answer: 'Yes, our linguists are trained in UI/UX best practices. We consider text expansion, character limits, and cultural UI conventions to ensure your localized app provides an excellent user experience.',
  },
  {
    question: 'What is your approach to technical terminology?',
    answer: 'We maintain technology-specific glossaries and use translation memory to ensure consistency. Our linguists have backgrounds in software development, IT, and technical writing.',
  },
  {
    question: 'Do you offer localization testing?',
    answer: 'Yes, we provide linguistic testing (LQA) to verify translations in context, check for truncation issues, and ensure cultural appropriateness of the localized product.',
  },
]

export default function TechnologyPage() {
  return (
    <>
      <ServiceJsonLd
        name="Technology Translation & Software Localization Services"
        description="Expert technology translation and software localization for apps, documentation, and technical content."
        url="https://cethos.com/industries/technology"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
                TECHNOLOGY & SOFTWARE
              </div>
              <h1 className="text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6">
                Technology Translation & Localization
              </h1>
              <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
                Agile-friendly software localization for apps, technical documentation,
                and developer content. Integrate seamlessly with your development
                workflow and ship globally.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <Link href="/get-quote" className="px-6 py-4 bg-[#0891B2] text-white rounded-lg hover:bg-[#06B6D4] transition-colors text-base font-semibold flex items-center gap-2">
                  Get a Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="px-6 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg hover:bg-[#F8FAFC] transition-colors text-base font-semibold">
                  Contact Us
                </Link>
              </div>
              {/* Integration Badges */}
              <div className="flex items-center gap-6 text-sm text-[#4B5563]">
                <span className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-[#0891B2]" />
                  GitHub Integration
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#0891B2]" />
                  CI/CD Ready
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#0891B2]" />
                  100+ Languages
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[400px] h-[400px] bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 rounded-2xl flex items-center justify-center">
                <Code2 className="w-32 h-32 text-[#0891B2]" strokeWidth={1} />
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
              Technology Localization Challenges We Solve
            </h2>
            <p className="text-lg text-[#4B5563] max-w-[600px] mx-auto">
              We understand the fast-paced world of software development
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
                Technology Content We Translate
              </h2>
              <p className="text-lg text-[#4B5563] mb-8">
                End-to-end localization services for technology companies,
                from UI strings to developer documentation.
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
                Why Choose Cethos for Tech
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Tech-Savvy Linguists</div>
                    <div className="text-sm text-[#4B5563]">Translators with software development backgrounds</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <GitBranch className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Developer-Friendly</div>
                    <div className="text-sm text-[#4B5563]">API, CLI, and VCS integrations</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Agile Workflows</div>
                    <div className="text-sm text-[#4B5563]">Keep pace with sprint cycles</div>
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
            Ready to Go Global?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Get a free quote for your software localization project
          </p>
          <Link href="/get-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0C2340] rounded-lg hover:bg-gray-100 transition-colors text-base font-semibold">
            Get Your Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
