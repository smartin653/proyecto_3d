import {
  EffectComposer,
  RenderPass,
  OutputPass,
  ShaderPass,
} from "../libs/three.js";

import { ChromaticAberrationShader } from "../effects/ChromaticAberrationShader.js";
import AnimatedValue from "./AnimatedValue.js";

export default class EffectsManager {
  constructor(rendererManager, scene, camera) {
    this.rendererManager = rendererManager;
    this.renderer = rendererManager.renderer;

    this.scene = scene;
    this.camera = camera;

    this.mode = "normal";

    this.composer = null;
    this.renderPass = null;

    this.aberration = new AnimatedValue(0, 3);
    this.createComposer();
  }

  setChromaticAberration(value) {
    this.aberration.set(value);
  }

  createComposer() {
    this.composer = new EffectComposer(this.renderer);

    this.renderPass = new RenderPass(this.scene, this.camera);

    this.chromaticAberrationPass = new ShaderPass(ChromaticAberrationShader);

    // El efecto inicia apagado
    this.chromaticAberrationPass.uniforms.strength.value = 0;

    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.chromaticAberrationPass);
    this.composer.addPass(new OutputPass());
  }

  update(delta) {
    this.chromaticAberrationPass.uniforms.strength.value =
      this.aberration.update(delta);
  }

  enterCinematic() {
    this.mode = "cinematic";
    this.setChromaticAberration(0.006);
  }

  exitCinematic() {
    this.setChromaticAberration(0);
    this.mode = "normal";
  }

  renderNormal() {
    this.renderer.render(this.scene, this.camera);
  }

  renderCinematic() {
    this.composer.render();
  }

  resize() {
    this.composer.setSize(
      this.renderer.domElement.width,
      this.renderer.domElement.height,
    );
  }

  toggleMood(mood) {

    switch (mood) {

        case "cinematic":

            if (this.mode === "normal") {

                this.enterCinematic();

            } else {

                this.exitCinematic();

            }

            break;
    }

}

  render() {
    switch (this.mode) {
      case "normal":
        this.renderNormal();
        break;

      case "cinematic":
        this.renderCinematic();
        break;
    }
  }
}
