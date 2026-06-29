// ui/SpotifyPlayer.js

export default class SpotifyPlayer {
  constructor(audioManager) {
    this.audioManager = audioManager;

    this.player = document.getElementById("spotify-player");
    this.title = document.querySelector(".spotify-track-title");
    this.button = document.getElementById("spotify-toggle");
    this.progressFill = document.querySelector(".spotify-progress-fill");
    this.currentTimeElement = document.getElementById("current-time");
    this.durationElement = document.getElementById("duration-time");
    this.cover = document.getElementById("spotify-cover");
    this.closeButton = document.getElementById("spotify-close");
    this.onClose = null;
    this.setupEvents();
  }

  formatTime(seconds) {
    if (!seconds || isNaN(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }

  update() {
    const audio = this.audioManager.audio;

    if (!audio.duration) return;

    const progress = (audio.currentTime / audio.duration) * 100;

    this.progressFill.style.width = `${progress}%`;

    this.currentTimeElement.textContent = this.formatTime(audio.currentTime);

    this.durationElement.textContent = this.formatTime(audio.duration);
  }

  setupEvents() {
    this.button.addEventListener("click", () => {
      if (this.audioManager.audio.paused) {
        this.audioManager.audio.play();

        this.button.textContent = "⏸";
      } else {
        this.audioManager.audio.pause();

        this.button.textContent = "▶";
      }
    });

    this.closeButton.addEventListener("click", () => {
      if (this.onClose) {
        this.onClose();
      }
    });
  }

  show(trackTitle, cover) {
    this.player.classList.add("active");

    this.title.textContent = trackTitle;
    this.cover.src = cover;

    this.button.textContent = "⏸";
  }

  hide() {
    this.player.classList.remove("active");
  }
}
