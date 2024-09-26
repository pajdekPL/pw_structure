import { TopBarComponent } from "@components/top-bar.component";
import { BasePage, step } from "@pages/base.page";
import { Locator, Page, expect } from "@playwright/test";

export class MultiLevelDropdownPage extends BasePage {
  url = "apps/multi-level-dropdown/";
  topBar = new TopBarComponent(this.page);
  anchorElement: Locator = this.topBar.qaPlaygroundLogo;

  // TODO ask development team for adding id/aria-label/data-testid to reduce test flakiness
  optionsDropdown: Locator = this.page.locator(".icon-button").last();
  menuContainer: Locator = this.page.locator(".menu");
  settingsOption: Locator = this.menuContainer.getByRole("link", {
    name: "Settings",
  });
  settingsBackButton: Locator = this.page.getByRole("link", {
    name: "My Tutorial",
  });
  constructor(protected page: Page) {
    super(page);
  }

  async openOptionsDropdown(): Promise<void> {
    await this.optionsDropdown.click();
  }

  async openSettingsDropdown(): Promise<void> {
    await this.settingsOption.click();
  }

  async goBackFromSettings(): Promise<void> {
    await this.settingsBackButton.click();
  }

  @step()
  async verifyMenuOptionsAreVisible(items: string[]): Promise<void> {
    for (const item of items) {
      await expect(
        this.menuContainer.getByRole("link", { name: item }),
      ).toBeVisible();
    }
  }
}
