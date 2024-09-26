import { BASE_API_URL, BASE_URL } from "playwright.config";

function globalSetup(): void {
  console.log(`ENVIRONMENT SETUP:\n 
  BASE_URL: ${BASE_URL}\n
  BASE_API_URL: ${BASE_API_URL}`);
}

export default globalSetup;
