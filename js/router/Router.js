import HomePage from "../pages/HomePage.js";
import TourPage from "../pages/TourPage.js";

export default class Router {
  constructor(layout) {
    this.layout = layout;

    this.routes = {
      "/": HomePage,
      "/tour": TourPage,
    };

    window.addEventListener("popstate", () => {
      this.load(window.location.pathname);
    });
  }

  start() {
    this.load(window.location.pathname);
  }

  navigate(path) {
    history.pushState({}, "", path);

    this.load(path);
  }

  load(path) {

    const Page = this.routes[path];

    if (!Page) {
        console.warn(`Ruta no encontrada: ${path}`);
        return;
    }

    const page = new Page();

    this.layout.showPage(page);

    if (this.onPageChange) {
        this.onPageChange(page);
    }

}
}
