import { Locator, Page } from "@playwright/test";

export class SomeComponent {
  someComponentLocator: Locator = this.page.locator("Some Component");

  constructor(protected page: Page) {}
}
