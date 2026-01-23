export interface Location {
  id: string
  title: string
  flagUrl: string
  flagAlt: string
  type: 'headquarters' | 'office' | 'service'
  address?: string[]
  phone?: string
  email: string
  hours?: string
  serviceNote?: string
  mapsUrl?: string
  pageUrl?: string
}

export const locations: Record<string, Location> = {
  calgary: {
    id: 'calgary',
    title: 'Calgary, Canada',
    flagUrl: 'https://flagcdn.com/w40/ca.png',
    flagAlt: 'Canada',
    type: 'headquarters',
    address: [
      '421 7 Avenue SW, Floor 30',
      'Calgary, AB T2P 4K9',
      'Canada'
    ],
    phone: '(587) 600-0786',
    email: 'info@cethos.com',
    hours: 'Monday - Friday, 9:00 AM - 5:00 PM MST',
    mapsUrl: 'https://maps.google.com/?q=421+7+Avenue+SW+Calgary+AB+T2P+4K9+Canada'
  },
  edmonton: {
    id: 'edmonton',
    title: 'Edmonton, Canada',
    flagUrl: 'https://flagcdn.com/w40/ca.png',
    flagAlt: 'Canada',
    type: 'service',
    phone: '(587) 600-0786',
    email: 'info@cethos.com',
    serviceNote: 'Same-day certified translations delivered to Edmonton by email or courier. No need to travel to Calgary.',
    pageUrl: '/services/certified/edmonton-translation-agency/'
  },
  toronto: {
    id: 'toronto',
    title: 'Toronto, Canada',
    flagUrl: 'https://flagcdn.com/w40/ca.png',
    flagAlt: 'Canada',
    type: 'service',
    phone: '(587) 600-0786',
    email: 'info@cethos.com',
    serviceNote: 'Certified translations for Ontario clients. Upload online, receive by email or courier.'
  },
  uae: {
    id: 'uae',
    title: 'Dubai, United Arab Emirates',
    flagUrl: 'https://flagcdn.com/w40/ae.png',
    flagAlt: 'United Arab Emirates',
    type: 'office',
    address: [
      'Building A1, Dubai Digital Park',
      'Dubai Silicon Oasis',
      'Dubai, United Arab Emirates'
    ],
    email: 'info@cethos.com',
    hours: 'Sunday - Thursday, 9:00 AM - 6:00 PM GST',
    mapsUrl: 'https://maps.google.com/?q=Dubai+Silicon+Oasis+Dubai+UAE'
  },
  india: {
    id: 'india',
    title: 'Patiala, India',
    flagUrl: 'https://flagcdn.com/w40/in.png',
    flagAlt: 'India',
    type: 'office',
    address: [
      '158/3, Dharampura Bazaar',
      'Patiala 147001',
      'Punjab, India'
    ],
    email: 'info@cethos.com',
    hours: 'Monday - Friday, 9:00 AM - 6:00 PM IST',
    mapsUrl: 'https://maps.google.com/?q=Dharampura+Bazaar+Patiala+Punjab+India'
  }
}
