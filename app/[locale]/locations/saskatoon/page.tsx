import { Metadata } from 'next';
import LocationPageTemplate from '@/components/locations/LocationPageTemplate';

export const metadata: Metadata = {
  title: 'Saskatoon Translation Services | Certified IRCC Translation | Cethos',
  description: 'Certified translation services in Saskatoon & Saskatchewan. IRCC accepted. Birth certificate, marriage certificate & immigration document translation. 139 five-star reviews. From $65.',
  alternates: {
    canonical: 'https://cethos.com/locations/saskatoon'
  }
};

export default function SaskatoonTranslationPage() {
  return (
    <LocationPageTemplate
      city="Saskatoon"
      province="Saskatchewan"
      provinceCode="SK"
      h1="Saskatoon Translation Services"
      hasSameDay={false}
      pnpProgram="Saskatchewan Immigrant Nominee Program (SINP)"
      pnpName="Saskatchewan Immigrant Nominee Program"
      topLanguages={['Tagalog', 'Punjabi', 'Mandarin', 'Ukrainian', 'Hindi', 'Arabic', 'Vietnamese', 'Spanish', 'German', 'French']}
      serviceAreas={['Downtown Saskatoon', 'Broadway', 'Riversdale', 'Sutherland', 'Stonebridge', 'Willowgrove', 'Lakeview', 'City Park']}
      nearbyAreas={['Regina', 'Prince Albert', 'Moose Jaw', 'Swift Current', 'Yorkton', 'North Battleford', 'Martensville', 'Warman']}
      uniqueFeatures={[
        'Saskatchewan Immigrant Nominee Program (SINP) expertise',
        'Serving both Saskatoon and Regina',
        'Strong Tagalog and Punjabi language services',
        'Fast digital delivery across Saskatchewan'
      ]}
      faqs={[
        {
          question: 'Do you have a Saskatoon translation office?',
          answer: 'We serve Saskatoon and all Saskatchewan with fast digital and courier delivery. Most clients receive documents within 24-48 hours.'
        },
        {
          question: 'Are your translations accepted for Saskatchewan PNP (SINP)?',
          answer: 'Yes! Our certified translations are 100% accepted for the Saskatchewan Immigrant Nominee Program and all IRCC applications.'
        },
        {
          question: 'Do you also serve Regina?',
          answer: 'Absolutely! We serve all major Saskatchewan cities including Saskatoon, Regina, Prince Albert, and Moose Jaw.'
        },
        {
          question: 'Do you translate Tagalog and Punjabi documents?',
          answer: "Yes! We have extensive expertise in Tagalog, Punjabi, and other languages common in Saskatchewan's immigrant communities."
        },
        {
          question: 'How fast can I get documents translated in Saskatoon?',
          answer: 'Standard turnaround is 2-3 business days. Rush service (24-48 hours) is available for urgent deadlines.'
        },
        {
          question: 'Can you translate documents for University of Saskatchewan applications?',
          answer: 'Yes! We provide certified translation for academic transcripts, diplomas, and other documents required for Saskatchewan university applications.'
        }
      ]}
    />
  );
}
