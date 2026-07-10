import { test, expect } from '@playwright/test'

const ROLE_1 = 'Business Development Manager (Linguistic Validation & COA/eCOA)'
const ROLE_2 = 'Operations & Vendor Manager (Cognitive Debriefing & Clinician Review)'
const ROLE_3 = 'Project Coordinator (Translation & Linguistic Validation)'

// Apply links now stay on cethos.com: /careers/:slug hosts the JD + form.
const APPLY_1 = '/careers/business-development-manager-lv-coa'
const APPLY_2 = '/careers/operations-vendor-manager-cogdeb-clinro'
const APPLY_3 = '/careers/project-coordinator-translation-lv'

test.describe('Careers page', () => {
  test('lists the three full-time roles with on-site apply links', async ({ page }) => {
    await page.goto('/careers')

    // All roles render as visible headings.
    await expect(page.getByRole('heading', { name: ROLE_1 })).toBeVisible()
    await expect(page.getByRole('heading', { name: ROLE_2 })).toBeVisible()
    await expect(page.getByRole('heading', { name: ROLE_3 })).toBeVisible()

    // Each "View & apply" points to the JD page on this site.
    await expect(page.locator(`a[href="${APPLY_1}"]`)).toHaveCount(1)
    await expect(page.locator(`a[href="${APPLY_2}"]`)).toHaveCount(1)
    await expect(page.locator(`a[href="${APPLY_3}"]`)).toHaveCount(1)
    await expect(page.locator(`a[href="${APPLY_1}"]`)).toContainText(/view & apply/i)

    // Location + compensation copy.
    await expect(page.getByText('Fully remote (global)').first()).toBeVisible()
    await expect(page.getByText('On-site — Calgary, AB').first()).toBeVisible()

    // Cross-link back to the freelance / vendor network.
    await expect(page.getByRole('link', { name: /open freelance roles/i })).toBeVisible()

    // The old placeholder roles are no longer rendered as cards.
    await expect(page.getByRole('heading', { name: /Senior Medical Translator/ })).toHaveCount(0)
    await expect(page.getByRole('heading', { name: /Quality Assurance Specialist/ })).toHaveCount(0)
  })

  test('work-mode filters: Remote hides on-site roles, On-site shows location chips', async ({ page }) => {
    await page.goto('/careers')
    const positions = page.locator('#positions')

    // Default: all three roles.
    await expect(positions.getByRole('heading', { name: ROLE_3 })).toBeVisible()

    // Remote: only the two remote roles.
    await positions.getByRole('button', { name: 'Remote' }).click()
    await expect(positions.getByRole('heading', { name: ROLE_1 })).toBeVisible()
    await expect(positions.getByRole('heading', { name: ROLE_2 })).toBeVisible()
    await expect(positions.getByRole('heading', { name: ROLE_3 })).toHaveCount(0)

    // On-site: only the Calgary role, and the location chips appear.
    await positions.getByRole('button', { name: 'On-site' }).click()
    await expect(positions.getByRole('heading', { name: ROLE_3 })).toBeVisible()
    await expect(positions.getByRole('heading', { name: ROLE_1 })).toHaveCount(0)
    await expect(positions.getByRole('button', { name: 'All locations' })).toBeVisible()
    await positions.getByRole('button', { name: 'Calgary, AB' }).click()
    await expect(positions.getByRole('heading', { name: ROLE_3 })).toBeVisible()

    // Back to all.
    await positions.getByRole('button', { name: 'All roles' }).click()
    await expect(positions.getByRole('heading', { name: ROLE_1 })).toBeVisible()
  })

  test('NEXT_LOCALE=fr cookie must NOT hijack unprefixed URLs to /fr', async ({ page, context, baseURL }) => {
    // Regression: one visit to any /fr page used to set NEXT_LOCALE=fr and pin
    // the browser to French for every unprefixed URL (/apply -> /fr/apply).
    const host = new URL(baseURL || 'http://localhost:3000').hostname
    await context.addCookies([{ name: 'NEXT_LOCALE', value: 'fr', domain: host, path: '/' }])

    await page.goto('/careers')
    expect(new URL(page.url()).pathname).toBe('/careers')
    await page.goto('/apply')
    expect(new URL(page.url()).pathname).toBe('/apply')

    // Explicit /fr still serves the French site.
    const res = await page.goto('/fr')
    expect(res?.status()).toBe(200)
    expect(new URL(page.url()).pathname).toBe('/fr')
  })

  test('header nav exposes a Careers link (web-component shadow DOM)', async ({ page }) => {
    await page.goto('/')

    // The header is a custom element that hydrates and renders into an open
    // shadow root; Playwright locators pierce it automatically. Scope to the
    // header so we don't match the footer's Careers link.
    const headerCareers = page.locator('cethos-header').getByRole('link', { name: 'Careers' }).first()
    await expect(headerCareers).toBeVisible({ timeout: 15_000 })
    await expect(headerCareers).toHaveAttribute('href', /\/careers$/)
  })
})
