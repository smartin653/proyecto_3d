export default class AccessManager {
  constructor() {
    this.password = "EsRuta2026*";

    this.callback = null;

    this.createUI();
    this.bindEvents();
  }

  onSuccess(callback) {

    this.callback = callback;

}

  createUI() {
    this.overlay = document.createElement("div");

    this.overlay.id = "access-overlay";

    this.overlay.innerHTML = `
        <div id="access-card">

            <h1>ED</h1>

            <p>Acceso privado</p>

            <input
                id="access-input"
                type="password"
                placeholder="Contraseña"
            >

            <button id="access-button">

                Entrar

            </button>

            <div id="access-error">

                Contraseña incorrecta

            </div>

        </div>
    `;

    document.body.appendChild(this.overlay);

    this.input = document.getElementById("access-input");
    this.button = document.getElementById("access-button");
    this.error = document.getElementById("access-error");
  }

  bindEvents() {
    this.button.addEventListener(
      "click",
      () => this.validate()
    );

    this.input.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          this.validate();
        }
      }
    );
  }

  validate() {

    if (this.input.value === this.password) {

        this.error.style.display = "none";

        this.input.value = "";

        this.overlay.remove();

        if (this.callback) {

            this.callback();

        }

    } else {

        this.error.style.display = "block";

        this.input.select();

    }

}
}