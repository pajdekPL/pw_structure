import { TopBarComponent } from "@components/top-bar.component";
import { BasePage, step } from "@pages/base.page";
import { Locator, Page } from "@playwright/test";

export class VerifyYourAccount extends BasePage {
  topBar = new TopBarComponent(this.page);
  numOfDigits = 6;
  url = "apps/verify-account/";
  mainHeader: Locator = this.page.getByRole("heading", {
    name: "Verify Your Account",
  });
  msgText: Locator = this.page.locator("#msg");
  digitInputs: Locator = this.page.locator(".code");
  anchorElement: Locator = this.mainHeader;
  successInformation: Locator = this.page.getByText("Success");

  constructor(protected page: Page) {
    super(page);
  }

  @step()
  async fillAllDigits(value: string): Promise<void> {
    const delayBetweenDigitsMs = 50;
    for (let i = 0; i < this.numOfDigits; i++) {
      await this.digitInputs
        .nth(i)
        .press(value, { delay: delayBetweenDigitsMs });
    }
  }
}
