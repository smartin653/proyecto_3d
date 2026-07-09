export default class Toast {

    constructor() {

        this.create();

    }

    create() {

        this.toast = document.createElement("div");

        this.toast.id = "toast";

        document.body.appendChild(this.toast);

        this.timeout = null;

    }

    show(message, icon = "✓") {

        clearTimeout(this.timeout);

        this.toast.innerHTML = `

            <span class="toast-icon">${icon}</span>

            <span>${message}</span>

        `;

        this.toast.classList.add("active");

        this.timeout = setTimeout(() => {

            this.hide();

        }, 2500);

    }

    hide() {

        this.toast.classList.remove("active");

    }

}