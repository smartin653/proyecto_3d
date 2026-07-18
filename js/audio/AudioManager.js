export default class AudioManager {
  constructor() {
    this.audio = new Audio();
    this.currentTrack = null;
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

  // play(path) {
  //   this.onPlay = null;
  //   this.audio.pause();

  //   this.audio.src = path;

  //   this.audio.currentTime = 0;

  //   this.audio.play();
  //   if (this.onPlay) {
  //     this.onPlay();
  //   }
  // }

  play(track) {
    this.currentTrack = track;

    this.audio.pause();

    this.audio.src = track.audio;

    this.audio.currentTime = 0;

    this.audio.play();
  }

  stop() {
    this.audio.pause();

    this.audio.currentTime = 0;
  }

  showTrack(title) {
    this.trackTitleElement.textContent = title;

    this.nowPlayingElement.style.display = "block";
  }

  getCurrentTrack() {
    return this.currentTrack;
  }

  openOfficialVideo() {
    console.log("current video")
    console.log(this.currentTrack);
    console.log(this.currentTrack?.youtube);
    if (!this.currentTrack?.youtube) {
      return;
    }

    window.open(this.currentTrack.youtube, "_blank");
  }
}
