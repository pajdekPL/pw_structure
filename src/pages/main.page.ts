import { BasePage } from "@pages/base.page";
import { Locator, Page } from "@playwright/test";

export class MainPage extends BasePage {
  url = "/";
  anchorElement: Locator = this.page.getByRole("heading", {
    name: "🧠 What is the idea behind",
  });
  miniAppsLink: Locator = this.page.getByRole("link", {
    name: "Mini Web Apps",
  });
  miniAppsAnchorUrl = "#apps";

  constructor(protected page: Page) {
    super(page);
  }

  async enterMiniAps(): Promise<void> {
    await this.miniAppsLink.click();
    await this.page.waitForURL(this.miniAppsAnchorUrl);
  }
}
