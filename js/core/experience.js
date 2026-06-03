// js/core/Experience.js

import SceneManager from "./SceneManager.js";
import CameraManager from "./CameraManager.js";
import RendererManager from "./RendererManager.js";
import ControlsManager from "./ControlsManager.js";
import ModelLoader from "../loaders/ModelLoader.js";
import { THREE } from "../libs/three.js";
import RaycasterManager from "../interaction/RaycasterManager.js";
import AudioManager from "../audio/AudioManager.js";
import MonitorManager from "../monitor/MonitorManager.js";
import SpotifyPlayer from "../ui/SpotifyPlayer.js";
import DebugManager from "./DebugManager.js";
import IntroOverlay from "../ui/IntroOverlay.js";

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

    // this.debugManager = new DebugManager();
    // const gui = this.debugManager.gui;
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
    console.log(this.monitorManager);

    this.raycasterManager = new RaycasterManager(
      this.camera,
      this.scene,
      this.rendererManager.renderer.domElement,
      this.audioManager,
      this.monitorManager,
      this.spotifyPlayer,
    );
    this.introOverlay = new IntroOverlay();
    this.introOverlay.onEnter(this.handleEnter.bind(this));

    this.loadAssets();

    this.setupEvents();

    this.animate();
  }

  async loadAssets() {
    try {
      const gltf = await this.modelLoader.load("../assets/models/Ed.glb");
      this.introOverlay.enable();

      this.scene.add(gltf.scene);
      const screen = gltf.scene.getObjectByName("PantallaMonitor");
      console.log("Material screen", screen.material);
      this.monitorManager = new MonitorManager(screen);
      this.audioManager.onEnded = () => {
        this.monitorManager.setInactive();
        this.spotifyPlayer.hide();
      };
      this.raycasterManager.monitorManager = this.monitorManager;

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
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.name.startsWith("Slider_")) {
          child.material = child.material.clone();
        }
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

    this.controlsManager.update();

    if (this.monitorManager) {
      this.monitorManager.update(performance.now());
    }

    if (this.spotifyPlayer) {
      this.spotifyPlayer.update();
    }

    this.controlsManager.controls.target.set(
      this.debugTarget.x,

      this.debugTarget.y,

      this.debugTarget.z,
    );

    this.controlsManager.controls.update();

    this.rendererManager.render();
  }
}
