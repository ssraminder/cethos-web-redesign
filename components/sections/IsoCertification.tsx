'use client'

import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'

// ISO 17100:2015 certification issued by ATC Certification Ltd (ATCISO2567).
// Language-neutral facts live here; copy comes from the `homepage.iso` namespace.
export const ISO_17100 = {
  certificateNumber: 'ATCISO2567',
  standard: 'ISO 17100:2015',
  issuer: 'ATC Certification Ltd',
  approvalDate: '2026-11-11',
  expiryDate: '2029-11-10',
  verifyUrl: 'https://atccertification.com/cwc/?id=266-692-738-077-N',
  markSrc: '/images/iso-17100-atc-certified.png',
} as const

// English defaults, used until the `homepage.iso` rows exist in cethosweb_i18n_translations
// (see scripts/seed-iso-17100-i18n.sql). Keeps the band from rendering "[homepage.iso.x]" placeholders.
const EN: Record<string, string> = {
  eyebrow: 'ISO 17100:2015 Certified',
  heading: 'Independently certified to the international standard for translation services',
  body: 'Cethos Solutions Inc. is certified to ISO 17100:2015 by ATC Certification. Every project in scope is translated and revised by separately qualified linguists, managed by a trained project manager, and documented end to end.',
  cert_label: 'Certificate',
  valid_label: 'Valid',
  valid_value: '11 Nov 2026 – 10 Nov 2029',
  issuer_label: 'Certification body',
  scope_label: 'Scope',
  scope_value: 'All translation and revision services unless agreed otherwise with the client.',
  verify: 'Verify our certificate with ATC Certification',
  mark_alt: 'ATC Certification mark: ISO 17100:2015 Certified, Translation Services',
}

export function IsoCertification() {
  const tr = useTranslations('homepage.iso')
  const t = (key: keyof typeof EN) => (tr.has(key) ? tr(key) : EN[key])

  return (
    <section className="bg-white border-b border-slate-200 py-14" data-testid="iso-17100-band">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 items-center">
          <a
            href={ISO_17100.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center lg:justify-start"
            aria-label={t('verify')}
          >
            <Image
              src={ISO_17100.markSrc}
              alt={t('mark_alt')}
              width={320}
              height={123}
              className="w-[280px] lg:w-[320px] h-auto"
            />
          </a>

          <div>
            <p className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-3">
              {t('eyebrow')}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0C2340] leading-tight mb-4">
              {t('heading')}
            </h2>
            <p className="text-[#4B5563] leading-relaxed mb-6 max-w-2xl">{t('body')}</p>

            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mb-6">
              <div className="bg-slate-50 rounded-lg px-4 py-3">
                <dt className="text-[#717182]">{t('cert_label')}</dt>
                <dd className="font-semibold text-[#0C2340]">{ISO_17100.certificateNumber}</dd>
              </div>
              <div className="bg-slate-50 rounded-lg px-4 py-3">
                <dt className="text-[#717182]">{t('valid_label')}</dt>
                <dd className="font-semibold text-[#0C2340]">{t('valid_value')}</dd>
              </div>
              <div className="bg-slate-50 rounded-lg px-4 py-3">
                <dt className="text-[#717182]">{t('issuer_label')}</dt>
                <dd className="font-semibold text-[#0C2340]">{ISO_17100.issuer}</dd>
              </div>
            </dl>

            <p className="text-sm text-[#717182] mb-4">
              <span className="font-medium text-[#0C2340]">{t('scope_label')}:</span> {t('scope_value')}
            </p>

            <a
              href={ISO_17100.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#0891B2] font-semibold hover:text-[#06B6D4] transition-colors"
            >
              {t('verify')}
              <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
