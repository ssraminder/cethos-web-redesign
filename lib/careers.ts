// Full-time ("Careers") roles shown on /careers and /careers/:slug.
//
// Config-driven so adding or closing a role is a one-file edit. The full job
// description AND the application form now live on cethos.com itself
// (/careers/:slug); roleApplyUrl() returns that internal path.
//
// Remote roles are country-agnostic by design: compensation is expressed
// relative to experience and location, and no country/timezone/currency
// (India / IST / INR) is hardcoded. On-site roles set `onsiteAddress` so the
// JobPosting structured data advertises the real location instead of
// TELECOMMUTE/Worldwide.

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
  /** Physical office address for on-site roles; omit for fully-remote roles. */
  onsiteAddress?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    addressCountry: string
  }
  /**
   * Optional override for the working-hours screening question on the
   * application form. Defaults: on-site question when onsiteAddress is set,
   * otherwise the generic shifted-schedule (US/EU evening) question.
   */
  hoursQuestion?: string
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
  {
    slug: 'project-coordinator-translation-lv',
    title: 'Project Coordinator (Translation & Linguistic Validation)',
    location: 'On-site — Calgary, AB',
    type: 'Full-time',
    compensation: 'Competitive — based on experience',
    blurb:
      'Coordinate translation and linguistic validation projects end-to-end — client communication, project and vendor assignment, clinician review and cognitive debriefing logistics, deliveries, and invoicing.',
    hoursNote:
      'On-site at our downtown Calgary office (421 7th Ave SW), regular North American business hours, Monday to Friday. The occasional early call happens when a European client deadline requires it, but this is not a shifted-schedule role.',
    onsiteAddress: {
      streetAddress: '421 7th Ave SW, Floor 30',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      addressCountry: 'CA',
    },
    sections: [
      { heading: 'About Cethos', body: ABOUT_CETHOS },
      {
        heading: 'The Role',
        body:
          "You'll coordinate translation and linguistic validation projects from intake to invoice — with training and support from our senior team. Our fastest-growing practice supports clinical research: validating patient questionnaires (COAs) for global drug trials through clinician review and cognitive debriefing. It is meticulous, meaningful work — the documents we handle end up in front of patients and regulators. This is a career-launching role in one of the most specialized corners of the language industry, and you'll learn it from the people who built the business.",
      },
      {
        heading: "What You'll Do",
        bullets: [
          'Client communication — respond to client requests, confirm scope and deadlines, and send proactive status updates that make clients trust us with their most urgent work.',
          'Project setup & assignment — create orders in our project portal, assign qualified translators, clinician reviewers, and interviewers from our vendor network, and dispatch work packages.',
          'Linguistic validation coordination — schedule and track the specialized steps of LV projects: clinician reviews (physician reviewers evaluating medical translations) and cognitive debriefing (patient interviews testing whether translations are truly understood).',
          'Deliveries — quality-check deliverables against client templates, package files to spec, and hit deadlines without being chased.',
          'Project closure — reconcile purchase orders, prepare invoices, and close projects with a clean, complete record.',
        ],
      },
      {
        heading: 'What You Need',
        bullets: [
          'A degree or 1–2 years of experience in translation/localization, clinical research, life sciences, or project coordination — new grads with the right attention to detail are welcome.',
          'Excellent written English: your emails are clear, warm, and typo-free.',
          'Genuine organization: checklists, follow-ups, and deadlines are how you think.',
          'Comfort learning new software quickly — we run on a modern in-house portal plus Dropbox, no legacy TMS pain.',
          'Ability to work on-site at our downtown Calgary office and legal authorization to work in Canada.',
        ],
      },
      {
        heading: 'Nice to Have',
        bullets: [
          'A second language (French is especially useful for our Canadian work).',
          'Healthcare or clinical-research exposure, or coursework in life sciences.',
          'Familiarity with ISO 17100 or translation-industry quality workflows.',
        ],
      },
      {
        heading: 'Why Join Cethos',
        bullets: [
          'Learn a rare, in-demand specialization — linguistic validation — that very few coordinators in Canada can put on a resume.',
          'Direct mentorship from the founders: no layers between you and the people who built the business.',
          'Our automation-heavy platform handles the repetitive work (folder setup, vendor packages, notifications), so you do the interesting parts.',
          'Downtown Calgary office steps from the CTrain, regular business hours.',
        ],
      },
    ],
  },
  {
    slug: 'project-coordinator-lv-translation-remote',
    title: 'Project Coordinator — Linguistic Validation & Translation (Remote)',
    location: 'Fully remote (global)',
    type: 'Full-time',
    compensation: 'Competitive — based on experience and location',
    blurb:
      'Coordinate translation and linguistic validation projects end-to-end, fully remote — client communication, project and vendor assignment, clinician review and cognitive debriefing logistics, deliveries, and invoicing.',
    hoursNote:
      'Fully remote, working North American (Mountain Time) business hours, Monday to Friday — roughly 9am–5pm Calgary time. From Latin America that is an afternoon-to-evening local schedule (e.g. about 12pm–8pm in Argentina); from Europe or Asia it is a late shift. Genuine comfort with this overlap is essential.',
    hoursQuestion:
      'This role works North American (Mountain Time) business hours, Monday to Friday — roughly 9am–5pm Calgary time. Are you able and willing to keep this schedule from your location? Describe any constraints.',
    sections: [
      { heading: 'About Cethos', body: ABOUT_CETHOS },
      {
        heading: 'The Role',
        body:
          "You'll coordinate translation and linguistic validation projects from intake to invoice — with training and support from our senior team. Our fastest-growing practice supports clinical research: validating patient questionnaires (COAs) for global drug trials through clinician review and cognitive debriefing. It is meticulous, meaningful work — the documents we handle end up in front of patients and regulators. This is a career-building role in one of the most specialized corners of the language industry, fully remote, and you'll learn it from the people who built the business.",
      },
      {
        heading: "What You'll Do",
        bullets: [
          'Client communication — respond to client requests, confirm scope and deadlines, and send proactive status updates that make clients trust us with their most urgent work.',
          'Project setup & assignment — create orders in our project portal, assign qualified translators, clinician reviewers, and interviewers from our vendor network, and dispatch work packages.',
          'Linguistic validation coordination — schedule and track the specialized steps of LV projects: clinician reviews (physician reviewers evaluating medical translations) and cognitive debriefing (patient interviews testing whether translations are truly understood).',
          'Deliveries — quality-check deliverables against client templates, package files to spec, and hit deadlines without being chased.',
          'Project closure — reconcile purchase orders, prepare invoices, and close projects with a clean, complete record.',
        ],
      },
      {
        heading: 'What You Need',
        bullets: [
          'A degree or 1–2 years of experience in translation/localization, clinical research, life sciences, or project coordination — new grads with the right attention to detail are welcome.',
          'Excellent written English: your emails are clear, warm, and typo-free.',
          'Genuine organization: checklists, follow-ups, and deadlines are how you think.',
          'Comfort learning new software quickly — we run on a modern in-house portal plus Dropbox, no legacy TMS pain.',
          'Reliable internet and a quiet workspace; self-directed and dependable in a fully-remote team.',
          'Availability during North American (Mountain Time) business hours, Monday to Friday.',
        ],
      },
      {
        heading: 'Nice to Have',
        bullets: [
          'A second language — Spanish or French are especially useful for our work.',
          'Healthcare or clinical-research exposure, or coursework in life sciences.',
          'Familiarity with ISO 17100 or translation-industry quality workflows.',
        ],
      },
      {
        heading: 'Why Join Cethos',
        bullets: [
          'Learn a rare, in-demand specialization — linguistic validation — that very few coordinators can put on a resume.',
          'Direct mentorship from the founders: no layers between you and the people who built the business.',
          'Our automation-heavy platform handles the repetitive work (folder setup, vendor packages, notifications), so you do the interesting parts.',
          'Fully remote with a stable, predictable schedule.',
        ],
      },
    ],
  },
]

export function getRole(slug: string): FullTimeRole | undefined {
  return fullTimeRoles.find((r) => r.slug === slug)
}

/** Internal path to the position-specific job description page. */
export function roleApplyUrl(slug: string): string {
  return `/careers/${slug}`
}

/** Internal path to the position-specific application form page. */
export function roleApplyFormUrl(slug: string): string {
  return `/careers/${slug}/apply`
}
