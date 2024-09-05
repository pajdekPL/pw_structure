import { BasePage } from "@pages/base.page";
import { Locator, Page } from "@playwright/test";

export class ShadowDomPage extends BasePage {
  url = "apps/shadow-dom/";
  boostButton: Locator = this.page.getByRole("button", {
    name: "Boost 🚀",
  });
  anchorElement: Locator = this.boostButton;
  progressBar: Locator = this.page.locator("progress-bar");

  constructor(protected page: Page) {
    super(page);
  }
}
