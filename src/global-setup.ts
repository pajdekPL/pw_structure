/* eslint-disable no-console */
import { BASE_URL } from "playwright.config";

async function globalSetup(): Promise<void> {
  console.log(`ENVIRONMENT SETUP:\n 
  BASE_URL: ${BASE_URL}`);
}

export default globalSetup;
