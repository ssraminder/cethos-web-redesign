import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { routing } from '@/i18n/routing'
import { ArrowLeft, MapPin, Clock, Wallet } from 'lucide-react'
import { fullTimeRoles, getRole, roleApplyUrl } from '@/lib/careers'
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
  return {
    title: `Apply — ${role.title}`,
    description: `Apply for ${role.title} at Cethos — fully remote.`,
    alternates: { canonical: `https://cethos.com/careers/${role.slug}/apply` },
    robots: { index: false, follow: true },
  }
}

export default function CareerApplyPage({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const { locale, slug } = params
  setRequestLocale(locale)

  const role = getRole(slug)
  if (!role) notFound()

  return (
    <main>
      <section className="pt-32 pb-10 bg-gradient-to-br from-[#0C2340] to-[#1a3a5c]">
        <div className="max-w-[760px] mx-auto px-8">
          <Link
            href={roleApplyUrl(role.slug)}
            className="inline-flex items-center gap-1 text-gray-300 hover:text-white text-sm mb-5"
          >
            <ArrowLeft className="w-4 h-4" /> Back to role
          </Link>
          <p className="text-[#06B6D4] text-sm font-semibold uppercase tracking-widest mb-2">
            Apply
          </p>
          <h1 className="text-[32px] leading-tight font-bold text-white mb-4">{role.title}</h1>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-200">
            <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {role.location}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {role.type}</span>
            <span className="inline-flex items-center gap-1.5"><Wallet className="w-4 h-4" /> {role.compensation}</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#F8FAFC]">
        <div className="max-w-[760px] mx-auto px-8">
          <FullTimeApplicationForm roleSlug={role.slug} roleTitle={role.title} onsite={!!role.onsiteAddress} hoursQuestion={role.hoursQuestion} />
        </div>
      </section>
    </main>
  )
}
