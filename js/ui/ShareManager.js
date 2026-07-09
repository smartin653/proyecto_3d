export default class ShareManager {
  constructor() {
    this.platforms = [
      {
        id: "facebook",
        icon: "./assets/icons/facebook.svg",
        label: "Facebook",
        handler: this.shareFacebook.bind(this),
      },

      {
        id: "whatsapp",
        icon: "./assets/icons/whatsapp.svg",
        label: "WhatsApp",
        handler: this.shareWhatsApp.bind(this),
      },

      {
        id: "x",
        icon: "./assets/icons/x.svg",
        label: "X",
        handler: this.shareX.bind(this),
      },

      {
        id: "tiktok",
        icon: "./assets/icons/tiktok.svg",
        label: "TikTok",
        handler: this.shareTikTok.bind(this),
      },

      {
        id: "copy",
        icon: "./assets/icons/copy.svg",
        label: "Copiar enlace",
        handler: this.copyLink.bind(this),
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
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(track.sharing.url)}`,

      "_blank",
    );
  }

  shareWhatsApp(track) {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        track.sharing.text + " " + track.sharing.url,
      )}`,

      "_blank",
    );
  }

  shareX(track) {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(track.sharing.text)}&url=${encodeURIComponent(track.sharing.url)}`,

      "_blank",
    );
  }

  shareTikTok(track) {
    navigator.clipboard.writeText(track.sharing.url);

    this.toast.show(
      "Enlace copiado",

      "📋",
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

  download(track) {

    if (!track.download) {

        this.toast?.show(
            "No hay descarga disponible",
            "⚠️"
        );

        return;

    }

    const link = document.createElement("a");

    link.href = track.download;

    link.download = "";

    document.body.appendChild(link);

    link.click();

    link.remove();

    this.toast?.show(
        "Descarga iniciada",
        "⬇"
    );

}
}
