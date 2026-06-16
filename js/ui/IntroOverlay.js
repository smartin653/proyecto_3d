export default class IntroOverlay {

    constructor() {

        this.create();

    }

    create() {

        this.element =
            document.createElement("div");

        this.element.id =
            "intro-overlay";

        this.element.innerHTML = `

            <div class="intro-content">

    <div class="intro-left">

        <div class="intro-label">

            ● ESTUDIO INTERACTIVO

        </div>

        <h1>
            ED<br>
            MAVERICK
        </h1>

        <div class="intro-line"></div>

        <p class="intro-description">

            Explora el estudio donde nacen las canciones.
            Descubre grabaciones, recuerdos y sesiones inéditas.

        </p>

        <button id="enter-btn" disabled>

            CARGANDO...

        </button>

        <div class="intro-footer">

            🎧 Usa audífonos para una mejor experiencia

        </div>

    </div>

    <div class="intro-right">

        <video src="assets/video/Portada.mp4" autoplay></video>


    </div>

</div>

        `;

        document.body.appendChild(
            this.element
        );

        this.button =
            document.getElementById(
                "enter-btn"
            );

    }

    enable() {

        this.button.disabled = false;

        this.button.textContent =
            "Entrar al estudio";

    }

    onEnter(callback) {

        this.button.addEventListener(
            "click",
            callback
        );

    }

    hide() {

        this.element.classList.add(
            "hidden"
        );

    }

}