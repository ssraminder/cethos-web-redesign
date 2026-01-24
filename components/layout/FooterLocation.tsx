'use client'

import { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'

interface GeoConfig {
  locations: string[]
  defaultOpen: string
}

const locationLabels: Record<string, string> = {
  calgary: 'Calgary, Canada (HQ)',
  edmonton: 'Edmonton, Canada',
  toronto: 'Toronto, Canada',
  uae: 'Dubai, UAE',
  india: 'Patiala, India'
}

export function FooterLocation() {
  const [locations, setLocations] = useState<string[]>(['calgary'])

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).__CETHOS_GEO__) {
      const geoData = (window as any).__CETHOS_GEO__ as GeoConfig
      setLocations(geoData.locations)
    }
  }, [])

  // Format locations for display
  const displayText = locations
    .map(id => locationLabels[id] || id)
    .join(' • ')

  return (
    <div className="flex items-center gap-3 text-white/70">
      <MapPin className="w-5 h-5" strokeWidth={1.5} />
      <span>{displayText}</span>
    </div>
  )
}
