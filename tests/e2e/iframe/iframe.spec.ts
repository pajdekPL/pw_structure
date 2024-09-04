import { IframePage } from "@pages/iframe.page";
import { expect, test } from "@playwright/test";

test("The main page loads nested frames properly and interaction is possible @IFRAME", async ({
  page,
}) => {
  const firstLevelIframeExpectedLegendText = "First Level Iframe";
  const secondLevelIframeExpectedLegendText = "Second Level Iframe";
  const iframePage = new IframePage(page);

  await iframePage.goto();

  await expect(iframePage.firstLevelIframe.legend).toContainText(
    firstLevelIframeExpectedLegendText,
  );
  await expect(iframePage.secondLevelIframe.legend).toContainText(
    secondLevelIframeExpectedLegendText,
  );
  await expect(iframePage.secondLevelIframe.buttonClickedMessage).toBeHidden();

  await iframePage.secondLevelIframe.clickMeButton.click();

  await expect(iframePage.secondLevelIframe.buttonClickedMessage).toBeVisible();
});
