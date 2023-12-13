import { expect, test } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Pulpit tests", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test("quick payment with correct data", async ({ page }) => {
    // Arrange
    const pulpitPage = new PulpitPage(page);
    const receiverId = "2";
    const transferAmount = "150";
    const transferTitle = "opłata za telefon";
    const expectedTransferReceiver = "Chuck Demobankowy";
    const expectedMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    // Act
    await pulpitPage.transferReceiverSelect.selectOption(receiverId);
    await pulpitPage.transferAmountInput.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);

    await pulpitPage.transferButton.click();
    await pulpitPage.actionCloseButton.click();

    // Assert
    await expect(pulpitPage.messageText).toHaveText(expectedMessage);
  });

  test("Successful mobile top-up", async ({ page }) => {
    // Arrange
    const pulpitPage = new PulpitPage(page);
    const topupReceiver = "500 xxx xxx";
    const topupAmount = "40";
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

    // Act

    await pulpitPage.topupReceiverInput.selectOption(topupReceiver);
    await pulpitPage.topupAmountInput.fill(topupAmount);
    await pulpitPage.topupAgreementSpanCheckbox.click();
    await pulpitPage.topupExecuteButton.click();
    await pulpitPage.actionCloseButton.click();

    // Assert
    await expect(pulpitPage.messageText).toHaveText(expectedMessage);
  });

  test("Correct balance after successful mobile top-up ", async ({ page }) => {
    // Arrange
    const pulpitPage = new PulpitPage(page);
    const topupReceiver = "500 xxx xxx";
    const topupAmount = "40";
    const initialBalance = await page.locator("#money_value").innerText();
    const expectedBalanced = Number(initialBalance) - Number(topupAmount);

    // Act
    await pulpitPage.topupReceiverInput.selectOption(topupReceiver);
    await pulpitPage.topupAmountInput.fill(topupAmount);
    await pulpitPage.topupAgreementSpanCheckbox.click();
    await pulpitPage.topupExecuteButton.click();
    await pulpitPage.actionCloseButton.click();

    // Assert
    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalanced}`);
  });
});
