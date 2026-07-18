import { THREE } from "../libs/three.js";

export default class AnimationManager {
  constructor(scene, animations) {
    this.mixer = new THREE.AnimationMixer(scene);

    this.animations = animations;
    this.currentAction = null;
    this.currentClip = null;
  }

  play(interactable) {
    const animationName = interactable.animation;

    if (!animationName) {
      return;
    }

    const clip = THREE.AnimationClip.findByName(this.animations, animationName);

    if (!clip) {
      console.warn("Animation not found:", name);

      return;
    }

    if (this.currentClip === clip) {
      return;
    }

    this.stopCurrentAction();

    const action = this.mixer.clipAction(clip);
    this.currentAction = action;
    this.currentClip = clip;
    action.setLoop(THREE.LoopOnce);
    action.clampWhenFinished = true;

    action.reset();
    action.fadeIn(0.5);
    action.play();
  }

  stopCurrentAction() {
    if (!this.currentAction) {
      return;
    }

    this.currentAction.fadeOut(0.5);

    this.currentAction = null;

    this.currentClip = null;
  }

  update(delta) {
    this.mixer.update(delta);
  }

  stop() {
    this.stopCurrentAction();
  }
}
