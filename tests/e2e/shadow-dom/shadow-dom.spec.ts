import { ShadowDomPage } from "@pages/shadow-dom.page";
import { expect, test } from "@playwright/test";

test("The progress bar is showing progress after clicking boost @SHADOWDOM", async ({
  page,
}) => {
  const valueBeforeBoost = "5";
  const expectedValueAfterBoost = "95";
  const boostValueAttribute = "percent";
  const boostProgressingTimeout = 8000;
  const shadowDomPage = new ShadowDomPage(page);

  await shadowDomPage.goto();

  await expect(shadowDomPage.progressBar).toHaveAttribute(
    boostValueAttribute,
    valueBeforeBoost,
  );

  await shadowDomPage.boostButton.click();

  await expect(shadowDomPage.progressBar).toHaveAttribute(
    boostValueAttribute,
    expectedValueAfterBoost,
    { timeout: boostProgressingTimeout },
  );
});
