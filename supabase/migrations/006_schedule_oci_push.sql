-- Schedule the OCI push to run every 15 minutes via pg_cron + pg_net.
--
-- Depends on extensions: pg_cron, pg_net (must be enabled in the Supabase
-- project's Extensions panel or via `create extension if not exists` below).
-- Depends on Vault secret `push_ads_conversions_anon_key` being set (see
-- deployment notes below the job definition).

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Unschedule any prior job with this name so re-running the migration is idempotent.
DO $$
DECLARE job_id BIGINT;
BEGIN
  SELECT jobid INTO job_id FROM cron.job WHERE jobname = 'push-ads-conversions-every-15min';
  IF job_id IS NOT NULL THEN
    PERFORM cron.unschedule(job_id);
  END IF;
END $$;

-- Schedule the edge-function invocation.
-- SETUP REQUIRED (run once in SQL editor before this migration, or the job will 401):
--   select vault.create_secret('<anon-key-value>', 'push_ads_conversions_anon_key',
--     'Anon key used by the pg_cron job to invoke the push-ads-conversions edge function');
SELECT cron.schedule(
  'push-ads-conversions-every-15min',
  '*/15 * * * *',
  $$
  select net.http_post(
    url := 'https://lmzoyezvsjgsxveoakdr.supabase.co/functions/v1/push-ads-conversions',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'push_ads_conversions_anon_key')
    ),
    body := '{}'::jsonb
  );
  $$
);
