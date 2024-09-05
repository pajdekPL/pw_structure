// https://automationintesting.online/#/admin
import { AuthUserModel } from "@models/auth-user.model";
import { BasePage } from "@pages/base.page";
import { Locator, Page, expect } from "@playwright/test";

export class AdminPage extends BasePage {
  url = "#/admin";
  bookingManagementLink: Locator = this.page.getByRole("link", {
    name: "B&B Booking Management",
  });
  anchorElement: Locator = this.bookingManagementLink;
  loginInput: Locator = this.page.getByTestId("username");
  passwordInput: Locator = this.page.getByTestId("password");
  submitLoginButton: Locator = this.page.getByTestId("submit");
  createBookingButton: Locator = this.page.getByRole("button", {
    name: "Create",
  });

  constructor(protected page: Page) {
    super(page);
  }

  async login(user: AuthUserModel): Promise<void> {
    await this.loginInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.submitLoginButton.click();

    await expect(this.loginInput).toBeHidden();
  }
}
