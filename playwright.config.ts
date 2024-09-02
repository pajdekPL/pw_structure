import { defineConfig, devices } from "@playwright/test";
import { EnvVariables } from "@utilities/env-variables";
import dotenv from "dotenv";

dotenv.config({ override: true });

export const USER_STORAGE_STATE_FILE = ".auth/user.json";
export const BASE_URL = EnvVariables.requireEnv("BASE_URL");
export const BASE_API_URL = EnvVariables.requireEnv("BASE_API_URL");

const GLOBAL_TIMEOUT_MINUTES = 10 * 60 * 1000;
const EXPECT_TIMEOUT_SECONDS = 5 * 1000;
const TEST_TIMEOUT_SECONDS = 150 * 1000;

const CI_WORKERS = 2;
const LOCAL_WORKERS = 1;

export default defineConfig({
  testDir: "./tests/",
  globalSetup: "src/global-setup.ts",
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? CI_WORKERS : LOCAL_WORKERS,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["list"],
    ["html", { open: process.env.CI ? "never" : "on-failure" }],
  ],

  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",

    ignoreHTTPSErrors: true,

    actionTimeout: EXPECT_TIMEOUT_SECONDS,
    navigationTimeout: EXPECT_TIMEOUT_SECONDS,
  },

  globalTimeout: GLOBAL_TIMEOUT_MINUTES,
  timeout: TEST_TIMEOUT_SECONDS,
  expect: { timeout: EXPECT_TIMEOUT_SECONDS },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium - logged user",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});

/* Configure projects for major browsers 
  It's a configuration that can be used for authenticating user before test execution, 
  the first files that are executed /.*\.setup\.ts/ match this file name pattern, steps in this file can 
  log user via GUI services and save storage states that can be then used in tests
  check this file for more info: tests/auth.setup.ts
  projects: [
    // Setup project
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      testIgnore: /.*.nl.spec.ts/,
      name: "chromium - logged user",
      use: {
        ...devices["Desktop Chrome"],
        // Use prepared auth state.
        storageState: USER_STORAGE_STATE_FILE,
        viewport: { width: 1980, height: 1080 },
      },
      dependencies: ["setup"],
    },

    {
      name: "chromium - non-logged user",
      testMatch: /.*.nl.spec.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  */
