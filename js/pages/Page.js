export default class Page {

    constructor() {

        this.create();

    }

    create() {

        this.element = document.createElement("div");

    }

    mount(container) {

        container.appendChild(this.element);

    }

    destroy() {

        this.element.remove();

    }

}