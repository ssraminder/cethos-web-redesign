import { Metadata } from 'next';
import TranscriptionPageContent from './TranscriptionPageContent';

export const metadata: Metadata = {
  title: 'Professional Transcription Services | Legal, Medical, Business | Cethos',
  description: 'Professional transcription services with 99%+ accuracy. Legal transcription for depositions, court hearings, and trials. Medical, business, and academic transcription in 200+ languages. Court-certified. Rush available.',
  keywords: 'transcription services, legal transcription, deposition transcription, court transcription, medical transcription, business transcription, academic transcription, verbatim transcription, certified transcription, Calgary transcription services',
  alternates: { canonical: 'https://cethos.com/services/transcription' },
  openGraph: {
    title: 'Professional Transcription Services | Cethos Solutions Inc.',
    description: 'Court-certified transcription with 99%+ accuracy. Legal, medical, business, and academic transcription in 200+ languages.',
    url: 'https://cethos.com/services/transcription',
    siteName: 'Cethos Solutions Inc.',
    locale: 'en_CA',
    type: 'website',
  },
};

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Professional Transcription Services',
  description: 'Court-certified transcription services with 99%+ accuracy for legal, medical, business, and academic content in 200+ languages.',
  provider: {
    '@type': 'Organization',
    name: 'Cethos Solutions Inc.',
    url: 'https://cethos.com',
    telephone: '+1-587-600-0786',
    email: 'info@cethos.com',
  },
  serviceType: ['Legal Transcription', 'Medical Transcription', 'Business Transcription', 'Academic Transcription', 'Deposition Transcription', 'Transcription and Translation'],
  areaServed: [{ '@type': 'Country', name: 'Canada' }, { '@type': 'Country', name: 'United States' }],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Transcription Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Standard Transcription' }, priceSpecification: { '@type': 'PriceSpecification', price: '1.50', priceCurrency: 'CAD', unitText: 'per audio minute' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rush Transcription' }, priceSpecification: { '@type': 'PriceSpecification', price: '2.25', priceCurrency: 'CAD', unitText: 'per audio minute' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Same-Day Transcription' }, priceSpecification: { '@type': 'PriceSpecification', price: '3.00', priceCurrency: 'CAD', unitText: 'per audio minute' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Transcription + Translation Bundle' }, priceSpecification: { '@type': 'PriceSpecification', price: '3.50', priceCurrency: 'CAD', unitText: 'per audio minute (starting price)' } },
    ],
  },
};

export default function TranscriptionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <TranscriptionPageContent />
    </>
  );
}
