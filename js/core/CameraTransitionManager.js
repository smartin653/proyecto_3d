import { THREE } from "../libs/three.js";

export default class CameraTransitionManager {
  constructor(camera, controls) {
    this.camera = camera;
    this.controls = controls;

    this.isMoving = false;

    this.startPosition = new THREE.Vector3();
    this.endPosition = new THREE.Vector3();

    this.startTarget = new THREE.Vector3();
    this.endTarget = new THREE.Vector3();

    this.progress = 0;

    this.duration = 5;
  }

  flyTo(position, target, duration = this.duration) {
    this.duration = duration;

    this.startPosition.copy(this.camera.position);

    this.startTarget.copy(this.controls.target);

    this.endPosition.set(position.x, position.y, position.z);

    this.endTarget.set(target.x, target.y, target.z);

    this.progress = 0;

    this.isMoving = true;
  }

  update(delta) {
    if (!this.isMoving) return;

    this.progress += delta;

    const t = Math.min(this.progress / this.duration, 1);

    this.camera.position.lerpVectors(this.startPosition, this.endPosition, t);

    this.controls.target.lerpVectors(this.startTarget, this.endTarget, t);

    this.controls.update();

    if (t >= 1) {
      this.isMoving = false;
    }
  }
}
