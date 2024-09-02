import { buildUserFromEnvVariables } from "@factories/auth-user.factory";
import { AuthUserModel } from "@models/auth-user.model";
import { Page, test as setup } from "@playwright/test";
import { FileOperationsFs } from "@utilities/file-operations";
import dotenv from "dotenv";
import { USER_STORAGE_STATE_FILE } from "playwright.config";

dotenv.config({ override: true });

// After that time for example your token is not longer valid
const authFileMaximumAgeInMilliseconds = 30 * 60 * 1000;

setup("Authenticate user XYZ", async ({ page }) => {
  const user = buildUserFromEnvVariables();
  await authenticateUser(page, user, USER_STORAGE_STATE_FILE);
});

function isAuthFileValid(path: string, maxAgeInMilliseconds: number): boolean {
  const fileOperations = new FileOperationsFs();
  if (!fileOperations.doesFileExist(path)) {
    return false;
  }
  return !fileOperations.isFileOlderThanMaxAge(path, maxAgeInMilliseconds);
}

async function authenticateUser(
  page: Page,
  user: AuthUserModel,
  storageState: string,
): Promise<void> {
  if (!isAuthFileValid(storageState, authFileMaximumAgeInMilliseconds)) {
    await loginUser(page, user);
    await page.context().storageState({ path: storageState });
    await page.context().close();
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function loginUser(
  page: Page,
  user: AuthUserModel,
): Promise<void> {
  throw new Error("Not implemented");
}
