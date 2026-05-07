import { Metadata } from 'next'
import DocumentsHubContent from './DocumentsHubContent'

export const metadata: Metadata = {
  title: 'Certified Translated Documents Calgary | IRCC Accepted | From $55',
  description:
    'Need a certified translated document? Cethos translates birth certificates, marriage certificates, driver’s licenses, transcripts, immigration papers and more. IRCC accepted, same-day available, from $55.',
  keywords: [
    'certified translated document',
    'certified translated documents Calgary',
    'certified document translation',
    'certified translation services Calgary',
    'certified translator Calgary',
    'document translation services Calgary',
    'IRCC certified translation',
    'notarized document translation',
  ],
  alternates: {
    canonical: 'https://cethos.com/services/certified/documents',
  },
  openGraph: {
    title: 'Certified Translated Documents Calgary | IRCC Accepted | From $55',
    description:
      'Birth certificates, marriage certificates, driver’s licenses, transcripts, immigration documents and more. Certified translations accepted by IRCC, registries, and Canadian government bodies.',
    url: 'https://cethos.com/services/certified/documents',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function CertifiedDocumentsHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Certified Translated Documents',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Cethos Solutions Inc.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '421 7 Avenue SW, Floor 30',
                addressLocality: 'Calgary',
                addressRegion: 'AB',
                postalCode: 'T2P 4K9',
                addressCountry: 'CA',
              },
              telephone: '+1-587-600-0786',
            },
            areaServed: { '@type': 'City', name: 'Calgary' },
            serviceType: 'Certified Document Translation',
            offers: {
              '@type': 'Offer',
              price: '55.00',
              priceCurrency: 'CAD',
            },
          }),
        }}
      />
      <DocumentsHubContent />
    </>
  )
}
