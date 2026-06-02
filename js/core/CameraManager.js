// js/core/CameraManager.js

import { THREE } from "../libs/three.js";

export default class CameraManager {
  constructor(container) {
    this.container = container;

    this.camera = null;

    this.createCamera();
  }

  createCamera() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    // Posición temporal
    this.camera.position.set(10, 2, 0);
    this.camera.lookAt(0, 1.3, -0.5);

    console.log("Camera created");
  }

  getCamera() {
    return this.camera;
  }

  resize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
