import type { Metadata } from 'next'
import { Hero, Services, Stats, Industries, WhyUs, MidPageCTA, DualCTA } from '@/components/sections'
import TrustedByLogos from '@/components/TrustedByLogos'
import { LocalBusinessJsonLd } from '@/components/JsonLd'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Cethos Solutions Inc. | Professional Translation Services in 200+ Languages',
  description: 'Professional translation services specializing in Life Sciences, certified translations, and enterprise solutions. ISO 17100 compliant. Offices in Calgary, Dubai, and India.',
  alternates: { canonical: 'https://cethos.com' },
  openGraph: {
    title: 'Cethos Solutions Inc. | Professional Translation Services',
    description: 'Professional translation services in 200+ languages. Life Sciences, certified, business, and legal translation.',
    url: 'https://cethos.com',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function HomePage() {
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
      <TrustedByLogos
        title="Trusted by Leading Global Companies"
        subtitle="Join 500+ enterprises who rely on Cethos for precision translation"
      />
      <MidPageCTA />
      <DualCTA />
    </>
  )
}
