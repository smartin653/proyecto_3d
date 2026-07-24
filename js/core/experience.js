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
import CinematicManager from "../managers/CinematicManager.js";
import TutorialModal from "../ui/TutorialModal.js";
import ContentVersionManager from "./ContentVersionManager.js";
import lightSettings from "../config/lightSettings.js";
import { THREE } from "../libs/three.js";
import AnimationManager from "../animation/AnimationManager.js";
import InteractionResolver from "../interaction/InteractionResolver.js";
import InteractionHelper from "../interaction/InteractionHelper.js";
import InteractionCard from "../ui/InteractionCard.js";
import EffectsManager from "./EffectsManager.js";
import InteractionManager from "../interaction/InteractionManager.js";
import ReleaseManager from "./ReleaseManager.js";

export default class Experience {
  constructor() {
    this.container = document.getElementById("scene-container");

    if (!this.container) {
      console.error("Scene container not found");
      return;
    }
    this.interactables = [];
    this.trackInteractables = [];
    this.importedLights = [];
    this.debug = false;
    this.onResizeHandler = this.onResize.bind(this);
    this.init();
    this.mixer = null;
    this.animations = [];
    this.animationManager = null;
    console.count("Experience creada");
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
    this.effectsManager = new EffectsManager(
      this.rendererManager,
      this.scene,
      this.camera,
    );
    this.tutorialModal = new TutorialModal();

    const renderer = this.rendererManager.renderer;

    this.postProcessing = new PostProcessingManager(
      this.rendererManager.renderer,
      this.scene,
      this.camera,
    );

    this.postProcessing.enabled = false;

    this.environmentManager = new EnvironmentManager(
      this.scene,
      this.rendererManager.renderer,
    );

    this.cinematicManager = new CinematicManager(
      this.postProcessing,
      this.environmentManager,
    );

    this.contentVersionManager = new ContentVersionManager();
    console.log(this.contentVersionManager.getMode());
    this.releaseManager = new ReleaseManager();
    this.releaseManager
      .load("https://assets.esrutayerma.com/config/releases.json")
      .then(() => {
        console.log(this.releaseManager.getConfig("tracks", "Slider_Pista01"));

        console.log(this.releaseManager.isVisible("tracks", "Slider_Pista01"));
      });

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
    this.interactionCard = new InteractionCard();
    this.interactionCard.onAction = (interactable) => {
      switch (interactable.action) {
        case "openOfficialVideo":
          this.audioManager.openOfficialVideo();

          break;
      }
    };
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
      this.contentVersionManager,
      this.AnimationManager,
      this.interactionCard,
      this.handleInteraction.bind(this),
      this.handleMoodRequested.bind(this),
    );

    //this.introOverlay = new IntroOverlay();
    //this.orientationOverlay = new OrientationOverlay();
    //this.introOverlay.onEnter(this.handleEnter.bind(this));
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
    this.postProcessing.setupDebug(gui);

    const live = gui.addFolder("Live Camera");

    live.add(this.liveCamera, "camX").listen();
    live.add(this.liveCamera, "camY").listen();
    live.add(this.liveCamera, "camZ").listen();

    live.add(this.liveCamera, "targetX").listen();
    live.add(this.liveCamera, "targetY").listen();
    live.add(this.liveCamera, "targetZ").listen();
  }

  // async loadAssets() {
  //   const gltf = await this.modelLoader.load(
  //     "https://assets.esrutayerma.com/models/Dia_1.002glb.glb",
  //   );
  //   console.log("1 - Modelo cargado");
  //   this.animationManager = new AnimationManager(gltf.scene, gltf.animations);
  //   console.log("2 - AnimationManager");
  //   this.raycasterManager.setAnimationManager(this.animationManager);
  //   console.log("3 - Raycaster");
  //   this.scene.add(gltf.scene);
  //   console.log("4 - Scene");
  //   this.setupScreens(gltf.scene);
  //   console.log("5 - Screens");
  //   // Configuración de todas las luces
  //   this.setupLights(gltf.scene);
  //   console.log("6 - Lights");
  //   this.cinematicManager.test();
  //   console.log("7 - Scene setup")
  //   this.setupScene(gltf.scene);

  //   this.setupInteractables(gltf.scene);
  //   console.log("8 - Interactables");
  //   this.gardens = {
  //     morning: gltf.scene.getObjectByName("Jardin_amanecer"),
  //     afternoon: gltf.scene.getObjectByName("Jardin_dia"),
  //     night: gltf.scene.getObjectByName("Jardin_noche"),
  //   };

  //   this.curtains = {
  //     morning: gltf.scene.getObjectByName("PlanoAmanecer"),
  //     afternoon: gltf.scene.getObjectByName("PlanoDia"),
  //     night: gltf.scene.getObjectByName("PlanoNoche"),
  //   };

  //   this.updateGarden(this.environmentManager.mode);
  //   this.updateCurtain(this.environmentManager.mode);
  //   this.updateLights(this.environmentManager.mode);

  //   //----------------------------------
  //   // Test Animation
  //   //----------------------------------

  //   this.animations = gltf.animations;

  //   this.mixer = new THREE.AnimationMixer(gltf.scene);

  //   const clip = THREE.AnimationClip.findByName(this.animations, "venta");

  //   const action = this.mixer.clipAction(clip);

  //   action.reset();
  //   action.play();

  //   //this.effectsManager.enterCinematic();
  //   //this.introOverlay.enable();
  //   this.assetsLoaded = true;

  //   if (this.introOverlay) {
  //     this.introOverlay.enable();
  //   }
  // }

async loadAssets() {
  try {
    const gltf = await this.modelLoader.load(
      "https://assets.esrutayerma.com/models/Me_Inundo_1.glb",
    );

    this.animationManager = new AnimationManager(
      gltf.scene,
      gltf.animations,
    );

    this.raycasterManager.setAnimationManager(this.animationManager);

    this.scene.add(gltf.scene);

    this.setupScreens(gltf.scene);
    this.setupLights(gltf.scene);
    this.cinematicManager.test();
    this.setupScene(gltf.scene);
    this.setupInteractables(gltf.scene);

    this.gardens = {
      morning: gltf.scene.getObjectByName("Jardin_amanecer"),
      afternoon: gltf.scene.getObjectByName("Jardin_dia"),
      night: gltf.scene.getObjectByName("Jardin_noche"),
    };

    this.curtains = {
      morning: gltf.scene.getObjectByName("PlanoAmanecer"),
      afternoon: gltf.scene.getObjectByName("PlanoDia"),
      night: gltf.scene.getObjectByName("PlanoNoche"),
    };

    this.updateGarden(this.environmentManager.mode);
    this.updateCurtain(this.environmentManager.mode);
    this.updateLights(this.environmentManager.mode);

    this.animations = gltf.animations;

    this.mixer = new THREE.AnimationMixer(gltf.scene);

    const clip = THREE.AnimationClip.findByName(
      this.animations,
      "venta",
    );

    const action = this.mixer.clipAction(clip);

    action.reset();
    action.play();

    this.assetsLoaded = true;

    if (this.introOverlay) {
      this.introOverlay.enable();
    }

  } catch (error) {
    console.error("Error cargando el modelo:", error);
  }
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

    console.log("=== Estado de los jardines ===");

    Object.entries(this.gardens).forEach(([name, garden]) => {
      console.log(`${name}: ${garden.visible}`);
    });
  }

  updateCurtain(mode) {
    console.log("Updatecurtains");
    console.log("Modo recibido:", mode);
    //----------------------------------
    // Ocultar todas las cortinas
    //----------------------------------

    Object.values(this.curtains).forEach((curtain) => {
      if (curtain) {
        curtain.visible = false;
      }
    });

    //----------------------------------
    // Obtener la cortina del modo actual
    //----------------------------------

    const curtain = this.curtains[mode];

    if (!curtain) {
      console.warn(`Curtain "${mode}" no encontrada.`);
      return;
    }

    //----------------------------------
    // Mostrar únicamente la cortina activa
    //----------------------------------

    curtain.visible = true;

    //----------------------------------
    // Debug
    //----------------------------------

    console.log("=== Estado de las cortinas ===");

    Object.entries(this.curtains).forEach(([name, curtain]) => {
      console.log(`${name}: ${curtain.visible}`);
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

  setTrackInteractablesVisible(visible) {
  this.trackInteractables.forEach((object) => {
    object.visible = visible;
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

      jardinDia: "Jardin_dia",

      jardinNoche: "Jardin_noche",
      PlanoAmanecer: "PlanoAmanecer",
      PlanoDia: "PlanoDia",
      PlanoNoche: "PlanoNoche"
      
    };

    Object.entries(screens).forEach(([id, objectName]) => {
      const mesh = root.getObjectByName(objectName);

      if (!mesh) {
        console.warn(`Pantalla "${objectName}" no encontrada`);

        return;
      }

      this.screenManager.add(id, new VideoScreen(mesh));
    });

    console.log("pantallas",this.screenManager.screens);

    this.raycasterManager.screenManager = this.screenManager;

    this.audioManager.onEnded = () => {
      this.screenManager.stopAll();
      this.setTrackInteractablesVisible(false);
      this.spotifyPlayer.hide();
    };
  }

  setupLights(root) {
    const importedLights = [];

    if (!this.lights) {
      this.lights = {};
    }

    root.traverse((child) => {
      if (!child.isLight) return;

      this.lights[child.name] = child;

      // Por ahora mantenemos las sombras desactivadas
      child.castShadow = false;

      const settings = lightSettings[child.name];

      if (settings) {
        child.intensity = settings.intensity ?? child.intensity;

        child.shadow.bias = settings.bias ?? child.shadow.bias;

        child.shadow.normalBias =
          settings.normalBias ?? child.shadow.normalBias;

        child.shadow.radius = settings.radius ?? child.shadow.radius;

        child.shadow.camera.near = settings.near ?? child.shadow.camera.near;

        child.shadow.camera.far = settings.far ?? child.shadow.camera.far;

        child.shadow.camera.updateProjectionMatrix();
      }

      importedLights.push(child);
    });

    this.environmentManager.setImportedLights(importedLights);
    this.environmentManager.setLightColor("Spot001", 0xff0000);
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
    const processed = new Set();

    root.traverse((child) => {
      if (!child.isMesh) return;

      // const data =
      //   interactables[child.name] || interactables[child.parent?.name];

      // if (!data) return;

      const result = InteractionResolver.resolve(child);

      if (!result) return;

      const { object, data } = result;
      if (processed.has(object)) {
        return;
      }
      processed.add(object);

      // child.material = child.material.clone();

      // child.material.emissive.set(0xffffff);

      // child.material.emissiveIntensity = 0.15;

      InteractionHelper.forEachMesh(object, (mesh) => {
        mesh.material = mesh.material.clone();

        mesh.material.emissive.set(0xffffff);

        mesh.material.emissiveIntensity = 0.15;
      });

      this.interactables.push(object);
      if (data.requiresTrack) {
        object.visible = false;
        this.trackInteractables.push(object);
      }
      this.beaconManager.create(data, object);
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

    // this.interactables.forEach((item) => {
    //   item.material.emissiveIntensity = 0.15 + pulse * 0.25;
    // });
    this.interactables.forEach((item) => {
      InteractionHelper.forEachMesh(item, (mesh) => {
        mesh.material.emissiveIntensity = 0.15 + pulse * 0.25;
      });
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
    if (this.animationManager) {
      this.animationManager.update(delta);
    }
    this.effectsManager.update(delta);
  }

  animate() {
    this.animationFrame = requestAnimationFrame(this.animate.bind(this));

    const now = performance.now();
    const delta = (now - this.lastTime) / 1000;

    this.lastTime = now;

    this.update(delta);
    const start = performance.now();
    //this.rendererManager.render();
    //this.postProcessing.render();
    this.effectsManager.render();
    const renderTime = performance.now() - start;
    //if (!this.debugTime) this.debugTime = 0;
  }

  setupEvents() {
    window.addEventListener("resize", this.onResizeHandler);
  }

  onResize() {
    this.cameraManager.resize();
    this.rendererManager.resize();
    this.postProcessing.resize(window.innerWidth, window.innerHeight);
    this.effectsManager.resize();
  }

  handleEnter() {
    this.introOverlay.hide();
    this.orientationOverlay.show();
  }

  handleMoodRequested(mood) {
    this.effectsManager.toggleMood(mood);
  }

  handleInteraction(interactable) {
  const content = this.contentVersionManager.resolveTrack(interactable);

  switch (interactable.type) {
    case "track":
      this.audioManager.play(content);

      this.setTrackInteractablesVisible(true);

      this.spotifyPlayer.show(content);

      this.screenManager.play(content.visuals);

      break;

    case "link":
      break;

    case "action":
      break;

    case "info":
      break;

    case "trigger":
      switch (interactable.action) {
        case "toggleMood":
          this.effectsManager.toggleMood(interactable.mood);
          break;
      }
      break;
  }
}

  closePlayer() {
    this.audioManager.audio.pause();

    this.audioManager.audio.currentTime = 0;

    this.screenManager.stopAll();

    this.spotifyPlayer.hide();
    this.setTrackInteractablesVisible(false);

    //console.log("HOME", this.homeCamera);
    //console.log("ACTUAL", this.camera.position);

    // this.cameraTransition.flyTo(
    //   this.homeCamera.position,
    //   this.homeCamera.target,
    //   1.6,
    // );
  }

  destroy() {
    cancelAnimationFrame(this.animationFrame);

    window.removeEventListener("resize", this.onResizeHandler);

    console.log("Experience destroyed");
  }

  show() {
    this.container.style.display = "";

    this.showIntro();
  }

  hide() {
    this.container.style.display = "none";
  }

  showIntro() {
    if (this.introOverlay) {
      return;
    }

    this.introOverlay = new IntroOverlay();
    this.orientationOverlay = new OrientationOverlay();

    this.introOverlay.onEnter(this.handleEnter.bind(this));

    if (this.assetsLoaded) {
      this.introOverlay.enable();
    }
  }
}
