import { THREE, RGBELoader } from "../libs/three.js";
import environmentPresets from "../config/environmentPresets.js";

export default class EnvironmentManager {
  constructor(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;

    this.lights = {};

    this.currentPreset = null;

    this.scene.environment = null;
    //----------------------------------
    // Environment State
    //----------------------------------

    this.mode = "morning";
    this.autoMode = true;
    this.listeners = [];
    this.presets = environmentPresets;

    this.scene.background = null;
    this.importedLights = [];
  }

  loadEnvironment() {}

  detectMode() {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) {
      return "morning";
    }

    if (hour >= 12 && hour < 19) {
      return "afternoon";
    }

    return "night";
  }

  setMode(mode) {
    if (this.mode === mode) return;

    this.mode = mode;

    console.log("🌤 Environment:", this.mode);

    this.notify();
  }

  getCurrentPreset() {

    return this.presets[this.mode];

}

  notify() {
    this.listeners.forEach((callback) => {
      callback(this.mode);
    });
  }

  onChange(callback) {
    this.listeners.push(callback);
  }

  initialize() {

    if (!this.autoMode) return;

    this.setMode(
        this.detectMode()
    );

}

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
