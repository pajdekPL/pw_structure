import { BasePage } from "@pages/base.page";
import { Locator, Page } from "@playwright/test";

export class NewTabPage extends BasePage {
  url = "apps/new-tab/";
  openNewTabButton: Locator = this.page.getByRole("link", {
    name: "Open New Tab",
  });
  anchorElement: Locator = this.openNewTabButton;

  constructor(protected page: Page) {
    super(page);
  }
}
