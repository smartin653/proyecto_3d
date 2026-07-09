import {
  EffectComposer,
  RenderPass,
  FilmPass,
  OutputPass,
} from "../libs/three.js";

export default class PostProcessingManager {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    this.enabled = false;

    this.createComposer();
  }

  createComposer() {
    this.composer = new EffectComposer(this.renderer);

    this.renderPass = new RenderPass(this.scene, this.camera);
    this.outputPass = new OutputPass();

    this.composer.addPass(this.outputPass);
  }

  render() {
    if (!this.enabled) {
      this.renderer.render(this.scene, this.camera);

      return;
    }

    this.composer.render();
  }

  resize(width, height) {
    this.composer.setSize(width, height);
  }
}
