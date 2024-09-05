import { VerifyYourAccount } from "@pages/qaplayground/verify-your-account.page";
import { expect, test } from "@playwright/test";

test("Verify Your Account page contains proper message", async ({ page }) => {
  const expectedMsgText =
    /We emailed you the six digit code to.*@.*\s*Enter the code below to confirm your email address\./;
  const verifyYourAccount = new VerifyYourAccount(page);

  await verifyYourAccount.goto();

  await expect(verifyYourAccount.msgText).toContainText(expectedMsgText);
});

test("Focus starts on the first number and change to the next one after typing digit, focus stayed on the last one when not valid combination provided", async ({
  page,
}) => {
  const expectedDigits = 6;
  const verifyYourAccount = new VerifyYourAccount(page);

  await verifyYourAccount.goto();

  await expect(verifyYourAccount.digitInputs).toHaveCount(expectedDigits);
  await expect(verifyYourAccount.digitInputs.first()).toBeFocused();

  await verifyYourAccount.digitInputs.nth(0).press("1");

  await expect(verifyYourAccount.digitInputs.nth(1)).toBeFocused();

  await verifyYourAccount.digitInputs.nth(1).press("2");

  await expect(verifyYourAccount.digitInputs.nth(2)).toBeFocused();

  await verifyYourAccount.digitInputs.nth(2).press("3");

  await expect(verifyYourAccount.digitInputs.nth(3)).toBeFocused();

  await verifyYourAccount.digitInputs.nth(3).press("4");

  await expect(verifyYourAccount.digitInputs.nth(4)).toBeFocused();

  await verifyYourAccount.digitInputs.nth(4).press("5");

  await expect(verifyYourAccount.digitInputs.nth(5)).toBeFocused();

  await verifyYourAccount.digitInputs.nth(5).press("6");

  await expect(verifyYourAccount.digitInputs.nth(5)).toBeFocused();
});

test("Typing proper code", async ({ page }) => {
  const hardcodedCorrectDigit = "9";
  const verifyYourAccount = new VerifyYourAccount(page);

  await verifyYourAccount.goto();
  await verifyYourAccount.fillAllDigits(hardcodedCorrectDigit);

  await expect(verifyYourAccount.successInformation).toBeVisible();
});
