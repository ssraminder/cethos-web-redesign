-- Offline Conversion Import (OCI) to Google Ads
--
-- Captures Google click identifiers (gclid/gbraid/wbraid) + UTM params on the
-- quote record, propagates them to orders, and queues conversion upload rows
-- whenever an order is paid. A separate edge function (push-ads-conversions)
-- drains the queue and calls Google Ads ConversionUploadService.
--
-- Why this matters: GA4 `purchase` event only fires on ~10% of real sales
-- (most customers pay on Stripe Checkout and never land back on the thank-you
-- page that fires the event). Smart Bidding was optimizing against $370/mo of
-- visible revenue instead of $16,927/mo real revenue. Server-side OCI bypasses
-- the client-side loss entirely by pushing from the authoritative orders.paid_at.

-- ---------------------------------------------------------------------------
-- Column additions: quotes
-- ---------------------------------------------------------------------------

ALTER TABLE quotes
  ADD COLUMN IF NOT EXISTS gclid          TEXT,
  ADD COLUMN IF NOT EXISTS gbraid         TEXT,
  ADD COLUMN IF NOT EXISTS wbraid         TEXT,
  ADD COLUMN IF NOT EXISTS ad_click_time  TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS utm_source     TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium     TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign   TEXT,
  ADD COLUMN IF NOT EXISTS utm_content    TEXT,
  ADD COLUMN IF NOT EXISTS utm_term       TEXT;

CREATE INDEX IF NOT EXISTS idx_quotes_gclid ON quotes(gclid) WHERE gclid IS NOT NULL;

-- ---------------------------------------------------------------------------
-- Column additions: orders (mirrored from quotes for easier push queries)
-- ---------------------------------------------------------------------------

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS gclid          TEXT,
  ADD COLUMN IF NOT EXISTS gbraid         TEXT,
  ADD COLUMN IF NOT EXISTS wbraid         TEXT,
  ADD COLUMN IF NOT EXISTS ad_click_time  TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS utm_source     TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium     TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign   TEXT,
  ADD COLUMN IF NOT EXISTS utm_content    TEXT,
  ADD COLUMN IF NOT EXISTS utm_term       TEXT;

CREATE INDEX IF NOT EXISTS idx_orders_gclid ON orders(gclid) WHERE gclid IS NOT NULL;

-- ---------------------------------------------------------------------------
-- Queue table: ads_offline_conversions
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS ads_offline_conversions (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id                UUID REFERENCES orders(id) ON DELETE CASCADE,
  quote_id                UUID REFERENCES quotes(id) ON DELETE SET NULL,

  -- Click identifiers (one of these is required by Google Ads)
  gclid                   TEXT,
  gbraid                  TEXT,
  wbraid                  TEXT,

  -- Conversion payload for ConversionUploadService.UploadClickConversions
  customer_id             TEXT NOT NULL,            -- e.g. '6316159162'
  conversion_action       TEXT NOT NULL,            -- e.g. 'customers/6316159162/conversionActions/7586548300'
  conversion_date_time    TIMESTAMPTZ NOT NULL,
  conversion_value        NUMERIC(10,2) NOT NULL,
  currency_code           TEXT NOT NULL DEFAULT 'CAD',
  order_id_for_upload     TEXT,                     -- Google Ads' dedupe key: conversion.order_id (max 32 chars)

  -- Queue state
  status                  TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'uploaded', 'failed', 'skipped')),
  attempts                INT NOT NULL DEFAULT 0,
  uploaded_at             TIMESTAMPTZ,
  error_message           TEXT,
  last_attempt_at         TIMESTAMPTZ,

  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ads_oc_pending ON ads_offline_conversions(created_at) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_ads_oc_order   ON ads_offline_conversions(order_id);

COMMENT ON TABLE ads_offline_conversions IS
  'Queue of Google Ads offline conversions to upload. Populated by trigger on orders.paid_at, drained by push-ads-conversions edge function.';

-- ---------------------------------------------------------------------------
-- Trigger: propagate quote tracking fields → order on insert
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION copy_tracking_to_order() RETURNS TRIGGER AS $$
DECLARE
  q RECORD;
BEGIN
  IF NEW.quote_id IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT gclid, gbraid, wbraid, ad_click_time,
         utm_source, utm_medium, utm_campaign, utm_content, utm_term
    INTO q
    FROM quotes
    WHERE id = NEW.quote_id;

  IF FOUND THEN
    NEW.gclid         := COALESCE(NEW.gclid, q.gclid);
    NEW.gbraid        := COALESCE(NEW.gbraid, q.gbraid);
    NEW.wbraid        := COALESCE(NEW.wbraid, q.wbraid);
    NEW.ad_click_time := COALESCE(NEW.ad_click_time, q.ad_click_time);
    NEW.utm_source    := COALESCE(NEW.utm_source, q.utm_source);
    NEW.utm_medium    := COALESCE(NEW.utm_medium, q.utm_medium);
    NEW.utm_campaign  := COALESCE(NEW.utm_campaign, q.utm_campaign);
    NEW.utm_content   := COALESCE(NEW.utm_content, q.utm_content);
    NEW.utm_term      := COALESCE(NEW.utm_term, q.utm_term);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_orders_copy_tracking ON orders;
CREATE TRIGGER trg_orders_copy_tracking
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION copy_tracking_to_order();

-- ---------------------------------------------------------------------------
-- Trigger: queue an OCI upload when an order becomes paid
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION queue_ads_offline_conversion() RETURNS TRIGGER AS $$
DECLARE
  conv_time    TIMESTAMPTZ;
  conv_value   NUMERIC(10,2);
  has_click_id BOOLEAN;
BEGIN
  -- Only fire on paid_at transition from NULL → timestamp
  IF NEW.paid_at IS NULL OR OLD.paid_at IS NOT NULL THEN
    RETURN NEW;
  END IF;

  has_click_id := (NEW.gclid IS NOT NULL OR NEW.gbraid IS NOT NULL OR NEW.wbraid IS NOT NULL);

  -- No click id → we can't attribute to Google Ads; skip queuing
  IF NOT has_click_id THEN
    RETURN NEW;
  END IF;

  conv_time  := NEW.paid_at;
  conv_value := COALESCE(NEW.total_amount_cad, NEW.total_amount, 0);

  -- Google Ads rejects $0 conversions; skip
  IF conv_value <= 0 THEN
    RETURN NEW;
  END IF;

  INSERT INTO ads_offline_conversions (
    order_id, quote_id,
    gclid, gbraid, wbraid,
    customer_id, conversion_action,
    conversion_date_time, conversion_value, currency_code,
    order_id_for_upload
  ) VALUES (
    NEW.id, NEW.quote_id,
    NEW.gclid, NEW.gbraid, NEW.wbraid,
    '6316159162',
    'customers/6316159162/conversionActions/7586548300',
    conv_time, conv_value, COALESCE(NEW.currency, 'CAD'),
    COALESCE(NEW.order_number, NEW.id::text)
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_orders_queue_ads_oc ON orders;
CREATE TRIGGER trg_orders_queue_ads_oc
  AFTER UPDATE OF paid_at ON orders
  FOR EACH ROW
  EXECUTE FUNCTION queue_ads_offline_conversion();

-- ---------------------------------------------------------------------------
-- Backfill: queue historical paid orders with a captured gclid (if any).
-- Safe no-op today because gclid column was just added and is all-NULL.
-- Kept here as documentation of the backfill shape for future reuse.
-- ---------------------------------------------------------------------------

-- INSERT INTO ads_offline_conversions (order_id, quote_id, gclid, customer_id,
--   conversion_action, conversion_date_time, conversion_value, currency_code, order_id_for_upload)
-- SELECT id, quote_id, gclid, '6316159162',
--   'customers/6316159162/conversionActions/7586548300',
--   paid_at, COALESCE(total_amount_cad, total_amount), COALESCE(currency, 'CAD'),
--   COALESCE(order_number, id::text)
-- FROM orders
-- WHERE paid_at IS NOT NULL AND gclid IS NOT NULL
--   AND NOT EXISTS (SELECT 1 FROM ads_offline_conversions c WHERE c.order_id = orders.id);
