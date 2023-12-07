import { test, expect } from "@playwright/test";

test.describe("User login to demobank", () => {
  test("Successful login with correct credentials", async ({ page }) => {
    // Arrange
    const url = "https://demo-bank.vercel.app/";
    const expectedUserName = "Jan Demobankowy";
    const newLocal = "testlow1";
    const userPassword = "12345678";

    // Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(newLocal);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
    const observedTitle = page.getByTestId("user-name");

    //Assert
    await expect(observedTitle).toHaveText(expectedUserName);
  });

  test("Unsuccessful login with too short username", async ({ page }) => {
    // Arrange
    const url = "https://demo-bank.vercel.app/";
    const expectedTitle = "identyfikator ma min. 8 znaków";

    // Act
    await page.goto(url);
    await page.getByTestId("login-input").fill("test");
    await page.getByTestId("password-input").click();
    const observedTitle = page.getByTestId("error-login-id");

    // Assert
    await expect(observedTitle).toHaveText(expectedTitle);
  });

  test("Unsuccessful login with too short password", async ({ page }) => {
    // Arrange
    const url = "https://demo-bank.vercel.app/";
    const expectedTitle = "hasło ma min. 8 znaków";

    // Act
    await page.goto(url);
    await page.getByTestId("login-input").fill("test1111");
    await page.getByTestId("password-input").fill("12345");
    await page.getByTestId("password-input").blur();
    const observedTitle = page.getByTestId("error-login-password");

    // Assert
    await expect(observedTitle).toHaveText(expectedTitle);
  });
});
