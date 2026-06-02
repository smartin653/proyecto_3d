// js/monitor/MonitorManager.js
import { THREE } from "../libs/three.js";

export default class MonitorManager {
  constructor(screen) {
    this.screen = screen;
    this.originalMaterial = screen.material;
    this.originalMap = screen.material.map;
    this.originalColor = screen.material.color.clone();
    this.isActive = false;
    this.video = document.createElement("video");
    this.video.src = "./assets/video/grabadora.mp4";
    this.video.loop = true;
    this.video.muted = true;
    this.video.playsInline = true;
    this.videoTexture = new THREE.VideoTexture(this.video);
    this.videoTexture.flipY = false;
    this.videoMaterial = new THREE.MeshBasicMaterial({
      map: this.videoTexture,
    });
  }

  playVideo() {
    console.log("PLAY VIDEO");
    this.video.currentTime = 0;

    this.video.play();
  }

  stopVideo() {
    this.isActive = false;

    this.video.pause();

    this.video.currentTime = 0;
  }

  setActive() {
    this.isActive = true;

    this.screen.material = this.videoMaterial;

    this.playVideo();
  }

  setInactive() {
    this.isActive = false;

    this.stopVideo();

    this.screen.material = this.originalMaterial;
  }

  update(time) {
    if (!this.isActive) return;

    const pulse = (Math.sin(time * 0.003) + 1) / 2;

    // this.screen.material.color.setRGB(
    //   0,

    //   0.3 + pulse * 0.7,

    //   0,
    // );
  }
}
