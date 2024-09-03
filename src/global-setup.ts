/* eslint-disable no-console */
import { BASE_API_URL, BASE_URL } from "playwright.config";

async function globalSetup(): Promise<void> {
  console.log(`ENVIRONMENT SETUP:\n 
  BASE_URL: ${BASE_URL}\n
  BASE_API_URL: ${BASE_API_URL}`);
}

export default globalSetup;
