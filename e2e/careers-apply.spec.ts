import { test, expect } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import os from 'os'

// Browser e2e for the full-time application flow, both positions.
//
// NOTE: there is no separate test database — submissions write to the live
// Supabase project, and files upload directly from the browser to private
// buckets. The destructive "submit" test therefore only runs when a service key
// is available (used for cleanup); otherwise it falls back to render-only checks.
// Test rows use the @cethos-e2e.invalid email domain and are removed in afterAll.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY
const CAN_SUBMIT = Boolean(SUPABASE_URL && SERVICE_KEY)

const TEST_EMAIL_DOMAIN = '@cethos-e2e.invalid'
const CV_PATH = path.join(os.tmpdir(), 'cethos-e2e-cv.pdf')
const VIDEO_PATH = path.join(os.tmpdir(), 'cethos-e2e-intro.mp4')

const ROLES = [
  {
    slug: 'business-development-manager-lv-coa',
    title: 'Business Development Manager (Linguistic Validation & COA/eCOA)',
    email: 'e2e-careers-bdm@cethos-e2e.invalid',
  },
  {
    slug: 'operations-vendor-manager-cogdeb-clinro',
    title: 'Operations & Vendor Manager (Cognitive Debriefing & Clinician Review)',
    email: 'e2e-careers-ops@cethos-e2e.invalid',
  },
]

test.beforeAll(() => {
  fs.writeFileSync(CV_PATH, '%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n')
  // Tiny placeholder mp4 (bucket validates the declared content-type, not bytes).
  fs.writeFileSync(VIDEO_PATH, Buffer.from('0000001c66747970', 'hex'))
})

test.afterAll(async () => {
  if (!CAN_SUBMIT) return
  const admin = createClient(SUPABASE_URL!, SERVICE_KEY!)
  const { data } = await admin
    .from('fulltime_applications')
    .select('id, resume_bucket, resume_path, video_bucket, video_path')
    .like('email', `%${TEST_EMAIL_DOMAIN}`)
  if (data && data.length) {
    const byBucket = new Map<string, string[]>()
    const add = (bucket: string | null, p: string | null, fallback: string) => {
      if (!p) return
      const b = bucket || fallback
      byBucket.set(b, [...(byBucket.get(b) || []), p])
    }
    for (const r of data) {
      add(r.resume_bucket, r.resume_path, 'careers-applications')
      add(r.video_bucket, r.video_path, 'careers-videos')
    }
    for (const [bucket, paths] of byBucket) await admin.storage.from(bucket).remove(paths)
    await admin.from('fulltime_applications').delete().in('id', data.map((r) => r.id))
  }
})

for (const role of ROLES) {
  test(`role page shows JD + Apply button: ${role.slug}`, async ({ page }) => {
    await page.goto(`/careers/${role.slug}`)
    await expect(page.getByRole('heading', { level: 1, name: role.title })).toBeVisible()
    const applyLink = page.getByRole('link', { name: /apply for this role/i }).first()
    await expect(applyLink).toBeVisible()
    await expect(applyLink).toHaveAttribute('href', new RegExp(`/careers/${role.slug}/apply$`))
  })

  test(`application form renders on its own page: ${role.slug}`, async ({ page }) => {
    await page.goto(`/careers/${role.slug}/apply`)
    await expect(page.locator('#resume')).toHaveCount(1)
    await expect(page.locator('#video')).toHaveCount(1)
    await expect(page.locator('#about_you')).toHaveCount(1)
    await expect(page.getByRole('button', { name: /submit application/i })).toBeVisible()
  })

  test(`full-time application submits end-to-end: ${role.slug}`, async ({ page }) => {
    test.skip(!CAN_SUBMIT, 'Set SUPABASE_SERVICE_ROLE_KEY to enable the destructive submit test.')

    await page.goto(`/careers/${role.slug}/apply`)
    await page.fill('#full_name', 'E2E Test Applicant')
    await page.fill('#email', role.email)
    await page.fill('#city', 'Calgary')
    await page.selectOption('#country', 'Canada')
    await page.selectOption('#years_experience', '3–5 years')
    await page.setInputFiles('#resume', CV_PATH)
    await page.setInputFiles('#video', VIDEO_PATH)
    await page.fill('#screening_experience', 'E2E automated browser test — relevant LV/COA experience.')
    await page.fill('#screening_hours', 'E2E test — yes, able and willing to work the shifted schedule.')
    await page.fill('#expected_comp_amount', '120000')
    await page.selectOption('#expected_comp_currency', 'USD')
    await page.fill('#about_you', 'E2E test — a short paragraph about the applicant for the about-you question.')
    await page.selectOption('#how_heard', 'LinkedIn')
    await page.check('input[name="consent_privacy"]')

    await page.getByRole('button', { name: /submit application/i }).click()
    await expect(page.getByRole('heading', { name: /application received/i })).toBeVisible({
      timeout: 30_000,
    })
  })
}
