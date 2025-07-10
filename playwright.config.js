// @ts-check
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: './tests/',
  /* Run tests in files in parallel */
  fullyParallel: true,
  reporter: [["html", { open: "never" }], ["list"]],
  reportSlowTests: null,
  workers: 4,
  // quiet: true,
  retries: 1,
  use: {
    launchOptions: {
      headless: true,
    },
    ignoreHTTPSErrors: true,
    trace: "on",
    headless: true,
    screenshot: "on",
  },
});
