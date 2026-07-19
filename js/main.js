import Experience from "./core/experience.js";
import AccessManager from "./access/AccessManager.js";

window.addEventListener("DOMContentLoaded", () => {

    const access = new AccessManager();

    access.onSuccess(() => {
        console.log("SUCCESS");

        new Experience();

    });

});

// window.addEventListener("DOMContentLoaded", () => {
//         new Experience();

// });