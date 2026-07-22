export default class Footer {

    constructor() {

        this.create();

    }

    create() {

        this.element = document.createElement("footer");

        this.element.className = "site-footer";

    }

    mount(container) {

        container.appendChild(this.element);

    }

}