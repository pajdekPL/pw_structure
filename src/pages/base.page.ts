/* eslint-disable @typescript-eslint/no-unused-vars */
import { Locator, Page } from "@playwright/test";

export abstract class BasePage {
  url = "/";
  abstract anchorElement: Locator;
  anchorListFirstActiveElement: Locator = this.page.locator("someAnchor");

  constructor(protected page: Page) {
    this.page = page;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async goto(wait = true): Promise<void> {
    await this.page.goto(this.url, { waitUntil: "commit" });
    if (wait) {
      await this.waitForPage();
    }
  }

  async waitForUrl(params = ""): Promise<void> {
    await this.page.waitForURL(this.url, {
      waitUntil: "commit",
    });
  }

  async waitForPage(): Promise<void> {
    await this.waitForUrl();
    await this.anchorElement.waitFor();
  }

  async reloadPage(): Promise<void> {
    await this.page.reload();
    await this.waitForPage();
  }
}
