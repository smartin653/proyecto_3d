// js/interaction/RaycasterManager.js

import { THREE } from "../libs/three.js";
import interactables from "../data/interactables.js";
import InteractionCard from "../ui/InteractionCard.js";
import InteractionResolver from "./InteractionResolver.js";

export default class RaycasterManager {
  constructor(
    camera,
    scene,
    canvas,
    audioManager,
    screenManager,
    spotifyPlayer,
    cameraTransition,
    contentVersionManager,
    animationManager,
    interactionCard,
    interactionHandler,
    handleMoodRequested,
  ) {
    console.log("cameraTransition:", cameraTransition);
    this.camera = camera;
    this.scene = scene;
    this.canvas = canvas;
    this.hoveredObject = null;
    this.hoveredInteractable = null;
    //this.tooltip = document.getElementById("tooltip");
    this.interactionCard = interactionCard;
    this.audioManager = audioManager;
    this.screenManager = screenManager;
    this.spotifyPlayer = spotifyPlayer;
    this.cameraTransition = cameraTransition;
    this.contentVersionManager = contentVersionManager;
    this.animationManager = animationManager;
    this.interactionHandler = interactionHandler;
    this.handleMoodRequested = handleMoodRequested;
    this.isTouchDevice = navigator.maxTouchPoints > 0;

    this.raycaster = new THREE.Raycaster();

    this.mouse = new THREE.Vector2();

    this.setupEvents();
  }

  // setupEvents() {
  //   this.canvas.addEventListener("click", this.onClick.bind(this));
  //   this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
  // }

  setupEvents() {
    this.canvas.addEventListener("pointerdown", this.onPointerDown.bind(this));
    this.canvas.addEventListener("pointermove", this.onPointerMove.bind(this));
  }

  onPointerMove(event) {
    const interaction = this.getInteractableAt(event);

    if (this.isTouchDevice) {
      return;
    }
    //--------------------------------------------------
    // HAY INTERACTUABLE
    //--------------------------------------------------

    if (interaction) {
      this.highlightInteractable(
        interaction.hit,
        interaction.interactable,
        event,
      );

      return;
    }

    //--------------------------------------------------
    // NO HAY INTERACTUABLE
    //--------------------------------------------------

    // Si el usuario está interactuando con la card,
    // no hacemos nada.
    if (this.interactionCard.isHovered) {
      return;
    }

    document.body.style.cursor = "default";

    this.interactionCard.scheduleHide();

    if (this.hoveredObject) {
      this.hoveredObject.material.emissive.set(0x000000);

      this.hoveredObject.material.emissiveIntensity = 0;

      if (this.hoveredInteractable?.animationOptions?.stopOnLeave !== false) {
        this.animationManager.stop();
      }
    }

    this.hoveredObject = null;
    this.hoveredInteractable = null;
  }

 getInteractableAt(event) {
  const rect = this.canvas.getBoundingClientRect();

  this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  this.raycaster.setFromCamera(this.mouse, this.camera);

  const intersects = this.raycaster.intersectObjects(
    this.scene.children,
    true,
  );

  if (!intersects.length) {
    return null;
  }

  let result = null;

  const hit = intersects.find((item) => {
    result = InteractionResolver.resolve(item.object);

    if (!result) {
      return false;
    }

    // Ignorar interactuables ocultos
    if (!result.object.visible) {
      return false;
    }

    return true;
  });

  if (!hit) {
    return null;
  }

  return {
    hit,
    interactable: result.data,
  };
}

  highlightInteractable(hit, interactable, event) {
    document.body.style.cursor = "pointer";
    //console.log("HIGHLIGHT", interactable.title);
    // Solo mover la card si el usuario NO está sobre ella
    if (!this.interactionCard.isLocked) {
      this.interactionCard.move(event.clientX + 20, event.clientY - 40);

      this.interactionCard.lock();
    }

    // Mostrar card solo si aplica
    if (interactable.showCard !== false) {
      const content = this.contentVersionManager.resolveTrack(interactable);

      this.interactionCard.show(content);
    }

    if (this.hoveredObject !== hit.object) {
      if (this.hoveredObject) {
        this.hoveredObject.material.emissive.set(0x000000);

        this.hoveredObject.material.emissiveIntensity = 0;
      }

      this.hoveredObject = hit.object;
      this.hoveredInteractable = interactable;
      this.hoveredObject.material.emissive.set(0xffffff);

      this.hoveredObject.material.emissiveIntensity = 1;

      if (interactable.animationTrigger !== "click") {
        this.animationManager.play(interactable);
      }
    }
  }

  onPointerDown(event) {
    const interaction = this.getInteractableAt(event);

    if (!interaction) {
      return;
    }

    if (this.isTouchDevice) {
      this.highlightInteractable(
        interaction.hit,
        interaction.interactable,
        event,
      );
    }

    if (interaction.interactable.animationTrigger === "click") {
      if (interaction.interactable.animationMode === "toggle") {
        this.animationManager.toggle(interaction.interactable);
      } else {
        this.animationManager.play(interaction.interactable);
      }
    }

    this.interactionHandler(interaction.interactable);
  }

  setAnimationManager(animationManager) {
    this.animationManager = animationManager;
  }
}
