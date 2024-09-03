import { Locator, Page } from "@playwright/test";

export class TopBarComponent {
  qaPlaygroundLogo: Locator = this.page.getByRole("link", {
    name: "QA Playground",
  });
  viewAllTestSuitsLink: Locator = this.page.getByRole("link", {
    name: "View All Test Suites",
  });

  constructor(protected page: Page) {}
}
