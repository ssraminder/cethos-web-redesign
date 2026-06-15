-- Seed: Life Sciences - Therapeutic Areas supporting page i18n content
-- Namespace: lifesciences.therapeutic-areas (+ one link key on lifesciences.index)
-- Re-runnable: namespace ON CONFLICT (name) DO NOTHING; translations DO UPDATE.

-- STEP 1: namespace -----------------------------------------------------------
insert into cethosweb_i18n_namespaces (name, description, page_path, sort_order)
values ('lifesciences.therapeutic-areas','Life Sciences - Therapeutic Areas page','/services/lifesciences/therapeutic-areas',430)
on conflict (name) do nothing;

-- STEP 2: translations (locale='en', status='published') ----------------------
insert into cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
select n.id, v.k, 0, 'en', v.val, 'published'
from (values
  ('hero_breadcrumb_current',$q$Therapeutic Areas$q$),
  ('hero_badge',$q$Life Sciences Expertise$q$),
  ('hero_heading',$q$Therapeutic Areas We Cover$q$),
  ('hero_description',$q$Our linguists, cognitive debriefing moderators, and clinician reviewers bring deep subject-matter expertise across 25+ therapeutic areas - from oncology and rare diseases to neuroscience, cardiology, and vaccines.$q$),
  ('hero_cta_primary',$q$Request Enterprise Quote$q$),
  ('hero_cta_secondary',$q$Speak to a Specialist$q$),
  ('intro_heading',$q$Specialized Expertise Where It Matters Most$q$),
  ('intro_p1',$q$Clinical and regulatory translation demands more than language fluency. It requires linguists who understand disease mechanisms, endpoints, and the regulatory expectations of each therapeutic area.$q$),
  ('intro_p2',$q$Cethos matches every project to qualified, GCP-trained linguists and clinician reviewers with relevant clinical experience - so your protocols, COA instruments, and submissions are accurate, consistent, and ready for review.$q$),
  ('stat1_value',$q$25+$q$),
  ('stat1_label',$q$Therapeutic areas$q$),
  ('stat2_value',$q$1,000+$q$),
  ('stat2_label',$q$Debriefing moderators$q$),
  ('stat3_value',$q$300+$q$),
  ('stat3_label',$q$Clinician reviewers$q$),
  ('stat4_value',$q$200+$q$),
  ('stat4_label',$q$Languages$q$),
  ('areas_heading',$q$Areas of Specialization$q$),
  ('areas_description',$q$A representative view of the therapeutic areas our clinical and regulatory teams support.$q$),
  ('cta_heading',$q$Need expertise in your therapeutic area?$q$),
  ('cta_description',$q$Tell us about your study or submission and we will match the right specialist linguists and clinician reviewers to your program.$q$),
  ('cta_primary',$q$Request Enterprise Quote$q$),
  ('cta_secondary',$q$Contact Our Life Sciences Team$q$)
) as v(k, val)
join cethosweb_i18n_namespaces n on n.name = 'lifesciences.therapeutic-areas'
on conflict (namespace_id, key, segment_index, locale) do update set value=excluded.value, status='published', updated_at=now();

-- STEP 3: hub link key (on lifesciences.index) --------------------------------
insert into cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
select n.id, 'therapeutic_areas_link', 0, 'en', 'Explore the 25+ therapeutic areas we cover', 'published'
from cethosweb_i18n_namespaces n where n.name='lifesciences.index'
on conflict (namespace_id, key, segment_index, locale) do update set value=excluded.value, status='published', updated_at=now();
