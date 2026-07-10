export default class ScreenManager {
  constructor() {
    this.screens = {};
    this.currentPreset = null;
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

        if (name !== "projector") {

            const screen = this.screens[name];

            if (screen) {

                screen.setActive(videoPath);

            }

            return;

        }

        //----------------------------------------
        // Jardín dinámico
        //----------------------------------------

        if (!this.currentPreset) return;

        const gardenName =
            this.currentPreset.garden;

        const garden =
            this.screens[gardenName];

        if (!garden) {

            console.warn(
                `Pantalla ${gardenName} no encontrada`
            );

            return;

        }

        garden.setActive(videoPath);

    });

}



  stopAll() {
    Object.values(this.screens).forEach((screen) => {
      screen.setInactive();
    });
  }

  update(time) {
    Object.values(this.screens).forEach((screen) => {
      screen.update(time);
    });
  }
}
