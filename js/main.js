// import Experience from "./core/experience.js";
// import AccessManager from "./access/AccessManager.js";
// import LaunchOverlay from "./launch/LaunchOverlay.js";
// import LaunchConfig from "./launch/LaunchConfig.js";

// // window.addEventListener("DOMContentLoaded", () => {

// //     const access = new AccessManager();

// //     access.onSuccess(() => {
// //         console.log("SUCCESS");

// //         new Experience();

// //     });

// // });

// // window.addEventListener("DOMContentLoaded", () => {
// //         new LaunchOverlay();

// // });

// // window.addEventListener("DOMContentLoaded", () => {

// //     console.log("LaunchOverlay:", LaunchOverlay);

// //     new LaunchOverlay();

// // });

// window.addEventListener("DOMContentLoaded", () => {
//   // Si el lanzamiento está deshabilitado
//   if (!LaunchConfig.enabled) {
//     const access = new AccessManager();

//     access.onSuccess(() => {
//       new Experience();
//     });

//     return;
//   }

//   // Si está habilitado
//   const launch = new LaunchOverlay();

//   launch.onFinish = () => {
//     const access = new AccessManager();

//     access.onSuccess(() => {
//       new Experience();
//     });
//   };
// });


import App from "./App.js";
import Experience from "./core/experience.js";

window.addEventListener("DOMContentLoaded", () => {

    new App();

});