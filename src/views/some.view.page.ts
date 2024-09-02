import { Locator, Page } from "@playwright/test";

export class SomeView {
  someViewLocator: Locator = this.page.locator("some view element");

  constructor(protected page: Page) {}
}
