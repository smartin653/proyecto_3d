export default class InteractionCard {
  constructor() {
    this.card = document.getElementById("tooltip");

    this.title = this.card.querySelector(".tooltip-title");

    this.button = document.getElementById("tooltip-action");

    this.button.style.display = "none";
    this.currentInteractable = null;
    this.isHovered = false;
    this.hideTimeout = null;
    this.onAction = null;
    this.isLocked = false;
    this.button.addEventListener("click", () => {
      if (!this.currentInteractable) return;

      window.open(this.currentInteractable.url, "_blank");
    });
    this.isHovered = false;
    this.card.addEventListener("mouseenter", () => {
      console.log("ENTER CARD");
      this.isHovered = true;
      this.cancelHide();
    });

    this.card.addEventListener("mouseleave", () => {
      console.log("LEAVE CARD");
      this.isHovered = false;
      this.scheduleHide();
    });
  }

  show(interactable) {
    this.cancelHide();
    this.currentInteractable = interactable;
    this.title.textContent = interactable.title;

    if (interactable.type === "link") {
      this.button.style.display = "block";

      this.button.textContent = interactable.actionLabel;
    } else {
      this.button.style.display = "none";
    }

    this.card.classList.add("visible");
  }

  hide() {

    this.unlock();

    this.card.classList.remove("visible");

}

  move(x, y) {
    this.card.style.left = `${x}px`;

    this.card.style.top = `${y}px`;
  }

  scheduleHide() {
    clearTimeout(this.hideTimeout);

    this.hideTimeout = setTimeout(() => {
      if (!this.isHovered) {
        this.hide();
      }
    }, 120);
  }

  cancelHide() {
    clearTimeout(this.hideTimeout);
  }
  lock() {
    this.isLocked = true;
  }

  unlock() {
    this.isLocked = false;
  }
}
