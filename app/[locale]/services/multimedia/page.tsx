import { Metadata } from 'next'
import MultimediaPageContent from './MultimediaPageContent'

export const metadata: Metadata = {
  title: 'Multimedia Translation Services',
  description:
    'Video subtitling, voiceover, dubbing, and multimedia adaptation services for global content reach. Professional multimedia localization in 200+ languages.',
  alternates: {
    canonical: 'https://cethos.com/services/multimedia',
  },
  openGraph: {
    title: 'Multimedia Translation Services | Cethos',
    description:
      'Video subtitling, voiceover, dubbing, and multimedia adaptation services for global content reach. Professional multimedia localization in 200+ languages.',
    url: 'https://cethos.com/services/multimedia',
    siteName: 'Cethos Solutions Inc.',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function MultimediaTranslationPage() {
  return <MultimediaPageContent />
}
