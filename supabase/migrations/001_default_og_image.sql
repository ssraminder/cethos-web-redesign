-- Insert default OG image setting into cethosweb_settings
-- Run this against your Supabase project: lmzoyezvsjgsxveoakdr

INSERT INTO cethosweb_settings (key, value)
VALUES (
  'default_og_image',
  'https://cethos.com/images/og-default.jpg'
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
