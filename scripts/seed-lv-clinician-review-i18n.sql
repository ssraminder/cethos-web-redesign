-- Seed namespace + translations for the nested page:
--   /services/lifesciences/linguistic-validation/clinician-review
-- Namespace: lifesciences.linguistic-validation-clinician-review
-- Locales: English (en) + French (fr). Run once against the web Supabase project.
-- French copy should receive a human LQA pass before publish.

-- 1. Create namespace
INSERT INTO cethosweb_i18n_namespaces (name, page_path, sort_order)
VALUES ('lifesciences.linguistic-validation-clinician-review', '/services/lifesciences/linguistic-validation/clinician-review', 213)
ON CONFLICT (name) DO NOTHING;

-- 2. English translations
WITH ns AS (
  SELECT id FROM cethosweb_i18n_namespaces WHERE name = 'lifesciences.linguistic-validation-clinician-review'
)
INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
VALUES
  -- Breadcrumb
  ((SELECT id FROM ns), 'breadcrumb.home', 0, 'en', 'Home', 'published'),
  ((SELECT id FROM ns), 'breadcrumb.services', 0, 'en', 'Services', 'published'),
  ((SELECT id FROM ns), 'breadcrumb.lifesciences', 0, 'en', 'Life Sciences', 'published'),
  ((SELECT id FROM ns), 'breadcrumb.linguisticvalidation', 0, 'en', 'Linguistic Validation', 'published'),
  ((SELECT id FROM ns), 'breadcrumb.current', 0, 'en', 'Clinician Review', 'published'),
  -- Hero
  ((SELECT id FROM ns), 'hero.badge', 0, 'en', 'Linguistic Validation · Clinician Review', 'published'),
  ((SELECT id FROM ns), 'hero.title', 0, 'en', 'Clinician Review for Linguistic Validation', 'published'),
  ((SELECT id FROM ns), 'hero.subtitle', 0, 'en', 'In-country clinician review that confirms the medical accuracy and conceptual equivalence of your translated clinical outcome assessments — guided by ISPOR and PROMIS/FACIT good practice.', 'published'),
  ((SELECT id FROM ns), 'hero.cta_quote', 0, 'en', 'Get a Free Quote', 'published'),
  ((SELECT id FROM ns), 'hero.cta_methodology', 0, 'en', 'See the Methodology', 'published'),
  ((SELECT id FROM ns), 'hero.badge_ispor', 0, 'en', 'ISPOR-Aligned', 'published'),
  ((SELECT id FROM ns), 'hero.badge_promis', 0, 'en', 'PROMIS/FACIT Methodology', 'published'),
  ((SELECT id FROM ns), 'hero.badge_incountry', 0, 'en', 'In-Country Physicians', 'published'),
  ((SELECT id FROM ns), 'hero.badge_iso', 0, 'en', 'ISO 17100 Process', 'published'),
  -- What
  ((SELECT id FROM ns), 'what.title', 0, 'en', 'What is Clinician Review?', 'published'),
  ((SELECT id FROM ns), 'what.p1', 0, 'en', 'Clinician review is the medical-expert step of linguistic validation. A qualified in-country clinician reviews a near-final translation of a clinical outcome assessment (COA) to confirm that medical terminology, clinical concepts, and phrasing are accurate and appropriate for the target patient population.', 'published'),
  ((SELECT id FROM ns), 'what.p2', 0, 'en', 'Unlike a general linguistic check, clinician review draws on real clinical experience. The reviewer verifies that the wording matches how clinicians and patients actually speak about symptoms, procedures, and treatments in the target country — protecting the <strong>conceptual equivalence</strong> that regulators expect.', 'published'),
  ((SELECT id FROM ns), 'what.p3', 0, 'en', 'It is a core part of a rigorous <lvlink>linguistic validation</lvlink> program and is performed alongside forward translation, reconciliation, back-translation, and cognitive debriefing.', 'published'),
  -- Stats
  ((SELECT id FROM ns), 'stats.reviewers', 0, 'en', '300+', 'published'),
  ((SELECT id FROM ns), 'stats.reviewers_label', 0, 'en', 'Qualified Clinician Reviewers', 'published'),
  ((SELECT id FROM ns), 'stats.languages', 0, 'en', '150+', 'published'),
  ((SELECT id FROM ns), 'stats.languages_label', 0, 'en', 'Languages Covered', 'published'),
  ((SELECT id FROM ns), 'stats.therapeutic', 0, 'en', '25+', 'published'),
  ((SELECT id FROM ns), 'stats.therapeutic_label', 0, 'en', 'Therapeutic Areas', 'published'),
  ((SELECT id FROM ns), 'stats.turnaround', 0, 'en', '5-7 days', 'published'),
  ((SELECT id FROM ns), 'stats.turnaround_label', 0, 'en', 'Standard Turnaround', 'published'),
  -- Methodology
  ((SELECT id FROM ns), 'methodology.title', 0, 'en', 'Aligned with ISPOR and PROMIS/FACIT', 'published'),
  ((SELECT id FROM ns), 'methodology.subtitle', 0, 'en', 'Clinician review is not an optional extra — both leading COA translation methodologies build a medical-expert review into the process.', 'published'),
  ((SELECT id FROM ns), 'methodology.ispor_eyebrow', 0, 'en', 'ISPOR', 'published'),
  ((SELECT id FROM ns), 'methodology.ispor_title', 0, 'en', 'In-country clinician review', 'published'),
  ((SELECT id FROM ns), 'methodology.ispor_desc', 0, 'en', 'The ISPOR Principles of Good Practice for the translation and cultural adaptation of PRO measures call for review by a qualified in-country clinician to safeguard medical accuracy and conceptual equivalence.', 'published'),
  ((SELECT id FROM ns), 'methodology.ispor_point1', 0, 'en', 'Performed by an in-country clinician who specializes in the study''s therapeutic area', 'published'),
  ((SELECT id FROM ns), 'methodology.ispor_point2', 0, 'en', 'Confirms medical terminology and clinical concepts are correctly conveyed', 'published'),
  ((SELECT id FROM ns), 'methodology.ispor_point3', 0, 'en', 'Produces a report of proposed changes that the translation team reconciles', 'published'),
  ((SELECT id FROM ns), 'methodology.promis_eyebrow', 0, 'en', 'PROMIS / FACIT', 'published'),
  ((SELECT id FROM ns), 'methodology.promis_title', 0, 'en', 'Expert review step', 'published'),
  ((SELECT id FROM ns), 'methodology.promis_desc', 0, 'en', 'The PROMIS and FACIT methodology (adopted by PROMIS, Neuro-QoL, and NIH Toolbox) includes an expert review in which bilingual clinical experts assess the reconciled translation before cognitive debriefing.', 'published'),
  ((SELECT id FROM ns), 'methodology.promis_point1', 0, 'en', 'Bilingual clinical experts review the reconciled forward translation', 'published'),
  ((SELECT id FROM ns), 'methodology.promis_point2', 0, 'en', 'Supports the FACIT universal translation approach across countries', 'published'),
  ((SELECT id FROM ns), 'methodology.promis_point3', 0, 'en', 'Feeds into finalization and, ultimately, PROMIS Statistical Center approval', 'published'),
  ((SELECT id FROM ns), 'methodology.note', 0, 'en', 'Whether your program follows the <strong>ISPOR</strong> or <strong>PROMIS/FACIT</strong> pathway, Cethos matches you with reviewers who meet the recognized qualification standards and documents every decision for your regulatory file.', 'published'),
  -- Process
  ((SELECT id FROM ns), 'process.title', 0, 'en', 'How Cethos Runs Clinician Review', 'published'),
  ((SELECT id FROM ns), 'process.subtitle', 0, 'en', 'A structured, documented workflow that fits cleanly into your linguistic validation project.', 'published'),
  ((SELECT id FROM ns), 'process.step1_title', 0, 'en', 'Reviewer Matching', 'published'),
  ((SELECT id FROM ns), 'process.step1_desc', 0, 'en', 'We select an in-country clinician who specializes in your therapeutic area and meets ISPOR qualification standards.', 'published'),
  ((SELECT id FROM ns), 'process.step2_title', 0, 'en', 'Structured Review', 'published'),
  ((SELECT id FROM ns), 'process.step2_desc', 0, 'en', 'The clinician reviews the reconciled translation against the source, checking terminology, clinical accuracy, and appropriateness for the population.', 'published'),
  ((SELECT id FROM ns), 'process.step3_title', 0, 'en', 'Clinician Report', 'published'),
  ((SELECT id FROM ns), 'process.step3_desc', 0, 'en', 'The reviewer documents proposed changes with clinical rationale in a structured clinician review report.', 'published'),
  ((SELECT id FROM ns), 'process.step4_title', 0, 'en', 'Reconciliation', 'published'),
  ((SELECT id FROM ns), 'process.step4_desc', 0, 'en', 'Our linguists and project managers reconcile the clinician''s findings with the forward and back-translation teams.', 'published'),
  ((SELECT id FROM ns), 'process.step5_title', 0, 'en', 'Finalization & Sign-off', 'published'),
  ((SELECT id FROM ns), 'process.step5_desc', 0, 'en', 'Approved changes are implemented, the translation is finalized, and the full audit trail is prepared for submission.', 'published'),
  -- Qualifications
  ((SELECT id FROM ns), 'qualifications.title', 0, 'en', 'Reviewer Qualifications', 'published'),
  ((SELECT id FROM ns), 'qualifications.subtitle', 0, 'en', 'Following ISPOR guidance, every clinician reviewer meets recognized minimum standards.', 'published'),
  ((SELECT id FROM ns), 'qualifications.item1_title', 0, 'en', 'Medical Credential', 'published'),
  ((SELECT id FROM ns), 'qualifications.item1_desc', 0, 'en', 'An M.D. or the relevant equivalent qualification in the target country.', 'published'),
  ((SELECT id FROM ns), 'qualifications.item2_title', 0, 'en', 'Clinical Experience', 'published'),
  ((SELECT id FROM ns), 'qualifications.item2_desc', 0, 'en', 'At least two years diagnosing or treating the target patient population.', 'published'),
  ((SELECT id FROM ns), 'qualifications.item3_title', 0, 'en', 'Therapeutic-Area Match', 'published'),
  ((SELECT id FROM ns), 'qualifications.item3_desc', 0, 'en', 'Specialization in the instrument''s therapeutic area and patient group.', 'published'),
  ((SELECT id FROM ns), 'qualifications.item4_title', 0, 'en', 'Language Proficiency', 'published'),
  ((SELECT id FROM ns), 'qualifications.item4_desc', 0, 'en', 'Native-language proficiency plus advanced medical terminology in the target language.', 'published'),
  -- Instruments
  ((SELECT id FROM ns), 'instruments.title', 0, 'en', 'Instruments We Review', 'published'),
  ((SELECT id FROM ns), 'instruments.subtitle', 0, 'en', 'Clinician review is especially important for instruments where medical terminology and clinical judgment are central.', 'published'),
  ((SELECT id FROM ns), 'instruments.clinro_name', 0, 'en', 'Clinician-Reported Outcomes', 'published'),
  ((SELECT id FROM ns), 'instruments.clinro_desc', 0, 'en', 'Assessments completed by a clinician based on observation and clinical judgment.', 'published'),
  ((SELECT id FROM ns), 'instruments.obsro_name', 0, 'en', 'Observer-Reported Outcomes', 'published'),
  ((SELECT id FROM ns), 'instruments.obsro_desc', 0, 'en', 'Reports from a caregiver or observer about a patient''s behavior or signs.', 'published'),
  ((SELECT id FROM ns), 'instruments.perfo_name', 0, 'en', 'Performance Outcomes', 'published'),
  ((SELECT id FROM ns), 'instruments.perfo_desc', 0, 'en', 'Standardized tasks completed by a patient and evaluated against defined criteria.', 'published'),
  ((SELECT id FROM ns), 'instruments.pro_name', 0, 'en', 'Complex PRO Measures', 'published'),
  ((SELECT id FROM ns), 'instruments.pro_desc', 0, 'en', 'Patient-reported instruments with specialized clinical or dosing terminology.', 'published'),
  -- Deliverables
  ((SELECT id FROM ns), 'deliverables.title', 0, 'en', 'What You Receive', 'published'),
  ((SELECT id FROM ns), 'deliverables.subtitle', 0, 'en', 'Clear, submission-ready documentation of the clinician review.', 'published'),
  ((SELECT id FROM ns), 'deliverables.item1_title', 0, 'en', 'Clinician Review Report', 'published'),
  ((SELECT id FROM ns), 'deliverables.item1_desc', 0, 'en', 'A documented record of proposed changes with clinical rationale.', 'published'),
  ((SELECT id FROM ns), 'deliverables.item2_title', 0, 'en', 'Annotated Translation', 'published'),
  ((SELECT id FROM ns), 'deliverables.item2_desc', 0, 'en', 'The reviewed translation with the clinician''s changes clearly tracked.', 'published'),
  ((SELECT id FROM ns), 'deliverables.item3_title', 0, 'en', 'Reconciliation Summary', 'published'),
  ((SELECT id FROM ns), 'deliverables.item3_desc', 0, 'en', 'A record of how findings were resolved with the translation team.', 'published'),
  ((SELECT id FROM ns), 'deliverables.item4_title', 0, 'en', 'Audit Trail', 'published'),
  ((SELECT id FROM ns), 'deliverables.item4_desc', 0, 'en', 'A complete, regulator-ready trail for your linguistic validation file.', 'published'),
  -- FAQ
  ((SELECT id FROM ns), 'faq.title', 0, 'en', 'Frequently Asked Questions', 'published'),
  ((SELECT id FROM ns), 'faq.q1', 0, 'en', 'Is clinician review required under ISPOR and PROMIS?', 'published'),
  ((SELECT id FROM ns), 'faq.a1', 0, 'en', 'Both methodologies build in a medical-expert step. The ISPOR Principles of Good Practice call for review by an in-country clinician to confirm medical terminology and conceptual equivalence, while the PROMIS/FACIT methodology includes an expert review step in which bilingual clinical experts assess the reconciled translation. Clinician review is a standard, expected part of a rigorous linguistic validation.', 'published'),
  ((SELECT id FROM ns), 'faq.q2', 0, 'en', 'What qualifications do your clinician reviewers have?', 'published'),
  ((SELECT id FROM ns), 'faq.a2', 0, 'en', 'Following ISPOR guidance, our in-country clinician reviewers hold an M.D. or the relevant equivalent in the target country, have at least two years of experience diagnosing or treating the study population, and possess native-language proficiency and advanced medical terminology in the target language.', 'published'),
  ((SELECT id FROM ns), 'faq.q3', 0, 'en', 'How is clinician review different from cognitive debriefing?', 'published'),
  ((SELECT id FROM ns), 'faq.a3', 0, 'en', 'Cognitive debriefing tests comprehension with patients from the target population, while clinician review is a medical-expert assessment of clinical accuracy and appropriate terminology. They are complementary steps: the clinician confirms the translation is medically sound, and cognitive debriefing confirms patients understand it as intended.', 'published'),
  ((SELECT id FROM ns), 'faq.q4', 0, 'en', 'Where does clinician review fall in the linguistic validation workflow?', 'published'),
  ((SELECT id FROM ns), 'faq.a4', 0, 'en', 'Clinician review is performed on a near-final, reconciled translation, typically after back-translation review and around cognitive debriefing, and before final proofreading. The clinician issues a report of proposed changes that the forward and back-translation teams reconcile before finalization.', 'published'),
  ((SELECT id FROM ns), 'faq.q5', 0, 'en', 'Do you support PROMIS universal translations?', 'published'),
  ((SELECT id FROM ns), 'faq.a5', 0, 'en', 'Yes. For PROMIS, Neuro-QoL, and NIH Toolbox instruments we follow the FACIT universal translation approach, producing a single language version appropriate across countries by involving in-country clinical experts from each relevant region during review.', 'published'),
  ((SELECT id FROM ns), 'faq.q6', 0, 'en', 'What does the clinician provide at the end of the review?', 'published'),
  ((SELECT id FROM ns), 'faq.a6', 0, 'en', 'You receive a documented clinician review report detailing proposed changes and the clinical rationale, the annotated or revised translation, and a full audit trail suitable for regulatory submission.', 'published'),
  -- Quote
  ((SELECT id FROM ns), 'quote.title', 0, 'en', 'Request a Clinician Review Quote', 'published'),
  ((SELECT id FROM ns), 'quote.subtitle', 0, 'en', 'Tell us about your instrument and target languages, and we''ll scope the clinician review as part of your linguistic validation.', 'published'),
  -- CTA
  ((SELECT id FROM ns), 'cta.title', 0, 'en', 'Add Clinician Review to Your Validation', 'published'),
  ((SELECT id FROM ns), 'cta.subtitle', 0, 'en', 'Match with qualified in-country clinicians and keep your COA translations medically accurate and submission-ready.', 'published'),
  ((SELECT id FROM ns), 'cta.button_quote', 0, 'en', 'Get a Free Quote', 'published'),
  ((SELECT id FROM ns), 'cta.button_contact', 0, 'en', 'Talk to an Expert', 'published'),
  ((SELECT id FROM ns), 'cta.tagline', 0, 'en', 'ISPOR- and PROMIS/FACIT-guided clinician review across 150+ languages.', 'published');

-- 3. French translations
WITH ns AS (
  SELECT id FROM cethosweb_i18n_namespaces WHERE name = 'lifesciences.linguistic-validation-clinician-review'
)
INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
VALUES
  -- Breadcrumb
  ((SELECT id FROM ns), 'breadcrumb.home', 0, 'fr', 'Accueil', 'published'),
  ((SELECT id FROM ns), 'breadcrumb.services', 0, 'fr', 'Services', 'published'),
  ((SELECT id FROM ns), 'breadcrumb.lifesciences', 0, 'fr', 'Sciences de la vie', 'published'),
  ((SELECT id FROM ns), 'breadcrumb.linguisticvalidation', 0, 'fr', 'Validation linguistique', 'published'),
  ((SELECT id FROM ns), 'breadcrumb.current', 0, 'fr', 'Revue par un clinicien', 'published'),
  -- Hero
  ((SELECT id FROM ns), 'hero.badge', 0, 'fr', 'Validation linguistique · Revue par un clinicien', 'published'),
  ((SELECT id FROM ns), 'hero.title', 0, 'fr', 'Revue par un clinicien pour la validation linguistique', 'published'),
  ((SELECT id FROM ns), 'hero.subtitle', 0, 'fr', 'Une revue par un clinicien du pays cible qui confirme l''exactitude médicale et l''équivalence conceptuelle de vos évaluations des résultats cliniques traduites — selon les bonnes pratiques ISPOR et PROMIS/FACIT.', 'published'),
  ((SELECT id FROM ns), 'hero.cta_quote', 0, 'fr', 'Obtenir une soumission gratuite', 'published'),
  ((SELECT id FROM ns), 'hero.cta_methodology', 0, 'fr', 'Voir la méthodologie', 'published'),
  ((SELECT id FROM ns), 'hero.badge_ispor', 0, 'fr', 'Conforme à l''ISPOR', 'published'),
  ((SELECT id FROM ns), 'hero.badge_promis', 0, 'fr', 'Méthodologie PROMIS/FACIT', 'published'),
  ((SELECT id FROM ns), 'hero.badge_incountry', 0, 'fr', 'Médecins du pays cible', 'published'),
  ((SELECT id FROM ns), 'hero.badge_iso', 0, 'fr', 'Processus ISO 17100', 'published'),
  -- What
  ((SELECT id FROM ns), 'what.title', 0, 'fr', 'Qu''est-ce que la revue par un clinicien?', 'published'),
  ((SELECT id FROM ns), 'what.p1', 0, 'fr', 'La revue par un clinicien est l''étape d''expertise médicale de la validation linguistique. Un clinicien qualifié du pays cible examine une traduction quasi définitive d''une évaluation des résultats cliniques (COA) afin de confirmer que la terminologie médicale, les concepts cliniques et les formulations sont exacts et adaptés à la population de patients visée.', 'published'),
  ((SELECT id FROM ns), 'what.p2', 0, 'fr', 'Contrairement à une simple vérification linguistique, la revue par un clinicien s''appuie sur une véritable expérience clinique. Le réviseur vérifie que la formulation correspond à la manière dont les cliniciens et les patients parlent réellement des symptômes, des interventions et des traitements dans le pays cible, ce qui protège l''<strong>équivalence conceptuelle</strong> attendue par les autorités réglementaires.', 'published'),
  ((SELECT id FROM ns), 'what.p3', 0, 'fr', 'Il s''agit d''un élément essentiel d''un programme rigoureux de <lvlink>validation linguistique</lvlink>, réalisé parallèlement à la traduction directe, à la réconciliation, à la rétrotraduction et au débriefing cognitif.', 'published'),
  -- Stats
  ((SELECT id FROM ns), 'stats.reviewers', 0, 'fr', '300+', 'published'),
  ((SELECT id FROM ns), 'stats.reviewers_label', 0, 'fr', 'Cliniciens réviseurs qualifiés', 'published'),
  ((SELECT id FROM ns), 'stats.languages', 0, 'fr', '150+', 'published'),
  ((SELECT id FROM ns), 'stats.languages_label', 0, 'fr', 'Langues couvertes', 'published'),
  ((SELECT id FROM ns), 'stats.therapeutic', 0, 'fr', '25+', 'published'),
  ((SELECT id FROM ns), 'stats.therapeutic_label', 0, 'fr', 'Aires thérapeutiques', 'published'),
  ((SELECT id FROM ns), 'stats.turnaround', 0, 'fr', '5-7 jours', 'published'),
  ((SELECT id FROM ns), 'stats.turnaround_label', 0, 'fr', 'Délai standard', 'published'),
  -- Methodology
  ((SELECT id FROM ns), 'methodology.title', 0, 'fr', 'Aligné sur l''ISPOR et PROMIS/FACIT', 'published'),
  ((SELECT id FROM ns), 'methodology.subtitle', 0, 'fr', 'La revue par un clinicien n''est pas une option supplémentaire : les deux principales méthodologies de traduction des COA intègrent une revue par un expert médical.', 'published'),
  ((SELECT id FROM ns), 'methodology.ispor_eyebrow', 0, 'fr', 'ISPOR', 'published'),
  ((SELECT id FROM ns), 'methodology.ispor_title', 0, 'fr', 'Revue par un clinicien du pays cible', 'published'),
  ((SELECT id FROM ns), 'methodology.ispor_desc', 0, 'fr', 'Les Principes de bonnes pratiques de l''ISPOR pour la traduction et l''adaptation culturelle des mesures PRO prévoient une revue par un clinicien qualifié du pays cible afin de préserver l''exactitude médicale et l''équivalence conceptuelle.', 'published'),
  ((SELECT id FROM ns), 'methodology.ispor_point1', 0, 'fr', 'Réalisée par un clinicien du pays cible spécialisé dans l''aire thérapeutique de l''étude', 'published'),
  ((SELECT id FROM ns), 'methodology.ispor_point2', 0, 'fr', 'Confirme que la terminologie médicale et les concepts cliniques sont correctement rendus', 'published'),
  ((SELECT id FROM ns), 'methodology.ispor_point3', 0, 'fr', 'Produit un rapport de modifications proposées que l''équipe de traduction réconcilie', 'published'),
  ((SELECT id FROM ns), 'methodology.promis_eyebrow', 0, 'fr', 'PROMIS / FACIT', 'published'),
  ((SELECT id FROM ns), 'methodology.promis_title', 0, 'fr', 'Étape de revue par des experts', 'published'),
  ((SELECT id FROM ns), 'methodology.promis_desc', 0, 'fr', 'La méthodologie PROMIS et FACIT (adoptée par PROMIS, Neuro-QoL et NIH Toolbox) comprend une revue par des experts au cours de laquelle des experts cliniques bilingues évaluent la traduction réconciliée avant le débriefing cognitif.', 'published'),
  ((SELECT id FROM ns), 'methodology.promis_point1', 0, 'fr', 'Des experts cliniques bilingues examinent la traduction directe réconciliée', 'published'),
  ((SELECT id FROM ns), 'methodology.promis_point2', 0, 'fr', 'Soutient l''approche de traduction universelle FACIT entre les pays', 'published'),
  ((SELECT id FROM ns), 'methodology.promis_point3', 0, 'fr', 'Alimente la finalisation et, à terme, l''approbation du PROMIS Statistical Center', 'published'),
  ((SELECT id FROM ns), 'methodology.note', 0, 'fr', 'Que votre programme suive la voie <strong>ISPOR</strong> ou <strong>PROMIS/FACIT</strong>, Cethos vous associe à des réviseurs qui satisfont aux normes de qualification reconnues et documente chaque décision pour votre dossier réglementaire.', 'published'),
  -- Process
  ((SELECT id FROM ns), 'process.title', 0, 'fr', 'Comment Cethos réalise la revue par un clinicien', 'published'),
  ((SELECT id FROM ns), 'process.subtitle', 0, 'fr', 'Un flux de travail structuré et documenté qui s''intègre parfaitement à votre projet de validation linguistique.', 'published'),
  ((SELECT id FROM ns), 'process.step1_title', 0, 'fr', 'Sélection du réviseur', 'published'),
  ((SELECT id FROM ns), 'process.step1_desc', 0, 'fr', 'Nous choisissons un clinicien du pays cible spécialisé dans votre aire thérapeutique et satisfaisant aux normes de qualification de l''ISPOR.', 'published'),
  ((SELECT id FROM ns), 'process.step2_title', 0, 'fr', 'Revue structurée', 'published'),
  ((SELECT id FROM ns), 'process.step2_desc', 0, 'fr', 'Le clinicien examine la traduction réconciliée par rapport au texte source, en vérifiant la terminologie, l''exactitude clinique et l''adéquation à la population.', 'published'),
  ((SELECT id FROM ns), 'process.step3_title', 0, 'fr', 'Rapport du clinicien', 'published'),
  ((SELECT id FROM ns), 'process.step3_desc', 0, 'fr', 'Le réviseur consigne les modifications proposées et leur justification clinique dans un rapport de revue structuré.', 'published'),
  ((SELECT id FROM ns), 'process.step4_title', 0, 'fr', 'Réconciliation', 'published'),
  ((SELECT id FROM ns), 'process.step4_desc', 0, 'fr', 'Nos linguistes et chargés de projet réconcilient les constats du clinicien avec les équipes de traduction directe et de rétrotraduction.', 'published'),
  ((SELECT id FROM ns), 'process.step5_title', 0, 'fr', 'Finalisation et approbation', 'published'),
  ((SELECT id FROM ns), 'process.step5_desc', 0, 'fr', 'Les modifications approuvées sont intégrées, la traduction est finalisée et l''ensemble de la piste d''audit est préparé pour la soumission.', 'published'),
  -- Qualifications
  ((SELECT id FROM ns), 'qualifications.title', 0, 'fr', 'Qualifications des réviseurs', 'published'),
  ((SELECT id FROM ns), 'qualifications.subtitle', 0, 'fr', 'Conformément aux recommandations de l''ISPOR, chaque clinicien réviseur satisfait à des normes minimales reconnues.', 'published'),
  ((SELECT id FROM ns), 'qualifications.item1_title', 0, 'fr', 'Titre médical', 'published'),
  ((SELECT id FROM ns), 'qualifications.item1_desc', 0, 'fr', 'Un M.D. ou la qualification équivalente pertinente dans le pays cible.', 'published'),
  ((SELECT id FROM ns), 'qualifications.item2_title', 0, 'fr', 'Expérience clinique', 'published'),
  ((SELECT id FROM ns), 'qualifications.item2_desc', 0, 'fr', 'Au moins deux ans à diagnostiquer ou à traiter la population de patients visée.', 'published'),
  ((SELECT id FROM ns), 'qualifications.item3_title', 0, 'fr', 'Correspondance thérapeutique', 'published'),
  ((SELECT id FROM ns), 'qualifications.item3_desc', 0, 'fr', 'Spécialisation dans l''aire thérapeutique et le groupe de patients de l''instrument.', 'published'),
  ((SELECT id FROM ns), 'qualifications.item4_title', 0, 'fr', 'Maîtrise linguistique', 'published'),
  ((SELECT id FROM ns), 'qualifications.item4_desc', 0, 'fr', 'Maîtrise de la langue maternelle et terminologie médicale avancée dans la langue cible.', 'published'),
  -- Instruments
  ((SELECT id FROM ns), 'instruments.title', 0, 'fr', 'Instruments que nous révisons', 'published'),
  ((SELECT id FROM ns), 'instruments.subtitle', 0, 'fr', 'La revue par un clinicien est particulièrement importante pour les instruments où la terminologie médicale et le jugement clinique sont essentiels.', 'published'),
  ((SELECT id FROM ns), 'instruments.clinro_name', 0, 'fr', 'Résultats rapportés par le clinicien', 'published'),
  ((SELECT id FROM ns), 'instruments.clinro_desc', 0, 'fr', 'Évaluations remplies par un clinicien à partir de l''observation et du jugement clinique.', 'published'),
  ((SELECT id FROM ns), 'instruments.obsro_name', 0, 'fr', 'Résultats rapportés par un observateur', 'published'),
  ((SELECT id FROM ns), 'instruments.obsro_desc', 0, 'fr', 'Rapports d''un aidant ou d''un observateur sur le comportement ou les signes d''un patient.', 'published'),
  ((SELECT id FROM ns), 'instruments.perfo_name', 0, 'fr', 'Résultats de performance', 'published'),
  ((SELECT id FROM ns), 'instruments.perfo_desc', 0, 'fr', 'Tâches standardisées réalisées par un patient et évaluées selon des critères définis.', 'published'),
  ((SELECT id FROM ns), 'instruments.pro_name', 0, 'fr', 'Mesures PRO complexes', 'published'),
  ((SELECT id FROM ns), 'instruments.pro_desc', 0, 'fr', 'Instruments rapportés par le patient comportant une terminologie clinique ou posologique spécialisée.', 'published'),
  -- Deliverables
  ((SELECT id FROM ns), 'deliverables.title', 0, 'fr', 'Ce que vous recevez', 'published'),
  ((SELECT id FROM ns), 'deliverables.subtitle', 0, 'fr', 'Une documentation claire et prête pour la soumission de la revue par un clinicien.', 'published'),
  ((SELECT id FROM ns), 'deliverables.item1_title', 0, 'fr', 'Rapport de revue du clinicien', 'published'),
  ((SELECT id FROM ns), 'deliverables.item1_desc', 0, 'fr', 'Un relevé documenté des modifications proposées et de leur justification clinique.', 'published'),
  ((SELECT id FROM ns), 'deliverables.item2_title', 0, 'fr', 'Traduction annotée', 'published'),
  ((SELECT id FROM ns), 'deliverables.item2_desc', 0, 'fr', 'La traduction révisée avec les modifications du clinicien clairement suivies.', 'published'),
  ((SELECT id FROM ns), 'deliverables.item3_title', 0, 'fr', 'Sommaire de réconciliation', 'published'),
  ((SELECT id FROM ns), 'deliverables.item3_desc', 0, 'fr', 'Un relevé de la façon dont les constats ont été résolus avec l''équipe de traduction.', 'published'),
  ((SELECT id FROM ns), 'deliverables.item4_title', 0, 'fr', 'Piste d''audit', 'published'),
  ((SELECT id FROM ns), 'deliverables.item4_desc', 0, 'fr', 'Une piste complète et prête pour les autorités pour votre dossier de validation linguistique.', 'published'),
  -- FAQ
  ((SELECT id FROM ns), 'faq.title', 0, 'fr', 'Foire aux questions', 'published'),
  ((SELECT id FROM ns), 'faq.q1', 0, 'fr', 'La revue par un clinicien est-elle exigée par l''ISPOR et PROMIS?', 'published'),
  ((SELECT id FROM ns), 'faq.a1', 0, 'fr', 'Les deux méthodologies intègrent une étape d''expertise médicale. Les Principes de bonnes pratiques de l''ISPOR prévoient une revue par un clinicien du pays cible afin de confirmer la terminologie médicale et l''équivalence conceptuelle, tandis que la méthodologie PROMIS/FACIT comprend une étape de revue par des experts au cours de laquelle des experts cliniques bilingues évaluent la traduction réconciliée. La revue par un clinicien fait partie intégrante d''une validation linguistique rigoureuse.', 'published'),
  ((SELECT id FROM ns), 'faq.q2', 0, 'fr', 'Quelles sont les qualifications de vos cliniciens réviseurs?', 'published'),
  ((SELECT id FROM ns), 'faq.a2', 0, 'fr', 'Conformément aux recommandations de l''ISPOR, nos cliniciens réviseurs du pays cible détiennent un M.D. ou l''équivalent pertinent dans le pays cible, possèdent au moins deux ans d''expérience à diagnostiquer ou à traiter la population de l''étude, et maîtrisent la langue maternelle ainsi qu''une terminologie médicale avancée dans la langue cible.', 'published'),
  ((SELECT id FROM ns), 'faq.q3', 0, 'fr', 'En quoi la revue par un clinicien diffère-t-elle du débriefing cognitif?', 'published'),
  ((SELECT id FROM ns), 'faq.a3', 0, 'fr', 'Le débriefing cognitif teste la compréhension auprès de patients de la population cible, tandis que la revue par un clinicien est une évaluation par un expert médical de l''exactitude clinique et de la terminologie appropriée. Ce sont des étapes complémentaires : le clinicien confirme que la traduction est médicalement fiable, et le débriefing cognitif confirme que les patients la comprennent comme prévu.', 'published'),
  ((SELECT id FROM ns), 'faq.q4', 0, 'fr', 'À quel moment la revue par un clinicien intervient-elle dans le processus de validation linguistique?', 'published'),
  ((SELECT id FROM ns), 'faq.a4', 0, 'fr', 'La revue par un clinicien est réalisée sur une traduction réconciliée quasi définitive, généralement après la revue de la rétrotraduction et autour du débriefing cognitif, et avant la relecture finale. Le clinicien produit un rapport de modifications proposées que les équipes de traduction directe et de rétrotraduction réconcilient avant la finalisation.', 'published'),
  ((SELECT id FROM ns), 'faq.q5', 0, 'fr', 'Prenez-vous en charge les traductions universelles PROMIS?', 'published'),
  ((SELECT id FROM ns), 'faq.a5', 0, 'fr', 'Oui. Pour les instruments PROMIS, Neuro-QoL et NIH Toolbox, nous suivons l''approche de traduction universelle FACIT, produisant une seule version linguistique adaptée à plusieurs pays en faisant intervenir des experts cliniques de chaque région concernée lors de la revue.', 'published'),
  ((SELECT id FROM ns), 'faq.q6', 0, 'fr', 'Que fournit le clinicien à l''issue de la revue?', 'published'),
  ((SELECT id FROM ns), 'faq.a6', 0, 'fr', 'Vous recevez un rapport de revue documenté détaillant les modifications proposées et leur justification clinique, la traduction annotée ou révisée, ainsi qu''une piste d''audit complète adaptée à la soumission réglementaire.', 'published'),
  -- Quote
  ((SELECT id FROM ns), 'quote.title', 0, 'fr', 'Demander une soumission pour une revue par un clinicien', 'published'),
  ((SELECT id FROM ns), 'quote.subtitle', 0, 'fr', 'Décrivez votre instrument et vos langues cibles, et nous établirons la portée de la revue par un clinicien dans le cadre de votre validation linguistique.', 'published'),
  -- CTA
  ((SELECT id FROM ns), 'cta.title', 0, 'fr', 'Ajoutez la revue par un clinicien à votre validation', 'published'),
  ((SELECT id FROM ns), 'cta.subtitle', 0, 'fr', 'Faites appel à des cliniciens qualifiés du pays cible et gardez vos traductions de COA exactes sur le plan médical et prêtes pour la soumission.', 'published'),
  ((SELECT id FROM ns), 'cta.button_quote', 0, 'fr', 'Obtenir une soumission gratuite', 'published'),
  ((SELECT id FROM ns), 'cta.button_contact', 0, 'fr', 'Parler à un expert', 'published'),
  ((SELECT id FROM ns), 'cta.tagline', 0, 'fr', 'Revue par un clinicien selon l''ISPOR et PROMIS/FACIT dans plus de 150 langues.', 'published');
