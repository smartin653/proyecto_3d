export default class AudioManager {
  constructor() {
    this.audio = new Audio();

    this.onEnded = null;

    this.audio.addEventListener("ended", () => {
      if (this.onEnded) {
        this.onEnded();
        this.nowPlayingElement.style.display = "none";
      }
    });

    this.trackTitleElement = document.getElementById("track-title");

    this.nowPlayingElement = document.getElementById("now-playing");
  }

  play(path) {
    this.onPlay = null;
    this.audio.pause();

    this.audio.src = path;

    this.audio.currentTime = 0;

    this.audio.play();
    if (this.onPlay) {
      this.onPlay();
    }
  }

  stop() {
    this.audio.pause();

    this.audio.currentTime = 0;
  }

  showTrack(title) {
    this.trackTitleElement.textContent = title;

    this.nowPlayingElement.style.display = "block";
  }
}
