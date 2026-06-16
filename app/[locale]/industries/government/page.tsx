import { Metadata } from 'next'
import { FAQJsonLd } from '@/components/JsonLd'
import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate'

export const metadata: Metadata = {
  title: 'Government & Public Sector Translation Services | Cethos',
  description: 'Certified translation for government and public sector: immigration (IRCC), courts, official languages, citizen services, and policy documents in 200+ languages. PIPEDA-compliant.',
  keywords: ['government translation', 'public sector translation', 'IRCC translation', 'court translation', 'official languages translation', 'municipal translation', 'certified government translation', 'PIPEDA translation'],
  alternates: {
    canonical: 'https://cethos.com/industries/government',
  },
  openGraph: {
    title: 'Government & Public Sector Translation Services | Cethos Solutions',
    description: 'Certified, privacy-compliant translation for federal, provincial, and municipal government — immigration, courts, official languages, and citizen services.',
    type: 'website',
    url: 'https://cethos.com/industries/government',
  },
}

const faqs = [
  { question: 'What government and public-sector documents do you translate?', answer: 'Certified vital records and identity documents, IRCC immigration and citizenship documentation, court and tribunal materials, public communications, and policy and administrative documents.' },
  { question: 'Are your translations accepted by IRCC and the courts?', answer: 'Yes. We provide certified translations with declarations of accuracy that meet IRCC requirements and are accepted by courts, tribunals, and government bodies across Canada.' },
  { question: 'Can you support Official Languages Act obligations?', answer: 'Yes. We provide English–French translation and bilingual publication support to help federal institutions meet their Official Languages Act obligations.' },
  { question: 'How do you handle privacy and sensitive citizen data?', answer: 'We follow PIPEDA- and Privacy Act-aligned data handling, with encrypted transfer, signed NDAs, and security-cleared linguists available for sensitive material.' },
  { question: 'Do you provide interpretation for hearings and public events?', answer: 'Yes. We provide professional interpreters for court and tribunal hearings, public consultations, and citizen services — on-site, remote, or by telephone.' },
  { question: 'Can you produce accessible and plain-language formats?', answer: 'Yes. We offer plain-language adaptation and accessible, alternate formats so public communications reach every resident.' },
]

export default function GovernmentPage() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Government & Public Sector Translation Services",
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
            "areaServed": "Canada",
            "description": "Certified, privacy-compliant translation for federal, provincial, and municipal government — immigration (IRCC), courts, official languages, citizen services, and policy documents in 200+ languages."
          })
        }}
      />

      <IndustryPageTemplate base="government" />
    </>
  )
}
