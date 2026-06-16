import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { routing } from '@/i18n/routing'
import { ArrowLeft, MapPin, Clock, Wallet, CalendarClock } from 'lucide-react'
import { fullTimeRoles, getRole } from '@/lib/careers'
import FullTimeApplicationForm from '@/components/careers/FullTimeApplicationForm'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    fullTimeRoles.map((r) => ({ locale, slug: r.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const role = getRole(params.slug)
  if (!role) return {}
  const url = `https://cethos.com/careers/${role.slug}`
  return {
    title: `${role.title} — Careers`,
    description: role.blurb,
    alternates: { canonical: url },
    openGraph: {
      title: `${role.title} — Careers at Cethos`,
      description: role.blurb,
      url,
      siteName: 'Cethos Solutions Inc.',
      type: 'website',
    },
  }
}

export default function CareerRolePage({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const { locale, slug } = params
  setRequestLocale(locale)

  const role = getRole(slug)
  if (!role) notFound()

  const jobPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: role.title,
    description: role.blurb,
    employmentType: 'FULL_TIME',
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: { '@type': 'Country', name: 'Worldwide' },
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Cethos Solutions Inc.',
      sameAs: 'https://cethos.com',
    },
    directApply: true,
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-14 bg-gradient-to-br from-[#0C2340] to-[#1a3a5c]">
        <div className="max-w-[1100px] mx-auto px-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1 text-gray-300 hover:text-white text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> All open positions
          </Link>
          <h1 className="text-[40px] leading-[1.1] font-bold text-white mb-5 max-w-3xl">
            {role.title}
          </h1>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-200">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {role.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {role.type}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Wallet className="w-4 h-4" /> {role.compensation}
            </span>
          </div>
        </div>
      </section>

      {/* Body: JD + form */}
      <section className="py-16 bg-white">
        <div className="max-w-[1100px] mx-auto px-8 grid lg:grid-cols-5 gap-12">
          {/* JD */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-5 flex gap-3">
              <CalendarClock className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#0C2340] mb-1">Hours</p>
                <p className="text-[#4B5563] text-sm leading-relaxed">{role.hoursNote}</p>
              </div>
            </div>

            {role.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold text-[#0C2340] mb-3">{section.heading}</h2>
                {section.body && (
                  <p className="text-[#4B5563] leading-relaxed">{section.body}</p>
                )}
                {section.bullets && (
                  <ul className="mt-2 space-y-2">
                    {section.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2.5 text-[#4B5563] leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0891B2] flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <FullTimeApplicationForm roleSlug={role.slug} roleTitle={role.title} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
