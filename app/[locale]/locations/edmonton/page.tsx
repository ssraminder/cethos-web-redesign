import { Metadata } from 'next';
import LocationPageTemplate from '@/components/locations/LocationPageTemplate';

export const metadata: Metadata = {
  title: 'Edmonton Translation Services | Certified IRCC Translation | Cethos',
  description: 'Certified translation services in Edmonton. IRCC accepted for immigration, PR & citizenship. Birth certificate & marriage certificate translation. 139 five-star reviews. From $65.',
  alternates: {
    canonical: 'https://cethos.com/locations/edmonton'
  }
};

export default function EdmontonTranslationPage() {
  return (
    <LocationPageTemplate
      city="Edmonton"
      province="Alberta"
      provinceCode="AB"
      h1="Edmonton Translation Services"
      hasSameDay={false}
      pnpProgram="Alberta Advantage Immigration Program (AAIP)"
      pnpName="Alberta Advantage Immigration Program"
      topLanguages={['Tagalog', 'Punjabi', 'Arabic', 'Mandarin', 'Spanish', 'Ukrainian', 'Hindi', 'French', 'Vietnamese', 'Somali']}
      serviceAreas={['Downtown', 'Whyte Avenue', 'West Edmonton', 'Mill Woods', 'Southgate', 'Oliver', 'Strathcona', 'Bonnie Doon']}
      nearbyAreas={['St. Albert', 'Sherwood Park', 'Spruce Grove', 'Leduc', 'Fort Saskatchewan', 'Beaumont', 'Stony Plain']}
      uniqueFeatures={[
        'Government of Alberta approved translator',
        'Courier delivery across Edmonton and area',
        'Digital delivery within hours',
        "Supporting Edmonton's growing immigrant community"
      ]}
      faqs={[
        {
          question: 'Do you have a translation office in Edmonton?',
          answer: 'We serve Edmonton from our Calgary headquarters with fast courier and digital delivery. Most clients receive documents within 24-48 hours.'
        },
        {
          question: 'How do I get my translated documents in Edmonton?',
          answer: 'We deliver via secure email (instant) and Canada Post/courier for hard copies. Rush delivery is available across Edmonton and surrounding areas.'
        },
        {
          question: 'Are your translations accepted for Alberta PNP (AAIP)?',
          answer: 'Yes! Our certified translations are accepted for the Alberta Advantage Immigration Program and all IRCC applications.'
        },
        {
          question: 'How fast can you translate my documents for Edmonton?',
          answer: 'Standard turnaround is 2-3 business days. Rush service (24-48 hours) is available for urgent deadlines.'
        },
        {
          question: 'Do you translate documents for University of Alberta applications?',
          answer: 'Yes! We provide certified translation for academic transcripts, diplomas, and other documents required for university applications.'
        },
        {
          question: 'What if I need notarization in Edmonton?',
          answer: 'All our certified translations include notarization. The notarized documents are valid across Canada for all government purposes.'
        }
      ]}
    />
  );
}
