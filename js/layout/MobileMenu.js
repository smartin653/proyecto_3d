export default class MobileMenu {
  constructor() {
    this.links = [];

    this.isOpen = false;
    this.onNavigate = null;
    this.create();
  }

  create() {
    this.element = document.createElement("aside");

    this.element.className = "mobile-menu";
  }

  setLinks(links) {
    this.links = links;

    this.render();
  }

  render() {
    this.element.innerHTML = "";

    // Encabezado
    const header = document.createElement("div");

    header.className = "mobile-menu-header";

    const closeButton = document.createElement("button");

    closeButton.className = "mobile-menu-close";

    closeButton.setAttribute("aria-label", "Cerrar menú");

    closeButton.innerHTML = "&times;";

    closeButton.addEventListener("click", () => {
      this.close();
    });

    header.appendChild(closeButton);

    // Navegación
    const nav = document.createElement("nav");

    nav.className = "mobile-menu-nav";

    this.links.forEach((link) => {
      const item = document.createElement("a");

      item.className = "mobile-menu-link";

      item.href = "#";

      item.textContent = link.label;

      item.dataset.route = link.route;

      item.addEventListener("click", (event) => {
        event.preventDefault();

        if (this.onNavigate) {
          this.onNavigate(link.route);
        }
      });

      nav.appendChild(item);
    });

    this.element.appendChild(header);

    this.element.appendChild(nav);
  }
  open() {
    this.element.classList.add("open");

    this.isOpen = true;
  }

  close() {
    this.element.classList.remove("open");

    this.isOpen = false;
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}
