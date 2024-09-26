/* eslint-disable @typescript-eslint/no-unused-vars */
import { Locator, Page, test } from "@playwright/test";

export abstract class BasePage {
  url = "/";
  abstract anchorElement: Locator;
  anchorListFirstActiveElement: Locator = this.page.locator("someAnchor");

  constructor(protected page: Page) {
    this.page = page;
  }

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

/**
 * Decorator function for wrapping methods in a Playwright test.step to increase readability.
 *
 * Use it without a step name `@step()`.
 *
 * Or with a step name `@step("Search something")`.
 *
 * @param stepName - The name of the test step.
 * @returns A decorator function that can be used to decorate test methods.
 */
export function step(stepName?: string) {
  return function wrapper<This extends object, Args extends unknown[], Return>(
    target: (this: This, ...args: Args) => Promise<Return>,
    context: ClassMethodDecoratorContext<
      This,
      (this: This, ...args: Args) => Promise<Return>
    >,
  ) {
    return function replacementMethod(
      this: This,
      ...args: Args
    ): Promise<Return> {
      const name =
        stepName ??
        `${this.constructor.name}.${context.name as string}(${args
          .map((a) => JSON.stringify(a))
          .join(",")})`;
      return test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}
