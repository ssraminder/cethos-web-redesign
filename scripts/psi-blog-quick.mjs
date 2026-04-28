#!/usr/bin/env node
/**
 * Quick targeted PSI run on the blog routes via the google-integrations
 * edge function. Used to measure the BlogImage `sizes` fix delta.
 */
const SUPABASE_URL = 'https://lmzoyezvsjgsxveoakdr.supabase.co';
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const FN_URL = `${SUPABASE_URL}/functions/v1/google-integrations`;

if (!ANON_KEY) { console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY'); process.exit(1); }

const URLS = [
  'https://cethos.com/blog',
  'https://cethos.com/blog/cultural-adaptation-video-game-localization',
  'https://cethos.com/blog/future-real-time-translation-technology-2024',
];

async function call(payload) {
  const res = await fetch(FN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
    body: JSON.stringify(payload),
  });
  return res.json();
}

(async () => {
  for (const url of URLS) {
    const m = await call({ platform: 'psi', action: 'run', params: { url, strategy: 'mobile' } });
    const lab = m?.lab || {};
    console.log(`${url}`);
    console.log(`  perf=${m?.score != null ? Math.round(m.score * 100) : '?'}  LCP=${lab.lcp_ms?.toFixed(0)}ms  TBT=${lab.tbt_ms?.toFixed(0)}ms  TTFB=${lab.ttfb_ms?.toFixed(0)}ms`);
    const big = (m?.flagged_audits || []).find(a => a.id === 'total-byte-weight');
    if (big) console.log(`  payload: ${big.displayValue}`);
  }
})();
