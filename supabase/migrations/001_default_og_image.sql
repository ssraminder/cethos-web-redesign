-- Insert default OG image setting into cethosweb_settings
-- Run this against your Supabase project: lmzoyezvsjgsxveoakdr

INSERT INTO cethosweb_settings (key, value)
VALUES (
  'default_og_image',
  'https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/og-image-cethos.jpg'
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
