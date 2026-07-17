// ui/SpotifyPlayer.js

export default class SpotifyPlayer {
  constructor(audioManager) {
    this.audioManager = audioManager;

    this.player = document.getElementById("spotify-player");
    this.title = document.querySelector(".spotify-track-title");
    this.button = document.getElementById("spotify-toggle");
    //this.downloadButton = document.getElementById("spotify-download");
    this.currentTrack = null;
    this.onDownload = null;
    this.progressFill = document.querySelector(".spotify-progress-fill");
    this.currentTimeElement = document.getElementById("current-time");
    this.durationElement = document.getElementById("duration-time");
    this.cover = document.getElementById("spotify-cover");
    this.closeButton = document.getElementById("spotify-close");
    this.onClose = null;
    this.onTrackChanged = null;
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
    
    // this.downloadButton.addEventListener("click", () => {
    //   if (!this.currentTrack) return;

    //   if (this.onDownload) {
    //     this.onDownload(this.currentTrack);
    //   }
    // });
  }

  show(interactable) {
    this.currentTrack = interactable;
     if (this.onTrackChanged) {

        this.onTrackChanged(interactable);

    }

    this.player.classList.add("active");

    this.title.textContent = interactable.title;

    this.cover.src = interactable.cover;

    this.button.textContent = "⏸";
  }

  hide() {
    this.player.classList.remove("active");
  }
}
