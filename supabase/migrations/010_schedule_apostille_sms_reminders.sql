-- Schedule the apostille-consult-sms-reminders edge function on a 15-minute
-- cron tick via pg_cron + pg_net. The function selects bookings with
-- start_time ~2h out and sends a Twilio SMS reminder with a Cal.com cancel
-- link, then marks service_data.cal_booking.sms_reminded_at on the lead row
-- to prevent double-sends.
--
-- Depends on extensions: pg_cron, pg_net (already present from migration 006).
-- Depends on Vault secret `apostille_sms_reminder_anon_key` (anon key) being
-- set so the cron job can authenticate to the function.

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Idempotent unschedule.
DO $$
DECLARE job_id BIGINT;
BEGIN
  SELECT jobid INTO job_id FROM cron.job WHERE jobname = 'apostille-consult-sms-reminders-every-15min';
  IF job_id IS NOT NULL THEN
    PERFORM cron.unschedule(job_id);
  END IF;
END $$;

-- SETUP REQUIRED (run once in SQL editor before this migration, or the job
-- will 401):
--   select vault.create_secret('<anon-key-value>', 'apostille_sms_reminder_anon_key',
--     'Anon key used by pg_cron to invoke apostille-consult-sms-reminders');
SELECT cron.schedule(
  'apostille-consult-sms-reminders-every-15min',
  '*/15 * * * *',
  $$
  select net.http_post(
    url := 'https://lmzoyezvsjgsxveoakdr.supabase.co/functions/v1/apostille-consult-sms-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'apostille_sms_reminder_anon_key')
    ),
    body := '{}'::jsonb
  );
  $$
);
