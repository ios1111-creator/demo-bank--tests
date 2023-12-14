import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Payment tests", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto("/");
    const loginPage = new LoginPage(page);
    loginPage.login(userId, userPassword);
  });

  test("Simple payment", async ({ page }) => {
    // Arrange
    const transferReceiver = "Adam Nowak";
    const transferAmount = "3333";
    const transferAccount = "12 3445 5667 2342 3423 4234 23423";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenuComponent.paymentLink.click();

    const paymentPage = new PaymentPage(page);
    paymentPage.makeTransfer(transferReceiver, transferAccount, transferAmount);

    // Assert
    await expect(paymentPage.messageText).toHaveText(expectedMessage);
  });
});
