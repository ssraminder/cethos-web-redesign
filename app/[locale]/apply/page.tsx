import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { ArrowRight, Briefcase, Users, MapPin, Clock } from 'lucide-react'
import { fullTimeRoles, roleApplyUrl } from '@/lib/careers'

const VENDOR_APPLY_URL = 'https://join.cethos.com/apply'

export const metadata: Metadata = {
  title: 'Apply to Cethos — Full-time roles & freelance network',
  description:
    'Apply to Cethos: explore full-time, fully-remote positions, or join our global freelance/vendor network of translators, interpreters, transcribers, and clinical reviewers.',
  alternates: { canonical: 'https://cethos.com/apply' },
}

export default function ApplyPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#0C2340] to-[#1a3a5c]">
        <div className="max-w-[1100px] mx-auto px-8 text-center">
          <h1 className="text-[44px] leading-[1.1] font-bold text-white mb-4">
            Apply to Cethos
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Two ways to work with us — choose the path that fits.
          </p>
        </div>
      </section>

      {/* Two paths */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-8 grid md:grid-cols-2 gap-6">
          {/* Full-time */}
          <div className="border border-gray-200 rounded-2xl p-8 flex flex-col">
            <div className="w-12 h-12 rounded-lg bg-[#0891B2]/10 flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-[#0891B2]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0C2340] mb-2">Full-time roles</h2>
            <p className="text-[#4B5563] mb-6">
              Remote and on-site staff positions. View the description and apply directly on this site.
            </p>
            <div className="space-y-3 mb-2">
              {fullTimeRoles.map((role) => (
                <Link
                  key={role.slug}
                  href={roleApplyUrl(role.slug)}
                  className="group block rounded-xl border border-gray-100 bg-[#F8FAFC] p-4 hover:border-[#0891B2] transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-[#0C2340] leading-snug">{role.title}</h3>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#4B5563] mt-1.5">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {role.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {role.type}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#0891B2] flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/careers"
              className="mt-4 inline-flex items-center gap-1 text-[#0891B2] font-semibold text-sm hover:text-[#06B6D4]"
            >
              See all open positions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Freelance / vendor */}
          <div className="border border-gray-200 rounded-2xl p-8 flex flex-col">
            <div className="w-12 h-12 rounded-lg bg-[#0891B2]/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[#0891B2]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0C2340] mb-2">Freelance / vendor network</h2>
            <p className="text-[#4B5563] mb-6">
              Join our global network of freelance translators, interpreters, transcribers,
              clinician reviewers, and cognitive debriefing consultants across 130+ languages.
            </p>
            <ul className="space-y-2 text-sm text-[#4B5563] mb-8">
              {[
                'Translator / Reviewer',
                'Interpreter',
                'Transcriber',
                'Clinician Reviewer',
                'Cognitive Debriefing Consultant',
              ].map((r) => (
                <li key={r} className="flex gap-2.5">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0891B2] flex-shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <a
              href={VENDOR_APPLY_URL}
              className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#06B6D4] transition-colors"
            >
              Apply to the vendor network <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
