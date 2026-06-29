import { THREE, RGBELoader } from "../libs/three.js";

export default class EnvironmentManager {
  constructor(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;

    this.lights = {};

    this.currentPreset = null;
    //this.createAmbient();

    //this.createHemisphere();

    //this.createKeyLight();
    //this.createSun();

    //this.loadHDRI();
    this.scene.environment = null;
    this.scene.background = null;
    this.importedLights = [];
  }

  // createAmbient() {
  //   this.lights.ambient = new THREE.AmbientLight(0xffffff, 0.15);

  //   this.scene.add(this.lights.ambient);
  // }

  // createHemisphere() {
  //   this.lights.hemisphere = new THREE.HemisphereLight(
  //     0xffffff,

  //     0x3d2d24,

  //     0.35,
  //   );

  //   this.scene.add(this.lights.hemisphere);
  // }

  // createSun() {
  //   this.lights.sun = new THREE.DirectionalLight(0xffffff, 1.2);

  //   this.lights.sun.position.set(4, 7, 4);

  //   this.lights.sun.castShadow = true;

  //   this.lights.sun.shadow.mapSize.set(2048, 2048);

  //   this.lights.sun.shadow.bias = -0.0002;

  //   this.scene.add(this.lights.sun);
  // }

  // createKeyLight() {
  //   this.lights.key = new THREE.SpotLight(0xffffff, 20);

  //   this.lights.key.position.set(0, 5, 5);

  //   this.lights.key.angle = THREE.MathUtils.degToRad(70);

  //   this.lights.key.penumbra = 0.6;

  //   this.lights.key.decay = 2;

  //   this.lights.key.distance = 15;

  //   this.lights.key.castShadow = true;
  //   this.lights.key.intensity = 200;
  //   this.lights.key.shadow.mapSize.set(2048, 2048);

  //   this.lights.key.target.position.set(0, 1, 0);

  //   this.scene.add(this.lights.key.target);

  //   this.scene.add(this.lights.key);
  //   this.keyHelper = new THREE.SpotLightHelper(this.lights.key);

  //   this.scene.add(this.keyHelper);
  // }

  // loadHDRI() {
  //   const loader = new RGBELoader();

  //   loader.load(
  //     "./assets/hdri/studio.hdr",

  //     (texture) => {
  //       texture.mapping = THREE.EquirectangularReflectionMapping;

  //       this.scene.environment = texture;
  //     },
  //   );
  // }

  loadEnvironment() {}

  setPreset(name) {}

  update() {
    if (this.keyHelper) {
      this.keyHelper.update();
    }
  }

  setupDebug(gui) {
    this.gui = gui;

    gui.addFolder("💡 Lighting");
  }

  setImportedLights(lights) {
    this.importedLights = lights;

    if (this.gui) {
      this.setupImportedLightsDebug(this.gui);
    }
  }

  setupImportedLightsDebug(gui, lights) {
    const folder = gui.addFolder("💡 Imported Lights");

    lights.forEach((light) => {
      const f = folder.addFolder(light.name);

      //----------------------------------
      // Intensity
      //----------------------------------

      f.add(light, "intensity", 0, 6000, 1);

      //----------------------------------
      // Bias
      //----------------------------------

      f.add(light.shadow, "bias", -0.01, 0.01, 0.00001);

      //----------------------------------
      // Normal Bias
      //----------------------------------

      f.add(light.shadow, "normalBias", 0, 5, 0.01);

      //----------------------------------
      // Radius
      //----------------------------------

      f.add(light.shadow, "radius", 0, 10, 0.1);

      //----------------------------------
      // Near
      //----------------------------------

      f.add(light.shadow.camera, "near", 0.01, 10, 0.01).onChange(() => {
        light.shadow.camera.updateProjectionMatrix();
      });

      //----------------------------------
      // Far
      //----------------------------------

      f.add(light.shadow.camera, "far", 1, 100, 0.1).onChange(() => {
        light.shadow.camera.updateProjectionMatrix();
      });

      //----------------------------------
      // Shadow Resolution
      //----------------------------------

      const settings = {
        mapSize: 2048,
      };

      f.add(settings, "mapSize", [512, 1024, 2048, 4096]).onChange((value) => {
        light.shadow.mapSize.set(value, value);

        light.shadow.dispose();
      });


      // Blur Samples (solo VSM)
      f.add(light.shadow, "blurSamples", 1, 25, 1);

      
    });
  }
}
