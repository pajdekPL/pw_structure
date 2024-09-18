import { TopBarComponent } from "@components/top-bar.component";
import { BasePage, step } from "@pages/base.page";
import { Locator, Page } from "@playwright/test";

export class MainPage extends BasePage {
  url = "/";
  topBar = new TopBarComponent(this.page);
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

  @step("Navigate to Mini Apps")
  async enterMiniAps(): Promise<void> {
    await this.miniAppsLink.click();
    await this.page.waitForURL(this.miniAppsAnchorUrl);
  }
}
