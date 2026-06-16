import { test, expect } from '@playwright/test'

const ROLE_1 = 'Business Development Manager (Linguistic Validation & COA/eCOA)'
const ROLE_2 = 'Operations & Vendor Manager (Cognitive Debriefing & Clinician Review)'

const APPLY_1 = 'https://join.cethos.com/careers/business-development-manager-lv-coa'
const APPLY_2 = 'https://join.cethos.com/careers/operations-vendor-manager-cogdeb-clinro'

test.describe('Careers page', () => {
  test('lists the two full-time roles with recruitment-app apply links', async ({ page }) => {
    await page.goto('/careers')

    // Both roles render as visible headings.
    await expect(page.getByRole('heading', { name: ROLE_1 })).toBeVisible()
    await expect(page.getByRole('heading', { name: ROLE_2 })).toBeVisible()

    // Each "View & apply" points to the full-time form on the recruitment app.
    await expect(page.locator(`a[href="${APPLY_1}"]`)).toHaveCount(1)
    await expect(page.locator(`a[href="${APPLY_2}"]`)).toHaveCount(1)
    await expect(page.locator(`a[href="${APPLY_1}"]`)).toContainText(/view & apply/i)

    // Location + compensation copy is country-agnostic.
    await expect(page.getByText('Fully remote (global)').first()).toBeVisible()
    await expect(
      page.getByText('Competitive — based on experience and location, plus commission on wins'),
    ).toBeVisible()

    // Cross-link back to the freelance / vendor network.
    await expect(page.getByRole('link', { name: /open freelance roles/i })).toBeVisible()

    // The old placeholder roles are no longer rendered as cards.
    await expect(page.getByRole('heading', { name: /Senior Medical Translator/ })).toHaveCount(0)
    await expect(page.getByRole('heading', { name: /Quality Assurance Specialist/ })).toHaveCount(0)
  })

  test('apply link navigates to the recruitment app', async ({ page }) => {
    await page.goto('/careers')
    await expect(page.locator(`a[href="${APPLY_1}"]`)).toHaveAttribute('href', APPLY_1)
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
