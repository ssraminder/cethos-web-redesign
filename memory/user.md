# User

Primary user of this codebase: who they are, their role, what they're responsible for, and what helps you collaborate well with them.

## Identity
- **Name:** Raminder Shah
- **GitHub:** ssraminder
- **Email:** ss.raminder@gmail.com
- **Company:** Cethos Translation Services (cethos.com) — HQ Calgary, AB

## Role & responsibilities
- Owner/operator of Cethos Translation Services. Operates two Google Ads accounts: `cethos_solutions` (6316159162) and `cethos_inc` (5680605007).
- Owns marketing strategy and budget — actively monitors PPC spend, competitor positioning, organic SEO. Reads Google Ads, SpyFu, BrightLocal, GA4, GSC, and PostHog data directly.
- Treats this codebase as both the public site AND the operational marketing engine: edge functions in `supabase/functions/` connect Google Ads, GBP, GA4, GSC, SpyFu, BrightLocal, PostHog, and run weekly audits (`audit-cethos-health`).

## Domain knowledge
- Strong on PPC fundamentals (CPC, Quality Score, conversion attribution) — comes to sessions with specific competitor benchmarks ("competitors are paying $4 CPC for certified translators") rather than generic asks.
- Knows the translation industry deeply — IRCC certification requirements, CTTIC/ATIO, immigration document workflows.
- Comfortable with the codebase architecture — knows there are edge functions, knows Supabase is the backend.

## Working style
- **Auto mode** is his default: wants execution, not deliberation. When he says "do X", do it — don't propose a 3-option plan.
- **Research-first**: asks Claude to query existing pages/data BEFORE recommending changes. He caught me recommending "create new landing pages" when 20+ already existed. Always inventory first.
- Concise updates preferred. State the finding, the action, and what's next — no recap paragraphs.

## Active focus
- 2026-05: Bringing Google Ads CPC down for translation keywords (current $9-18, target ~$4 competitor benchmark). Root cause identified: all translation ads point to one generic URL despite 20+ specific landing pages existing. Mid-implementation of keyword-level Final URL remapping via Google Ads API.
