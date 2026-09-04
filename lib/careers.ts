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
   * Set together with `onsiteAddress` for roles that can ALSO be worked fully
   * remote from anywhere. Drives the JobPosting JSON-LD (onsite address +
   * TELECOMMUTE/Worldwide) and makes the role match both careers filters.
   */
  alsoRemote?: boolean
  /**
   * Optional override for the working-hours screening question on the
   * application form. Defaults: on-site question when onsiteAddress is set,
   * otherwise the generic shifted-schedule (US/EU evening) question.
   */
  hoursQuestion?: string
  /**
   * Freelance/contract postings that apply through the vendor recruitment
   * pipeline (join.cethos.com) instead of the on-site full-time form. When set,
   * every Apply CTA links here, and /careers/:slug/apply is not generated.
   */
  externalApplyUrl?: string
  /** JobPosting JSON-LD employmentType; defaults to FULL_TIME. */
  employmentTypeLd?: string
  /** Full job description, rendered on /careers/:slug. */
  sections: JdSection[]
}

const ABOUT_CETHOS =
  'Cethos is a life-sciences language company specializing in linguistic validation, Clinical Outcome Assessments (COA/eCOA), cognitive debriefing, and clinician review. We help CROs, pharma, biotech, medical device companies, and eCOA platform vendors run submission-ready, ISPOR-aligned translation and validation programs across global clinical trials.'

export const fullTimeRoles: FullTimeRole[] = [
  {
    slug: 'lv-qa-project-coordinator-freelance',
    title: 'LV Project Coordinator (Linguistic Validation)',
    location: 'Fully remote (global)',
    type: 'Freelance / Contract',
    compensation: 'Hourly — hours allocated per assignment based on project volume',
    blurb:
      'Freelance coordination on our linguistic validation projects — keeping trackers, schedules, and documentation audit-ready, and coordinating freelance linguists across languages and time zones so projects move on time.',
    hoursNote:
      'Freelance and flexible: work is assigned per project, with an hour allocation agreed from project scope before you start. Some overlap with North American or European business hours is needed for handoffs and check-ins, but much of the work can be done on your own schedule against agreed deadlines.',
    externalApplyUrl: 'https://join.cethos.com/apply?role=lv_qa_coordinator',
    employmentTypeLd: 'CONTRACTOR',
    sections: [
      { heading: 'About Cethos', body: ABOUT_CETHOS },
      {
        heading: 'The Role',
        body: "You'll keep the moving pieces of our multi-language linguistic validation projects moving. Working with our project managers, you'll coordinate freelancer follow-ups, trackers, schedules, and documentation across concurrent projects — the operational glue that keeps LV work on time and audit-ready. It's a detail-driven, process-driven role for someone who has seen how linguistic validation is supposed to run and notices immediately when it isn't.",
      },
      {
        heading: "What You'll Do",
        bullets: [
          'Coordinate with freelance linguists across languages and time zones — sending materials, chasing deliveries, and flagging risks to the project manager early.',
          'Maintain project trackers, status reports, and meeting notes so every project has a clean, current paper trail.',
          'Keep LV documentation (translation certificates, reconciliation notes, cognitive debriefing summaries) complete, correctly named and versioned, and filed so projects stay audit-ready.',
          'Support scheduling and logistics across concurrent multi-language projects.',
          'Feed observations back into our process documents so recurring issues get fixed at the source.',
        ],
      },
      {
        heading: 'What You Need',
        bullets: [
          'Hands-on experience with linguistic validation, COA/PRO translation, or clinical-trial language services — as a coordinator or project manager.',
          'Familiarity with the LV process: forward/back translation, reconciliation, cognitive debriefing, and COA review.',
          'Exceptional organization and follow-through — trackers, follow-ups, and deadlines are how you think.',
          'Strong written English and clear, professional communication with freelancers and project managers.',
          'Comfort with trackers and checklists (Excel / Google Sheets), and disciplined file management.',
          'Reliable self-directed working habits in a fully remote, deadline-driven environment.',
        ],
      },
      {
        heading: 'Nice to Have',
        bullets: [
          'Familiarity with ISPOR good-practice guidelines for translation and cultural adaptation.',
          'Experience with CAT or QA tools (Trados, MemoQ, Phrase, Xbench, Verifika).',
          'Additional working languages.',
        ],
      },
      {
        heading: "How You're Paid",
        body: 'This is an hourly freelance engagement with a simple, transparent structure: each assignment comes with an hour allocation agreed from its scope before you start, so efficient work is never penalized. You set your expected hourly rate in the application, and we confirm the rate together before the first assignment.',
      },
      {
        heading: 'Selection Process',
        body: 'We review applications on CV and experience — there is no unpaid test. Shortlisted candidates complete a short paid working exercise on a real-style project scenario so both sides can see the fit, followed by a brief call. Successful candidates are onboarded to our vendor portal, where assignments, files, and invoicing are managed.',
      },
    ],
  },
  {
    slug: 'qa-reviewer-cogdeb-clinician-review-freelance',
    title: 'QA Reviewer — Cognitive Debriefing & Clinician Review Reports',
    location: 'Fully remote (global)',
    type: 'Freelance / Contract',
    // TODO(raminder): confirm hourly-rate guidance before adding any rate specifics.
    compensation: 'Hourly — hours allocated per assignment based on report volume',
    blurb:
      'Freelance, review-only QA on our linguistic validation deliverables — checking cognitive debriefing reports and clinician review reports for completeness, methodology, and audit-readiness before they reach the client. No coordination duties.',
    hoursNote:
      'Freelance and flexible: work is assigned per report or per batch, with hours allocated from volume (approximately 750 words reviewed per hour, per language). Reviews are done on your own schedule against agreed deadlines — no meetings-heavy calendar and no coordination duties, just occasional overlap with North American or European business hours for handoffs and queries.',
    // Dedicated qa_reviewer role on join.cethos.com (2026-09-04) — previously
    // shared ?role=lv_qa_coordinator with the LV Project Coordinator posting,
    // which made the two applicant streams indistinguishable in recruitment.
    externalApplyUrl: 'https://join.cethos.com/apply?role=qa_reviewer',
    employmentTypeLd: 'CONTRACTOR',
    sections: [
      { heading: 'About Cethos', body: ABOUT_CETHOS },
      {
        heading: 'The Role',
        body: "You'll be the final set of expert eyes on the two deliverables our clients scrutinize hardest: cognitive debriefing reports and clinician review reports. This is a pure review role — our project managers and coordinators handle scheduling, freelancer follow-ups, and logistics, so your time goes entirely into the reports themselves: methodology, completeness, internal consistency, and the audit-readiness that ISPOR-aligned linguistic validation demands. It suits someone who has written or reviewed these reports before and notices immediately when a finding isn't supported, a round is missing, or a template has been quietly deviated from.",
      },
      {
        heading: "What You'll Do",
        bullets: [
          'Review cognitive debriefing reports: interview rounds and participant details complete, subject quotes and paraphrase findings internally consistent, issue resolutions traceable across testing rounds, and conclusions supported by the data.',
          'Review clinician review reports: clinical terminology assessments substantiated, reviewer statements and credentials documented, and recommendations consistent with the instrument and target language.',
          'Check both against client templates and project instructions — formatting, file naming, versioning, and required sections.',
          'Document findings clearly and hand them to the project manager with severity flagged, so fixes are fast and nothing subjective blocks a delivery.',
          'Feed recurring issues back into our QA checklists and report templates so they get fixed at the source.',
        ],
      },
      {
        heading: 'What You Need',
        bullets: [
          'Hands-on experience with cognitive debriefing or clinician review deliverables — as a report writer, QC reviewer, project manager, or methodologist.',
          'Working knowledge of the linguistic validation process: forward/back translation, reconciliation, cognitive debriefing, and COA review.',
          'Exceptional attention to detail — the role exists to catch what others miss.',
          'Strong written English: your findings need to be precise, evidence-based, and professional.',
          'Disciplined, self-directed working habits in a fully remote, deadline-driven environment.',
        ],
      },
      {
        heading: 'Nice to Have',
        bullets: [
          'Familiarity with ISPOR and ISOQOL good-practice guidelines for COA translation, cultural adaptation, and cognitive debriefing.',
          'A clinical, life-sciences, or health-outcomes background.',
          'Additional working languages.',
        ],
      },
      {
        heading: "How You're Paid",
        body: 'This is an hourly freelance engagement with a simple, transparent structure: each assignment comes with an hour allocation derived from its volume — approximately 750 words reviewed per hour, per language — so the scope is agreed before you start and efficient work is never penalized. You set your expected hourly rate in the application, and we confirm the rate together before the first assignment.',
      },
      {
        heading: 'Selection Process',
        body: 'We review applications on CV and experience — there is no unpaid test. Shortlisted candidates complete a short paid review exercise on a real-style report so both sides can see the fit, followed by a brief call. Successful candidates are onboarded to our vendor portal, where assignments, files, and invoicing are managed.',
      },
    ],
  },
  {
    slug: 'iso-certification-quality-compliance-specialist',
    title: 'ISO Certification & Quality Compliance Specialist (ISO 17100 · 9001 · 27001)',
    location: 'Fully remote (global)',
    type: 'Contract',
    compensation: 'Hourly or monthly retainer — based on experience and location',
    blurb:
      'Lead our ISO certification readiness end-to-end on a contract basis — building the quality management system and audit evidence for ISO 17100 first, then planning and driving ISO 9001 and ISO 27001.',
    hoursNote:
      'Fully remote contract role open worldwide, working North American (Mountain Time) business hours, Monday to Friday — roughly 9am–5pm Mountain Time — so you can work directly with our Calgary-based leadership. Depending on where you are based this schedule may fall in your afternoon, evening, or overnight, so genuine comfort with this overlap is essential.',
    hoursQuestion:
      'This contract role works North American (Mountain Time) business hours, Monday to Friday — roughly 9am–5pm Mountain Time. Are you able and willing to keep this schedule from your location? Describe any constraints.',
    employmentTypeLd: 'CONTRACTOR',
    sections: [
      { heading: 'About Cethos', body: ABOUT_CETHOS },
      {
        heading: 'The Role',
        body:
          "You'll own our path to ISO certification. Cethos is preparing for a formal certification program that starts with ISO 17100 (translation services), followed by ISO 9001 (quality management) and ISO 27001 (information security). Working directly with our leadership team, you'll run the gap analysis, build and document the quality management system, prepare the audit evidence, and take us through the certification audits. It's a hands-on implementer role — you'll be writing the SOPs and building the records, not just advising — for someone who has taken an organization through ISO certification before and knows exactly what an auditor will ask for.",
      },
      {
        heading: "What You'll Do",
        bullets: [
          'Run a gap analysis of our current processes against ISO 17100 — translator and reviser qualification records, TEP (translate-edit-proofread) workflows, project management, vendor management, and client agreement handling — and turn it into a prioritized audit-readiness plan.',
          'Build and maintain the QMS documentation: quality manual, SOPs, work instructions, templates, and the records that prove the processes are actually followed.',
          'Set up vendor competence files per ISO 17100 — qualifications, degrees, experience evidence, and ongoing evaluation records for our linguist network.',
          'Plan and conduct internal audits, run corrective actions (CAPA) to closure, and prepare management reviews.',
          'Coordinate with the certification body: selection, quotes, scheduling of Stage 1 and Stage 2 audits, and hands-on support during the audits themselves.',
          'Train our team on the procedures so the QMS lives in daily work, not in a binder.',
          'After ISO 17100: build the roadmap and lead implementation for ISO 9001, then ISO 27001 — including the ISMS risk assessment, Statement of Applicability, and information-security policies and controls.',
        ],
      },
      {
        heading: 'What You Need',
        bullets: [
          'Hands-on experience preparing an organization for ISO certification and passing the audit — you have done this before as an implementer, quality manager, or consultant, not only as an auditor.',
          'Working knowledge of at least two of: ISO 17100, ISO 9001, ISO 27001 (ISO 17100 or another language-industry standard is a strong plus).',
          'Strong command of QMS fundamentals: document control, internal audits, CAPA, management review, and audit-evidence discipline.',
          'Excellent written English — the documentation you produce is the deliverable.',
          'Genuine availability during North American (Mountain Time) business hours, Monday to Friday, from wherever you are based.',
          'Reliable self-directed working habits in a fully remote, deadline-driven engagement.',
        ],
      },
      {
        heading: 'Nice to Have',
        bullets: [
          'Lead Auditor or Lead Implementer certification (ISO 9001, ISO 27001, or equivalent).',
          'Experience at or with a language service provider — familiarity with TEP workflows, CAT tools, and linguist qualification requirements.',
          'ISO 27001 ISMS implementation experience, including risk assessments and Statement of Applicability.',
          'Familiarity with clinical-research quality expectations (ISPOR good practices, sponsor/CRO audits).',
        ],
      },
      {
        heading: 'The Engagement',
        body:
          'This is a contract engagement, hourly or on a monthly retainer, sized to the certification roadmap: the initial phase runs through ISO 17100 certification, with the expectation of continuing into the ISO 9001 and ISO 27001 phases as the program progresses. You set your expected rate in the application, and we confirm scope and rate together before the engagement starts.',
      },
    ],
  },
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
    compensation: 'Competitive — based on experience and location, with a review after your first six months',
    blurb:
      'Coordinate translation and linguistic validation projects end-to-end, fully remote — client communication, project and vendor assignment, clinician review and cognitive debriefing logistics, deliveries, and invoicing.',
    hoursNote:
      'Fully remote, working North American (Mountain Time) business hours, Monday to Friday — roughly 9am–5pm Mountain Time. Depending on where you are based this may fall in your afternoon, evening, or overnight, so genuine comfort with this overlap is essential.',
    hoursQuestion:
      'This role works North American (Mountain Time) business hours, Monday to Friday — roughly 9am–5pm Mountain Time. Are you able and willing to keep this schedule from your location? Describe any constraints.',
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
          'Fully remote with a stable, predictable schedule, and a compensation review after your first six months.',
        ],
      },
    ],
  },
  {
    slug: 'account-manager-lv-clinical-translation',
    title: 'Account Manager — Linguistic Validation & Clinical Translation',
    location: 'Calgary, AB (on-site) or Fully remote (global)',
    type: 'Full-time',
    compensation: 'Competitive — based on experience and location',
    blurb:
      'Own client relationships end to end — grow the accounts you hold and deliver the work you sell, across linguistic validation, cognitive debriefing, clinician review, and certified translation.',
    hoursNote:
      'Two arrangements: on-site at our downtown Calgary office (421 7th Ave SW) during regular Mountain Time business hours, Monday to Friday — or fully remote from anywhere in the world keeping the same Mountain Time schedule. Depending on where you are based, the remote arrangement may fall in your afternoon, evening, or overnight, so genuine comfort with this overlap is essential. No rotating shifts and no on-call.',
    onsiteAddress: {
      streetAddress: '421 7th Ave SW, Floor 30',
      addressLocality: 'Calgary',
      addressRegion: 'AB',
      addressCountry: 'CA',
    },
    alsoRemote: true,
    hoursQuestion:
      'This role can be based on-site at our downtown Calgary office or fully remote from anywhere in the world, working North American (Mountain Time) business hours, Monday to Friday. Which arrangement are you applying for? If on-site: confirm you are legally authorized to work in Canada. If remote: confirm you can keep the Mountain Time schedule from your location. Describe any constraints.',
    sections: [
      {
        heading: 'About Cethos',
        body:
          'Cethos Translation Services, a division of Cethos Solutions Inc., is a Calgary-based translation and language services provider serving clients across Canada and globally in over 200 languages. We specialize in linguistic validation and life sciences translation for clinical trials, regulatory submissions, and medical devices, alongside certified translation for immigration, legal, and government use. Cethos is a BBB Accredited Business with an A+ rating.',
      },
      {
        heading: 'The Role',
        body:
          'We are hiring an Account Manager to own our client relationships end to end. This role is deliberately two-sided: you will grow the accounts you hold, and you will deliver the work you sell. If you like being the person a client calls first, and you would rather expand a relationship than simply maintain it, this will suit you. You will work with project managers at global language service providers, CROs, and sponsors, on studies that are actively running. Work on-site at our downtown Calgary office, or fully remote from anywhere in the world on a Mountain Time schedule.',
      },
      {
        heading: "What You'll Do — Grow the Account",
        bullets: [
          'Own a portfolio of client accounts as their primary point of contact.',
          "Learn each client's study pipeline well enough to see what is coming, and position the right services against it: linguistic validation, translatability assessment, cognitive debriefing, clinician review, certified translation, interpretation, and transcription.",
          'Scope, quote, and negotiate new work; prepare proposals and pricing.',
          'Track account performance and revenue growth against targets.',
          'Turn one-off projects into repeat business through delivery clients can rely on.',
        ],
      },
      {
        heading: "What You'll Do — Service the Work",
        bullets: [
          'Run the projects you bring in, coordinating linguists, clinical reviewers, and cognitive debriefing moderators across multiple locales.',
          'Keep timelines, milestones, and budgets on track across concurrent studies.',
          'QA deliverables before they reach the client: cognitive debriefing reports, clinician review reports, translatability assessments, reconciliation grids, and certificates.',
          'Own escalations and quality issues directly, and close them out properly.',
          'Maintain complete, audit-ready documentation aligned with ISPOR good practices and ISO 17100.',
        ],
      },
      {
        heading: 'What You Need',
        bullets: [
          '3+ years in account management, client services, or project management, in translation/localization, clinical research, or a comparable B2B services environment.',
          'Genuine comfort with a commercial target; you should enjoy identifying and closing incremental work.',
          'Excellent written and spoken English, and confident, professional client communication.',
          'Advanced Word and Excel; tracked changes, formatting, and document QA are daily work.',
          'Proven ability to manage multiple concurrent deadlines without losing detail.',
          'On-site: legal authorization to work in Canada. Remote: a reliable internet connection and quiet workspace, with genuine availability during Mountain Time business hours.',
        ],
      },
      {
        heading: 'Nice to Have',
        bullets: [
          'Direct linguistic validation or clinical translation experience (COA/PRO instruments, cognitive debriefing, clinician review).',
          'Familiarity with ISPOR translation and cultural adaptation principles.',
          'Experience with a TMS or client portal (XTM, GlobalLink, Plunet, memoQ, or similar).',
          'A degree in linguistics, translation, life sciences, or business.',
          'Additional working languages.',
        ],
      },
      {
        heading: 'What We Offer',
        bullets: [
          'Fixed schedule. Regular Mountain Time business hours — no rotating shifts and no on-call.',
          'Your choice of arrangement: our downtown Calgary office (steps from the CTrain) or fully remote from anywhere in the world.',
          'Benefits plan for Calgary-based staff, including group health and dental coverage.',
          'Real ownership. Your accounts are yours, and you will see the direct result of the relationships you build.',
          'Meaningful work. The instruments you help validate are used in active clinical trials worldwide.',
          'A small, collaborative team headquartered in Calgary, Canada.',
        ],
      },
      {
        heading: 'Equal Opportunity',
        body:
          'Cethos is an equal opportunity employer. We welcome applications from all qualified candidates and are happy to provide accommodation during the recruitment process on request.',
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
