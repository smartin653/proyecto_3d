// js/core/SceneManager.js

import { THREE } from "../libs/three.js";

export default class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();

    this.setup();
  }

  setup() {

    this.scene.background = new THREE.Color(0x111111);

}

 
  getScene() {
    return this.scene;
  }
}
