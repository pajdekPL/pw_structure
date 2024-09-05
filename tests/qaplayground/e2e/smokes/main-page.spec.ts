import { MainPage } from "@pages/qaplayground/main.page";
import { expect, test } from "@playwright/test";

test("Enter main page, check top bar and navigate to mini apps section @SMOKE @SNAP", async ({
  page,
}) => {
  const mainPage = new MainPage(page);

  await mainPage.goto();

  await test.step("Top Bar component is properly included in the main page", async () => {
    await expect(mainPage.topBar.qaPlaygroundLogo).toBeVisible();
    await expect(mainPage.topBar.viewAllTestSuitsLink).toBeVisible();
  });

  await test.step("Clicking mini apps button scrolls to the mini apps section", async () => {
    await mainPage.enterMiniAps();

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.05 });
  });
});
