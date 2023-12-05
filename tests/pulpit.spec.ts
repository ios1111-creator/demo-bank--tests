import { expect, test } from "@playwright/test";

const login = async (page) => {
  await page.goto("");
  await page.getByTestId("login-input").fill("testlow1");
  await page.getByTestId("password-input").fill("12345678");
  await page.getByTestId("login-button").click();
};

test.describe("Pulpit tests", () => {
  test("quick payment with correct data", async ({ page }) => {
    const describe = "opłata za telefon";
    const expectedTitle = "Przelew wykonany! Chuck Demobankowy - 150,00PLN - " + describe;

    await login(page);

    await page.locator("#widget_1_transfer_receiver").selectOption("2");
    await page.locator("#widget_1_transfer_amount").fill("150");
    await page.locator("#widget_1_transfer_title").fill(describe);
    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();
    const observedTitle = page.getByTestId("message-text");

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
