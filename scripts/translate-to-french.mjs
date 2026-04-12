#!/usr/bin/env node
/**
 * Translate ONE namespace of English i18n translations to French using Claude API.
 * Designed to be run by cron — each invocation picks the next untranslated namespace.
 * Reads Supabase creds from .env.local, uses CLAUDE_CODE_OAUTH_TOKEN for AI.
 * Inserts French translations as 'draft' status.
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '..', '.env.local');

// Parse .env.local
const envContent = readFileSync(envPath, 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
}

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_KEY;
const ANTHROPIC_KEY = process.env.CLAUDE_CODE_OAUTH_TOKEN || process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_BASE = process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}
if (!ANTHROPIC_KEY) {
  console.error('Missing ANTHROPIC_API_KEY or CLAUDE_CODE_OAUTH_TOKEN');
  process.exit(1);
}

// --- Supabase REST helpers ---
async function supabaseGet(table, params = {}) {
  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase GET ${table}: ${res.status} ${text}`);
  }
  return res.json();
}

async function supabasePost(table, rows) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase POST ${table}: ${res.status} ${text}`);
  }
}

// --- Claude API translation ---
async function translateBatch(texts, retries = 3) {
  const numbered = texts.map((t, i) => `[${i}] ${t}`).join('\n');

  const body = {
    model: 'claude-3-haiku-20240307',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: `You are a professional English-to-French translator for a translation company website (Cethos Solutions). Translate the following numbered texts from English to French.

RULES:
- Maintain the same tone (professional, business-oriented)
- Keep HTML tags unchanged (e.g., <strong>, <br/>, <span>)
- Keep brand names unchanged: "Cethos", "Cethos Solutions", "IRCC", "IQAS", "WES", "ISO", etc.
- Keep technical terms that are commonly used in English in French contexts
- Use Canadian French where applicable
- Do NOT translate placeholders like {count}, {name}, etc.
- Output ONLY the translations in the EXACT same numbered format: [0] translation\\n[1] translation\\n...
- Do NOT add any commentary or explanations

${numbered}`,
      },
    ],
  };

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const res = await fetch(`${ANTHROPIC_BASE}/v1/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errText = await res.text();
        if (res.status === 429 || res.status === 529) {
          console.log(`  Rate limited, waiting 30s... (attempt ${attempt + 1})`);
          await new Promise((r) => setTimeout(r, 30000));
          continue;
        }
        throw new Error(`Anthropic API: ${res.status} ${errText}`);
      }

      const data = await res.json();
      const content = data.content[0]?.text || '';

      const translations = [];
      const lines = content.split('\n');
      for (const line of lines) {
        const match = line.match(/^\[(\d+)\]\s*(.+)$/);
        if (match) {
          translations[parseInt(match[1])] = match[2];
        }
      }

      if (translations.filter(Boolean).length >= texts.length * 0.8) {
        for (let i = 0; i < texts.length; i++) {
          if (!translations[i]) translations[i] = texts[i];
        }
        return translations.slice(0, texts.length);
      }

      console.log(`  Incomplete response (got ${translations.filter(Boolean).length}/${texts.length}), retrying...`);
    } catch (err) {
      console.error(`  Error: ${err.message}`);
      if (attempt < retries - 1) {
        await new Promise((r) => setTimeout(r, 5000));
      }
    }
  }

  console.warn(`  WARNING: Could not translate batch, using English as fallback`);
  return texts;
}

// --- Main: translate ONE namespace ---
async function main() {
  // 1. Get all namespaces
  const namespaces = await supabaseGet('cethosweb_i18n_namespaces', {
    select: 'id,name',
    order: 'name',
  });
  console.log(`Total namespaces: ${namespaces.length}`);

  // 2. For each namespace, check if it has untranslated EN keys missing FR
  let targetNs = null;
  let enRows = [];

  for (const ns of namespaces) {
    // Get EN keys for this namespace
    const enKeys = await supabaseGet('cethosweb_i18n_translations', {
      select: 'id,namespace_id,key,segment_index,value',
      namespace_id: `eq.${ns.id}`,
      locale: 'eq.en',
      order: 'key,segment_index',
      limit: '500',
    });

    if (enKeys.length === 0) continue;

    // Get existing FR keys for this namespace
    const frKeys = await supabaseGet('cethosweb_i18n_translations', {
      select: 'key,segment_index',
      namespace_id: `eq.${ns.id}`,
      locale: 'eq.fr',
      limit: '500',
    });

    const frSet = new Set(frKeys.map((r) => `${r.key}|${r.segment_index}`));
    const missing = enKeys.filter((r) => !frSet.has(`${r.key}|${r.segment_index}`));

    if (missing.length > 0) {
      targetNs = ns;
      enRows = missing;
      break;
    }
  }

  if (!targetNs) {
    console.log('\n✅ ALL NAMESPACES FULLY TRANSLATED! Nothing to do.');
    return;
  }

  console.log(`\n📝 Translating namespace: ${targetNs.name} (${enRows.length} strings)`);

  // 3. Translate in batches of 30
  const BATCH_SIZE = 30;
  let translated = 0;

  for (let i = 0; i < enRows.length; i += BATCH_SIZE) {
    const batch = enRows.slice(i, i + BATCH_SIZE);
    const texts = batch.map((r) => r.value);

    console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(enRows.length / BATCH_SIZE)} (${batch.length} items)...`);

    const frenchTexts = await translateBatch(texts);

    const upsertRows = batch.map((r, idx) => ({
      namespace_id: r.namespace_id,
      key: r.key,
      segment_index: r.segment_index,
      locale: 'fr',
      value: frenchTexts[idx],
      status: 'draft',
    }));

    await supabasePost('cethosweb_i18n_translations', upsertRows);
    translated += batch.length;
    console.log(`    ✓ ${translated}/${enRows.length}`);

    if (i + BATCH_SIZE < enRows.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  // 4. Summary
  const totalFr = await supabaseGet('cethosweb_i18n_translations', {
    select: 'id',
    locale: 'eq.fr',
    limit: '1',
    // Use head to get count
  });

  console.log(`\n✅ Done: ${targetNs.name} — ${translated} strings translated`);
  console.log(`📊 Progress: check admin dashboard for full stats`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
