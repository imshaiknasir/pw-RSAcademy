// @ts-check
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  reporter: "html",
  workers: 2,
  use: {
    ignoreHTTPSErrors: true,
    trace: "on",
    headless: true,
    screenshot: "on",
  },
});
