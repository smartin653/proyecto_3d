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
import ShareManager from "../ui/ShareManager.js";
import Toast from "../ui/Toast.js";
import PostProcessingManager from "../effects/PostProcessingManager.js";
import OrientationOverlay from "../ui/OrientationOverlay.js";

export default class Experience {
  constructor() {
    this.container = document.getElementById("scene-container");

    if (!this.container) {
      console.error("Scene container not found");
      return;
    }
    this.interactables = [];
    this.importedLights = [];
    this.debug = true;
    this.init();
  }

  init() {
    this.initializeManagers();
    this.initializeDebug();

    this.loadAssets();

    this.setupEvents();
    this.lastTime = performance.now();
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

    const renderer = this.rendererManager.renderer;

    console.log("=== Renderer Capabilities ===");

    console.log({
      isWebGL2: renderer.capabilities.isWebGL2,
      maxTextures: renderer.capabilities.maxTextures,
      maxTextureSize: renderer.capabilities.maxTextureSize,
      maxCubemapSize: renderer.capabilities.maxCubemapSize,
      maxSamples: renderer.capabilities.maxSamples,
      precision: renderer.capabilities.precision,
    });

    console.log("=== Renderer Info ===");

    console.log(renderer.info);

    this.postProcessing = new PostProcessingManager(
      this.rendererManager.renderer,
      this.scene,
      this.camera,
    );

    this.environmentManager = new EnvironmentManager(
      this.scene,
      this.rendererManager.renderer,
    );

    this.environmentManager.initialize();
    this.environmentManager.onChange((mode) => {
      console.log("Environment changed:", mode);

      this.updateGarden(mode);
      this.updateCurtain(mode);
      this.updateLights(mode);
    });

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
    this.shareManager = new ShareManager();
    this.spotifyPlayer.onTrackChanged = (track) => {
      this.shareManager.setCurrentTrack(track);
    };
    this.spotifyPlayer.onDownload = (track) => {
      this.shareManager.download(track);
    };
    this.toast = new Toast();
    this.shareManager.setToast(this.toast);

    this.screenManager = new ScreenManager();
    this.screenManager.setEnvironment(this.environmentManager);
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
    this.orientationOverlay = new OrientationOverlay();
    this.introOverlay.onEnter(this.handleEnter.bind(this));
  }

  initializeDebug() {
    if (!this.debug) return;
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
    const gltf = await this.modelLoader.load(
      "https://assets.esrutayerma.com/models/Ed1.glb",
    );

    this.scene.add(gltf.scene);

    this.setupScreens(gltf.scene);
    this.setupLights(gltf.scene);
    this.setupScene(gltf.scene);
    this.setupInteractables(gltf.scene);
    this.gardens = {
      morning: gltf.scene.getObjectByName("Jardin_amanecer"),

      afternoon: gltf.scene.getObjectByName("Jardin_Dia"),

      night: gltf.scene.getObjectByName("Jardin_noche"),
    };
    this.curtains = {
      morning: gltf.scene.getObjectByName("PlanoDia"),

      afternoon: gltf.scene.getObjectByName("PlanoTarde"),

      night: gltf.scene.getObjectByName("PlanoNoche"),
    };

    this.updateGarden(this.environmentManager.mode);
    console.log("Current mode:", this.environmentManager.mode);
    this.updateCurtain(this.environmentManager.mode);
    this.updateLights(this.environmentManager.mode);

    this.introOverlay.enable();
  }

  updateGarden(mode) {
    Object.values(this.gardens).forEach((garden) => {
      garden.visible = false;
    });

    const garden = this.gardens[mode];

    if (!garden) {
      console.warn(`Garden "${mode}" no encontrado`);

      return;
    }

    garden.visible = true;
  }

  updateCurtain(mode) {
    Object.values(this.curtains).forEach((curtain) => {
      curtain.visible = false;
    });

    const curtain = this.curtains[mode];

    if (!curtain) {
      console.warn(`Curtain "${mode}" no encontrada`);
      return;
    }

    curtain.visible = true;

    console.log("----- Curtains -----");

    Object.entries(this.curtains).forEach(([name, mesh]) => {
      console.log(name, mesh.name, mesh.visible);
    });
  }

  updateLights(mode) {
    const preset = this.environmentManager.getCurrentPreset();

    if (!preset?.lights) {
      console.warn("No lighting preset found.");

      return;
    }

    Object.entries(preset.lights).forEach(([lightName, settings]) => {
      const light = this.lights[lightName];

      if (!light) {
        console.warn(`Light "${lightName}" not found.`);

        return;
      }

      //----------------------------------
      // Intensity
      //----------------------------------

      if (settings.intensity !== undefined) {
        light.intensity = settings.intensity;
      }

      //----------------------------------
      // Visibility
      //----------------------------------

      if (settings.visible !== undefined) {
        light.visible = settings.visible;
      }

      //----------------------------------
      // Color
      //----------------------------------

      if (settings.color && light.color) {
        light.color.set(settings.color);
      }
    });
  }

  setupScreens(root) {
    // root.traverse((child) => {
    //   if (child.isMesh) {
    //     console.log("MESH:", `"${child.name}"`);
    //   }
    // });

    const screens = {
      monitor: "PlanosTele",

      jardinAmanecer: "Jardin_amanecer",

      jardinDia: "Jardin_Dia",

      jardinNoche: "Jardin_noche",
    };

    Object.entries(screens).forEach(([id, objectName]) => {
      const mesh = root.getObjectByName(objectName);

      if (!mesh) {
        console.warn(`Pantalla "${objectName}" no encontrada`);

        return;
      }

      this.screenManager.add(id, new VideoScreen(mesh));
    });

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

      if (!this.lights) {
        this.lights = {};
      }

      this.lights[child.name] = child;
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

    if (this.debug) {
      this.environmentManager.setupImportedLightsDebug(
        this.debugManager.gui,
        importedLights,
      );
    }

    console.log("Lights:", this.lights);
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
    if (!this.debug) return;
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

  update(delta) {
    const now = performance.now();

    this.controlsManager.update();

    this.cameraTransition.update(delta);

    this.screenManager.update(now);
    this.beaconManager.update(now);

    this.spotifyPlayer.update();

    this.updateDebug();
    this.updateInteractables();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const now = performance.now();
    const delta = (now - this.lastTime) / 1000;

    this.lastTime = now;

    this.update(delta);

    //this.rendererManager.render();
    this.postProcessing.render();
  }

  setupEvents() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  onResize() {
    this.cameraManager.resize();
    this.rendererManager.resize();
    this.postProcessing.resize(window.innerWidth, window.innerHeight);
  }

  handleEnter() {
    this.introOverlay.hide();
    this.orientationOverlay.show();
  }

  closePlayer() {
    this.audioManager.audio.pause();

    this.audioManager.audio.currentTime = 0;

    this.screenManager.stopAll();

    this.spotifyPlayer.hide();

    console.log("HOME", this.homeCamera);
    console.log("ACTUAL", this.camera.position);

    this.cameraTransition.flyTo(
      this.homeCamera.position,
      this.homeCamera.target,
      1.6,
    );
  }
}
