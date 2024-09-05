import { BasePage } from "@pages/base.page";
import { Locator, Page } from "@playwright/test";

export class NewPage extends BasePage {
  url = "apps/new-tab/new-page";
  newPageHeader: Locator = this.page.getByRole("heading", {
    name: "Welcome to the new page!",
  });
  anchorElement: Locator = this.newPageHeader;

  constructor(protected page: Page) {
    super(page);
  }
}
