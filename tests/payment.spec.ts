import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";

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
    const paymentPage = new PaymentPage(page);
    const transferReceiver = "Adam Nowak";
    const transferAmount = "3333";
    const transferAccount = "12 3445 5667 2342 3423 4234 23423";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act
    await page.getByRole("link", { name: "płatności" }).click();
    await paymentPage.transferReceiverInput.fill(transferReceiver);
    await paymentPage.transferToInput.fill(transferAccount);
    await paymentPage.transferAmountInput.fill(transferAmount);

    await paymentPage.transferButton.click();
    await paymentPage.actionCloseButton.click();

    // Assert
    await expect(paymentPage.messageText).toHaveText(expectedMessage);
  });
});
