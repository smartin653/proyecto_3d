// Experience.js
// Refactor template based on the uploaded file.
// This version preserves the project structure while separating responsibilities.
// NOTE: Replace your current Experience.js with this one and move any remaining
// project-specific code into the indicated methods if needed.

import SceneManager from "./SceneManager.js";
import CameraManager from "./CameraManager.js";
import RendererManager from "./RendererManager.js";
import ControlsManager from "./ControlsManager.js";
import ModelLoader from "../loaders/ModelLoader.js";
import RaycasterManager from "../interaction/RaycasterManager.js";
import AudioManager from "../audio/AudioManager.js";
import VideoScreen from "../monitor/VideoScreen.js";
import SpotifyPlayer from "../ui/SpotifyPlayer.js";
import DebugManager from "./DebugManager.js";
import IntroOverlay from "../ui/IntroOverlay.js";
import BeaconManager from "../ui/BeaconManager.js";
import ScreenManager from "../monitor/ScreenManager.js";
import CameraTransitionManager from "./CameraTransitionManager.js";
import HintManager from "../ui/HintManager.js";
import EnvironmentManager from "../environment/EnvironmentManager.js";
import interactables from "../data/interactables.js";

export default class Experience {
  constructor() {
    this.container = document.getElementById("scene-container");

    if (!this.container) {
      console.error("Scene container not found");
      return;
    }
    this.interactables = [];
    this.importedLights = [];
    this.init();
  }

  init() {
    this.initializeManagers();
    this.initializeDebug();

    this.loadAssets();

    this.setupEvents();

    this.animate();
  }

  initializeManagers() {
    this.sceneManager = new SceneManager();
    this.scene = this.sceneManager.getScene();

    this.cameraManager = new CameraManager(this.container);
    this.camera = this.cameraManager.getCamera();

    this.rendererManager = new RendererManager(
      this.container,
      this.scene,
      this.camera,
    );

    this.environmentManager = new EnvironmentManager(
      this.scene,
      this.rendererManager.renderer,
    );

    this.controlsManager = new ControlsManager(
      this.camera,
      this.rendererManager.renderer.domElement,
    );

    this.homeCamera = {
      position: this.camera.position.clone(),
      target: this.controlsManager.controls.target.clone(),
    };

    this.cameraTransition = new CameraTransitionManager(
      this.camera,
      this.controlsManager.controls,
    );

    this.modelLoader = new ModelLoader();
    this.audioManager = new AudioManager();
    this.spotifyPlayer = new SpotifyPlayer(this.audioManager);
    this.spotifyPlayer.onClose = this.closePlayer.bind(this);

    this.screenManager = new ScreenManager();
    this.beaconManager = new BeaconManager(this.scene);
    this.hintManager = new HintManager(this.scene);

    this.raycasterManager = new RaycasterManager(
      this.camera,
      this.scene,
      this.rendererManager.renderer.domElement,
      this.audioManager,
      this.screenManager,
      this.spotifyPlayer,
      this.cameraTransition,
    );

    this.introOverlay = new IntroOverlay();
    this.introOverlay.onEnter(this.handleEnter.bind(this));
  }

  initializeDebug() {
    this.liveCamera = {
      camX: 0,
      camY: 0,
      camZ: 0,
      targetX: 0,
      targetY: 0,
      targetZ: 0,
    };

    this.debugManager = new DebugManager();

    const gui = this.debugManager.gui;

    this.environmentManager.setupDebug(gui);

    const live = gui.addFolder("Live Camera");

    live.add(this.liveCamera, "camX").listen();
    live.add(this.liveCamera, "camY").listen();
    live.add(this.liveCamera, "camZ").listen();

    live.add(this.liveCamera, "targetX").listen();
    live.add(this.liveCamera, "targetY").listen();
    live.add(this.liveCamera, "targetZ").listen();
  }

  async loadAssets() {
    const gltf = await this.modelLoader.load("../assets/models/Ed.glb");

    this.scene.add(gltf.scene);

    this.setupScreens(gltf.scene);
    this.setupLights(gltf.scene);
    this.setupScene(gltf.scene);
    this.setupInteractables(gltf.scene);

    this.introOverlay.enable();
  }

  setupScreens(root) {
    const monitor = root.getObjectByName("PlanosTele");
    const projector = root.getObjectByName("PlanosExterior");
    const paredfalsa = root.getObjectByName("paredfalsa");

    this.monitorScreen = new VideoScreen(monitor);
    this.projectorScreen = new VideoScreen(projector);
    this.paredfalsaScreen = new VideoScreen(paredfalsa);

    this.screenManager.add("monitor", this.monitorScreen);
    this.screenManager.add("projector", this.projectorScreen);
    this.screenManager.add("paredfalsa", this.paredfalsaScreen);

    this.raycasterManager.screenManager = this.screenManager;

    this.audioManager.onEnded = () => {
      this.screenManager.stopAll();
      this.spotifyPlayer.hide();
    };
  }

  setupLights(root) {
    const importedLights = [];

    root.traverse((child) => {
      if (!child.isLight) return;

      child.castShadow = true;

      switch (child.name) {
        case "Spot001":
          child.intensity = 100;
          child.shadow.bias = -0.00309;
          child.shadow.normalBias = 0;
          child.shadow.radius = 5;
          child.shadow.camera.near = 0.05;
          child.shadow.camera.far = 10;
          break;

        case "Spot002":
          child.intensity = 160;
          child.shadow.bias = -0.00047;
          child.shadow.normalBias = 0;
          child.shadow.radius = 5;
          child.shadow.camera.near = 0.1;
          child.shadow.camera.far = 10;
          break;

        case "Spot003":
          child.intensity = 160;
          child.shadow.bias = -0.00152;
          child.shadow.normalBias = 0;
          child.shadow.radius = 5;
          child.shadow.camera.near = 0.1;
          child.shadow.camera.far = 10;
          break;

        case "Spot004":
          child.intensity = 100;
          child.shadow.bias = 0;
          child.shadow.normalBias = 0;
          child.shadow.radius = 5;
          child.shadow.camera.near = 0.1;
          child.shadow.camera.far = 10;
          break;
      }

      child.shadow.mapSize.set(2048, 2048);

      if ("blurSamples" in child.shadow) {
        child.shadow.blurSamples = 7;
      }

      child.shadow.camera.updateProjectionMatrix();
         importedLights.push(child);
    });

    this.environmentManager.setupImportedLightsDebug(
      this.debugManager.gui,
      importedLights,
    );
  }

  setupScene(root) {
    root.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;

      if ("envMapIntensity" in child.material) {
        child.material.envMapIntensity = 0.1;
      }
    });
  }

  setupInteractables(root) {
    this.interactables = [];

    root.traverse((child) => {
      if (!child.isMesh) return;

      const data = interactables[child.name];

      if (!data) return;

      child.material = child.material.clone();
      child.material.emissive.set(0xffffff);
      child.material.emissiveIntensity = 0.15;

      this.interactables.push(child);

      this.beaconManager.create(data, child);
    });
  }

  updateDebug() {
    this.liveCamera.camX = this.camera.position.x;
    this.liveCamera.camY = this.camera.position.y;
    this.liveCamera.camZ = this.camera.position.z;

    this.liveCamera.targetX = this.controlsManager.controls.target.x;
    this.liveCamera.targetY = this.controlsManager.controls.target.y;
    this.liveCamera.targetZ = this.controlsManager.controls.target.z;
  }

  updateInteractables() {
    if (!this.interactables.length) return;

    const pulse = (Math.sin(performance.now() * 0.002) + 1) / 2;

    this.interactables.forEach((item) => {
      item.material.emissiveIntensity = 0.15 + pulse * 0.25;
    });
  }

  update() {
    const now = performance.now();

    this.controlsManager.update();

    this.cameraTransition.update(0.016);

    this.screenManager.update(now);
    this.beaconManager.update(now);

    this.spotifyPlayer.update();

    this.updateDebug();
    this.updateInteractables();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.update();

    this.rendererManager.render();
  }

  setupEvents() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  onResize() {
    this.cameraManager.resize();
    this.rendererManager.resize();
  }

  handleEnter() {
    this.introOverlay.hide();
  }

  closePlayer() {
    this.audioManager.audio.pause();

    this.audioManager.audio.currentTime = 0;

    this.screenManager.stopAll();

    this.spotifyPlayer.hide();

    this.cameraTransition.flyTo(
      this.homeCamera.position,
      this.homeCamera.target,
    );
  }
}
