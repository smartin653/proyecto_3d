// js/core/ControlsManager.js

import { OrbitControls } from "../libs/three.js";

export default class ControlsManager {
  constructor(camera, canvas) {
    this.controls = new OrbitControls(camera, canvas);

    this.controls.target.set(0, 1.4, 0);

    this.controls.update();

    this.setup();
  }

  setup() {
    this.controls.enableDamping = true;

    this.controls.enablePan = false;

    this.controls.minDistance = 0;

    this.controls.maxDistance = 2;

    this.controls.minPolarAngle = .10;

    this.controls.maxPolarAngle = Math.PI / 2;
  }

  update() {
    this.controls.update();
  }
}
