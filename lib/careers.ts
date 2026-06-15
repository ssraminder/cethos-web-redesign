// Full-time ("Careers") roles shown on /careers.
//
// Config-driven so adding or closing a role is a one-file edit. The full job
// description and application form live on the recruitment app
// (join.cethos.com/careers/:slug); this list links there via roleApplyUrl().
//
// Country-agnostic by design: roles are fully remote (global), compensation is
// expressed relative to experience and location, and no country/timezone/currency
// (India / IST / INR) is hardcoded.

const RECRUITMENT_CAREERS_BASE = 'https://join.cethos.com/careers'

export interface FullTimeRole {
  slug: string
  title: string
  location: string
  type: string
  /** Location-relative compensation copy — never a hardcoded amount or currency. */
  compensation: string
  /** One-line blurb for the list card. */
  blurb: string
}

export const fullTimeRoles: FullTimeRole[] = [
  {
    slug: 'business-development-manager-lv-coa',
    title: 'Business Development Manager (Linguistic Validation & COA/eCOA)',
    location: 'Fully remote (global)',
    type: 'Full-time',
    compensation: 'Competitive — based on experience and location, plus commission on wins',
    blurb:
      'Own full-cycle business development for our COA / linguistic-validation services — winning new clients and growing existing accounts across CROs, pharma, biotech, medical device, and eCOA vendors.',
  },
  {
    slug: 'operations-vendor-manager-cogdeb-clinro',
    title: 'Operations & Vendor Manager (Cognitive Debriefing & Clinician Review)',
    location: 'Fully remote (global)',
    type: 'Full-time',
    compensation: 'Competitive — based on experience and location, plus optional delivery/quality bonus',
    blurb:
      'Own the operational backbone of our cognitive debriefing and clinician-review (ClinRO) work — building the freelance talent network and running the project management and QA that keep it compliant and on time.',
  },
]

/** Link to the full job description + application form on the recruitment app. */
export function roleApplyUrl(slug: string): string {
  return `${RECRUITMENT_CAREERS_BASE}/${slug}`
}
