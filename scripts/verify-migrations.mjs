#!/usr/bin/env node
/**
 * Post-migration smoke test: confirms tables, triggers, cron jobs, and
 * vault secrets are all in place for OCI + AI audit loops.
 */
import pg from 'pg'
import { readFileSync } from 'node:fs'

const PROJECT_REF = 'lmzoyezvsjgsxveoakdr'
const POOLER_HOST = 'aws-1-us-east-1.pooler.supabase.com'
const POOLER_PORT = 6543

function readEnv(key) {
  const c = readFileSync('.env.local', 'utf8')
  for (const line of c.split(/\r?\n/)) {
    const m = line.match(new RegExp(`^${key}[:=](.*)$`))
    if (m) return m[1].replace(/^["']|["']$/g, '').trim()
  }
  throw new Error(`${key} not found`)
}

const client = new pg.Client({
  host: POOLER_HOST,
  port: POOLER_PORT,
  database: 'postgres',
  user: `postgres.${PROJECT_REF}`,
  password: readEnv('SUPABASE_DATABASE_PASSWORD'),
  ssl: { rejectUnauthorized: false },
})

await client.connect()

const checks = [
  {
    name: 'Table: ads_offline_conversions',
    query: `SELECT count(*)::int AS n FROM ads_offline_conversions`,
  },
  {
    name: 'Table: audit_runs',
    query: `SELECT count(*)::int AS n FROM audit_runs`,
  },
  {
    name: 'Table: recommendations',
    query: `SELECT count(*)::int AS n FROM recommendations`,
  },
  {
    name: 'Settings: ai_audit_settings',
    query: `SELECT count(*)::int AS n FROM ai_audit_settings`,
  },
  {
    name: 'Trigger: orders.trg_orders_queue_ads_oc',
    query: `SELECT 1 FROM pg_trigger WHERE tgname = 'trg_orders_queue_ads_oc'`,
  },
  {
    name: 'Trigger: orders.trg_orders_copy_tracking',
    query: `SELECT 1 FROM pg_trigger WHERE tgname = 'trg_orders_copy_tracking'`,
  },
  {
    name: 'Cron jobs (expecting 3)',
    query: `SELECT jobname, schedule FROM cron.job WHERE jobname LIKE 'push-ads%' OR jobname LIKE 'ai-audit%' ORDER BY jobname`,
  },
  {
    name: 'Vault secrets (expecting 2)',
    query: `SELECT name FROM vault.secrets WHERE name IN ('push_ads_conversions_anon_key', 'ai_audit_anon_key') ORDER BY name`,
  },
  {
    name: 'Column: quotes.gclid exists',
    query: `SELECT 1 FROM information_schema.columns WHERE table_name='quotes' AND column_name='gclid'`,
  },
  {
    name: 'Column: orders.gclid exists',
    query: `SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='gclid'`,
  },
]

let pass = 0, fail = 0
for (const c of checks) {
  try {
    const r = await client.query(c.query)
    if (r.rowCount > 0) {
      console.log(`  ✓ ${c.name}`)
      if (c.name.startsWith('Cron jobs')) {
        for (const row of r.rows) console.log(`      - ${row.jobname}  [${row.schedule}]`)
      }
      if (c.name.startsWith('Vault secrets')) {
        for (const row of r.rows) console.log(`      - ${row.name}`)
      }
      pass++
    } else {
      console.log(`  ✗ ${c.name} — no rows`)
      fail++
    }
  } catch (e) {
    console.log(`  ✗ ${c.name} — ${e.message}`)
    fail++
  }
}
await client.end()
console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail === 0 ? 0 : 1)
