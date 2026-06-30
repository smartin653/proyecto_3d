import { THREE } from "../libs/three.js";

export default class Beacon {

  constructor(type = "music") {

    // Canvas
    this.canvas = document.createElement("canvas");
    this.canvas.width = 156;
    this.canvas.height = 156;

    this.ctx = this.canvas.getContext("2d");

    // Textura
    this.texture = new THREE.CanvasTexture(this.canvas);

    // Dibujar el beacon
    this.draw(type);

    // Material
    const material = new THREE.SpriteMaterial({

      map: this.texture,

      transparent: true,

      depthTest: false,

      depthWrite: false

    });

    // Sprite
    this.sprite = new THREE.Sprite(material);

    this.basePosition = new THREE.Vector3();

    this.phase = Math.random() * Math.PI * 2;

    this.sprite.scale.set(
      0.15,
      0.15,
      1
    );

  }

  draw(type) {

    const ctx = this.ctx;

    ctx.clearRect(0, 0, 256, 256);

    //----------------------------------------------------
    // Glow grande
    //----------------------------------------------------

    const glow = ctx.createRadialGradient(

      128,
      128,
      10,

      128,
      128,
      90

    );

    glow.addColorStop(
      0,
      "rgba(30,215,96,.55)"
    );

    glow.addColorStop(
      .35,
      "rgba(30,215,96,.18)"
    );

    glow.addColorStop(
      1,
      "rgba(255,255,255,0)"
    );

    ctx.fillStyle = glow;

    ctx.beginPath();

    ctx.arc(
      128,
      128,
      90,
      0,
      Math.PI * 2
    );

    ctx.fill();

    //----------------------------------------------------
    // Glow pequeño
    //----------------------------------------------------

    const glow2 = ctx.createRadialGradient(

      128,
      128,
      2,

      128,
      128,
      35

    );

    glow2.addColorStop(
      0,
      "rgba(255,255,255,1)"
    );

    glow2.addColorStop(
      .5,
      "rgba(255,255,255,.35)"
    );

    glow2.addColorStop(
      1,
      "rgba(255,255,255,0)"
    );

    ctx.fillStyle = glow2;

    ctx.beginPath();

    ctx.arc(
      128,
      128,
      35,
      0,
      Math.PI * 2
    );

    ctx.fill();

    //----------------------------------------------------
    // Punto central
    //----------------------------------------------------

    ctx.beginPath();

    ctx.fillStyle = "#1ED760";

    ctx.arc(
      128,
      128,
      5,
      0,
      Math.PI * 2
    );

    ctx.fill();

    //----------------------------------------------------
    // Icono
    //----------------------------------------------------

    const icons = {

      music: "♪",

      video: "▶",

      info: "i",

      gallery: "▣",

      camera: "⌖"

    };

    ctx.font = "bold 78px Arial";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.fillStyle = "#1ED760";

    ctx.fillText(

      icons[type] || "●",

      128,

      102

    );

    this.texture.needsUpdate = true;

  }

  setPosition(position) {

    this.basePosition.copy(position);

    this.sprite.position.copy(position);

  }

  addHeight(offset) {

    this.basePosition.y += offset;

    this.sprite.position.y += offset;

  }

  update(time) {

    const t =
      time * 0.001 +
      this.phase;

    //--------------------------------------------------
    // Movimiento
    //--------------------------------------------------

    this.sprite.position.y =
      this.basePosition.y +
      Math.sin(t) * 0.02;

    //--------------------------------------------------
    // Escala
    //--------------------------------------------------

    const scale =
      0.15 +
      Math.sin(t) * 0.012;

    this.sprite.scale.set(

      scale,

      scale,

      1

    );

    //--------------------------------------------------
    // Opacidad
    //--------------------------------------------------

    this.sprite.material.opacity =
      0.75 +
      Math.sin(t) * 0.2;

  }

}