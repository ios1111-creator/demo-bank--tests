import { expect, test } from "@playwright/test";

test.describe("Pulpit tests", () => {
  test.beforeEach(async ({ page }) => {
    const userId = "testlow1";
    const userPassword = "12345678";

    await page.goto("");
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
  });

  test("quick payment with correct data", async ({ page }) => {
    // Arrange
    const transferAmount = "150";
    const transferTitle = "opłata za telefon";
    const expectedTransferReceiver = "Chuck Demobankowy";
    const expectedMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;
    const receiverId = "2";

    // Act

    await page.locator("#widget_1_transfer_receiver").selectOption(receiverId);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);

    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();
    const observedTitle = page.getByTestId("message-text");

    // Assert
    await expect(observedTitle).toHaveText(expectedMessage);
  });

  test("Successful mobile top-up", async ({ page }) => {
    // Arrange
    const topupReceiver = "500 xxx xxx";
    const topupAmount = "40";
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

    // Act

    await page.locator("#widget_1_topup_receiver").selectOption(topupReceiver);
    await page.locator("#widget_1_topup_amount").fill(topupAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();
    const observedTitle = page.getByTestId("message-text");

    // Assert
    await expect(observedTitle).toHaveText(expectedMessage);
  });
});
