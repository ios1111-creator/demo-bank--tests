import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";

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
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
    const observedTitle = page.getByTestId("user-name");

    //Assert
    await expect(observedTitle).toHaveText(expectedUserName);
  });

  test("Unsuccessful login with too short username", async ({ page }) => {
    // Arrange
    const expectedErrorMessage = "identyfikator ma min. 8 znaków";
    const incorrectUserId = "test";

    // Act
    await page.getByTestId("login-input").fill(incorrectUserId);
    await page.getByTestId("password-input").click();
    const observedErrorMessage = page.getByTestId("error-login-id");

    // Assert
    await expect(observedErrorMessage).toHaveText(expectedErrorMessage);
  });

  test("Unsuccessful login with too short password", async ({ page }) => {
    // Arrange
    const expectedErrorMessage = "hasło ma min. 8 znaków";
    const userId = loginData.userId;
    const incorrectUserPassword = "12345";

    // Act
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(incorrectUserPassword);
    await page.getByTestId("password-input").blur();
    const observedErrorMessage = page.getByTestId("error-login-password");

    // Assert
    await expect(observedErrorMessage).toHaveText(expectedErrorMessage);
  });
});
