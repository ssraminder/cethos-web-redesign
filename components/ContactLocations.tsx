'use client'

import { useEffect, useState } from 'react'
import { locations, Location } from '@/lib/locations'
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from '@/components/icons'

interface GeoConfig {
  locations: string[]
  defaultOpen: string
  detected?: { country: string; region: string; city: string }
}

declare global {
  interface Window {
    __CETHOS_GEO__?: GeoConfig
  }
}

export function ContactLocations() {
  const [config, setConfig] = useState<GeoConfig>({
    locations: ['calgary'],
    defaultOpen: 'calgary'
  })
  const [activeLocation, setActiveLocation] = useState<string>('calgary')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for Edge Function injected data
    if (typeof window !== 'undefined' && window.__CETHOS_GEO__) {
      const geoConfig = window.__CETHOS_GEO__
      setConfig(geoConfig)
      setActiveLocation(geoConfig.defaultOpen)
      setIsLoading(false)
      return
    }

    // Fallback: default to Calgary after brief delay
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LocationSkeleton />
  }

  const locationsToShow = config.locations.map(id => locations[id]).filter(Boolean)

  // Single location: show as full card
  if (locationsToShow.length === 1) {
    return <LocationCard location={locationsToShow[0]} />
  }

  // Multiple locations: show as accordion
  return (
    <div className="space-y-3">
      {locationsToShow.map((location) => (
        <AccordionItem
          key={location.id}
          location={location}
          isOpen={activeLocation === location.id}
          onToggle={() => setActiveLocation(
            activeLocation === location.id ? '' : location.id
          )}
        />
      ))}
    </div>
  )
}

// Full location card (for single location)
function LocationCard({ location }: { location: Location }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-[#0C2340] flex items-center gap-2">
          <span className="text-2xl">{location.flag}</span>
          {location.title}
          {location.type === 'headquarters' && (
            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">
              Headquarters
            </span>
          )}
        </h3>
      </div>
      <div className="p-6">
        <LocationDetails location={location} />
      </div>
    </div>
  )
}

// Accordion item (for multiple locations)
function AccordionItem({
  location,
  isOpen,
  onToggle
}: {
  location: Location
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-[#0C2340] flex items-center gap-2">
          <span className="text-xl">{location.flag}</span>
          {location.title}
          {location.type === 'headquarters' && (
            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">
              HQ
            </span>
          )}
        </h3>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-200 ${
        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pb-6 pt-2 border-t border-gray-100">
          <LocationDetails location={location} />
        </div>
      </div>
    </div>
  )
}

// Shared location details
function LocationDetails({ location }: { location: Location }) {
  return (
    <div className="space-y-4">
      {/* Service note (for service locations) */}
      {location.serviceNote && (
        <p className="text-gray-600 bg-teal-50 border border-teal-100 rounded-lg p-3 text-sm">
          {location.serviceNote}
        </p>
      )}

      {/* Address */}
      {location.address && (
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 text-[#0891B2] mt-0.5 flex-shrink-0">
            <MapPinIcon size={20} />
          </div>
          <div className="text-gray-700">
            {location.address.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>
      )}

      {/* Phone */}
      {location.phone && (
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 text-[#0891B2] flex-shrink-0">
            <PhoneIcon size={20} />
          </div>
          <a
            href={`tel:${location.phone.replace(/[^0-9+]/g, '')}`}
            className="text-[#0891B2] hover:text-teal-700 font-medium"
          >
            {location.phone}
          </a>
        </div>
      )}

      {/* Email */}
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 text-[#0891B2] flex-shrink-0">
          <MailIcon size={20} />
        </div>
        <a
          href={`mailto:${location.email}`}
          className="text-[#0891B2] hover:text-teal-700"
        >
          {location.email}
        </a>
      </div>

      {/* Hours */}
      {location.hours && (
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 text-[#0891B2] flex-shrink-0">
            <ClockIcon size={20} />
          </div>
          <span className="text-gray-700">{location.hours}</span>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        {location.mapsUrl && (
          <a
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            <MapPinIcon size={16} />
            Get Directions
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
        {location.pageUrl && (
          <a
            href={location.pageUrl}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0891B2] hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Learn More
          </a>
        )}
      </div>
    </div>
  )
}

// Loading skeleton
function LocationSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-64"></div>
        <div className="h-4 bg-gray-200 rounded w-40"></div>
        <div className="h-4 bg-gray-200 rounded w-52"></div>
      </div>
    </div>
  )
}
