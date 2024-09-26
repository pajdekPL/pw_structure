import { MultiLevelDropdownPage } from "@pages/qaplayground/multi-level-dropdown.page";
import { test } from "@playwright/test";

test(
  "It is possible to navigate thru dropdown menu to settings and go back",
  { tag: "@DROPDOWN" },
  async ({ page }) => {
    const expectedMenuOptions = ["My Profile", "Settings", "Animals"];
    const expectedSettingOptions = ["HTML", "CSS", "JavaScript", "Awesome!"];

    const multiLevelDropdownPage = new MultiLevelDropdownPage(page);

    await multiLevelDropdownPage.goto();
    await multiLevelDropdownPage.openOptionsDropdown();

    await multiLevelDropdownPage.verifyMenuOptionsAreVisible(
      expectedMenuOptions,
    );

    await multiLevelDropdownPage.openSettingsDropdown();

    await multiLevelDropdownPage.verifyMenuOptionsAreVisible(
      expectedSettingOptions,
    );

    await multiLevelDropdownPage.goBackFromSettings();

    await multiLevelDropdownPage.verifyMenuOptionsAreVisible(
      expectedMenuOptions,
    );
  },
);
