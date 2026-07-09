// js/interaction/RaycasterManager.js

import { THREE } from "../libs/three.js";
import interactables from "../data/interactables.js";
import InteractionCard from "../ui/InteractionCard.js";

export default class RaycasterManager {
  constructor(
    camera,
    scene,
    canvas,
    audioManager,
    screenManager,
    spotifyPlayer,
    cameraTransition,
  ) {
    console.log("cameraTransition:", cameraTransition);
    this.camera = camera;
    this.scene = scene;
    this.canvas = canvas;
    this.hoveredObject = null;
    //this.tooltip = document.getElementById("tooltip");
    this.interactionCard = new InteractionCard();
    this.audioManager = audioManager;
    this.screenManager = screenManager;
    this.spotifyPlayer = spotifyPlayer;
    this.cameraTransition = cameraTransition;

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

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true,
    );

    const hit = intersects.find((item) => interactables[item.object.name]);

    const interactable = hit ? interactables[hit.object.name] : null;

    //--------------------------------------------------
    // HAY INTERACTUABLE
    //--------------------------------------------------

    if (hit) {
      document.body.style.cursor = "pointer";

      // Solo mover la card si el usuario NO está sobre ella
      if (!this.interactionCard.isLocked) {
        this.interactionCard.move(event.clientX + 20, event.clientY - 40);

        this.interactionCard.lock();
      }

      this.interactionCard.show(interactable);

      if (this.hoveredObject !== hit.object) {
        if (this.hoveredObject) {
          this.hoveredObject.material.emissive.set(0x000000);

          this.hoveredObject.material.emissiveIntensity = 0;
        }

        this.hoveredObject = hit.object;

        this.hoveredObject.material.emissive.set(0xffffff);

        this.hoveredObject.material.emissiveIntensity = 1;
      }

      return;
    }

    //--------------------------------------------------
    // NO HAY INTERACTUABLE
    //--------------------------------------------------

    // Si el usuario está interactuando con la card,
    // NO hacemos nada.
    if (this.interactionCard.isHovered) {
      return;
    }

    document.body.style.cursor = "default";

    this.interactionCard.scheduleHide();

    if (this.hoveredObject) {
      this.hoveredObject.material.emissive.set(0x000000);

      this.hoveredObject.material.emissiveIntensity = 0;
    }

    this.hoveredObject = null;
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

    // if (interactable) {
    //   console.log(interactable.title);
    //   //this.audioManager.showTrack(interactable.title);
    //   this.audioManager.play(interactable.audio);
    //   this.spotifyPlayer.show(interactable.title, interactable.cover);
    //   this.screenManager.play(interactable.visuals);
    //   this.cameraTransition.flyTo(
    //     interactable.camera.position,
    //     interactable.camera.target,
    //   );
    // }

    if (!interactable) return;

    switch (interactable.type) {
      case "track":
        this.audioManager.play(interactable.audio);

        //this.spotifyPlayer.show(interactable.title, interactable.cover);
        this.spotifyPlayer.show(interactable);
        this.screenManager.play(interactable.visuals);

        this.cameraTransition.flyTo(
          interactable.camera.position,
          interactable.camera.target,
        );

        break;

      case "link":
        // No hacemos nada aquí.
        // El botón de la InteractionCard abrirá la URL.

        break;

      case "info":
        // Tampoco hace nada.
        // Solo muestra la tarjeta.

        break;
    }
  }
}
