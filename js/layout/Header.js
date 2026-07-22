export default class Header {
  constructor() {
    this.links = [
      {
        label: "Home",
        route: "/",
      },
      {
        label: "Tour",
        route: "/tour",
      },
    ];
    this.linkElements = [];
    this.onMenuClick = null;
    this.onNavigate = null;

    this.create();
  }

  create() {
    this.element = document.createElement("header");

    this.element.className = "site-header";

    this.element.innerHTML = `

            <div class="header-left">

                <a href="#" class="header-logo">
                    LOGO
                </a>

            </div>

            <nav class="header-nav"></nav>

            <div class="header-right">

                <button class="menu-button" aria-label="Open menu">

                    ☰

                </button>

            </div>

        `;

    this.logo = this.element.querySelector(".header-logo");
    this.navigation = this.element.querySelector(".header-nav");
    this.menuButton = this.element.querySelector(".menu-button");

    this.createNavigation();
    this.bindEvents();
  }

  createNavigation() {
    this.links.forEach((link) => {
      const item = document.createElement("a");

      item.className = "header-link";

      item.href = "#";

      item.textContent = link.label;

      item.dataset.route = link.route;
      this.linkElements.push(item);

      item.addEventListener("click", (event) => {
        event.preventDefault();

        if (this.onNavigate) {
          this.onNavigate(link.route);
        }
      });

      this.navigation.appendChild(item);
    });
  }

  mount(container) {
    container.appendChild(this.element);
  }

  setActive(route) {
    this.linkElements.forEach((link) => {
      link.classList.toggle("active", link.dataset.route === route);
    });
  }

  bindEvents() {
    this.menuButton.addEventListener("click", () => {
      if (this.onMenuClick) {
        this.onMenuClick();
      }
    });
  }
}
