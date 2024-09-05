import { test } from "@fixtures/automationintesting-ui.fixture";
import { AdminPage } from "@pages/automationintesting/admin-panel.page";
import { expect } from "playwright/test";

test("Admin sees create booking buttton @ADMINPAGE", async ({
  adminAuthPage,
}) => {
  const adminPage = new AdminPage(adminAuthPage);

  await adminPage.goto();

  await expect(adminPage.createBookingButton).toBeVisible();
});
