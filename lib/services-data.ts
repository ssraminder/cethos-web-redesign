export type IconName = 'molecule' | 'document-check' | 'building' | 'code' | 'play'

export interface ServiceData {
  slug: string
  title: string
  shortTitle: string
  description: string
  longDescription: string
  iconName: IconName
  features: {
    title: string
    description: string
  }[]
  process: {
    step: number
    title: string
    description: string
  }[]
  industries: string[]
  benefits: string[]
}

export const servicesData: Record<string, ServiceData> = {
  lifesciences: {
    slug: 'lifesciences',
    title: 'Life Sciences Translation',
    shortTitle: 'Life Sciences',
    description: 'Regulatory documents, clinical trials, medical devices, and pharmaceutical content translated with precision by medical linguists.',
    longDescription: 'Our life sciences translation services cover the full spectrum of pharmaceutical, medical device, and biotechnology documentation. From clinical trial protocols to regulatory submissions, we ensure accuracy, compliance, and consistency across all your medical content.',
    iconName: 'molecule',
    features: [
      {
        title: 'Clinical Trial Documentation',
        description: 'ICFs, protocols, CRFs, and patient-facing materials translated with regulatory compliance.',
      },
      {
        title: 'Regulatory Submissions',
        description: 'CTD modules, IND/NDA applications, and submissions for FDA, EMA, and global agencies.',
      },
      {
        title: 'Medical Device Documentation',
        description: 'IFUs, labeling, technical files, and user manuals compliant with MDR/IVDR requirements.',
      },
      {
        title: 'Pharmacovigilance',
        description: 'Adverse event reports, safety communications, and post-market surveillance documentation.',
      },
      {
        title: 'Medical Writing Support',
        description: 'Assistance with medical writing, editing, and transcreation of scientific content.',
      },
      {
        title: 'Quality Management',
        description: 'GxP-compliant workflows with full audit trails and validation documentation.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Project Analysis',
        description: 'We analyze your documents, identify terminology requirements, and assign specialized medical linguists.',
      },
      {
        step: 2,
        title: 'Translation',
        description: 'Native-speaking medical translators with subject matter expertise translate your content.',
      },
      {
        step: 3,
        title: 'Medical Review',
        description: 'A second medical linguist reviews for accuracy, terminology, and regulatory compliance.',
      },
      {
        step: 4,
        title: 'Quality Assurance',
        description: 'Final QA checks including consistency, formatting, and client-specific requirements.',
      },
      {
        step: 5,
        title: 'Delivery & Support',
        description: 'Delivered in your preferred format with ongoing support for revisions and updates.',
      },
    ],
    industries: ['Pharmaceutical', 'Biotechnology', 'Medical Devices', 'CROs', 'Healthcare'],
    benefits: [
      'ISO 17100 and ISO 9001 compliant processes',
      'Medical professionals as translators',
      'Regulatory expertise across global markets',
      'Terminology management and style guides',
      '24/7 project support availability',
      'Secure, HIPAA-compliant workflows',
    ],
  },
  certified: {
    slug: 'certified',
    title: 'Certified Translation',
    shortTitle: 'Certified',
    description: 'Official documents with certified accuracy for legal, immigration, academic, and government purposes.',
    longDescription: 'Our certified translation services provide legally valid translations for official documents. Each translation comes with a certificate of accuracy and is accepted by courts, government agencies, immigration authorities, and academic institutions worldwide.',
    iconName: 'document-check',
    features: [
      {
        title: 'Legal Document Translation',
        description: 'Contracts, court documents, patents, and legal correspondence with certified accuracy.',
      },
      {
        title: 'Immigration Documents',
        description: 'Birth certificates, marriage certificates, diplomas, and visa application materials.',
      },
      {
        title: 'Academic Credentials',
        description: 'Transcripts, diplomas, certificates, and academic records for educational institutions.',
      },
      {
        title: 'Corporate Documents',
        description: 'Articles of incorporation, bylaws, annual reports, and corporate governance materials.',
      },
      {
        title: 'Notarized Translation',
        description: 'Notarization services available for documents requiring additional authentication.',
      },
      {
        title: 'Apostille Services',
        description: 'Assistance with apostille authentication for international document recognition.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Document Review',
        description: 'We review your documents and determine certification requirements for your destination.',
      },
      {
        step: 2,
        title: 'Certified Translation',
        description: 'A certified translator translates your document with full accuracy guarantee.',
      },
      {
        step: 3,
        title: 'Quality Review',
        description: 'A second linguist verifies accuracy of names, dates, numbers, and official seals.',
      },
      {
        step: 4,
        title: 'Certification',
        description: 'We provide a signed certificate of accuracy with the translator\'s credentials.',
      },
      {
        step: 5,
        title: 'Additional Services',
        description: 'Notarization or apostille services arranged upon request.',
      },
    ],
    industries: ['Legal', 'Immigration', 'Education', 'Government', 'Healthcare'],
    benefits: [
      'Accepted by USCIS and immigration authorities',
      'Court-admissible translations',
      'Fast turnaround for urgent documents',
      'Notarization and apostille available',
      'Lifetime guarantee of accuracy',
      'Secure document handling',
    ],
  },
  business: {
    slug: 'business',
    title: 'Business Translation',
    shortTitle: 'Business',
    description: 'Corporate communications, marketing materials, and financial documents adapted for global markets.',
    longDescription: 'Our business translation services help companies communicate effectively across borders. From internal communications to customer-facing content, we ensure your message resonates with global audiences while maintaining brand consistency.',
    iconName: 'building',
    features: [
      {
        title: 'Corporate Communications',
        description: 'Internal memos, HR documents, training materials, and company announcements.',
      },
      {
        title: 'Marketing & Advertising',
        description: 'Campaigns, brochures, websites, and promotional content with cultural adaptation.',
      },
      {
        title: 'Financial Documents',
        description: 'Annual reports, investor communications, and financial statements.',
      },
      {
        title: 'Technical Documentation',
        description: 'User manuals, product specifications, and technical guides.',
      },
      {
        title: 'E-learning Content',
        description: 'Training modules, courses, and educational materials for global teams.',
      },
      {
        title: 'Customer Communications',
        description: 'Customer service content, FAQs, and support documentation.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Consultation',
        description: 'We understand your business objectives, target audience, and brand guidelines.',
      },
      {
        step: 2,
        title: 'Team Assignment',
        description: 'We assign translators with expertise in your industry and content type.',
      },
      {
        step: 3,
        title: 'Translation & Adaptation',
        description: 'Your content is translated with cultural adaptation for maximum impact.',
      },
      {
        step: 4,
        title: 'Brand Review',
        description: 'We ensure consistency with your brand voice and terminology.',
      },
      {
        step: 5,
        title: 'Final Delivery',
        description: 'Content delivered in your required formats, ready for publication.',
      },
    ],
    industries: ['Finance', 'Manufacturing', 'Retail', 'Consulting', 'Hospitality'],
    benefits: [
      'Brand voice consistency across languages',
      'Marketing transcreation services',
      'Terminology management',
      'Desktop publishing services',
      'Project management portal',
      'Dedicated account management',
    ],
  },
  software: {
    slug: 'software',
    title: 'Software Localization',
    shortTitle: 'Software',
    description: 'UI/UX, help documentation, and software strings adapted for international users and markets.',
    longDescription: 'Our software localization services go beyond translation to adapt your product for global users. We handle everything from UI strings to help documentation, ensuring a native experience for users in every target market.',
    iconName: 'code',
    features: [
      {
        title: 'UI/UX Localization',
        description: 'Interface elements, menus, buttons, and user-facing text adapted for local users.',
      },
      {
        title: 'Help Documentation',
        description: 'User guides, knowledge bases, and support articles in multiple languages.',
      },
      {
        title: 'API & String Files',
        description: 'JSON, XML, XLIFF, and other file formats processed with technical precision.',
      },
      {
        title: 'App Store Optimization',
        description: 'App descriptions, keywords, and screenshots localized for global app stores.',
      },
      {
        title: 'Agile Integration',
        description: 'Seamless integration with your development workflow and CI/CD pipeline.',
      },
      {
        title: 'Testing & QA',
        description: 'Linguistic testing to ensure proper display and functionality in context.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Technical Analysis',
        description: 'We analyze your codebase, extract strings, and assess internationalization readiness.',
      },
      {
        step: 2,
        title: 'Glossary Development',
        description: 'We create terminology databases for consistent product language.',
      },
      {
        step: 3,
        title: 'Localization',
        description: 'Specialized software localizers translate and adapt your content.',
      },
      {
        step: 4,
        title: 'Contextual Review',
        description: 'In-context review ensures translations work within your UI.',
      },
      {
        step: 5,
        title: 'Integration & Testing',
        description: 'Localized files integrated and tested in your development environment.',
      },
    ],
    industries: ['SaaS', 'Mobile Apps', 'Enterprise Software', 'Gaming', 'FinTech'],
    benefits: [
      'Developer-friendly workflows',
      'CAT tool integration',
      'Continuous localization support',
      'Pseudo-localization testing',
      'String length management',
      'Context-aware translation',
    ],
  },
  multimedia: {
    slug: 'multimedia',
    title: 'Multimedia Translation',
    shortTitle: 'Multimedia',
    description: 'Video subtitling, voiceover, dubbing, and audio transcription for global content distribution.',
    longDescription: 'Our multimedia translation services bring your video and audio content to global audiences. From subtitling to full dubbing, we provide end-to-end solutions for entertainment, corporate, and e-learning content.',
    iconName: 'play',
    features: [
      {
        title: 'Subtitling & Captioning',
        description: 'Accurate subtitles and closed captions for videos in any format.',
      },
      {
        title: 'Voiceover Services',
        description: 'Professional voice talent in 100+ languages for narration and presentation.',
      },
      {
        title: 'Dubbing & Lip-Sync',
        description: 'Full dubbing services with lip-sync adaptation for films and series.',
      },
      {
        title: 'Audio Transcription',
        description: 'Accurate transcription of audio and video content in any language.',
      },
      {
        title: 'Audio Description',
        description: 'Accessibility services for visually impaired audiences.',
      },
      {
        title: 'Video Localization',
        description: 'On-screen text, graphics, and embedded content localization.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Content Analysis',
        description: 'We review your multimedia content and recommend the best approach.',
      },
      {
        step: 2,
        title: 'Script Adaptation',
        description: 'Scripts are translated and adapted for timing and cultural relevance.',
      },
      {
        step: 3,
        title: 'Production',
        description: 'Subtitles are created or voice talent records in professional studios.',
      },
      {
        step: 4,
        title: 'Quality Review',
        description: 'Linguistic and technical QA ensures perfect synchronization.',
      },
      {
        step: 5,
        title: 'Final Delivery',
        description: 'Deliverables in your required formats, ready for distribution.',
      },
    ],
    industries: ['Entertainment', 'E-learning', 'Corporate', 'Marketing', 'Broadcasting'],
    benefits: [
      'Professional voice talent network',
      'Studio-quality recordings',
      'Fast turnaround times',
      'Multiple output formats',
      'Accessibility compliance',
      'Volume discounts available',
    ],
  },
}

export const servicesList = Object.values(servicesData)

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData[slug]
}
