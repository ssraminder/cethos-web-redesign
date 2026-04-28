#!/usr/bin/env node
/**
 * Full GSC + CWV audit for cethos.com using the google-integrations edge fn.
 *
 *   GSC search_analytics → top pages by impressions (28d)
 *   GSC inspect_url      → indexing + mobile usability
 *   PSI run              → Lighthouse perf score, lab CWV, opportunity audits
 *   CrUX query           → field LCP/INP/CLS p75 (URL + origin), if API enabled
 *
 * All API calls go through the edge function so server-side Google
 * credentials and quotas are used.
 */
import fs from "node:fs";
import path from "node:path";

const SUPABASE_URL = "https://lmzoyezvsjgsxveoakdr.supabase.co";
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SITE = "https://cethos.com/";
const ORIGIN = "https://cethos.com";
const FN_URL = `${SUPABASE_URL}/functions/v1/google-integrations`;

if (!ANON_KEY) { console.error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY"); process.exit(1); }

async function call(payload) {
  const res = await fetch(FN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let data; try { data = JSON.parse(text); } catch { data = text; }
  return { ok: res.ok, status: res.status, data };
}

const fmtDate = (d) => d.toISOString().slice(0, 10);

(async () => {
  const t0 = new Date().toISOString();
  console.log(`[audit] start ${t0}`);

  // 1. GSC search analytics — top pages
  const end = new Date();
  const start = new Date(end.getTime() - 28 * 24 * 60 * 60 * 1000);
  const sa = await call({
    platform: "gsc", action: "search_analytics",
    params: { site_url: SITE, start_date: fmtDate(start), end_date: fmtDate(end), dimensions: ["page"], row_limit: 100 },
  });
  const pages = (sa.data?.rows || []).map((r) => ({ url: r.keys[0], impressions: r.impressions, clicks: r.clicks, ctr: r.ctr, position: r.position }));
  console.log(`[audit] ${pages.length} pages from search analytics`);

  // 2. Pick canonical-ish cethos URLs, dedupe, top 12
  const seen = new Set();
  const targets = pages
    .filter((p) => /^https:\/\/cethos\.com\/[a-z0-9\-_/]*$/i.test(p.url))
    .filter((p) => { const k = p.url.replace(/\?.*$/, ""); if (seen.has(k)) return false; seen.add(k); return true; })
    .slice(0, 12);

  // 3. Per-URL inspection + PSI mobile + PSI desktop + CrUX
  const results = [];
  for (const p of targets) {
    console.log(`[audit] ${p.url}`);
    const insp = await call({ platform: "gsc", action: "inspect_url", params: { site_url: SITE, url: p.url } });
    const psiM = await call({ platform: "psi", action: "run", params: { url: p.url, strategy: "mobile" } });
    const psiD = await call({ platform: "psi", action: "run", params: { url: p.url, strategy: "desktop" } });
    const cruxM = await call({ platform: "crux", action: "query", params: { url: p.url, form_factor: "PHONE" } });
    const cruxD = await call({ platform: "crux", action: "query", params: { url: p.url, form_factor: "DESKTOP" } });
    results.push({ ...p, insp: insp.data, psiM: psiM.data, psiD: psiD.data, cruxM: cruxM.data, cruxD: cruxD.data });
  }

  // 4. Origin-level CrUX
  const originM = await call({ platform: "crux", action: "query", params: { origin: ORIGIN, form_factor: "PHONE" } });
  const originD = await call({ platform: "crux", action: "query", params: { origin: ORIGIN, form_factor: "DESKTOP" } });

  // Build report
  const L = [];
  L.push(`# CWV + GSC audit — cethos.com`);
  L.push(``);
  L.push(`Generated: ${t0}`);
  L.push(`Source: \`google-integrations\` edge fn (gsc + psi + crux).`);
  L.push(``);

  // Origin CrUX
  L.push(`## Origin-level CrUX (whole site, last 28d)`);
  L.push(``);
  const cruxRow = (data) => {
    if (!data?.record?.metrics) return { lcp: "—", inp: "—", cls: "—", overall: "no field data" };
    const m = data.record.metrics;
    const fmt = (k, isMs) => {
      const x = m[k];
      if (!x) return "—";
      const p75 = x.percentiles?.p75;
      const cat = (() => {
        if (!x.histogram) return "—";
        // Pick bin containing p75
        const bin = x.histogram.find((h) => p75 >= (h.start ?? 0) && p75 <= (h.end ?? Infinity));
        return bin?.density ? `${(bin.density * 100).toFixed(0)}% in this bin` : "—";
      })();
      return `${isMs ? p75 + " ms" : p75}`;
    };
    return { lcp: fmt("largest_contentful_paint", true), inp: fmt("interaction_to_next_paint", true), cls: fmt("cumulative_layout_shift", false) };
  };
  if (originM.status === 200 || originD.status === 200) {
    const om = cruxRow(originM.data); const od = cruxRow(originD.data);
    L.push(`| Metric | Mobile p75 | Desktop p75 | Threshold |`);
    L.push(`| --- | --- | --- | --- |`);
    L.push(`| LCP | ${om.lcp} | ${od.lcp} | ≤ 2500 ms = good |`);
    L.push(`| INP | ${om.inp} | ${od.inp} | ≤ 200 ms = good |`);
    L.push(`| CLS | ${om.cls} | ${od.cls} | ≤ 0.1 = good |`);
  } else {
    L.push(`CrUX API returned: mobile=${originM.status}, desktop=${originD.status}.`);
    if (originM.status === 403 || originD.status === 403) {
      L.push(``);
      L.push(`> **CrUX API not enabled.** Enable Chrome UX Report API in GCP: https://console.developers.google.com/apis/api/chromeuxreport.googleapis.com/overview?project=1011178347873 — then re-run.`);
    }
  }
  L.push(``);

  // Per-URL summary
  L.push(`## Per-URL summary`);
  L.push(``);
  L.push(`| URL | Impr | Pos | LH-Perf (m) | LCP-lab (m) | CLS-lab (m) | TBT (m) | LH-Perf (d) | Indexed |`);
  L.push(`| --- | --- | --- | --- | --- | --- | --- | --- | --- |`);
  for (const r of results) {
    const m = r.psiM || {}; const d = r.psiD || {};
    const lab = m.lab || {}; const labd = d.lab || {};
    const insp = r.insp?.inspectionResult?.indexStatusResult?.verdict || "?";
    const short = r.url.replace(ORIGIN, "");
    const score = (s) => s != null ? Math.round(s * 100) : "—";
    L.push(`| ${short} | ${r.impressions} | ${r.position?.toFixed(1)} | ${score(m.score)} | ${lab.lcp_ms ? lab.lcp_ms.toFixed(0) + " ms" : "—"} | ${lab.cls != null ? lab.cls.toFixed(3) : "—"} | ${lab.tbt_ms != null ? lab.tbt_ms.toFixed(0) + " ms" : "—"} | ${score(d.score)} | ${insp} |`);
  }
  L.push(``);

  // Detailed per-URL diagnostics
  L.push(`## Per-URL diagnostics`);
  L.push(``);
  for (const r of results) {
    L.push(`### ${r.url}`);
    L.push(``);
    L.push(`- Impressions: ${r.impressions} · clicks: ${r.clicks} · CTR: ${(r.ctr * 100).toFixed(2)}% · avg pos: ${r.position?.toFixed(1)}`);
    const insp = r.insp?.inspectionResult || {};
    if (insp.indexStatusResult) {
      const isr = insp.indexStatusResult;
      L.push(`- GSC: ${isr.verdict} · ${isr.coverageState} · last crawl ${isr.lastCrawlTime || "—"} · crawled as ${isr.crawledAs || "?"}`);
    }
    const m = r.psiM || {}; const d = r.psiD || {};
    if (m.lab) L.push(`- Lab (mobile): perf **${m.score != null ? Math.round(m.score * 100) : "?"}** · LCP ${m.lab.lcp_ms?.toFixed(0)} ms · CLS ${m.lab.cls?.toFixed(3)} · TBT ${m.lab.tbt_ms?.toFixed(0)} ms · TTFB ${m.lab.ttfb_ms?.toFixed(0)} ms · FCP ${m.lab.fcp_ms?.toFixed(0)} ms`);
    if (d.lab) L.push(`- Lab (desktop): perf **${d.score != null ? Math.round(d.score * 100) : "?"}** · LCP ${d.lab.lcp_ms?.toFixed(0)} ms · CLS ${d.lab.cls?.toFixed(3)} · TBT ${d.lab.tbt_ms?.toFixed(0)} ms`);
    if (m.flagged_audits?.length) {
      L.push(`- Mobile flagged audits:`);
      for (const a of m.flagged_audits) L.push(`  - ${a.title}${a.displayValue ? ` — ${a.displayValue}` : ""}${a.savings_ms > 100 ? ` (save ~${Math.round(a.savings_ms)} ms)` : ""}`);
    }
    L.push(``);
  }

  L.push(`## How CrUX field data fits in`);
  L.push(``);
  L.push(`Lab numbers above (PSI/Lighthouse) are from a single emulated run — they tell you how a page *can* perform on a clean device. GSC's CWV report uses **field** data from CrUX, which aggregates real Chrome user sessions over 28 days. Per-URL CrUX data only exists for pages with enough traffic; lower-traffic pages fall back to origin-level data (the "whole site" row at the top).`);
  L.push(``);

  const out = path.join(process.cwd(), `AUDIT_CWV_${Date.now()}.md`);
  fs.writeFileSync(out, L.join("\n"));
  console.log(`[audit] wrote ${out}`);
})();
