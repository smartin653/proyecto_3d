import { THREE } from "../libs/three.js";

export default class AnimationManager {
  constructor(scene, animations) {
    this.mixer = new THREE.AnimationMixer(scene);

    this.animations = animations;
    this.currentAction = null;
    this.currentClip = null;
    this.animationStates = new Map();
    this.animationActions = new Map();
    
  }

  play(interactable) {
    const animationName = interactable.animation;

    if (!animationName) {
      return;
    }

    const clip = THREE.AnimationClip.findByName(this.animations, animationName);

    if (!clip) {
      console.warn("Animation not found:", animationName);

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

  toggle(interactable) {
    const animationName = interactable.animation;

    if (!animationName) {
      return;
    }

    const clip = THREE.AnimationClip.findByName(this.animations, animationName);

    if (!clip) {
      console.warn("Animation not found:", animationName);
      return;
    }

    

    let action = this.animationActions.get(animationName);

    if (!action) {
      action = this.mixer.clipAction(clip);

      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;

      this.animationActions.set(animationName, action);
    }

    const isOpen = this.animationStates.get(animationName) ?? false;

    //action.reset();
    //action.fadeIn(0.3);

    if (isOpen) {
      action.time = clip.duration;
      action.timeScale = -0.8;
    } else {
      action.time = 0;
      action.timeScale = 1;
    }

    action.enabled = true;
    action.paused = false;
    
    action.play();

    this.animationStates.set(animationName, !isOpen);
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
