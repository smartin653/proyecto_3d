import { THREE } from "../libs/three.js";

export default class AnimationManager {
  constructor(scene, animations) {
    this.mixer = new THREE.AnimationMixer(scene);

    this.animations = animations;
    this.currentAction = null;
    this.currentClip = null;
    this.currentActions = [];
    this.currentClips = [];
    this.animationStates = new Map();
    this.animationActions = new Map();
    
  }

  play(interactable) {
    const animationNames = Array.isArray(interactable.animations)
      ? interactable.animations
      : [interactable.animation];

    const clips = animationNames
      .filter(Boolean)
      .map((animationName) => {
        const clip = THREE.AnimationClip.findByName(
          this.animations,
          animationName,
        );

        if (!clip) {
          console.warn("Animation not found:", animationName);
        }

        return clip;
      })
      .filter(Boolean);

    if (!clips.length) {
      return;
    }

    if (
      this.currentClips.length === clips.length &&
      this.currentClips.every((clip, index) => clip === clips[index])
    ) {
      return;
    }

    this.stopCurrentAction();

    const actions = clips.map((clip) => {
      const action = this.mixer.clipAction(clip);

      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;

      action.reset();
      action.fadeIn(0.5);
      action.play();

      return action;
    });

    this.currentActions = actions;
    this.currentClips = clips;
    this.currentAction = actions[0];
    this.currentClip = clips[0];
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
    if (!this.currentActions.length && !this.currentAction) {
      return;
    }

    const actions = this.currentActions.length
      ? this.currentActions
      : [this.currentAction];

    actions.forEach((action) => action.fadeOut(0.5));

    this.currentActions = [];
    this.currentClips = [];
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
