export interface Location {
  id: string
  title: string
  flag: string
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
    flag: '\u{1F1E8}\u{1F1E6}',
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
    flag: '\u{1F1E8}\u{1F1E6}',
    type: 'service',
    phone: '(587) 600-0786',
    email: 'info@cethos.com',
    serviceNote: 'Same-day certified translations delivered to Edmonton by email or courier. No need to travel to Calgary.',
    pageUrl: '/services/certified/edmonton-translation-agency/'
  },
  toronto: {
    id: 'toronto',
    title: 'Toronto, Canada',
    flag: '\u{1F1E8}\u{1F1E6}',
    type: 'service',
    phone: '(587) 600-0786',
    email: 'info@cethos.com',
    serviceNote: 'Certified translations for Ontario clients. Upload online, receive by email or courier.'
  },
  uae: {
    id: 'uae',
    title: 'Dubai, United Arab Emirates',
    flag: '\u{1F1E6}\u{1F1EA}',
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
    flag: '\u{1F1EE}\u{1F1F3}',
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
