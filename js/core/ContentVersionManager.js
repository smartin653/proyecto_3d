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
    day: "https://assets.esrutayerma.com/videos/video_oficiales/NO%20TODO%20ES%20PARTE%20DE%20LA%20VIDA_1.mp4",
    night: "https://assets.esrutayerma.com/videos/video_oficiales/me%20inundo_2.mp4",
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
    day: "https://assets.esrutayerma.com/models/oficiales/No%20Todo%20Es%20Parte%20De%20La%20Vida_7.glb",
    night: "https://assets.esrutayerma.com/models/oficiales/Me%20Inundo_7%7Dglb.glb",
  });
}
}
