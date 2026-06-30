import { THREE } from "../libs/three.js";

export default class Beacon {
  constructor(type = "music") {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 256;
    this.canvas.height = 256;

    this.ctx = this.canvas.getContext("2d");

    this.texture = new THREE.CanvasTexture(this.canvas);

    this.draw(type);

    const material = new THREE.SpriteMaterial({
      map: this.texture,
      transparent: true,
      depthTest: false,
      depthWrite: false,

      color: 0xffffff,
    });

    material.toneMapped = false;

    this.sprite = new THREE.Sprite(material);

    this.basePosition = new THREE.Vector3();

    this.phase = Math.random() * Math.PI * 2;

    this.sprite.scale.set(0.1, 0.1, 1);
  }

  draw(type) {
    const ctx = this.ctx;

    ctx.clearRect(0, 0, 256, 256);

    const styles = {
      music: {
        color: "#ff9d00c5",
        icon: "♪",
      },

      video: {
        color: "#1E88E5",
        icon: "▶",
      },

      info: {
        color: "#43A047",
        icon: "i",
      },

      gallery: {
        color: "#FB8C00",
        icon: "▣",
      },

      camera: {
        color: "#8E24AA",
        icon: "⌖",
      },
    };

    const style = styles[type] || styles.music;

    //----------------------------------------------------
    // Glow exterior
    //----------------------------------------------------

    ctx.shadowColor = style.color;
    ctx.shadowBlur = 0;

    ctx.beginPath();

    ctx.arc(128, 128, 72, 0, Math.PI * 2);

    ctx.fillStyle = style.color;
    ctx.fill();

    //----------------------------------------------------
    // Borde blanco
    //----------------------------------------------------

    ctx.shadowBlur = 0;

    ctx.lineWidth = 6;

    ctx.strokeStyle = "#A67C00";

    ctx.stroke();

    //----------------------------------------------------
    // Icono
    //----------------------------------------------------

    ctx.fillStyle = "#1A1A1A";

    ctx.font = "bold 82px Arial";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.fillText(style.icon, 128, 132);

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
    const t = time * 0.001 + this.phase;

    //--------------------------------------------------
    // Movimiento flotante
    //--------------------------------------------------

    this.sprite.position.y = this.basePosition.y + Math.sin(t) * 0.025;

    //--------------------------------------------------
    // Escala
    //--------------------------------------------------

    const scale = 0.1 + Math.sin(t) * 0.008;

    this.sprite.scale.set(scale, scale, 1);

    //--------------------------------------------------
    // Opacidad
    //--------------------------------------------------

    this.sprite.material.opacity = 0.9 + Math.sin(t) * 0.08;
  }
}
