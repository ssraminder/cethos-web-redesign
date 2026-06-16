import { test, expect } from '@playwright/test'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import os from 'os'

// Browser e2e for the full-time application form, both positions.
//
// NOTE: there is no separate test database — submissions write to the live
// Supabase project. So the destructive "submit" assertions only run when a
// service key is available (used to clean up afterward); otherwise the test
// falls back to render-only checks. Test rows are tagged with the
// @cethos-e2e.invalid email domain and removed in afterAll.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY
const CAN_SUBMIT = Boolean(SUPABASE_URL && SERVICE_KEY)

const TEST_EMAIL_DOMAIN = '@cethos-e2e.invalid'
const BUCKET = 'careers-applications'
const CV_PATH = path.join(os.tmpdir(), 'cethos-e2e-cv.pdf')

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
  fs.writeFileSync(
    CV_PATH,
    '%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n',
  )
})

// Remove any rows + CVs created by this suite.
test.afterAll(async () => {
  if (!CAN_SUBMIT) return
  const admin = createClient(SUPABASE_URL!, SERVICE_KEY!)
  const { data } = await admin
    .from('fulltime_applications')
    .select('id, resume_bucket, resume_path')
    .like('email', `%${TEST_EMAIL_DOMAIN}`)
  if (data && data.length) {
    const byBucket = new Map<string, string[]>()
    for (const r of data) {
      const b = r.resume_bucket || BUCKET
      byBucket.set(b, [...(byBucket.get(b) || []), r.resume_path])
    }
    for (const [bucket, paths] of byBucket) {
      await admin.storage.from(bucket).remove(paths)
    }
    await admin.from('fulltime_applications').delete().in('id', data.map((r) => r.id))
  }
})

for (const role of ROLES) {
  test(`careers form renders + accepts input: ${role.slug}`, async ({ page }) => {
    await page.goto(`/careers/${role.slug}`)
    await expect(page.getByRole('heading', { level: 1, name: role.title })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Apply for this role' })).toBeVisible()
    await expect(page.locator('#resume')).toHaveCount(1)
    await expect(page.getByRole('button', { name: /submit application/i })).toBeVisible()
  })

  test(`full-time application submits end-to-end: ${role.slug}`, async ({ page }) => {
    test.skip(!CAN_SUBMIT, 'Set SUPABASE_SERVICE_ROLE_KEY to enable the destructive submit test (writes + cleans up a live row).')

    await page.goto(`/careers/${role.slug}`)
    await page.fill('#full_name', 'E2E Test Applicant')
    await page.fill('#email', role.email)
    await page.fill('#city', 'Calgary')
    await page.selectOption('#country', 'Canada')
    await page.selectOption('#years_experience', '3–5 years')
    await page.setInputFiles('#resume', CV_PATH)
    await page.fill('#screening_experience', 'E2E automated browser test — relevant LV/COA experience.')
    await page.fill('#screening_hours', 'E2E test — yes, able and willing to work the shifted schedule.')
    await page.fill('#expected_comp_amount', '120000')
    await page.selectOption('#expected_comp_currency', 'USD')
    await page.fill('#about_you', 'E2E automated browser test — a short paragraph about the applicant for the about-you question.')
    await page.selectOption('#how_heard', 'LinkedIn')
    await page.check('input[name="consent_privacy"]')

    await page.getByRole('button', { name: /submit application/i }).click()
    await expect(page.getByRole('heading', { name: /application received/i })).toBeVisible({
      timeout: 25_000,
    })
  })
}
