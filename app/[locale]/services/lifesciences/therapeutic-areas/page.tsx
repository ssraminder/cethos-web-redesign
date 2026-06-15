import { Metadata } from 'next'
import TherapeuticAreasContent from './TherapeuticAreasContent'

export const metadata: Metadata = {
  title: 'Therapeutic Areas | Life Sciences Translation Expertise',
  description: 'Specialist clinical and regulatory translation across 25+ therapeutic areas — oncology, neuroscience, cardiology, rare diseases, vaccines, gene & cell therapy, and more. GCP-trained linguists and clinician reviewers.',
  keywords: ['therapeutic areas', 'oncology translation', 'clinical trial translation', 'rare disease translation', 'vaccine translation', 'neuroscience translation', 'life sciences translation expertise'],
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/therapeutic-areas',
  },
  openGraph: {
    title: 'Therapeutic Areas We Cover | Cethos Life Sciences',
    description: 'GCP-trained linguists and clinician reviewers across 25+ therapeutic areas for clinical and regulatory translation.',
    url: 'https://cethos.com/services/lifesciences/therapeutic-areas',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Life Sciences Translation — Therapeutic Areas",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "Specialist clinical and regulatory translation across 25+ therapeutic areas, delivered by GCP-trained linguists and clinician reviewers.",
  "areaServed": "Worldwide",
  "serviceType": "Life Sciences Translation"
}

export default function TherapeuticAreasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <TherapeuticAreasContent />
    </>
  )
}
