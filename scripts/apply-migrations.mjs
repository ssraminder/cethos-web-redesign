#!/usr/bin/env node
/**
 * One-off migration runner that bypasses the Supabase CLI's history-tracking.
 * The remote has 185+ migrations applied via other workflows; the CLI refuses
 * to push until those are all reflected locally. This script executes our
 * specific migration files directly against the DB so we don't have to
 * pollute the repo with migrations we didn't author.
 *
 * Usage: node scripts/apply-migrations.mjs <file1> [<file2> ...]
 *
 * Reads SUPABASE_DATABASE_PASSWORD from .env.local.
 * Connects via the Supavisor transaction pooler (IPv4-friendly).
 */

import pg from 'pg'
import { readFileSync } from 'node:fs'

const PROJECT_REF = 'lmzoyezvsjgsxveoakdr'
const POOLER_HOST = 'aws-1-us-east-1.pooler.supabase.com'
const POOLER_PORT = 6543

function readPasswordFromEnvLocal() {
  const contents = readFileSync('.env.local', 'utf8')
  for (const line of contents.split(/\r?\n/)) {
    const m = line.match(/^SUPABASE_DATABASE_PASSWORD[:=](.*)$/)
    if (m) return m[1].replace(/^["']|["']$/g, '').trim()
  }
  throw new Error('SUPABASE_DATABASE_PASSWORD not found in .env.local')
}

async function main() {
  const files = process.argv.slice(2)
  if (files.length === 0) {
    console.error('Usage: node scripts/apply-migrations.mjs <file1.sql> [<file2.sql> ...]')
    process.exit(1)
  }

  const password = readPasswordFromEnvLocal()
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

  for (const file of files) {
    console.log(`\n=== ${file} ===`)
    const sql = readFileSync(file, 'utf8')
    try {
      // Execute as a single statement batch — Postgres handles multi-statement SQL.
      await client.query(sql)
      console.log(`  applied OK (${sql.length} chars)`)
    } catch (err) {
      console.error(`  FAILED: ${err.message}`)
      if (err.hint) console.error(`  hint: ${err.hint}`)
      if (err.position) console.error(`  at position ${err.position}`)
      throw err
    }
  }

  await client.end()
  console.log('\ndone.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
