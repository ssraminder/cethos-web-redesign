-- 009_audit_daily_full.sql
--
-- Add a daily full-audit cron alongside the existing weekly (Monday) and the
-- daily alerts-only check.
--
-- Schedule:
--   ai-audit-daily         06:30 UTC every day  → full audit (all 12 checks +
--                                                   Performance Snapshot digest)
--   ai-audit-weekly        08:00 UTC Monday     → unchanged (set in 007)
--   ai-audit-alert-check   06:00 UTC every day  → unchanged (set in 007)
--
-- Why three? The 06:00 alerts-only run is fast (2 checks) and surfaces
-- urgent regressions like CPA spikes or zero-conversion droughts within
-- 30 min of the cron firing. The 06:30 full daily runs the deeper checks
-- (wasted spend, lost rankings, reviews, etc.) plus the full Performance
-- Snapshot. Mondays will still get the 08:00 weekly digest as well — that's
-- intentional for now; recommendations dedupe so users don't see
-- duplicates, but Monday morning gets reinforcement.
--
-- Idempotent: drops any prior copy of ai-audit-daily before scheduling.

DO $$
DECLARE
  j BIGINT;
BEGIN
  FOR j IN SELECT jobid FROM cron.job WHERE jobname = 'ai-audit-daily' LOOP
    PERFORM cron.unschedule(j);
  END LOOP;
END;
$$;

SELECT cron.schedule(
  'ai-audit-daily',
  '30 6 * * *',  -- daily 06:30 UTC
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
