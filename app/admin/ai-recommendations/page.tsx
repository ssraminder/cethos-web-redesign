import { Metadata } from 'next'
import RecommendationsContent from './RecommendationsContent'

export const metadata: Metadata = {
  title: 'AI Recommendations · Cethos Admin',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default function AiRecommendationsPage() {
  return <RecommendationsContent />
}
