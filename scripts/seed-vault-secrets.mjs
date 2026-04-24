#!/usr/bin/env node
/**
 * Seeds the Supabase Vault with the anon key that pg_cron jobs use to
 * invoke edge functions (via pg_net.http_post). Idempotent — upserts.
 *
 * Reads NEXT_PUBLIC_SUPABASE_ANON_KEY + SUPABASE_DATABASE_PASSWORD from .env.local.
 * Run once after migrations 005 / 006 / 007 are applied.
 */

import pg from 'pg'
import { readFileSync } from 'node:fs'

const PROJECT_REF = 'lmzoyezvsjgsxveoakdr'
const POOLER_HOST = 'aws-1-us-east-1.pooler.supabase.com'
const POOLER_PORT = 6543

const SECRET_NAMES = [
  { name: 'push_ads_conversions_anon_key', desc: 'Anon key used by pg_cron to invoke push-ads-conversions edge function' },
  { name: 'ai_audit_anon_key',              desc: 'Anon key used by pg_cron to invoke audit-cethos-health edge function' },
]

function readEnvVar(key) {
  const contents = readFileSync('.env.local', 'utf8')
  for (const line of contents.split(/\r?\n/)) {
    const m = line.match(new RegExp(`^${key}[:=](.*)$`))
    if (m) return m[1].replace(/^["']|["']$/g, '').trim()
  }
  throw new Error(`${key} not found in .env.local`)
}

async function main() {
  const password = readEnvVar('SUPABASE_DATABASE_PASSWORD')
  const anonKey = readEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY')

  const client = new pg.Client({
    host: POOLER_HOST,
    port: POOLER_PORT,
    database: 'postgres',
    user: `postgres.${PROJECT_REF}`,
    password,
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log('connected.')

  for (const s of SECRET_NAMES) {
    // Check if the secret already exists
    const exists = await client.query(
      'SELECT id FROM vault.secrets WHERE name = $1 LIMIT 1',
      [s.name],
    )

    if (exists.rowCount > 0) {
      // Update the secret value (vault's UPDATE triggers re-encryption)
      await client.query(
        `UPDATE vault.secrets SET secret = $1, description = $2 WHERE name = $3`,
        [anonKey, s.desc, s.name],
      )
      console.log(`  updated: ${s.name}`)
    } else {
      await client.query(
        `SELECT vault.create_secret($1, $2, $3)`,
        [anonKey, s.name, s.desc],
      )
      console.log(`  created: ${s.name}`)
    }
  }

  await client.end()
  console.log('\ndone.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
