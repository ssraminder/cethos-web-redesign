// Full-time ("Careers") roles shown on /careers and /careers/:slug.
//
// Config-driven so adding or closing a role is a one-file edit. The full job
// description AND the application form now live on cethos.com itself
// (/careers/:slug); roleApplyUrl() returns that internal path.
//
// Country-agnostic by design: roles are fully remote (global), compensation is
// expressed relative to experience and location, and no country/timezone/currency
// (India / IST / INR) is hardcoded.

export interface JdSection {
  heading: string
  /** Optional paragraph(s). */
  body?: string
  /** Optional bullet list. */
  bullets?: string[]
}

export interface FullTimeRole {
  slug: string
  title: string
  location: string
  type: string
  /** Location-relative compensation copy — never a hardcoded amount or currency. */
  compensation: string
  /** One-line blurb for list cards. */
  blurb: string
  /** Working-hours expectation (shifted/evening schedule). */
  hoursNote: string
  /** Full job description, rendered on /careers/:slug. */
  sections: JdSection[]
}

const ABOUT_CETHOS =
  'Cethos is a life-sciences language company specializing in linguistic validation, Clinical Outcome Assessments (COA/eCOA), cognitive debriefing, and clinician review. We help CROs, pharma, biotech, medical device companies, and eCOA platform vendors run submission-ready, ISPOR-aligned translation and validation programs across global clinical trials.'

export const fullTimeRoles: FullTimeRole[] = [
  {
    slug: 'business-development-manager-lv-coa',
    title: 'Business Development Manager (Linguistic Validation & COA/eCOA)',
    location: 'Fully remote (global)',
    type: 'Full-time',
    compensation: 'Competitive — based on experience and location, plus commission on wins',
    blurb:
      'Own full-cycle business development for our COA / linguistic-validation services — winning new clients and growing existing accounts across CROs, pharma, biotech, medical device, and eCOA vendors.',
    hoursNote:
      'Remote, shifted & flexible schedule built around our US and European clients. Expect to work into the evening to overlap with the European business day and US business hours, with flexibility to run later some evenings for US afternoon / West-Coast calls. Genuine comfort with this client-driven rhythm is essential.',
    sections: [
      { heading: 'About Cethos', body: ABOUT_CETHOS },
      {
        heading: 'The Role',
        body: "You'll own full-cycle business development for our COA / linguistic-validation services — winning new clients and growing existing accounts in a focused, knowable buyer community. This is a hands-on, individual-contributor sales role with real commission upside for someone who can both open doors and close.",
      },
      {
        heading: "What You'll Do",
        bullets: [
          'Prospect and qualify new clients across CROs, pharma, biotech, medical device, and eCOA platform vendors.',
          'Run the full cycle: outreach, discovery, RFP responses and quoting, negotiation, and close.',
          'Grow and retain existing accounts; identify expansion opportunities and act as a trusted point of contact.',
          'Represent Cethos credibly on COA/eCOA, linguistic validation, cognitive debriefing, and clinician-review topics.',
          'Partner with operations/delivery to scope projects accurately and keep commitments realistic.',
          'Maintain a clean pipeline and report on activity, forecast, and wins.',
        ],
      },
      {
        heading: 'What You Need',
        bullets: [
          'Track record selling language/localization or clinical services into CROs, pharma, biotech, medical device, or eCOA vendors, with documented new-client wins and account growth.',
          'Comfort with full-cycle BD: prospecting, RFPs/quoting, negotiation, and account management.',
          'Strong written English and confident, professional client communication.',
          'Willingness to work a shifted schedule (into the evening) to cover US and EU client hours, with flexibility for occasional later US calls.',
          'Self-directed and reliable in a fully-remote environment.',
        ],
      },
      {
        heading: 'Nice to Have',
        bullets: [
          'An existing network in the COA / linguistic-validation / clinical-research buyer community.',
          'Familiarity with ISPOR good-practice standards and the eCOA vendor landscape.',
          'Experience selling linguistic validation, COA/eCOA, or clinical-trial translation specifically.',
        ],
      },
    ],
  },
  {
    slug: 'operations-vendor-manager-cogdeb-clinro',
    title: 'Operations & Vendor Manager (Cognitive Debriefing & Clinician Review)',
    location: 'Fully remote (global)',
    type: 'Full-time',
    compensation: 'Competitive — based on experience and location, plus optional delivery/quality bonus',
    blurb:
      'Own the operational backbone of our cognitive debriefing and clinician-review (ClinRO) work — building the freelance talent network and running the project management and QA that keep it compliant and on time.',
    hoursNote:
      'Remote, shifted & flexible schedule built around our US and European clients. Expect to work into the evening to overlap with the European business day and US business hours, extending later when handoffs or interviews require US overlap. Genuine comfort with this client-driven rhythm is essential.',
    sections: [
      { heading: 'About Cethos', body: ABOUT_CETHOS },
      {
        heading: 'The Role',
        body: "You'll own the operational backbone of our cognitive debriefing and clinician-review (ClinRO) work — building the freelance talent network that delivers it and running the project management and QA that keep it compliant and on time.",
      },
      {
        heading: "What You'll Do",
        bullets: [
          'Recruit, vet, and onboard freelance linguists, cognitive-debriefing interviewers, consultants, and clinicians.',
          'Grow and maintain a reliable vendor/freelancer network, with clear records of availability, languages, and specialties.',
          'Run project management for Cognitive Debriefing and Clinician Review projects within COA/PRO linguistic validation: scheduling, coordination, and delivery oversight.',
          'Own QA on these workstreams — ensure outputs meet methodology and client requirements before delivery.',
          'Coordinate patient cognitive interviews across languages and in-country interviewers.',
          'Partner with business development/delivery to scope, staff, and de-risk new projects.',
        ],
      },
      {
        heading: 'What You Need',
        bullets: [
          'Experience recruiting and onboarding freelance linguists, interviewers, or clinicians, and managing a vendor/freelancer network.',
          'Hands-on project management and QA experience on linguistic-validation, cognitive debriefing, or ClinRO work.',
          'Strong scheduling, coordination, and delivery-oversight skills across multiple languages/time zones.',
          'Strong written English and clear, professional communication.',
          'Willingness to work a shifted schedule (into the evening) to cover US and EU client and project hours.',
        ],
      },
      {
        heading: 'Nice to Have',
        bullets: [
          'Familiarity with ISPOR / ISOQOL good-practice methodology for COA/PRO/ClinRO.',
          'Experience coordinating patient cognitive interviews across languages.',
          'Background at an LSP, CRO, or eCOA vendor running COA/linguistic-validation delivery.',
        ],
      },
    ],
  },
]

export function getRole(slug: string): FullTimeRole | undefined {
  return fullTimeRoles.find((r) => r.slug === slug)
}

/** Internal path to the position-specific job description + application form. */
export function roleApplyUrl(slug: string): string {
  return `/careers/${slug}`
}
