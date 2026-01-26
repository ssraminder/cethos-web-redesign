import { Metadata } from 'next';
import LocationPageTemplate from '@/components/locations/LocationPageTemplate';

export const metadata: Metadata = {
  title: 'Toronto Translation Services | Certified IRCC Translation | Cethos',
  description: 'Certified translation services in Toronto & GTA. IRCC accepted. Birth certificate, marriage certificate & immigration document translation. 139 five-star reviews. From $65.',
  alternates: {
    canonical: 'https://cethos.com/locations/toronto'
  }
};

export default function TorontoTranslationPage() {
  return (
    <LocationPageTemplate
      city="Toronto"
      province="Ontario"
      provinceCode="ON"
      h1="Toronto Translation Services"
      hasSameDay={false}
      pnpProgram="Ontario Immigrant Nominee Program (OINP)"
      pnpName="Ontario Immigrant Nominee Program"
      topLanguages={['Mandarin', 'Cantonese', 'Punjabi', 'Tamil', 'Urdu', 'Arabic', 'Tagalog', 'Hindi', 'Farsi', 'Korean', 'Portuguese', 'Spanish']}
      serviceAreas={['Downtown Toronto', 'North York', 'Scarborough', 'Etobicoke', 'York', 'East York', 'Midtown', 'The Beaches']}
      nearbyAreas={['Mississauga', 'Brampton', 'Markham', 'Richmond Hill', 'Vaughan', 'Oakville', 'Burlington', 'Ajax', 'Pickering']}
      uniqueFeatures={[
        "Serving Canada's largest immigrant community",
        'All GTA areas covered',
        'Digital-first delivery for fast turnaround',
        '200+ languages including all South Asian, Middle Eastern, and East Asian languages'
      ]}
      faqs={[
        {
          question: 'Do you have a Toronto translation office?',
          answer: 'We serve Toronto with fast digital and courier delivery from our national operations. Most GTA clients receive documents within 24-48 hours.'
        },
        {
          question: 'How do I receive my translated documents in Toronto?',
          answer: 'Documents are delivered via secure email (instant) and Canada Post/courier for hard copies. We serve all GTA areas including Mississauga, Brampton, and Markham.'
        },
        {
          question: 'Are your translations accepted for Ontario PNP (OINP)?',
          answer: 'Yes! Our certified translations are 100% accepted for the Ontario Immigrant Nominee Program and all IRCC immigration applications.'
        },
        {
          question: 'Do you translate Mandarin and Punjabi documents in Toronto?',
          answer: 'Absolutely! We translate from 200+ languages including Mandarin, Cantonese, Punjabi, Tamil, Hindi, Urdu, Arabic, Tagalog, and many more.'
        },
        {
          question: 'Can you translate documents for U of T or Ryerson applications?',
          answer: 'Yes! We provide certified translation for academic transcripts, diplomas, and other documents required for university applications across Ontario.'
        },
        {
          question: 'Do you serve Mississauga and Brampton?',
          answer: 'Yes! We serve the entire Greater Toronto Area including Mississauga, Brampton, Markham, Richmond Hill, Vaughan, and all surrounding cities.'
        }
      ]}
    />
  );
}
