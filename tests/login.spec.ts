import { test, expect } from "@playwright/test";

test.describe("User login to demobank", () => {
  test("Successful login with correct credentials", async ({ page }) => {
    const expectedTitle = "Jan Demobankowy";
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testlow1");
    await page.getByTestId("password-input").fill("12345678");
    await page.getByTestId("login-button").click();
    const observedTitle = page.getByTestId("user-name");

    await expect(observedTitle).toHaveText(expectedTitle);
  });

  test("Unsuccessful login with too short username", async ({ page }) => {
    const expectedTitle = "identyfikator ma min. 8 znaków";
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("test");
    await page.getByTestId("password-input").click();
    const observedTitle = page.getByTestId("error-login-id");

    await expect(observedTitle).toHaveText(expectedTitle);
  });

  test("Unsuccessful login with too short password", async ({ page }) => {
    const expectedTitle = "hasło ma min. 8 znaków";
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("test1111");
    await page.getByTestId("password-input").fill("12345");
    await page.getByTestId("password-input").blur();
    const observedTitle = page.getByTestId("error-login-password");

    await expect(observedTitle).toHaveText(expectedTitle);
  });
});
