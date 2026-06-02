// js/interaction/RaycasterManager.js

import { THREE } from "../libs/three.js";
import interactables from "../data/interactables.js";

export default class RaycasterManager {
  constructor(camera, scene, canvas, audioManager, monitorManager,spotifyPlayer) {
    this.camera = camera;
    this.scene = scene;
    this.canvas = canvas;
    this.hoveredObject = null;
    this.tooltip = document.getElementById("tooltip");
    this.audioManager = audioManager;
    this.monitorManager = monitorManager;
    this.spotifyPlayer = spotifyPlayer;

    this.raycaster = new THREE.Raycaster();

    this.mouse = new THREE.Vector2();

    this.setupEvents();
  }

  setupEvents() {
    this.canvas.addEventListener("click", this.onClick.bind(this));
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  onMouseMove(event) {
    const rect = this.canvas.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;

    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.tooltip.style.left = event.clientX + "px";

    this.tooltip.style.top = event.clientY + "px";

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true,
    );

    const validSliders = [
      "Slider_Pista01",
      "Slider_Pista02",
      "Slider_Pista03",
      "Slider_Pista04",
      "Slider_Pista05",
      "Slider_Pista06",
    ];

    const hit = intersects.find((item) =>
      validSliders.includes(item.object.name),
    );
    const interactable = hit ? interactables[hit.object.name] : null;

    if (hit) {
      document.body.style.cursor = "pointer";

      this.tooltip.textContent = `▶ ${interactable.title}`;

      this.tooltip.style.opacity = 1;

      if (this.hoveredObject !== hit.object) {
        this.hoveredObject = hit.object;
      }
    } else {
      document.body.style.cursor = "default";

      this.tooltip.style.opacity = 0;

      this.hoveredObject = null;
    }
  }

  onClick(event) {
    const rect = this.canvas.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;

    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true,
    );

    if (!intersects.length) return;

    const clickedObject = intersects[0].object;

    const interactable = interactables[clickedObject.name];

    if (interactable) {
      console.log(interactable.title);
      this.audioManager.showTrack(interactable.title);
      this.audioManager.play(interactable.audio);
      this.spotifyPlayer.show(interactable.title,interactable.cover);
      this.monitorManager.setActive();
    }
  }
}
