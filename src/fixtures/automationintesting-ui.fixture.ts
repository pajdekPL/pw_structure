import { buildUserFromEnvVariables } from "@factories/auth-user.factory";
import { AuthUserModel } from "@models/auth-user.model";
import { AdminPage } from "@pages/automationintesting/admin-panel.page";
import { Page, test as base } from "@playwright/test";
import { FileOperationsFs } from "@utilities/file-operations";
import { ADMIN_STORAGE_STATE_FILE } from "playwright.config";

const TOKEN_EXPIRATION_TIME = 5 * 60 * 1000;

interface UsersFixtures {
  adminAuthPage: Page;
}
export const test = base.extend<UsersFixtures>({
  adminAuthPage: async ({ browser, page }, use) => {
    if (!isAuthFileValid(ADMIN_STORAGE_STATE_FILE, TOKEN_EXPIRATION_TIME)) {
      const adminUser = buildUserFromEnvVariables();
      await authenticateUser(page, adminUser, ADMIN_STORAGE_STATE_FILE);
    } else {
      await page.context().close();
    }
    const adminContext = await browser.newContext({
      storageState: ADMIN_STORAGE_STATE_FILE,
    });
    const adminPage = await adminContext.newPage();
    await use(adminPage);
  },
});

async function authenticateUser(
  page: Page,
  user: AuthUserModel,
  storageState: string,
): Promise<void> {
  const adminPage = new AdminPage(page);
  await adminPage.goto();
  await adminPage.login(user);
  await page.context().storageState({ path: storageState });
  await page.context().close();
}

function isAuthFileValid(path: string, maxAgeInMilliseconds: number): boolean {
  const fileOperations = new FileOperationsFs();
  if (!fileOperations.doesFileExist(path)) {
    return false;
  }
  return !fileOperations.isFileOlderThanMaxAge(path, maxAgeInMilliseconds);
}
