import { Page } from "@playwright/test";

export class SideMenuComponent {
  constructor(private page: Page) {}
  paymentLink = this.page.getByRole("link", { name: "płatności" });
}
