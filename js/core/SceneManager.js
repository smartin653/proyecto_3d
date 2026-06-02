// js/core/SceneManager.js

import { THREE } from "../libs/three.js";

export default class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();

    this.setup();
  }

  setup() {
    // Color temporal de fondo
    this.scene.background = new THREE.Color(0x111111);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(5, 10, 5);

    this.scene.add(directionalLight);
    this.scene.add(hemisphereLight);

    this.scene.add(ambientLight);
    // const axesHelper = new THREE.AxesHelper(5);
    // this.scene.add(axesHelper);

    console.log("Scene created");

    console.log("Scene created");
  }

  getScene() {
    return this.scene;
  }
}
