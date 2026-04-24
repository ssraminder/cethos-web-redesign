-- AI-assisted health check + approval loop for cethos.com
--
-- Architecture:
--   1. Weekly cron triggers `audit-cethos-health` edge function
--   2. Function runs deterministic checks against Ads/GSC/GA4/GBP APIs
--   3. Each finding becomes a row in `recommendations` with a proposed change
--   4. Low-risk recs auto-execute inline; medium/high wait for review
--   5. Email digest sent to recipients; deeplink to /admin/ai-recommendations
--   6. On approve, `execute-recommendation` routes to Ads API / GBP API / GitHub Contents API

-- ---------------------------------------------------------------------------
-- Audit runs (one row per scheduled/manual invocation)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS audit_runs (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at             TIMESTAMPTZ,
  status                   TEXT NOT NULL DEFAULT 'running'
    CHECK (status IN ('running', 'completed', 'failed', 'partial')),
  trigger                  TEXT NOT NULL DEFAULT 'cron'
    CHECK (trigger IN ('cron', 'manual', 'alert', 'test')),
  checks_run               INT NOT NULL DEFAULT 0,
  checks_passed            INT NOT NULL DEFAULT 0,
  checks_failed            INT NOT NULL DEFAULT 0,
  recommendations_created  INT NOT NULL DEFAULT 0,
  auto_executed_count      INT NOT NULL DEFAULT 0,
  executive_summary_md     TEXT,
  error_message            TEXT,
  metadata                 JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_audit_runs_started ON audit_runs(started_at DESC);

-- ---------------------------------------------------------------------------
-- Recommendations (pending review or auto-executed)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS recommendations (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_run_id       UUID REFERENCES audit_runs(id) ON DELETE SET NULL,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Classification
  check_id           TEXT NOT NULL,              -- e.g. 'wasted_spend_keyword', 'high_imp_low_ctr'
  category           TEXT NOT NULL               -- ads_keyword | ads_negative | ads_bid | seo_meta | seo_sitemap | gbp_profile | gbp_reply | site_code
                       CHECK (category IN ('ads_keyword', 'ads_negative', 'ads_bid', 'ads_budget',
                                           'seo_meta', 'seo_sitemap', 'seo_jsonld',
                                           'gbp_profile', 'gbp_reply', 'gbp_post',
                                           'site_code')),
  risk_tier          TEXT NOT NULL CHECK (risk_tier IN ('low', 'medium', 'high')),
  severity           TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),

  -- Human-facing content (AI-written)
  title              TEXT NOT NULL,
  summary_md         TEXT NOT NULL,
  expected_impact    TEXT,

  -- Raw evidence supporting the rec
  evidence           JSONB NOT NULL,

  -- The actual change to apply on approval
  action_type        TEXT NOT NULL
                       CHECK (action_type IN ('ads_mutate', 'gbp_update', 'gbp_reply',
                                              'github_commit', 'manual')),
  action_payload     JSONB NOT NULL,             -- API call shape; executor knows how to read

  -- Dedupe key: if a check would emit the same recommendation it did last run,
  -- we bump `last_seen_at` instead of creating a duplicate.
  dedupe_key         TEXT,

  -- State machine
  status             TEXT NOT NULL DEFAULT 'pending'
                       CHECK (status IN ('pending', 'approved', 'rejected', 'executed',
                                         'failed', 'expired', 'superseded', 'auto_executed')),
  reviewed_by        TEXT,                       -- email of reviewer
  reviewed_at        TIMESTAMPTZ,
  executed_at        TIMESTAMPTZ,
  execution_result   JSONB,
  failure_count      INT NOT NULL DEFAULT 0,

  last_seen_at       TIMESTAMPTZ DEFAULT now(),  -- bumped on dedupe hit
  expires_at         TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '14 days')
);

CREATE INDEX IF NOT EXISTS idx_rec_pending ON recommendations(created_at DESC) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_rec_status ON recommendations(status, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_rec_dedupe
  ON recommendations(dedupe_key)
  WHERE status IN ('pending', 'approved') AND dedupe_key IS NOT NULL;

-- ---------------------------------------------------------------------------
-- Settings for the audit loop (merged into the existing app_settings if any)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ai_audit_settings (
  key    TEXT PRIMARY KEY,
  value  JSONB NOT NULL,
  notes  TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO ai_audit_settings (key, value, notes) VALUES
  ('enabled',                    'true'::jsonb,
     'Master kill-switch. When false, the cron still runs but writes nothing.'),
  ('auto_execute_low_risk',      'true'::jsonb,
     'Low-risk recs apply immediately without human review.'),
  ('auto_execute_medium_risk',   'false'::jsonb,
     'Medium-risk recs auto-execute too. Default off — user clicks Approve.'),
  ('digest_recipients',          '["raminder@cethos.com", "ss.raminder@gmail.com"]'::jsonb,
     'Email recipients for the weekly digest + alerts.'),
  ('alert_cpa_spike_multiplier', '1.5'::jsonb,
     'Trigger alert when 7d CPA > 30d CPA × this value.'),
  ('alert_indexing_drop_pct',    '10'::jsonb,
     'Trigger alert when indexed page count drops this % week-over-week.'),
  ('alert_conversion_drought_h', '72'::jsonb,
     'Trigger alert if primary conversion action has zero hits for this many hours.'),
  ('github_owner',               '"ssraminder"'::jsonb,
     'GitHub owner for code-change commits.'),
  ('github_repo',                '"cethos-web-redesign"'::jsonb,
     'GitHub repo for code-change commits.'),
  ('github_branch',              '"main"'::jsonb,
     'Target branch for auto-commits. Netlify auto-deploys from this.'),
  ('claude_narrative_model',     '"claude-haiku-4-5-20251001"'::jsonb,
     'Model used for per-recommendation narrative writing.'),
  ('claude_summary_model',       '"claude-sonnet-4-6"'::jsonb,
     'Model used for the executive summary in the digest email.')
ON CONFLICT (key) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Helper: upsert a recommendation by dedupe_key (bumps last_seen_at if exists)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION upsert_recommendation(
  p_audit_run_id UUID,
  p_check_id TEXT,
  p_category TEXT,
  p_risk_tier TEXT,
  p_severity TEXT,
  p_title TEXT,
  p_summary_md TEXT,
  p_expected_impact TEXT,
  p_evidence JSONB,
  p_action_type TEXT,
  p_action_payload JSONB,
  p_dedupe_key TEXT
) RETURNS UUID AS $$
DECLARE
  rec_id UUID;
BEGIN
  IF p_dedupe_key IS NOT NULL THEN
    UPDATE recommendations
      SET last_seen_at = now(),
          evidence = p_evidence,
          summary_md = p_summary_md,
          expected_impact = p_expected_impact
      WHERE dedupe_key = p_dedupe_key
        AND status IN ('pending', 'approved')
      RETURNING id INTO rec_id;
    IF rec_id IS NOT NULL THEN
      RETURN rec_id;
    END IF;
  END IF;

  INSERT INTO recommendations (
    audit_run_id, check_id, category, risk_tier, severity,
    title, summary_md, expected_impact, evidence,
    action_type, action_payload, dedupe_key
  ) VALUES (
    p_audit_run_id, p_check_id, p_category, p_risk_tier, p_severity,
    p_title, p_summary_md, p_expected_impact, p_evidence,
    p_action_type, p_action_payload, p_dedupe_key
  ) RETURNING id INTO rec_id;

  RETURN rec_id;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------------------------
-- Weekly schedule (Mondays 8am UTC = 4am ET / 1am PT) + daily alert check (6am UTC)
-- ---------------------------------------------------------------------------
-- NOTE: requires vault secret `ai_audit_anon_key` already set (see deployment notes).
-- Also pg_cron + pg_net extensions (already enabled by migration 006).

-- Unschedule any prior jobs with these names (idempotent re-run)
DO $$
DECLARE
  j BIGINT;
BEGIN
  FOR j IN SELECT jobid FROM cron.job WHERE jobname IN ('ai-audit-weekly', 'ai-audit-alert-check') LOOP
    PERFORM cron.unschedule(j);
  END LOOP;
END $$;

SELECT cron.schedule(
  'ai-audit-weekly',
  '0 8 * * 1',  -- Monday 8:00 UTC
  $$
  select net.http_post(
    url := 'https://lmzoyezvsjgsxveoakdr.supabase.co/functions/v1/audit-cethos-health',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'ai_audit_anon_key')
    ),
    body := '{"trigger":"cron"}'::jsonb
  );
  $$
);

SELECT cron.schedule(
  'ai-audit-alert-check',
  '0 6 * * *',  -- daily 6:00 UTC
  $$
  select net.http_post(
    url := 'https://lmzoyezvsjgsxveoakdr.supabase.co/functions/v1/audit-cethos-health',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'ai_audit_anon_key')
    ),
    body := '{"trigger":"alert","checks_only":"alerts"}'::jsonb
  );
  $$
);
