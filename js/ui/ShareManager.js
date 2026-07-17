export default class ShareManager {
  constructor() {
    this.platforms = [
      {
        id: "tiktok",
        icon: "./assets/icons/tiktok.svg",
        label: "TikTok",
        handler: this.shareTikTok.bind(this),
      },
      {
        id: "instagram",
        icon: "./assets/icons/instagram.png",
        label: "Instagram",
        handler: this.shareInstagram.bind(this),
      },
    ];

    this.currentTrack = null;

    this.toast = null;

    this.create();
  }

  create() {
    this.container = document.getElementById("spotify-share-icons");

    this.platforms.forEach((platform) => {
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
  }

  shareFacebook(track) {
    window.open(
      track.sharing.facebook,

      "_blank",
    );
  }

  shareInstagram(track) {
    window.open(
      track.sharing.instagram,

      "_blank",
    );
  }



  shareTikTok(track) {
    window.open(
      track.sharing.tiktok,

      "_blank",
    );
  }

  copyLink(track) {
    navigator.clipboard.writeText(track.sharing.url);

    this.toast?.show(
      "Enlace copiado",

      "📋",
    );
  }

  setToast(toast) {
    this.toast = toast;
  }

  // download(track) {
  //   if (!track.download) {
  //     this.toast?.show("No hay descarga disponible", "⚠️");

  //     return;
  //   }

  //   const link = document.createElement("a");

  //   link.href = track.download;

  //   link.download = "";

  //   document.body.appendChild(link);

  //   link.click();

  //   link.remove();

  //   this.toast?.show("Descarga iniciada", "⬇");
  // }
}
