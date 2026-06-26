export default class ScreenManager {
  constructor() {
    this.screens = {};
  }

  add(name, screen) {
    this.screens[name] = screen;
  }

  play(visuals) {
    Object.entries(visuals).forEach(([name, videoPath]) => {
      if (!videoPath) return;

      const screen = this.screens[name];

      if (!screen) return;

      screen.setActive(videoPath);
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