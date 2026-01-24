import { Hero, Services, Stats, Industries, WhyUs, CTA } from '@/components/sections'
import TrustedByLogos from '@/components/TrustedByLogos'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <Industries />
      <WhyUs />
      <TrustedByLogos
        title="Trusted by Leading Global Companies"
        subtitle="Join 500+ enterprises who rely on Cethos for precision translation"
      />
      <CTA />
    </>
  )
}
