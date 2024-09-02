import { MainPage } from "@pages/main.page";
import { expect, test } from "@playwright/test";

test("Enter main page and navigate to mini apps section @SMOKE", async ({
  page,
}) => {
  const mainPage = new MainPage(page);

  await mainPage.goto();

  await test.step("Clicking mini apps button scrolls to the mini apps section", async () => {
    await mainPage.enterMiniAps();

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.05 });
  });
});
