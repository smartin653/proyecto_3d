// js/environment/SunLight.js
//
// Luz de sol cálida con "gobo": un SpotLight con un mapa de ventana proyectado
// que produce los haces de luz y las sombras de los bastidores sobre las
// paredes, como en un render con iluminación global.
//
// Se configura desde environmentPresets.js (clave `sun`) y solo existe en los
// modos que la declaran; en los demás se oculta (visible = false), de modo que
// no cuesta shader ni sombras.

import { THREE } from "../libs/three.js";

export default class SunLight {
  constructor(scene) {
    this.scene = scene;

    this.light = new THREE.SpotLight("#FFA45A", 0, 0, 0.55, 0.45, 2);

    this.light.visible = false;
    this.light.name = "SunLight";

    this.light.castShadow = true;
    this.light.shadow.mapSize.set(1024, 1024);
    this.light.shadow.camera.near = 0.3;
    this.light.shadow.camera.far = 14;
    this.light.shadow.bias = -0.0003;
    // Sombras de ventana suaves (VSMShadowMap usa radius + blurSamples).
    this.light.shadow.radius = 9;
    this.light.shadow.blurSamples = 16;

    this.light.map = this.createWindowMap();

    scene.add(this.light);
    scene.add(this.light.target);
  }

  // Textura en blanco y negro: un haz inclinado de bordes suaves. El blanco
  // deja pasar la luz; el negro la bloquea.
  createWindowMap() {
    const size = 512;
    const canvas = document.createElement("canvas");

    canvas.width = canvas.height = size;

    const g = canvas.getContext("2d");

    g.fillStyle = "#000";
    g.fillRect(0, 0, size, size);

    g.save();
    g.translate(size / 2, size / 2);
    g.rotate(-0.22);
    g.translate(-size / 2, -size / 2);

    g.fillStyle = "#fff";

    // Un solo haz grande con bordes difuminados (sin montantes en cruz).
    g.filter = "blur(18px)";
    g.fillRect(30, 50, 452, 412);

    g.restore();

    const texture = new THREE.CanvasTexture(canvas);

    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
  }

  apply(settings) {
    const { light } = this;

    light.visible = true;

    if (settings.color) light.color.set(settings.color);
    if (settings.intensity !== undefined) light.intensity = settings.intensity;
    if (settings.angle !== undefined) light.angle = settings.angle;
    if (settings.penumbra !== undefined) light.penumbra = settings.penumbra;

    if (settings.position) light.position.set(...settings.position);
    if (settings.target) light.target.position.set(...settings.target);

    light.target.updateMatrixWorld();
  }

  hide() {
    this.light.visible = false;
  }
}
