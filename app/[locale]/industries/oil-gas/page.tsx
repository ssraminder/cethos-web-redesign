import { Metadata } from 'next'
import { FAQJsonLd } from '@/components/JsonLd'
import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate'

export const metadata: Metadata = {
  title: 'Oil & Gas Translation Services | Upstream, Midstream & Downstream',
  description: 'Specialized oil & gas translation: drilling, pipelines, LNG, refining, HSE documentation, and regulatory filings in 200+ languages. Calgary-based energy translation experts.',
  keywords: ['oil and gas translation', 'oilfield translation', 'petroleum translation', 'LNG translation', 'pipeline translation', 'HSE translation', 'drilling documentation translation', 'energy translation Calgary'],
  alternates: {
    canonical: 'https://cethos.com/industries/oil-gas',
  },
  openGraph: {
    title: 'Oil & Gas Translation Services | Cethos Solutions',
    description: 'Technical, HSE, and regulatory translation for upstream, midstream, and downstream oil & gas operations worldwide. Headquartered in Calgary.',
    type: 'website',
    url: 'https://cethos.com/industries/oil-gas',
  },
}

const faqs = [
  { question: 'What oil & gas documents do you translate?', answer: 'Drilling and completion programs, equipment and rig manuals, P&IDs, HSE and safety procedures, AER and regulatory filings, PSCs and JOAs, and corporate and investor communications — among others.' },
  { question: 'Do your linguists understand technical oil & gas terminology?', answer: 'Yes. We assign sector-experienced linguists and maintain client-specific terminology databases so drilling, reservoir, pipeline, and refining terms stay accurate and consistent.' },
  { question: 'Can you handle HSE and safety-critical content?', answer: 'Yes. Safe work procedures, permits, well-control and emergency-response plans, and SDS/MSDS are translated through a rigorous multi-step quality process, because errors carry real safety risk.' },
  { question: 'Which regulatory frameworks do you support?', answer: 'We translate filings for the AER and international regulators, plus environmental impact assessments and permit applications for jurisdictions worldwide.' },
  { question: 'How do you protect confidential technical data?', answer: 'Encrypted file transfer, signed NDAs, and PIPEDA- and GDPR-aligned handling protect seismic data, drilling plans, and proprietary information.' },
  { question: 'What are your turnaround times?', answer: 'Turnaround depends on volume and language count; we scale teams for large projects and offer rush service for time-sensitive submissions and field operations.' },
]

export default function OilGasPage() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Oil & Gas Translation Services",
            "provider": {
              "@type": "Organization",
              "name": "Cethos Solutions Inc.",
              "url": "https://cethos.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "421 7 Avenue SW, Floor 30",
                "addressLocality": "Calgary",
                "addressRegion": "AB",
                "postalCode": "T2P 4K9",
                "addressCountry": "CA"
              }
            },
            "serviceType": "Translation Services",
            "areaServed": "Worldwide",
            "description": "Specialized translation for upstream, midstream, and downstream oil & gas operations — technical manuals, HSE documentation, regulatory filings, and contracts in 200+ languages."
          })
        }}
      />

      <IndustryPageTemplate base="oil-gas" />
    </>
  )
}
