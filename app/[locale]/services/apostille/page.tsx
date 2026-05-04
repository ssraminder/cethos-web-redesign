import { Metadata } from 'next'
import ApostilleContent from './ApostilleContent'

export const metadata: Metadata = {
  title: 'Apostille Services Canada | Hague Convention Authentication | Cethos',
  description: "Canada-wide apostille services for documents used abroad. Hague Apostille Convention authentication for Canadian birth certificates, marriage certificates, education credentials, police checks, and corporate documents. Fast turnaround, all provinces.",
  keywords: [
    'apostille canada',
    'apostille services canada',
    'canadian apostille',
    'hague apostille canada',
    'global affairs canada apostille',
    'apostille calgary',
    'apostille alberta',
    'document apostille canada',
    'apostille birth certificate canada',
    'apostille marriage certificate canada',
  ],
  alternates: {
    canonical: 'https://cethos.com/services/apostille',
  },
  openGraph: {
    title: 'Apostille Services Canada | Hague Convention Authentication',
    description: 'Canada-wide apostille services. Hague Convention authentication for Canadian documents used abroad. Fast turnaround, all provinces.',
    url: 'https://cethos.com/services/apostille',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function ApostillePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Apostille Services in Canada',
            description: 'Hague Convention apostille authentication for Canadian documents used abroad.',
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
            areaServed: {
              '@type': 'Country',
              name: 'Canada',
            },
            serviceType: 'Document Apostille and Authentication',
            offers: {
              '@type': 'Offer',
              price: '99.00',
              priceCurrency: 'CAD',
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: '99.00',
                priceCurrency: 'CAD',
              },
            },
          }),
        }}
      />
      <ApostilleContent />
    </>
  )
}
