import { expect, test } from "@playwright/test";

const login = async (page) => {
  const userId = "testlow1";
  const newLocal = "12345678";

  await page.goto("");
  await page.getByTestId("login-input").fill(userId);
  await page.getByTestId("password-input").fill(newLocal);
  await page.getByTestId("login-button").click();
};

test.describe("Pulpit tests", () => {
  test("quick payment with correct data", async ({ page }) => {
    // Arrange
    const transferAmount = "150";
    const transferTitle = "opłata za telefon";
    const expectedTransferReceiver = "Chuck Demobankowy";
    const expectedTitle = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;
    const receiverId = "2";

    // Act
    await login(page);

    await page.locator("#widget_1_transfer_receiver").selectOption(receiverId);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);

    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();
    const observedTitle = page.getByTestId("message-text");

    // Assert
    await expect(observedTitle).toHaveText(expectedTitle);
  });

  test("Successful mobile top-up", async ({ page }) => {
    const expectedTitle = "Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx";

    await login(page);

    await page.locator("#widget_1_topup_receiver").selectOption("500 xxx xxx");
    await page.locator("#widget_1_topup_amount").fill("40");
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();
    const observedTitle = page.getByTestId("message-text");
    await expect(observedTitle).toHaveText(expectedTitle);
  });
});
