import LaunchConfig from "./LaunchConfig.js";

export default class LaunchOverlay {
  constructor() {
    this.onFinish = null;
    this.config = LaunchConfig;
    this.create();
    this.cacheElements();
    this.setupPoster();
    this.setupButtons();
    this.startCountdown();
  }

  create() {
    this.element = document.createElement("div");
    this.element.id = "launch-overlay";

    this.element.innerHTML = `
    <div class="launch-container">
        
        <h2 class="launch-title">

            ${this.config.title}

        </h2>

        <h2>Podrás ingresar en: </h2>

        <div class="launch-countdown">

            <div class="count-item">
                <span id="count-days" >00</span>
                <small>Días</small>
            </div>

            <div class="count-item">
                <span id="count-hours" >00</span>
                <small>Horas</small>
            </div>

            <div class="count-item">
                <span  id="count-minutes" >00</span>
                <small>Min.</small>
            </div>

            <div class="count-item">
                <span id="count-seconds">00</span>
                <small>Seg.</small>
            </div>

        </div>

        <div class="launch-poster"></div>

        <div class="launch-buttons"></div>

    </div>
`;

    document.body.appendChild(this.element);
  }

  updateCountdown() {
    const time = this.getTimeRemaining();

    this.daysElement.textContent = this.format(time.days);

    this.hoursElement.textContent = this.format(time.hours);

    this.minutesElement.textContent = this.format(time.minutes);

    this.secondsElement.textContent = this.format(time.seconds);
    if (time.difference <= 0) {
      this.destroy();

      if (this.onFinish) {
        this.onFinish();
      }

      return;
    }
  }

  getTimeRemaining() {
    const now = new Date();

    const difference = this.targetDate - now;

    return {
      difference,

      days: Math.floor(difference / (1000 * 60 * 60 * 24)),

      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      ),

      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),

      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  startCountdown() {
    this.targetDate = new Date(this.config.releaseDate);

    this.updateCountdown();

    this.interval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  cacheElements() {
    this.poster = this.element.querySelector(".launch-poster");
    this.daysElement = this.element.querySelector("#count-days");

    this.hoursElement = this.element.querySelector("#count-hours");

    this.minutesElement = this.element.querySelector("#count-minutes");

    this.secondsElement = this.element.querySelector("#count-seconds");
    this.buttonsContainer = this.element.querySelector(".launch-buttons");
  }

  format(value) {
    return String(value).padStart(2, "0");
  }

  setupPoster() {
    this.poster.style.backgroundImage = `url(${this.config.poster})`;
  }

  setupButtons() {
    this.config.buttons.forEach((button) => {
      const element = document.createElement("button");

      element.textContent = button.text;

      element.addEventListener("click", () => {
        window.open(button.url, "_blank");
      });

      this.buttonsContainer.appendChild(element);
    });
  }
  show() {
    this.element.style.display = "flex";
  }
  hide() {
    this.element.style.display = "none";
  }
  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.element.remove();
  }

  isReleased() {
    return new Date() >= new Date(this.config.releaseDate);
  }
}
