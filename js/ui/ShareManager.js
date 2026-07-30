export default class ShareManager {
  constructor() {
    this.currentTrack = null;

    this.toast = null;

    this.container = document.getElementById(
      "spotify-share-icons",
    );

    this.renderPlatforms();
  }

  renderPlatforms() {
    if (!this.container) return;

    this.container.innerHTML = "";

    if (!this.currentTrack?.sharing) return;

    const platforms = [];

    //----------------------------------
    // Página de plataformas musicales
    //----------------------------------

    if (this.currentTrack.sharing.music) {
      platforms.push({
        id: "music",
        icon: "./assets/icons/tocar.png",
        label: "Escuchar en plataformas",
        handler: this.openMusicLinks.bind(this),
      });
    }

    //----------------------------------
    // TikTok
    //----------------------------------

    if (this.currentTrack.sharing.tiktok) {
      platforms.push({
        id: "tiktok",
        icon: "./assets/icons/tiktok.svg",
        label: "TikTok",
        handler: this.shareTikTok.bind(this),
      });
    }

    //----------------------------------
    // Crear botones
    //----------------------------------

    platforms.forEach((platform) => {
      const button = document.createElement("button");

      button.className = "spotify-share-button";

      button.title = platform.label;

      button.innerHTML = `
        <img
          class="share-icon"
          src="${platform.icon}"
          alt="${platform.label}"
        >
      `;

      button.addEventListener("click", () => {
        if (!this.currentTrack) return;

        platform.handler(this.currentTrack);
      });

      this.container.appendChild(button);
    });
  }

  setCurrentTrack(track) {
    this.currentTrack = track;

    this.renderPlatforms();
  }

  //----------------------------------
  // Plataformas musicales
  //----------------------------------

  openMusicLinks(track) {
    window.open(
      track.sharing.music,
      "_blank",
    );
  }

  //----------------------------------
  // TikTok
  //----------------------------------

  shareTikTok(track) {
    window.open(
      track.sharing.tiktok,
      "_blank",
    );
  }

  //----------------------------------
  // Copiar enlace
  //----------------------------------

  copyLink(track) {
    navigator.clipboard.writeText(
      track.sharing.url,
    );

    this.toast?.show(
      "Enlace copiado",
      "📋",
    );
  }

  //----------------------------------
  // Toast
  //----------------------------------

  setToast(toast) {
    this.toast = toast;
  }
}