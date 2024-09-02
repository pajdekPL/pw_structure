import { NewPage } from "@pages/new-page.page";
import { NewTabPage } from "@pages/new-tab.page";
import { expect, test } from "@playwright/test";

test("The page is properly open in the new page @NEWPAGE", async ({
  page,
  context,
}) => {
  const newTabPage = new NewTabPage(page);

  const newTabEvent = context.waitForEvent("page");

  await newTabPage.goto();
  await newTabPage.openNewTabButton.click();

  const newPage = new NewPage(await newTabEvent);

  await newPage.waitForUrl();
  await expect(newPage.newPageHeader).toBeVisible();
});
