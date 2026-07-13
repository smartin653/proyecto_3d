export default class OrientationOverlay {
  constructor() {
    this.overlay = document.getElementById("orientation-overlay");

    this.checkOrientation = this.checkOrientation.bind(this);

    window.addEventListener(
      "resize",

      this.checkOrientation,
    );
  }

  show() {
    if (!this.isMobile()) return;

    this.overlay.classList.add("visible");

    setTimeout(() => {
      this.hide();
    }, 3500);
  }

  hide() {
    this.overlay.classList.remove("visible");
  }

  isMobile() {
    return window.innerWidth <= 768;
  }

  checkOrientation() {
    if (!this.overlay.classList.contains("visible")) {
      return;
    }

    if (window.innerWidth > window.innerHeight) {
      this.hide();
    }
  }
}
