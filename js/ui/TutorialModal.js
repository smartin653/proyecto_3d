export default class TutorialModal {
  constructor() {
    this.videoUrl = this.getVideo();
    this.create();

    this.bindEvents();
  }

  getVideo() {
    if (window.innerWidth <= 768) {
      return "https://assets.esrutayerma.com/videos/260721_Instrucciones%20Vertical.mp4";
    }

    return "https://assets.esrutayerma.com/videos/260721_Instrucciones%20Escritorio.mp4";
  }

  create() {
    this.container = document.createElement("div");

    this.container.innerHTML = `

            <button class="tutorial-button">

                ?

            </button>

            <div class="tutorial-overlay">

                <div class="tutorial-modal">

                    <button class="tutorial-close">

                        ✕

                    </button>

                    <video
                        class="tutorial-video"
                        controls
                        playsinline
                    >

                        <source
    src="${this.videoUrl}"
    type="video/mp4"
>

                    </video>

                </div>

            </div>

        `;

    document.body.appendChild(this.container);

    this.button = this.container.querySelector(".tutorial-button");

    this.overlay = this.container.querySelector(".tutorial-overlay");

    this.closeButton = this.container.querySelector(".tutorial-close");

    this.video = this.container.querySelector(".tutorial-video");
  }

  bindEvents() {
    this.button.addEventListener(
      "click",

      () => this.show(),
    );

    this.closeButton.addEventListener(
      "click",

      () => this.hide(),
    );
  }

  show() {
    this.overlay.classList.add("active");

    this.video.currentTime = 0;

    this.video.play();
  }

  hide() {
    this.overlay.classList.remove("active");

    this.video.pause();

    this.video.currentTime = 0;
  }
}
