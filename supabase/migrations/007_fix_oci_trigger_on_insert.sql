-- Fix OCI queue trigger to fire on INSERT, not just UPDATE
--
-- Why: Orders are inserted with `paid_at` already populated (created_at and
-- paid_at within milliseconds of each other) by the customer-facing
-- stripe-webhook edge function and the staff admin-create-order /
-- crm-create-order edge functions. The previous trigger only fired on
-- `AFTER UPDATE OF paid_at`, so it never saw these inserts and never queued
-- conversions for upload to Google Ads.
--
-- Result: $502.33 of ad-attributed paid orders (5 conversions, 2026-04-25 →
-- 2026-05-03) sat in the orders table but were never pushed to OCI. Smart
-- Bidding optimized blind for that window.
--
-- Fix: Trigger now fires on AFTER INSERT OR UPDATE OF paid_at, with explicit
-- TG_OP-aware logic so INSERT and UPDATE paths are both safe.

-- ---------------------------------------------------------------------------
-- Update function to handle both INSERT and UPDATE
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION queue_ads_offline_conversion() RETURNS TRIGGER AS $$
DECLARE
  conv_time    TIMESTAMPTZ;
  conv_value   NUMERIC(10,2);
  has_click_id BOOLEAN;
BEGIN
  -- Skip if paid_at not set
  IF NEW.paid_at IS NULL THEN
    RETURN NEW;
  END IF;

  -- For UPDATE, only fire on transition from NULL → timestamp
  -- (OLD is NULL on INSERT, so this check is skipped for inserts)
  IF TG_OP = 'UPDATE' AND OLD.paid_at IS NOT NULL THEN
    RETURN NEW;
  END IF;

  has_click_id := (NEW.gclid IS NOT NULL OR NEW.gbraid IS NOT NULL OR NEW.wbraid IS NOT NULL);

  -- No click id → can't attribute to Google Ads; skip queuing
  IF NOT has_click_id THEN
    RETURN NEW;
  END IF;

  conv_time  := NEW.paid_at;
  conv_value := COALESCE(NEW.total_amount_cad, NEW.total_amount, 0);

  -- Google Ads rejects $0 conversions; skip
  IF conv_value <= 0 THEN
    RETURN NEW;
  END IF;

  -- Idempotency: don't double-queue if a row already exists for this order
  IF EXISTS (SELECT 1 FROM ads_offline_conversions WHERE order_id = NEW.id) THEN
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

-- ---------------------------------------------------------------------------
-- Recreate trigger to fire on both INSERT and UPDATE
-- ---------------------------------------------------------------------------

DROP TRIGGER IF EXISTS trg_orders_queue_ads_oc ON orders;
CREATE TRIGGER trg_orders_queue_ads_oc
  AFTER INSERT OR UPDATE OF paid_at ON orders
  FOR EACH ROW
  EXECUTE FUNCTION queue_ads_offline_conversion();

-- ---------------------------------------------------------------------------
-- Backfill historic paid orders that should have been queued
-- ---------------------------------------------------------------------------

INSERT INTO ads_offline_conversions (
  order_id, quote_id,
  gclid, gbraid, wbraid,
  customer_id, conversion_action,
  conversion_date_time, conversion_value, currency_code,
  order_id_for_upload
)
SELECT
  o.id, o.quote_id,
  o.gclid, o.gbraid, o.wbraid,
  '6316159162',
  'customers/6316159162/conversionActions/7586548300',
  o.paid_at,
  COALESCE(o.total_amount_cad, o.total_amount, 0),
  COALESCE(o.currency, 'CAD'),
  COALESCE(o.order_number, o.id::text)
FROM orders o
WHERE o.paid_at IS NOT NULL
  AND (o.gclid IS NOT NULL OR o.gbraid IS NOT NULL OR o.wbraid IS NOT NULL)
  AND COALESCE(o.total_amount_cad, o.total_amount, 0) > 0
  AND NOT EXISTS (SELECT 1 FROM ads_offline_conversions a WHERE a.order_id = o.id);
