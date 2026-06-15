-- Seed: How It Works + FAQ sections for Software / Multimedia / Business service pages
-- Namespaces: service.{software,multimedia,business}.{how,faq}
-- Re-runnable: namespaces ON CONFLICT (name) DO NOTHING; translations DO UPDATE.

-- STEP 1: namespaces ----------------------------------------------------------
insert into cethosweb_i18n_namespaces (name, description, page_path, sort_order)
values
  ('service.software.how','Software localization - how it works','/services/software',611),
  ('service.software.faq','Software localization - FAQ','/services/software',612),
  ('service.multimedia.how','Multimedia localization - how it works','/services/multimedia',621),
  ('service.multimedia.faq','Multimedia localization - FAQ','/services/multimedia',622),
  ('service.business.how','Business translation - how it works','/services/business',631),
  ('service.business.faq','Business translation - FAQ','/services/business',632)
on conflict (name) do nothing;

-- STEP 2: translations (locale='en', status='published') ----------------------
insert into cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
select n.id, v.k, 0, 'en', v.val, 'published'
from (values
  -- SOFTWARE - How It Works
  ('service.software.how','heading',$q$How Software Localization Works$q$),
  ('service.software.how','description',$q$A developer-friendly workflow that fits your release cycle.$q$),
  ('service.software.how','step1_title',$q$Connect & Scope$q$),
  ('service.software.how','step1_desc',$q$We integrate with your repository or localization platform and analyze your file formats, string volume, and target locales.$q$),
  ('service.software.how','step2_title',$q$Translate in Context$q$),
  ('service.software.how','step2_desc',$q$Native-speaking linguists translate UI strings, documentation, and help content with screenshots and context so nothing breaks layout or meaning.$q$),
  ('service.software.how','step3_title',$q$QA & Linguistic Testing$q$),
  ('service.software.how','step3_desc',$q$We run in-context review and functional checks for truncation, encoding, placeholders, and pluralization across every locale.$q$),
  ('service.software.how','step4_title',$q$Deliver & Continuously Localize$q$),
  ('service.software.how','step4_desc',$q$Translated resources flow back into your build, and new strings are localized continuously as you ship.$q$),
  -- SOFTWARE - FAQ
  ('service.software.faq','heading',$q$Software Localization FAQ$q$),
  ('service.software.faq','description',$q$Answers to common questions about file formats, integrations, and turnaround.$q$),
  ('service.software.faq','q1',$q$What file formats do you support?$q$),
  ('service.software.faq','a1',$q$We work with 40+ formats including JSON, XLIFF, PO/POT, RESX, .strings, ARB, YAML, and Markdown - extracting only translatable strings while preserving code and placeholders.$q$),
  ('service.software.faq','q2',$q$Can you integrate with our CI/CD pipeline?$q$),
  ('service.software.faq','a2',$q$Yes. We integrate with platforms like Crowdin, Lokalise, Phrase, GitHub, and GitLab so localization runs automatically as part of your release workflow.$q$),
  ('service.software.faq','q3',$q$How do you handle context for UI strings?$q$),
  ('service.software.faq','a3',$q$We use screenshots, in-context previews, and developer notes so translators can see where each string appears, avoiding layout breaks and mistranslations.$q$),
  ('service.software.faq','q4',$q$What is continuous localization?$q$),
  ('service.software.faq','a4',$q$As new or changed strings are committed, they are automatically queued for translation and returned quickly, keeping every locale in sync with your main branch.$q$),
  ('service.software.faq','q5',$q$Do you test the localized build?$q$),
  ('service.software.faq','a5',$q$Yes. Our QA and linguistic testing checks for truncation, character encoding, broken placeholders, pluralization, and right-to-left rendering before release.$q$),
  ('service.software.faq','q6',$q$How fast is turnaround?$q$),
  ('service.software.faq','a6',$q$Turnaround depends on volume, but continuous localization typically returns new strings within 24-72 hours; rush options are available.$q$),
  -- MULTIMEDIA - How It Works
  ('service.multimedia.how','heading',$q$How Multimedia Localization Works$q$),
  ('service.multimedia.how','description',$q$From source media to broadcast-ready deliverables in any language.$q$),
  ('service.multimedia.how','step1_title',$q$Source & Transcribe$q$),
  ('service.multimedia.how','step1_desc',$q$We transcribe your audio or video and prepare a time-coded script ready for translation.$q$),
  ('service.multimedia.how','step2_title',$q$Translate & Adapt$q$),
  ('service.multimedia.how','step2_desc',$q$Native linguists translate and culturally adapt the script for subtitles, voiceover, or dubbing - matching tone, timing, and reading speed.$q$),
  ('service.multimedia.how','step3_title',$q$Record or Subtitle$q$),
  ('service.multimedia.how','step3_desc',$q$Professional voice talent record voiceover or dubbing, or our team produces frame-accurate subtitles and captions.$q$),
  ('service.multimedia.how','step4_title',$q$QA & Deliver$q$),
  ('service.multimedia.how','step4_desc',$q$We run linguistic and technical QA, then deliver in your required formats - SRT, VTT, TTML, SCORM, and more.$q$),
  -- MULTIMEDIA - FAQ
  ('service.multimedia.faq','heading',$q$Multimedia Localization FAQ$q$),
  ('service.multimedia.faq','description',$q$Answers to common questions about subtitling, dubbing, and delivery formats.$q$),
  ('service.multimedia.faq','q1',$q$What subtitle and caption formats do you deliver?$q$),
  ('service.multimedia.faq','a1',$q$We deliver SRT, VTT, TTML, DFXP, and EBU-STL, plus burned-in (open) captions on request.$q$),
  ('service.multimedia.faq','q2',$q$Do you offer voiceover and dubbing?$q$),
  ('service.multimedia.faq','a2',$q$Yes. We provide voiceover, UN-style, and full lip-sync dubbing using professional native-speaking voice talent across 200+ languages.$q$),
  ('service.multimedia.faq','q3',$q$Can you localize eLearning content?$q$),
  ('service.multimedia.faq','a3',$q$Yes. We localize SCORM 1.2 and SCORM 2004 courses, including on-screen text, narration, quizzes, and embedded media.$q$),
  ('service.multimedia.faq','q4',$q$How do you ensure subtitle timing and readability?$q$),
  ('service.multimedia.faq','a4',$q$We follow reading-speed and line-length standards (such as characters-per-second limits) so subtitles are comfortable to read and synced to the audio.$q$),
  ('service.multimedia.faq','q5',$q$Do you handle on-screen text and graphics?$q$),
  ('service.multimedia.faq','a5',$q$Yes. We localize on-screen titles, lower-thirds, and graphics, and can re-render them or supply text for your editors.$q$),
  ('service.multimedia.faq','q6',$q$What source files do you need?$q$),
  ('service.multimedia.faq','a6',$q$Ideally the source video plus any existing scripts or caption files. We can also work from the final video alone and transcribe from scratch.$q$),
  -- BUSINESS - How It Works
  ('service.business.how','heading',$q$How Business Translation Works$q$),
  ('service.business.how','description',$q$A reliable, confidential workflow for high-stakes corporate content.$q$),
  ('service.business.how','step1_title',$q$Scope & Quote$q$),
  ('service.business.how','step1_desc',$q$Share your documents and target languages; we assess content, terminology, and turnaround and provide a transparent quote.$q$),
  ('service.business.how','step2_title',$q$Translate with Subject-Matter Experts$q$),
  ('service.business.how','step2_desc',$q$Linguists with finance, legal, or sector expertise translate your content, building a glossary for consistent terminology.$q$),
  ('service.business.how','step3_title',$q$Edit & Proofread (TEP)$q$),
  ('service.business.how','step3_desc',$q$A second linguist edits and a third proofreads, ensuring accuracy, tone, and brand consistency across languages.$q$),
  ('service.business.how','step4_title',$q$Review & Deliver$q$),
  ('service.business.how','step4_desc',$q$We deliver formatted, ready-to-use files and incorporate your in-country reviewer feedback on request.$q$),
  -- BUSINESS - FAQ
  ('service.business.faq','heading',$q$Business Translation FAQ$q$),
  ('service.business.faq','description',$q$Answers to common questions about confidentiality, consistency, and turnaround.$q$),
  ('service.business.faq','q1',$q$What types of business documents do you translate?$q$),
  ('service.business.faq','a1',$q$Annual reports, financial statements, marketing materials, corporate communications, training content, websites, and internal documents, among others.$q$),
  ('service.business.faq','q2',$q$How do you keep terminology consistent?$q$),
  ('service.business.faq','a2',$q$We build and maintain client-specific glossaries and translation memories so terminology and brand voice stay consistent across every project.$q$),
  ('service.business.faq','q3',$q$Is my confidential information secure?$q$),
  ('service.business.faq','a3',$q$Yes. We use encrypted file transfer, sign NDAs, and follow PIPEDA- and GDPR-aligned data-handling practices.$q$),
  ('service.business.faq','q4',$q$Can you match our brand voice across languages?$q$),
  ('service.business.faq','a4',$q$Yes. We adapt tone and style for each market while preserving your brand voice, and can work with your in-country reviewers.$q$),
  ('service.business.faq','q5',$q$What is your quality process?$q$),
  ('service.business.faq','a5',$q$Every project follows a multi-step TEP workflow - translation, editing, and proofreading by separate qualified linguists.$q$),
  ('service.business.faq','q6',$q$What are your turnaround times?$q$),
  ('service.business.faq','a6',$q$Standard throughput is roughly 2,000-3,000 words per day per linguist; we scale teams and offer rush service for tight deadlines.$q$)
) as v(ns, k, val)
join cethosweb_i18n_namespaces n on n.name = v.ns
on conflict (namespace_id, key, segment_index, locale) do update set value=excluded.value, status='published', updated_at=now();
