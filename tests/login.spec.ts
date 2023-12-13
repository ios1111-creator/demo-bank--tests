import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("User login to demobank", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("Successful login with correct credentials", async ({ page }) => {
    // Arrange
    const expectedUserName = "Jan Demobankowy";
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    //Assert
    const pulpitPage = new PulpitPage(page);
    await expect(pulpitPage.userNameText).toHaveText(expectedUserName);
  });

  test("Unsuccessful login with too short username", async ({ page }) => {
    // Arrange
    const expectedErrorMessage = "identyfikator ma min. 8 znaków";
    const incorrectUserId = "test";

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordInput.click();

    // Assert
    await expect(loginPage.loginError).toHaveText(expectedErrorMessage);
  });

  test("Unsuccessful login with too short password", async ({ page }) => {
    // Arrange
    const expectedErrorMessage = "hasło ma min. 8 znaków";
    const userId = loginData.userId;
    const incorrectUserPassword = "12345";

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectUserPassword);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);
  });
});
