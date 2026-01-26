import { Metadata } from 'next';
import LocationPageTemplate from '@/components/locations/LocationPageTemplate';

export const metadata: Metadata = {
  title: 'Vancouver Translation Services | Certified IRCC Translation | Cethos',
  description: 'Certified translation services in Vancouver & Lower Mainland. IRCC accepted. Birth certificate, marriage certificate & immigration document translation. 139 five-star reviews. From $65.',
  alternates: {
    canonical: 'https://cethos.com/locations/vancouver'
  }
};

export default function VancouverTranslationPage() {
  return (
    <LocationPageTemplate
      city="Vancouver"
      province="British Columbia"
      provinceCode="BC"
      h1="Vancouver Translation Services"
      hasSameDay={false}
      pnpProgram="BC Provincial Nominee Program (BC PNP)"
      pnpName="British Columbia Provincial Nominee Program"
      topLanguages={['Mandarin', 'Cantonese', 'Punjabi', 'Tagalog', 'Korean', 'Farsi', 'Hindi', 'Japanese', 'Vietnamese', 'Spanish', 'French']}
      serviceAreas={['Downtown Vancouver', 'West End', 'Kitsilano', 'Mount Pleasant', 'East Vancouver', 'Gastown', 'Yaletown', 'Coal Harbour']}
      nearbyAreas={['Burnaby', 'Richmond', 'Surrey', 'Coquitlam', 'North Vancouver', 'West Vancouver', 'New Westminster', 'Langley', 'Abbotsford', 'Delta']}
      uniqueFeatures={[
        'Serving all Lower Mainland communities',
        'High expertise in Asian languages (Mandarin, Cantonese, Korean, Japanese)',
        'Fast digital delivery across BC',
        'BC PNP application expertise'
      ]}
      faqs={[
        {
          question: 'Do you have a Vancouver translation office?',
          answer: 'We serve Vancouver and the Lower Mainland with fast digital and courier delivery. Most clients receive documents within 24-48 hours.'
        },
        {
          question: 'How do I receive my documents in Vancouver?',
          answer: 'Documents are delivered via secure email (instant) and Canada Post/courier. We serve all Lower Mainland areas including Burnaby, Richmond, and Surrey.'
        },
        {
          question: 'Are your translations accepted for BC PNP?',
          answer: 'Yes! Our certified translations are 100% accepted for the BC Provincial Nominee Program and all IRCC immigration applications.'
        },
        {
          question: 'Do you translate Mandarin and Cantonese documents?',
          answer: 'Absolutely! We have extensive expertise in Mandarin, Cantonese, and other Chinese dialects, as well as 200+ other languages.'
        },
        {
          question: 'Can you translate documents for SFU or UBC applications?',
          answer: 'Yes! We provide certified translation for academic transcripts, diplomas, and other documents required for BC university applications.'
        },
        {
          question: 'Do you serve Surrey and Richmond?',
          answer: 'Yes! We serve the entire Lower Mainland including Surrey, Richmond, Burnaby, Coquitlam, and all surrounding communities.'
        }
      ]}
    />
  );
}
