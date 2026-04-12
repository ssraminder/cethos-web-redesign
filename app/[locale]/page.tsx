import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero, Services, Stats, Industries, WhyUs, MidPageCTA, DualCTA } from '@/components/sections'
import ClientTestimonials from '@/components/ClientTestimonials'
import { LocalBusinessJsonLd } from '@/components/JsonLd'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: "Cethos | Certified Translation & Life Sciences",
  description: 'Professional translation services: life sciences, certified translations & enterprise solutions. ISO 17100 compliant. Canada, Dubai & India.',
  alternates: { canonical: 'https://cethos.com' },
  openGraph: {
    title: "Cethos | Certified Translation & Life Sciences",
    description: 'Professional translation services: life sciences, certified translations & enterprise solutions. ISO 17100 compliant. Canada, Dubai & India.',
    url: 'https://cethos.com',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default async function HomePage() {
  const t = await getTranslations('homepage.locations')

  return (
    <>
      <LocalBusinessJsonLd location="calgary" />
      <LocalBusinessJsonLd location="dubai" />
      <LocalBusinessJsonLd location="india" />
      <Hero />
      <Services />
      <Stats />
      <Industries />
      <WhyUs />
      <ClientTestimonials />
      <MidPageCTA />
      <DualCTA />

      {/* Serving Across Canada */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <h2 className="text-2xl font-bold text-[#0C2340] mb-2">{t('heading')}</h2>
          <p className="text-slate-600 mb-6">{t('description')}</p>
          <div className="flex flex-wrap justify-center gap-3">
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
                className="px-5 py-2.5 bg-slate-100 text-gray-800 rounded-lg font-medium hover:bg-[#0891B2] hover:text-white transition-colors text-sm"
              >
                {location.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
