import { NewPage } from "@pages/qaplayground/new-page.page";
import { NewTabPage } from "@pages/qaplayground/new-tab.page";
import { expect, test } from "@playwright/test";

test(
  "The page is properly open in the new page",
  { tag: "@NEWPAGE" },
  async ({ page, context }) => {
    const newTabPage = new NewTabPage(page);

    const newTabEvent = context.waitForEvent("page");

    await newTabPage.goto();
    await newTabPage.openNewTabButton.click();

    const newPage = new NewPage(await newTabEvent);

    await newPage.waitForUrl();
    await expect(newPage.newPageHeader).toBeVisible();
  },
);
