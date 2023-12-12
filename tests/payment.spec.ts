import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
test.describe("Payment tests", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test("Simple payment", async ({ page }) => {
    // Arrange
    const observedMessage = page.locator("#show_messages");
    const transferReceiver = "Adam Nowak";
    const transferAmount = "3333";
    const transferAccount = "12 3445 5667 2342 3423 4234 23423";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act
    await page.getByRole("link", { name: "płatności" }).click();
    await page.getByTestId("transfer_receiver").fill(transferReceiver);
    await page.getByTestId("form_account_to").fill(transferAccount);
    await page.getByTestId("form_amount").fill(transferAmount);
    await page.getByRole("button", { name: "wykonaj przelew" }).click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(observedMessage).toHaveText(expectedMessage);
  });
});
