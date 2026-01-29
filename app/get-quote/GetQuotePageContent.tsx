'use client'

import { useState } from 'react'
import { CertifiedQuoteForm } from '@/components/forms/CertifiedQuoteForm'
import LifeSciencesQuoteForm from '@/components/forms/LifeSciencesQuoteForm'
import TranscriptionQuoteForm from '@/components/forms/TranscriptionQuoteForm'
import { InterpretationQuoteForm } from '@/components/forms/InterpretationQuoteForm'
import BusinessQuoteForm from '@/components/forms/BusinessQuoteForm'
import LegalQuoteForm from '@/components/forms/LegalQuoteForm'
import SoftwareQuoteForm from '@/components/forms/SoftwareQuoteForm'
import WebsiteQuoteForm from '@/components/forms/WebsiteQuoteForm'
import MultimediaQuoteForm from '@/components/forms/MultimediaQuoteForm'

// Service options
const SERVICES = [
  {
    id: 'lifesciences',
    name: 'Life Sciences Translation',
    description: 'Clinical trials, regulatory, pharmacovigilance',
    available: true,
  },
  {
    id: 'certified',
    name: 'Certified Translation',
    description: 'Immigration, academic, legal documents',
    available: true,
  },
  {
    id: 'transcription',
    name: 'Transcription Services',
    description: 'Legal, medical, business, academic',
    available: true,
  },
  {
    id: 'interpretation',
    name: 'Interpretation Services',
    description: 'Consecutive, simultaneous, remote',
    available: true,
  },
  {
    id: 'business',
    name: 'Business Translation',
    description: 'Contracts, reports, presentations',
    available: true,
  },
  {
    id: 'legal',
    name: 'Legal Translation',
    description: 'Contracts, litigation, patents',
    available: true,
  },
  {
    id: 'website',
    name: 'Website Localization',
    description: 'E-commerce, SaaS, corporate sites',
    available: true,
  },
  {
    id: 'software',
    name: 'Software Localization',
    description: 'UI, mobile apps, web applications',
    available: true,
  },
  {
    id: 'multimedia',
    name: 'Multimedia Translation',
    description: 'Subtitling, voiceover, video localization',
    available: true,
  },
]

export default function GetQuotePageContent() {
  const [selectedService, setSelectedService] = useState<string>('')
  const [showForm, setShowForm] = useState(false)

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setShowForm(true)
  }

  const handleBack = () => {
    setShowForm(false)
    setSelectedService('')
  }

  const renderForm = () => {
    switch (selectedService) {
      case 'lifesciences':
        return <LifeSciencesQuoteForm formLocation="get-quote-lifesciences" />
      case 'certified':
        return <CertifiedQuoteForm formLocation="get-quote-page" />
      case 'transcription':
        return <TranscriptionQuoteForm />
      case 'interpretation':
        return <InterpretationQuoteForm formLocation="get-quote-page" />
      case 'business':
        return <BusinessQuoteForm />
      case 'legal':
        return <LegalQuoteForm />
      case 'website':
        return <WebsiteQuoteForm />
      case 'software':
        return <SoftwareQuoteForm />
      case 'multimedia':
        return <MultimediaQuoteForm />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#0C2340] pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="mb-8 text-sm text-gray-300">
            <a href="/" className="hover:text-white">Home</a>
            <span className="mx-2">/</span>
            <span className="text-white">Get a Quote</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Your Free Quote
          </h1>
          <p className="text-xl text-gray-200">
            Select a service to start your quote request
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {!showForm ? (
          // Service Selector
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#0C2340] mb-6">
              Select Your Service
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className="text-left p-6 border-2 border-gray-200 rounded-lg hover:border-[#0891B2] hover:bg-gray-50 transition-all group"
                >
                  <h3 className="text-lg font-semibold text-[#0C2340] mb-2 group-hover:text-[#0891B2]">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {service.description}
                  </p>
                  {!service.available && (
                    <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Not sure which service you need?</strong> Contact us at{' '}
                <a href="tel:5876000786" className="text-[#0891B2] hover:underline">
                  (587) 600-0786
                </a>{' '}
                or{' '}
                <a href="mailto:info@cethos.com" className="text-[#0891B2] hover:underline">
                  info@cethos.com
                </a>
              </p>
            </div>
          </div>
        ) : (
          // Form Display
          <div>
            <button
              onClick={handleBack}
              className="mb-6 flex items-center text-gray-600 hover:text-[#0891B2]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Service Selection
            </button>

            {renderForm()}
          </div>
        )}
      </div>
    </div>
  )
}
