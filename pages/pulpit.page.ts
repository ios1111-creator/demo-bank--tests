import { Page } from "@playwright/test";

export class PulpitPage {
  constructor(private page: Page) {}

  transferReceiverSelect = this.page.locator("#widget_1_transfer_receiver");
  transferAmountInput = this.page.locator("#widget_1_transfer_amount");
  transferTitle = this.page.locator("#widget_1_transfer_title");

  transferButton = this.page.locator("#execute_btn");
  actionCloseButton = this.page.getByTestId("close-button");

  messageText = this.page.getByTestId("message-text");

  topupReceiverInput = this.page.locator("#widget_1_topup_receiver");
  topupAmountInput = this.page.locator("#widget_1_topup_amount");
  topupAgreementSpanCheckbox = this.page.locator("#uniform-widget_1_topup_agreement span");
  topupExecuteButton = this.page.getByRole("button", { name: "doładuj telefon" });

  moneyValueText = this.page.locator("#money_value");
  userNameText = this.page.getByTestId("user-name");
}
