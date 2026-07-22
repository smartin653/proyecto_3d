import Header from "./Header.js";
import Footer from "./Footer.js";
import MobileMenu from "./MobileMenu.js";

export default class Layout {
  constructor() {
    this.create();
  }

  create() {
    this.element = document.createElement("div");

    this.element.className = "site-layout";

    this.header = new Header();

    this.content = document.createElement("main");
    this.content.className = "site-content";

    this.footer = new Footer();
    this.mobileMenu = new MobileMenu();
    this.mobileMenu.setLinks(this.header.links);

    this.element.appendChild(this.header.element);
    this.element.appendChild(this.content);
    this.element.appendChild(this.footer.element);
    this.element.appendChild(this.mobileMenu.element);
  }

  mount(container) {
    container.appendChild(this.element);
  }

  showPage(page) {

    if (this.page) {
        this.page.destroy();
    }

    this.page = page;

    this.updateLayout(page.constructor.layout);

    this.page.mount(this.content);

}

  updateLayout(config = {}) {

    const {
        header = true,
        footer = true
    } = config;

    this.header.element.style.display = header ? "" : "none";
    this.footer.element.style.display = footer ? "" : "none";

}
}
