// js/core/Experience.js

import SceneManager from "./SceneManager.js";
import CameraManager from "./CameraManager.js";
import RendererManager from "./RendererManager.js";
import ControlsManager from "./ControlsManager.js";
import ModelLoader from "../loaders/ModelLoader.js";
import { THREE } from "../libs/three.js";
import RaycasterManager from "../interaction/RaycasterManager.js";
import AudioManager from "../audio/AudioManager.js";
import VideoScreen from "../monitor/VideoScreen.js";
import SpotifyPlayer from "../ui/SpotifyPlayer.js";
import DebugManager from "./DebugManager.js";
import IntroOverlay from "../ui/IntroOverlay.js";
import Beacon from "../ui/Beacon.js";
import BeaconManager from "../ui/BeaconManager.js";
import ScreenManager from "../monitor/ScreenManager.js";
import CameraTransitionManager from "./CameraTransitionManager.js";
import interactables from "../data/interactables.js";
import HintManager from "../ui/HintManager.js";

export default class Experience {
  constructor() {
    this.container = document.getElementById("scene-container");

    if (!this.container) {
      console.error("Scene container not found");
      return;
    }

    this.init();
  }

  init() {
    console.log("Experience initialized");

    // Scene
    this.sceneManager = new SceneManager();

    this.scene = this.sceneManager.getScene();

    this.cameraManager = new CameraManager(this.container);

    this.camera = this.cameraManager.getCamera();

    this.rendererManager = new RendererManager(
      this.container,
      this.scene,
      this.camera,
    );

    this.controlsManager = new ControlsManager(
      this.camera,
      this.rendererManager.renderer.domElement,
    );

    this.debugTarget = {
      x: 0,
      y: 1.3,
      z: 0,
    };

    this.cameraTransition = new CameraTransitionManager(
      this.camera,
      this.controlsManager.controls,
    );
    this.liveCamera = {
      camX: 0,
      camY: 0,
      camZ: 0,

      targetX: 0,
      targetY: 0,
      targetZ: 0,
    };
    // this.debugManager = new DebugManager();
    // const gui = this.debugManager.gui;
    // const liveFolder = gui.addFolder("Live Camera");

    // liveFolder.add(this.liveCamera, "camX").listen();

    // liveFolder.add(this.liveCamera, "camY").listen();

    // liveFolder.add(this.liveCamera, "camZ").listen();

    // liveFolder.add(this.liveCamera, "targetX").listen();

    // liveFolder.add(this.liveCamera, "targetY").listen();

    // liveFolder.add(this.liveCamera, "targetZ").listen();
    // gui.add(this.camera.position, "x", -20, 20, 0.1).name("Cam X");

    // gui.add(this.camera.position, "y", -20, 20, 0.1).name("Cam Y");

    // gui.add(this.camera.position, "z", -20, 20, 0.1).name("Cam Z");
    // gui.add(this.debugTarget, "x", -20, 20, 0.1).name("Target X");

    // gui.add(this.debugTarget, "y", -20, 20, 0.1).name("Target Y");

    // gui.add(this.debugTarget, "z", -20, 20, 0.1).name("Target Z");
    // gui
    //   .add(this.camera, "fov", 10, 100, 1)
    //   .name("FOV")
    //   .onChange(() => {
    //     this.camera.updateProjectionMatrix();
    //   });
    // gui
    //   .add(this.camera, "fov", 10, 100, 1)
    //   .name("FOV")
    //   .onChange(() => {
    //     this.camera.updateProjectionMatrix();
    //   });

    this.modelLoader = new ModelLoader();
    this.audioManager = new AudioManager();
    this.spotifyPlayer = new SpotifyPlayer(this.audioManager);
    console.log(this.monitorScreen);
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

    this.loadAssets();

    this.setupEvents();

    this.animate();

    window.testCamera = () => {
      this.cameraTransition.flyTo(
        {
          x: 1,
          y: 1.5,
          z: 1,
        },

        {
          x: 0,
          y: 1,
          z: 0,
        },
      );
    };
  }

  async loadAssets() {
    try {
      const gltf = await this.modelLoader.load("../assets/models/Ed.glb");
      this.introOverlay.enable();

      this.scene.add(gltf.scene);
      gltf.scene.updateMatrixWorld(true);
      const screen = gltf.scene.getObjectByName("PlanosTele");
      const exteriorScreen = gltf.scene.getObjectByName("PlanosExterior");
      console.log("Material screen", screen.material);
      this.monitorScreen = new VideoScreen(screen);
      this.projectorScreen = new VideoScreen(exteriorScreen);
      this.screenManager.add("monitor", this.monitorScreen);
      this.screenManager.add("projector", this.projectorScreen);
      this.raycasterManager.screenManager = this.screenManager;
      this.audioManager.onEnded = () => {
        this.screenManager.stopAll();
        this.spotifyPlayer.hide();
      };

      console.log(screen);
      const box = new THREE.Box3().setFromObject(gltf.scene);

      const center = new THREE.Vector3();
      const size = new THREE.Vector3();

      box.getCenter(center);
      box.getSize(size);

      // console.log("CENTER:", center);
      // console.log("SIZE:", size);
      // console.log("MIN:", box.min);
      // console.log("MAX:", box.max);

      // gltf.scene.traverse((child) => {
      //   if (child.isMesh) {
      //     console.log(child.name);
      //   }
      // });
      // gltf.scene.traverse((child) => {
      //   if (child.isMesh && child.name.startsWith("Slider_")) {
      //     child.material = child.material.clone();

      //     child.material.emissive.set(0xffffff);

      //     child.material.emissiveIntensity = 0.15;
      //   }
      // });

      this.interactables = [];

      gltf.scene.traverse((child) => {
        if (!child.isMesh) return;

        const interactable = interactables[child.name];

        if (!interactable) return;

        child.material = child.material.clone();

        child.material.emissive.set(0xffffff);
        console.log({
          name: child.name,
          type: child.type,
          parent: child.parent?.name,
          children: child.children.length,
          position: child.position,
        });

        child.material.emissiveIntensity = 0.15;
        this.beaconManager.create(interactable, child);
      });

      console.log(gltf.scene.scale);
      this.introOverlay.enable();
    } catch (error) {
      console.error(error);
    }
  }

  handleEnter() {
    this.introOverlay.hide();
  }

  setupEvents() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  onResize() {
    console.log("Resize detected");
    this.cameraManager.resize();
    this.rendererManager.resize();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    if (this.screenManager) {
      this.screenManager.update(performance.now());
      if (this.beaconManager) {
        this.beaconManager.update(performance.now());
      }
    }

    if (this.spotifyPlayer) {
      this.spotifyPlayer.update();
    }

    this.cameraTransition.update(0.016);
    // debug
    this.liveCamera.camX = this.camera.position.x;

    this.liveCamera.camY = this.camera.position.y;

    this.liveCamera.camZ = this.camera.position.z;

    this.liveCamera.targetX = this.controlsManager.controls.target.x;

    this.liveCamera.targetY = this.controlsManager.controls.target.y;

    this.liveCamera.targetZ = this.controlsManager.controls.target.z;

    this.controlsManager.update();
    if (this.interactables) {
      const pulse = (Math.sin(performance.now() * 0.002) + 1) / 2;

      this.interactables.forEach((item) => {
        item.material.emissiveIntensity = 0.15 + pulse * 0.25;
      });
    }

    this.rendererManager.render();
  }

  // animate() {
  //   requestAnimationFrame(this.animate.bind(this));

  //   this.controlsManager.update();

  //   if (this.screenManager) {
  //     this.screenManager.update(performance.now());
  //   }

  //   if (this.spotifyPlayer) {
  //     this.spotifyPlayer.update();
  //   }

  //   // this.controlsManager.controls.target.set(
  //   //   this.debugTarget.x,

  //   //   this.debugTarget.y,

  //   //   this.debugTarget.z,
  //   // );

  //   this.controlsManager.controls.update();
  //   this.cameraTransition.update(0.016);

  //   this.rendererManager.render();
  // }
}
