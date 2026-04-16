import { Metadata } from 'next'
import { FAQJsonLd } from '@/components/JsonLd'
import ClinicianReviewContent from './ClinicianReviewContent'

export const metadata: Metadata = {
  title: 'Clinician Review Services | Medical Expert Translation Review',
  description: 'Expert clinical review by 300+ board-certified physicians, PharmDs, and specialist nurses. Medical accuracy verification for PRO instruments, protocols, ICFs, and regulatory documents.',
  keywords: ['clinician review', 'medical review', 'physician review', 'clinical translation review', 'PRO review', 'medical expert review'],
  openGraph: {
    title: 'Clinician Review Services',
    description: 'Expert medical review by 300+ board-certified physicians and healthcare professionals.',
    url: 'https://cethos.com/services/lifesciences/clinician-review',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/clinician-review',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Clinician Review Services",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "Expert medical review by board-certified physicians, PharmDs, and specialist nurses to ensure clinical accuracy of translated documents.",
  "areaServed": "Worldwide",
  "serviceType": "Medical Translation Review"
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cethos.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://cethos.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Life Sciences", "item": "https://cethos.com/services/lifesciences" },
    { "@type": "ListItem", "position": 4, "name": "Clinician Review", "item": "https://cethos.com/services/lifesciences/clinician-review" }
  ]
}

const faqs = [
  { question: 'What qualifications do your clinician reviewers have?', answer: 'All our clinician reviewers are licensed healthcare professionals (MDs, DOs, PharmDs, or specialist nurses) with native-level language proficiency and relevant clinical experience in the therapeutic area.' },
  { question: 'How quickly can you complete a clinician review?', answer: 'Standard turnaround is 5-7 business days. We offer urgent service (48-72 hours) for time-sensitive projects at an additional fee.' },
  { question: 'What does the review process include?', answer: 'Our review includes verification of medical terminology accuracy, clinical appropriateness of translated content, dosing and unit conversions, and overall readability for the target audience.' },
  { question: 'Can you match reviewers to specific therapeutic areas?', answer: 'Yes, we maintain a network of 300+ reviewers across 25+ therapeutic areas and will match the most qualified clinician to your specific project.' },
  { question: 'What deliverables are included?', answer: 'You receive the annotated document with tracked changes, a summary report of findings, and recommendations for any necessary revisions.' },
]

export default function ClinicianReviewPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <FAQJsonLd faqs={faqs} />
      <ClinicianReviewContent />
    </>
  )
}
