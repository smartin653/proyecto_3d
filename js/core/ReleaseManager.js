export default class ReleaseManager {

    constructor() {

        this.config = {};

    }

    async load(url) {

        try {

            const response = await fetch(url);

            if (!response.ok) {

                throw new Error(`HTTP ${response.status}`);

            }

            this.config = await response.json();

            console.log("ReleaseManager");
            console.log(this.config);

        }
        catch (error) {

            console.error(error);

        }

    }

   getConfig(type, name) {

    return this.config[type]?.[name] ?? null;

}

isVisible(type, name) {

    return this.getConfig(type, name) !== null;

}

}