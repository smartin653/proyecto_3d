export default class ScreenManager {
  constructor() {
    this.screens = {};
    this.currentPreset = null;
    this.idleFrames = {}; // nombre de pantalla -> video del fotograma de reposo
  }

  add(name, screen) {
    this.screens[name] = screen;
  }

  setEnvironment(environmentManager) {
    this.environment = environmentManager;

    this.currentPreset = environmentManager.getCurrentPreset();

    environmentManager.onChange(() => {
      this.currentPreset = environmentManager.getCurrentPreset();

      console.log("🎬 Screen preset:", this.currentPreset);
    });
  }


  play(visuals) {

  Object.entries(visuals).forEach(([name, videoPath]) => {

    if (!videoPath) return;

    //----------------------------------------
    // Pantallas normales
    //----------------------------------------

    if (name !== "projector" && name !== "curtains") {

      const screen = this.screens[name];

      if (screen) {
        screen.setActive(videoPath);
      }

      return;
    }

    //----------------------------------------
    // Jardín dinámico
    //----------------------------------------

    if (name === "projector") {

      if (!this.currentPreset) return;

      const gardenName = this.currentPreset.garden;

      const garden = this.screens[gardenName];

      if (!garden) {

        console.warn(
          `Pantalla ${gardenName} no encontrada`
        );

        return;
      }

      garden.setActive(videoPath);

      return;
    }

    //----------------------------------------
    // Cortinas dinámicas
    //----------------------------------------

    if (name === "curtains") {

      if (!this.currentPreset) return;
      //console.log("Preset:", this.currentPreset);

      const curtainName = this.currentPreset.curtain;

      const curtain = this.screens[curtainName];

      if (!curtain) {

        console.warn(
          `Pantalla ${curtainName} no encontrada`
        );

        return;
      }
      console.log("Curtains:", videoPath);
      curtain.setActive(videoPath);
    }

  });

}



  // Pantalla clicable: muestra un fotograma en pausa y recuerda su video
  // para volver a ese estado cuando termina un track.
  setIdle(name, videoPath) {
    const screen = this.screens[name];

    if (!screen || !videoPath) return;

    this.idleFrames[name] = videoPath;
    screen.showFrame(videoPath);
  }

  toggle(name, videoPath) {
    const screen = this.screens[name];

    if (!screen) {
      console.warn(`Pantalla ${name} no encontrada`);
      return;
    }

    screen.toggle(videoPath);
  }

  stopAll() {
    Object.entries(this.screens).forEach(([name, screen]) => {
      screen.setInactive();

      // Las pantallas clicables vuelven a su fotograma de reposo.
      if (this.idleFrames[name]) {
        screen.showFrame(this.idleFrames[name]);
      }
    });
  }

  update(time) {
    Object.values(this.screens).forEach((screen) => {
      screen.update(time);
    });
  }
}
