// @ts-check
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  reporter: [["html"], ["list"]],
  reportSlowTests: null,
  workers: 4,
  quiet: true,
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
