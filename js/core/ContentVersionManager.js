export default class ContentVersionManager {
  constructor() {}

  getMode() {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 18) {
      return "day";
    }

    return "night";
  }

  getIdleVideo() {
  return this.resolve({
    day: "../assets/video/videos_segundo_lanzamiento_day_1.mp4",
    night: "https://assets.esrutayerma.com/videos/segundo_lanzamiento/night/Ed%20ni%C3%B1os.mp4",
  });
}

  resolve(value) {
    //----------------------------------
    // Valor simple
    //----------------------------------

    if (typeof value !== "object" || value === null) {
      return value;
    }

    //----------------------------------
    // Valor day/night
    //----------------------------------

    return value[this.getMode()];
  }

  resolveTrack(interactable) {
    const visuals = {};

    if (interactable.visuals) {
      Object.entries(interactable.visuals).forEach(([key, value]) => {
        visuals[key] = this.resolve(value);
      });
    }

    return {
      ...interactable,

      title: this.resolve(interactable.title),

      cover: this.resolve(interactable.cover),

      audio: this.resolve(interactable.audio),

      sharing: this.resolve(interactable.sharing),

      youtube: this.resolve(interactable.youtube),

      visuals,
    };
  }

  getSceneModel() {
  return this.resolve({
    day: "https://assets.esrutayerma.com/models/segundo_lanzamiento/day_1/ESCOMBRO_DIA_1.glb",
    night: "https://assets.esrutayerma.com/models/segundo_lanzamiento/day_1/ESCOMBRO_DIA_1.glb",
  });
}
}
