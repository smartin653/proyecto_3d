import LaunchConfig from "./launch/LaunchConfig.js";
import LaunchOverlay from "./launch/LaunchOverlay.js";
import Layout from "./layout/Layout.js";
import Router from "./router/Router.js";
import Experience from "./core/experience.js";

export default class App {
  constructor() {
    this.website = document.querySelector("#website");

    this.experience = new Experience();

    this.start();
  }

  start() {
    if (!LaunchConfig.enabled) {
      this.startApplication();
      return;
    }

    const launch = new LaunchOverlay();

    launch.onFinish = () => {
      this.startApplication();
    };
  }

  startApplication() {
  this.layout = new Layout();
  this.layout.mount(this.website);

  this.router = new Router(this.layout);

  this.router.onPageChange = (page) => {
    this.applyConfig(page.constructor.config);
  };

  this.layout.header.onNavigate = (route) => {
    this.navigate(route);
  };

  this.layout.header.onMenuClick = () => {
    this.layout.mobileMenu.toggle();
  };

  this.layout.mobileMenu.onNavigate = (route) => {
    this.navigate(route);
    this.layout.mobileMenu.close();
  };

  this.router.start();
}

  applyConfig(config) {
    this.layout.updateLayout(config);

    if (config.experience) {
      this.hideWebsite();
      this.showExperience();
    } else {
      this.showWebsite();
      this.hideExperience();
    }
  }

  navigate(route) {
    this.router.navigate(route);
    this.layout.header.setActive(route);
  }

  showWebsite() {
    this.website.style.display = "block";
  }

  hideWebsite() {
    this.website.style.display = "none";
  }

  showExperience() {
    this.experience.show();
  }

  hideExperience() {
    this.experience.hide();
  }
}