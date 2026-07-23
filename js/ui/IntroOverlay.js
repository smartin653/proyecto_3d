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

    this.button.textContent = "Entrar al estudio";
  }

  onEnter(callback) {
    this.button.addEventListener("click", callback);
  }

  hide() {
    this.element.classList.add("hidden");
  }
}
