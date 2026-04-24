-- Follow-up notes on recommendations.
--
-- When a user disagrees with a rec or wants the AI to reconsider with new
-- context, they click "Follow-up" on the admin page, write notes, and submit.
-- The follow-up edge function passes original_evidence + note history to
-- Claude for a refined rewrite, and may mutate the recommendation's risk
-- tier / severity / action_payload / status accordingly.
--
-- Stored as an append-only JSONB array so the whole back-and-forth stays
-- visible on the rec page.

ALTER TABLE recommendations
  ADD COLUMN IF NOT EXISTS follow_ups JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS last_followup_at TIMESTAMPTZ;

COMMENT ON COLUMN recommendations.follow_ups IS
  'Append-only history of {note, refined_title, refined_summary_md, refined_impact, created_at, model} objects. Newest last.';
