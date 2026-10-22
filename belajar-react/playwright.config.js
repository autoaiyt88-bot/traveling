import { defineConfig, devices } from "@playwright/test";

/**
 * ====================================================================
 * PLAYWRIGHT E2E TESTING CONFIGURATION
 * ====================================================================
 * Pengujian otomatis responsivitas multi-device (Desktop Chrome & Mobile)
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile iPhone",
      use: { ...devices["iPhone 14"] },
    },
    {
      name: "Mobile Android",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
});
