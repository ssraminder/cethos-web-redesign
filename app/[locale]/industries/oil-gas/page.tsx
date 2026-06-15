import { Metadata } from 'next'
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

export default function OilGasPage() {
  return (
    <>
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
