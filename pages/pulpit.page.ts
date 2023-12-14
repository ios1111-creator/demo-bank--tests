import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenuComponent = new SideMenuComponent(this.page);

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

  async executeQuickPayment(receiverId: string, transferAmount: string, transferTitle: string): Promise<void> {
    await this.transferReceiverSelect.selectOption(receiverId);
    await this.transferAmountInput.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);

    await this.transferButton.click();
    await this.actionCloseButton.click();
  }

  async executeMobileTopUp(topupReceiver: string, topupAmount: string): Promise<void> {
    await this.topupReceiverInput.selectOption(topupReceiver);
    await this.topupAmountInput.fill(topupAmount);
    await this.topupAgreementSpanCheckbox.click();
    await this.topupExecuteButton.click();
    await this.actionCloseButton.click();
  }
}
