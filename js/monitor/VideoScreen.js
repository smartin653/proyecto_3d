// js/monitor/MonitorManager.js
import { THREE } from "../libs/three.js";

export default class MonitorScreen {
  constructor(screen) {
    this.screen = screen;

    this.originalMaterial = screen.material;
    this.originalMap = screen.material.map;
    this.originalColor = screen.material.color.clone();

    this.isActive = false;
    this.logged = false;

    //----------------------------------
    // Video
    //----------------------------------

    this.video = document.createElement("video");
    this.video.crossOrigin = "anonymous";
    this.video.loop = true;
    this.video.muted = true;
    this.video.playsInline = true;
    this.video.preload = "auto";

    console.log("Nueva VideoTexture:", screen.name);

    //----------------------------------
    // Eventos de depuración
    //----------------------------------

    // this.video.addEventListener("loadstart", () => {
    //   console.log(screen.name, "loadstart");
    // });

    // this.video.addEventListener("loadedmetadata", () => {
    //   console.log(
    //     screen.name,
    //     "loadedmetadata",
    //     this.video.videoWidth,
    //     this.video.videoHeight,
    //   );
    // });

    // this.video.addEventListener("loadeddata", () => {
    //   console.log(
    //     screen.name,
    //     "loadeddata",
    //     "readyState:",
    //     this.video.readyState,
    //   );
    // });

    // this.video.addEventListener("canplay", () => {
    //   console.log(screen.name, "canplay");
    // });

    // this.video.addEventListener("playing", () => {
    //   console.log(screen.name, "playing");
    // });

    this.video.addEventListener("error", () => {
      console.error(screen.name, "VIDEO ERROR", this.video.error);
    });

    //----------------------------------
    // VideoTexture
    //----------------------------------

    this.videoTexture = new THREE.VideoTexture(this.video);
    this.videoTexture.flipY = false;
    this.videoTexture.colorSpace = THREE.SRGBColorSpace;

    //----------------------------------
    // Material
    //----------------------------------

    this.videoMaterial = new THREE.MeshBasicMaterial({
      map: this.videoTexture,
    });

    this.videoMaterial.toneMapped = false;
  }

  setVideo(videoPath) {
    if (this.video.src.includes(videoPath)) {
      return;
    }

    this.video.pause();
    this.video.preload = "auto";
    this.video.src = videoPath;

    this.video.load();
    console.log(this.screen.name, "SRC:", videoPath);
  }

  // playVideo() {
  //   console.log("PLAY VIDEO");
  //   this.video.currentTime = 0;

  //   this.video.play();
  //   console.log("paused", this.video.paused);
  //   console.log("currentTime", this.video.currentTime);
  //   console.log("readyState", this.video.readyState);
  //   console.log("videoWidth", this.video.videoWidth);
  //   console.log("videoHeight", this.video.videoHeight);
  // }

  playVideo() {
    console.log("PLAY VIDEO");

    this.video.currentTime = 0;
    this.video.play().catch(console.error);
  }

  stopVideo() {
    this.isActive = false;

    this.video.pause();
  }

  // setActive(videoPath) {
  //   this.isActive = true;

  //   this.setVideo(videoPath);
  //   //console.log("videoscreen",this.screen.name);
  //   this.screen.material = this.videoMaterial;

  //   this.screen.material.needsUpdate = true;
  //   this.playVideo();
  //   console.log("Inactiva", this.screen.name);
  // }

  setActive(videoPath) {
    this.isActive = true;

    this.setVideo(videoPath);

    this.screen.material = this.videoMaterial;
    this.screen.material.needsUpdate = true;

    this.video.addEventListener(
      "loadeddata",
      () => {
        console.log(this.screen.name, "VIDEO LISTO");
        this.playVideo();
      },
      { once: true },
    );
  }

  setInactive() {
    this.isActive = false;

    this.stopVideo();

    this.screen.material = this.originalMaterial;
  }

  // update(time) {
  //   if (!this.isActive) return;
  //   console.log("currentTime", this.video.currentTime);

  //   this.videoTexture.needsUpdate = true;

  //   const pulse = (Math.sin(time * 0.003) + 1) / 2;

  //   // this.screen.material.color.setRGB(
  //   //   0,

  //   //   0.3 + pulse * 0.7,

  //   //   0,
  //   // );
  // }

  update(time) {
    if (!this.isActive) return;

    if (!this.logged && this.video.readyState >= this.video.HAVE_CURRENT_DATA) {
      console.log("Update",this.screen.name, this.video.currentSrc);

      this.logged = true;
    }

    this.videoTexture.needsUpdate = true;
  }
}
