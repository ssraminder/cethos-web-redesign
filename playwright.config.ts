import { defineConfig, devices } from '@playwright/test'

// Target: set E2E_BASE_URL to run against a deployed site (e.g.
// E2E_BASE_URL=https://cethos.com). With no E2E_BASE_URL, the config boots a
// local `next dev` server and tests against it.
const baseURL = process.env.E2E_BASE_URL || 'http://localhost:3000'
const isLocal = !process.env.E2E_BASE_URL

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  ...(isLocal
    ? {
        webServer: {
          command: 'npm run dev',
          url: 'http://localhost:3000',
          reuseExistingServer: true,
          timeout: 120_000,
        },
      }
    : {}),
})
