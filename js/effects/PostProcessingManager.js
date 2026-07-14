import {
  THREE,
  EffectComposer,
  RenderPass,
  FilmPass,
  OutputPass,
  UnrealBloomPass,
} from "../libs/three.js";
import CinematicPass from "../postprocessing/CinematicPass.js";

export default class PostProcessingManager {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    this.enabled = false;

    this.settings = {
      warmth: 0.0,
      contrast: 1.0,
      grain: 0.0,
      aberration: 0.0,
      toneMapping: "ACES",
      gamma: 1.0,
      bloomEnabled: false,
      bloomStrength: 0.2,
      bloomRadius: 0.25,
      bloomThreshold: 0.85,
      redShift: 0,
      greenShift: 0,
      blueShift: 0,
    };
    this.createComposer();
  }

  createComposer() {
    this.composer = new EffectComposer(this.renderer);

    this.renderPass = new RenderPass(this.scene, this.camera);

    this.bloomPass = new UnrealBloomPass(
      undefined,

      this.settings.bloomStrength,

      this.settings.bloomRadius,

      this.settings.bloomThreshold,
    );

    this.cinematicPass = new CinematicPass();

    this.bloomPass.enabled = this.settings.bloomEnabled;

    this.outputPass = new OutputPass();

    this.composer.addPass(this.renderPass);

    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.cinematicPass);
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

  setupDebug(gui) {
    const folder = gui.addFolder("📷 Cinematic Look");
    folder
      .add(
        this.settings,

        "gamma",

        0.5,

        3,

        0.01,
      )
      .name("Gamma");

    folder
      .add(this.settings, "toneMapping", [
        "ACES",
        "Neutral",
        "Linear",
        "Reinhard",
        "Cineon",
      ])
      .name("Tone Mapping")
      .onChange((value) => {
        switch (value) {
          case "ACES":
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            break;

          case "Neutral":
            this.renderer.toneMapping = THREE.NeutralToneMapping;
            break;

          case "Linear":
            this.renderer.toneMapping = THREE.LinearToneMapping;
            break;

          case "Reinhard":
            this.renderer.toneMapping = THREE.ReinhardToneMapping;
            break;

          case "Cineon":
            this.renderer.toneMapping = THREE.CineonToneMapping;
            break;
        }
      });

    folder

      .add(
        this.settings,

        "bloomEnabled",
      )

      .name("Bloom")

      .onChange((value) => {
        this.bloomPass.enabled = value;
      });

    folder

      .add(
        this.settings,

        "bloomStrength",

        0,

        3,

        0.01,
      )

      .name("Strength")

      .onChange((value) => {
        this.bloomPass.strength = value;
      });

    folder

      .add(
        this.settings,

        "bloomRadius",

        0,

        2,

        0.01,
      )

      .name("Radius")

      .onChange((value) => {
        this.bloomPass.radius = value;
      });

    folder

      .add(
        this.settings,

        "bloomThreshold",

        0,

        1,

        0.01,
      )

      .name("Threshold")

      .onChange((value) => {
        this.bloomPass.threshold = value;
      });

    folder
      .add(
        this.settings,

        "warmth",

        -1,

        1,

        0.01,
      )

      .name("Warmth")

      .onChange((value) => {
        this.cinematicPass.setWarmth(value);
      });

    folder
      .add(
        this.settings,

        "contrast",

        0.5,

        1.5,

        0.01,
      )

      .name("Contrast")

      .onChange((value) => {
        this.cinematicPass.setContrast(value);
      });

    folder
      .add(
        this.settings,

        "grain",

        0,

        1,

        0.001,
      )

      .name("Grain")

      .onChange((value) => {
        this.cinematicPass.setGrain(value);
      });

    folder
      .add(
        this.settings,

        "aberration",

        0,

        0.01,

        0.0001,
      )

      .name("Aberration")

      .onChange((value) => {
        this.cinematicPass.setAberration(value);
      });

    
  }
}
