// js/data/interactables.js

export default {
  Slider_Pista01: {
    type: "track",
    hint: "music",
    beacon: {
      color: "#FFD600",

      size: 0.1,

      animation: "pulse",
    },

    hover: {
      outline: true,

      emissive: 0.8,
    },
    title: {
      day: "NO TODO ES PARTE DE LA VIDA: Track 1 - GUITARRA ACÚSTICA",
      night: "Me inundo: Track 2 - guitarra acústica ",
    },
    cover: {
      day: "./assets/covers/day/EdMaverick_NTEPDLV_1.jpg",
      night: "./assets/covers/night/EdMaverick_MeInundo_1.jpg",
    },
    audio: {
      day: "./assets/audio/day/1_GUITARRA_ACÚSTICA__DIA.mp3",
      night: "https://assets.esrutayerma.com/audios/day/1.-guitarra-ac%C3%BAstica-_stem_.mp3",
    },
    sharing: {
      day: {
        url: "https://esrutayerma.com/",
        text: "Escucha 'No todo es parte de la vida'",
        website: "https://esrutayerma.com",

        facebook: "https://facebook.com/track-dia",
        instagram: "https://instagram.com/track-dia",
        tiktok: "https://www.tiktok.com/music/-7662460776100644881",
      },

      night: {
        url: "https://esrutayerma.com/",
        text: "Escucha 'No todo es parte de la vida'",
        website: "https://esrutayerma.com",

        facebook: "https://facebook.com/track-noche",
        instagram: "https://instagram.com/track-noche",
        tiktok: "https://www.tiktok.com/music/-7664762692532602897",
      },
    },

    download: "./assets/audio/track01.mp3",
    visuals: {
      monitor: {
        day: "./assets/video/day/grabadora.mp4",
        night: "./assets/video/day/grabadora.mp4",
      },

      projector: {
        day: "https://assets.esrutayerma.com/videos/Desierto%20Toma1_Comprimido.mp4",
        night: "https://assets.esrutayerma.com/videos/Me%20Inundo%20Comprimido%20260724%20V3.mp4",
      },
      curtains: {
        day: "https://assets.esrutayerma.com/videos/Desierto%20Toma1_Comprimido.mp4",
        night: "https://assets.esrutayerma.com/videos/Me%20Inundo%20Comprimido%20260724%20V3.mp4",
      },
    },
    youtube: {
      day: "https://www.tiktok.com/music/-7662460776100644881",
      night: "https://www.tiktok.com/music/-7664762692532602897",
    },
    camera: {
      position: {
        x: -1.9,
        y: 1.3,
        z: 0.9,
      },

      target: {
        x: 0,
        y: 1.3,
        z: 0,
      },
    },
  },

  shop1: {
    type: "link",
    hint: "shop",
    beacon: {
      color: "#FFD600",

      size: 0.1,

      animation: "pulse",
    },

    hover: {
      outline: true,

      emissive: 0.8,
    },
    title: "La Nube en vivo",
    actionLabel: "visita tienda oficial",
    url: "https://udiscover.mx/collections/ed-maverick/products/la-nube-en-el-jardin-en-vivo-desde-sala-nezahualcoyotl",
    animation: "venta",
  },
  shop2: {
    type: "link",
    hint: "shop",
    beacon: {
      color: "#FFD600",

      size: 0.1,

      animation: "pulse",
      actionLabel: "visita tienda oficial",
      url: "https://udiscover.mx/collections/ed-maverick/products/la-nube-en-el-jardin-vinilo-doble-color-black",
    },

    hover: {
      outline: true,

      emissive: 0.8,
    },
    title: "La nube",
    actionLabel: "visita tienda oficial",
    url: "https://udiscover.mx/products/la-nube-en-el-jardin-vinilo-doble-color-black",
    animation: "venta.001",
  },
  shop3: {
    type: "link",
    hint: "shop",
    beacon: {
      color: "#FFD600",

      size: 0.1,

      animation: "pulse",
    },

    hover: {
      outline: true,

      emissive: 0.8,
    },
    title: "Eduardo",
    actionLabel: "visita tienda oficial",
    url: "https://udiscover.mx/collections/ed-maverick/products/eduardo-2lp",
    animation: "venta.002",
  },
  shop4: {
    type: "link",
    hint: "shop",
    beacon: {
      color: "#FFD600",

      size: 0.1,

      animation: "pulse",
    },

    hover: {
      outline: true,

      emissive: 0.8,
    },
    title: "La Nube libro",
    actionLabel: "visita tienda oficial",
    url: "https://udiscover.mx/collections/ed-maverick/products/ed-maverick-la-nube-en-el-jardin-en-vivo",
    animation: "venta.003",
  },
  // Poster: {
  //   type: "link",
  //   hint: "shop",
  //   beacon: {
  //     color: "#FFD600",

  //     size: 0.1,

  //     animation: "pulse",
  //     actionLabel: "Visitar galeria",
  //     url: "https://cincuentaytrescuarentaynueve.com/",
  //   },

  //   hover: {
  //     outline: true,

  //     emissive: 0.8,
  //   },
  //   title: "Pista 06",
  //   actionLabel: "Visitar galeria",
  //   url: "https://cincuentaytrescuarentaynueve.com/",
  // },
  // cortina: {
  //   type: "info",
  //   showCard: false,
  //   hover: {
  //     outline: true,

  //     emissive: 0.8,
  //   },
  //   animationOptions: {
  //     stopOnLeave: false,
  //   },
  //   animation: "ventana.001",
  //   animationTrigger: "click",
  // },
  nota1: {
    type: "info",
    showCard: false,
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "Nota Dia",
  },
  nota2: {
    type: "info",
    showCard: false,
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "Nota Noche",
  },
  Cube: {
    type: "info",
    title: "Puedo dormir un rato",
    hover: {
      outline: true,

      emissive: 0.8,
    },
  },
  ASSET002: {
    type: "info",
    title: "huellas en la arena se forman en la espera",
    hover: {
      outline: true,

      emissive: 0.8,
    },
  },
  REC: {
    type: "action",

    action: "openOfficialVideo",

    hint: "youtube",

    title: "Usa este audio",

    description:
      "Se abrirá el video oficial de la canción que se está reproduciendo en una nueva pestaña.",

    actionLabel: "Abrir tiktok",

    hover: {
      outline: true,

      emissive: 0.8,
    },
    requiresTrack: true,
  },
  EFECTO: {
    type: "trigger",
    showCard: false,
    action: "toggleMood",

    mood: "cinematic",

    hint: "youtube",

    //title: "Modo cinematográfico",

    description: "Activa una experiencia visual.",

    actionLabel: "Haz clic para activar el modo cinematográfico.",

    hover: {
      outline: true,

      emissive: 0.8,
    },
  },
  cuaderno: {
    type: "link",
    showCard: false,
    hint: "shop",
    beacon: {
      color: "#FFD600",

      size: 0.1,

      animation: "pulse",
      actionLabel: "Visitar galeria",
      url: "https://udiscover.mx/collections/ed-maverick/products/la-nube-en-el-jardin-vinilo-doble-color-black",
    },

    hover: {
      outline: true,

      emissive: 0.8,
    },
    title: "La nube",
    actionLabel: "Visitar galeria",
    url: "https://cincuentaytrescuarentaynueve.com/",
    animation: "libreta",
  },
  Activador_persiana: {
    showCard: false,
    animation: "ventana.001",

    animationTrigger: "click",

    animationMode: "toggle",
  },
};
