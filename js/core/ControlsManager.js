// js/core/ControlsManager.js

import { OrbitControls } from "../libs/three.js";

export default class ControlsManager {
  constructor(camera, canvas) {
    this.controls = new OrbitControls(camera, canvas);

    this.controls.target.set(0, 1, 0);

    this.controls.update();

    this.setup();
  }

  setup() {
    this.controls.enableDamping = true;
  }

  update() {
    this.controls.update();
  }
}
