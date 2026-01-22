import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { servicesData, getServiceBySlug, servicesList } from '@/lib/services-data'
import { ServicePageContent } from './ServicePageContent'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return servicesList.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} | Cethos`,
      description: service.description,
    },
  }
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  return <ServicePageContent service={service} />
}
