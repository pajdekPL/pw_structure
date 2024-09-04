import { TopBarComponent } from "@components/top-bar.component";
import { BasePage } from "@pages/base.page";
import { FrameLocator, Locator, Page } from "@playwright/test";

export class IframePage extends BasePage {
  url = "apps/iframe/";
  topBar = new TopBarComponent(this.page);
  firstLevelIframeLocator = this.page.frameLocator("#frame1");
  secondLevelIframeLocator =
    this.firstLevelIframeLocator.frameLocator("#frame2");
  firstLevelIframe: FirstLevelIframe = new FirstLevelIframe(
    this.firstLevelIframeLocator,
  );
  secondLevelIframe: SecondLevelIframe = new SecondLevelIframe(
    this.secondLevelIframeLocator,
  );
  anchorElement = this.topBar.qaPlaygroundLogo;

  constructor(protected page: Page) {
    super(page);
  }
}

class FirstLevelIframe {
  legend: Locator = this.frameLocator.locator("legend");
  constructor(protected frameLocator: FrameLocator) {}
}

class SecondLevelIframe {
  legend: Locator = this.frameLocator.locator("legend");
  clickMeButton: Locator = this.frameLocator.getByRole("link", {
    name: "Click Me",
  });
  buttonClickedMessage = this.frameLocator.locator("#msg");
  constructor(protected frameLocator: FrameLocator) {}
}
