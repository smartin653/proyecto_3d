export default class IntroOverlay {
  constructor() {
    this.create();
  }

  create() {
    this.element = document.createElement("div");

    this.element.id = "intro-overlay";

    this.element.innerHTML = `

           <div class="intro-content">
      <div class="intro-left">
        
        <h1>
          SIN AGUA ES RUTA YERMA
        </h1>

        <p class="intro-description">
          Cosas pasan cuando hay sol, cosas pasan cuando sale la luna y así todos los días. Las 6 en el reloj marcan el cambio. <br>  <br>
          Ocupa los audios disponibles día tras día y comparte tu música. No olvides registrar tus creaciones con #SAERY.
        </p>

        <button id="enter-btn" disabled>CARGANDO...</button>
      </div>

    </div>

        `;

    document.body.appendChild(this.element);

    this.button = document.getElementById("enter-btn");
    this.video = document.getElementById("intro-video");
  }

  enable() {
    this.button.disabled = false;

    this.button.textContent = "Entrar al HEUBD estudio";
  }

  onEnter(callback) {
    this.button.addEventListener("click", callback);
  }

  showLoadError() {
    if (this.loadErrorShown) {
      return;
    }

    this.loadErrorShown = true;

    const message = document.createElement("p");
    message.className = "intro-description";
    message.textContent =
      "No pudimos cargar el estudio. Revisa tu conexión e inténtalo de nuevo.";

    const retryButton = document.createElement("button");
    retryButton.id = "enter-btn";
    retryButton.textContent = "Reintentar";

    retryButton.addEventListener("click", () => {
      window.location.reload();
    });

    this.button.replaceWith(message, retryButton);
  }

  hide() {
    this.element.classList.add("hidden");
  }
}
