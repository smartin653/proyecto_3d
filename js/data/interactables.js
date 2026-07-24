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
      day: "./assets/audio/day/1_GUITARRA_ACÚSTICA_(STEM).wav",
      night: "./assets/audio/night/1. guitarra acústica (stem).wav",
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
        day: "https://assets.esrutayerma.com/videos/desierto02_1.mp4",
        night: "https://assets.esrutayerma.com/videos/me-inundo%20(1).mp4",
      },
      curtains: {
        day: "https://assets.esrutayerma.com/videos/desierto02_1.mp4",
        night: "https://assets.esrutayerma.com/videos/me-inundo-cuad.mp4",
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

  // Slider_Pista02: {
  //   type: "track",
  //   hint: "music",
  //   beacon: {
  //     color: "#FFD600",

  //     size: 0.1,

  //     animation: "pulse",
  //   },

  //   hover: {
  //     outline: true,

  //     emissive: 0.8,
  //   },
  //   title: {
  //     day: "NO TODO ES PARTE DE LA VIDA: Track 1 - GUITARRA ELÉCTRICA",
  //     night: "Me inundo: Track 2 - guitarra eléctrica",
  //   },
  //   cover: {
  //     day: "./assets/covers/day/EdMaverick_NTEPDLV_2.jpg",
  //     night: "./assets/covers/night/EdMaverick_MeInundo_2.jpg",
  //   },
  //   audio: {
  //     day: "./assets/audio/day/2. GUITARRA ELÉCTRICA (STEM).wav",
  //     night: "./assets/audio/night/2. guitarra eléctrica (stem) (1).wav",
  //   },
  //   visuals: {
  //     monitor: {
  //       day: "./assets/video/day/grabadora.mp4",
  //       night: "./assets/video/night/grabadora.mp4",
  //     },

  //     projector: {
  //       day: "https://assets.esrutayerma.com/videos/desierto_toma1.mp4",
  //       night: "https://assets.esrutayerma.com/videos/Me_inundo.mov",
  //     },
  //     curtains: {
  //       day: "https://assets.esrutayerma.com/videos/desierto_toma1.mp4",
  //       night: "https://assets.esrutayerma.com/videos/Me_inundo.mov",
  //     },
  //   },
  //   sharing: {
  //     day: {
  //       url: "https://esrutayerma.com/",
  //       text: "Escucha 'No todo es parte de la vida'",
  //       website: "https://esrutayerma.com",

  //       facebook: "https://facebook.com/track-dia",
  //       instagram: "https://instagram.com/track-dia",
  //       tiktok: "https://www.tiktok.com/music/-7662460956590917649",
  //     },

  //     night: {
  //       url: "https://esrutayerma.com/",
  //       text: "Escucha 'No todo es parte de la vida'",
  //       website: "https://esrutayerma.com",

  //       facebook: "https://facebook.com/track-noche",
  //       instagram: "https://instagram.com/track-noche",
  //       tiktok: "https://www.tiktok.com/music/-7664768185333975056",
  //     },
  //   },
  //   camera: {
  //     position: {
  //       x: -1.9,
  //       y: 1.3,
  //       z: 0.9,
  //     },

  //     target: {
  //       x: 0,
  //       y: 1.3,
  //       z: 0,
  //     },
  //   },
  //   youtube: {
  //     day: "https://www.tiktok.com/music/-7662460956590917649",
  //     night: "https://www.tiktok.com/music/-7664768185333975056",
  //   },
  // },

  // Slider_Pista03: {
  //   type: "track",
  //   hint: "music",
  //   beacon: {
  //     color: "#FFD600",

  //     size: 0.1,

  //     animation: "pulse",
  //   },

  //   hover: {
  //     outline: true,

  //     emissive: 0.8,
  //   },
  //   title: {
  //     day: "NO TODO ES PARTE DE LA VIDA: Track 1 - BAJO ",
  //     night: "Me inundo: Track 2 - bajo",
  //   },
  //   cover: {
  //     day: "./assets/covers/day/EdMaverick_NTEPDLV_3.jpg",
  //     night: "./assets/covers/night/EdMaverick_MeInundo_3.jpg",
  //   },
  //   audio: {
  //     day: "./assets/audio/day/3. BAJO (STEM).wav",
  //     night: "./assets/audio/night/3. bajo (stem) (1).wav",
  //   },
  //   visuals: {
  //     monitor: {
  //       day: "./assets/video/day/grabadora.mp4",
  //       night: "./assets/video/night/grabadora.mp4",
  //     },

  //     projector: {
  //       day: "https://assets.esrutayerma.com/videos/desierto_toma1.mp4",
  //       night: "https://assets.esrutayerma.com/videos/Me_inundo.mov",
  //     },
  //     curtains: {
  //       day: "https://assets.esrutayerma.com/videos/desierto_toma1.mp4",
  //       night: "https://assets.esrutayerma.com/videos/Me_inundo.mov",
  //     },
  //   },
  //   sharing: {
  //     day: {
  //       url: "https://esrutayerma.com/",
  //       text: "Escucha 'No todo es parte de la vida'",
  //       website: "https://esrutayerma.com",

  //       facebook: "https://facebook.com/track-dia",
  //       instagram: "https://instagram.com/track-dia",
  //       tiktok: "https://www.tiktok.com/music/-7662460889815549969",
  //     },

  //     night: {
  //       url: "https://esrutayerma.com/",
  //       text: "Escucha 'No todo es parte de la vida'",
  //       website: "https://esrutayerma.com",

  //       facebook: "https://facebook.com/track-noche",
  //       instagram: "https://instagram.com/track-noche",
  //       tiktok: "https://www.tiktok.com/music/-7664768065549518865",
  //     },
  //   },
  //   camera: {
  //     position: {
  //       x: -1.9,
  //       y: 1.3,
  //       z: 0.9,
  //     },

  //     target: {
  //       x: 0,
  //       y: 1.3,
  //       z: 0,
  //     },
  //   },
  //   youtube: {
  //     day: "https://www.tiktok.com/music/-7662460889815549969",
  //     night: "https://www.tiktok.com/music/-7664768065549518865",
  //   },
  // },

  // Slider_Pista04: {
  //   type: "track",
  //   hint: "music",
  //   beacon: {
  //     color: "#FFD600",

  //     size: 0.1,

  //     animation: "pulse",
  //   },

  //   hover: {
  //     outline: true,

  //     emissive: 0.8,
  //   },
  //   title: {
  //     day: "NO TODO ES PARTE DE LA VIDA: Track 1 - BATERÍA",
  //     night: "Me inundo: Track 2 - batería",
  //   },
  //   cover: {
  //     day: "./assets/covers/day/EdMaverick_NTEPDLV_4.jpg",
  //     night: "./assets/covers/night/EdMaverick_MeInundo_4.jpg",
  //   },
  //   audio: {
  //     day: "./assets/audio/day/4. BATERÍA (STEM).wav",
  //     night: "./assets/audio/night/4. batería (stem) (1).wav",
  //   },
  //   visuals: {
  //     monitor: {
  //       day: "./assets/video/day/grabadora.mp4",
  //       night: "./assets/video/night/grabadora.mp4",
  //     },

  //     projector: {
  //       day: "https://assets.esrutayerma.com/videos/desierto_toma1.mp4",
  //       night: "https://assets.esrutayerma.com/videos/Me_inundo.mov",
  //     },
  //     curtains: {
  //       day: "https://assets.esrutayerma.com/videos/desierto_toma1.mp4",
  //       night: "https://assets.esrutayerma.com/videos/Me_inundo.mov",
  //     },
  //   },
  //   sharing: {
  //     day: {
  //       url: "https://esrutayerma.com/",
  //       text: "Escucha 'No todo es parte de la vida'",
  //       website: "https://esrutayerma.com",

  //       facebook: "https://facebook.com/track-dia",
  //       instagram: "https://instagram.com/track-dia",
  //       tiktok: "https://www.tiktok.com/music/-7662466234554730497",
  //     },

  //     night: {
  //       url: "https://esrutayerma.com/",
  //       text: "Escucha 'No todo es parte de la vida'",
  //       website: "https://esrutayerma.com",

  //       facebook: "https://facebook.com/track-noche",
  //       instagram: "https://instagram.com/track-noche",
  //       tiktok: "https://www.tiktok.com/music/-7664772830000760849",
  //     },
  //   },
  //   camera: {
  //     position: {
  //       x: -1.9,
  //       y: 1.3,
  //       z: 0.9,
  //     },

  //     target: {
  //       x: 0,
  //       y: 1.3,
  //       z: 0,
  //     },
  //   },
  //   youtube: {
  //     day: "https://www.tiktok.com/music/-7662466234554730497",
  //     night: "https://www.tiktok.com/music/-7664772830000760849",
  //   },
  // },

  // Slider_Pista05: {
  //   type: "track",
  //   hint: "music",
  //   title: {
  //     day: "NO TODO ES PARTE DE LA VIDA: Track 1 - CUERDAS",
  //     night: "Me inundo: Track 2 - cuerdas",
  //   },
  //   cover: {
  //     day: "./assets/covers/day/EdMaverick_NTEPDLV_5.jpg",
  //     night: "./assets/covers/night/EdMaverick_MeInundo_5.jpg",
  //   },
  //   audio: {
  //     day: "./assets/audio/day/5. CUERDAS (STEM).wav",
  //     night: "./assets/audio/night/5. cuerdas (stem) (1).wav",
  //   },
  //   visuals: {
  //     monitor: {
  //       day: "./assets/video/day/grabadora.mp4",
  //       night: "./assets/video/night/grabadora.mp4",
  //     },

  //     projector: {
  //       day: "https://assets.esrutayerma.com/videos/desierto_toma1.mp4",
  //       night: "https://assets.esrutayerma.com/videos/Me_inundo.mov",
  //     },
  //     curtains: {
  //       day: "https://assets.esrutayerma.com/videos/desierto_toma1.mp4",
  //       night: "https://assets.esrutayerma.com/videos/Me_inundo.mov",
  //     },
  //   },
  //   sharing: {
  //     day: {
  //       url: "https://esrutayerma.com/",
  //       text: "Escucha 'No todo es parte de la vida'",
  //       website: "https://esrutayerma.com",

  //       facebook: "https://facebook.com/track-dia",
  //       instagram: "https://instagram.com/track-dia",
  //       tiktok: "https://www.tiktok.com/music/-7662459729222240272",
  //     },

  //     night: {
  //       url: "https://esrutayerma.com/",
  //       text: "Escucha 'No todo es parte de la vida'",
  //       website: "https://esrutayerma.com",

  //       facebook: "https://facebook.com/track-noche",
  //       instagram: "https://instagram.com/track-noche",
  //       tiktok: "https://www.tiktok.com/music/-7664777765024073745",
  //     },
  //   },
  //   camera: {
  //     position: {
  //       x: -1.9,
  //       y: 1.3,
  //       z: 0.9,
  //     },

  //     target: {
  //       x: 0,
  //       y: 1.3,
  //       z: 0,
  //     },
  //   },
  //   youtube: {
  //     day: "https://www.tiktok.com/music/-7662459729222240272",
  //     night: "https://www.tiktok.com/music/-7664777765024073745",
  //   },
  // },

  // Slider_Pista06: {
  //   type: "track",
  //   hint: "music",
  //   title: {
  //     day: "NO TODO ES PARTE DE LA VIDA: Track 1 - TROMPETA",
  //     night: "Me inundo: Track 2 - wurlitzer ",
  //   },
  //   cover: {
  //     day: "./assets/covers/day/EdMaverick_NTEPDLV_6.jpg",
  //     night: "./assets/covers/night/EdMaverick_MeInundo_1.jpg",
  //   },
  //   audio: {
  //     day: "./assets/audio/day/6. TROMPETA (STEM).wav",
  //     night: "./assets/audio/night/6. wurlitzer (stem).wav",
  //   },
  //   visuals: {
  //     monitor: {
  //       day: "./assets/video/day/grabadora.mp4",
  //       night: "./assets/video/night/grabadora.mp4",
  //     },

  //     projector: {
  //       day: "https://assets.esrutayerma.com/videos/desierto_toma1.mp4",
  //       night: "https://assets.esrutayerma.com/videos/Me_inundo.mov",
  //     },
  //     curtains: {
  //       day: "https://assets.esrutayerma.com/videos/desierto_toma1.mp4",
  //       night: "https://assets.esrutayerma.com/videos/Me_inundo.mov",
  //     },
  //   },
  //   sharing: {
  //     day: {
  //       url: "https://esrutayerma.com/",
  //       text: "Escucha 'No todo es parte de la vida'",
  //       website: "https://esrutayerma.com",

  //       facebook: "https://facebook.com/track-dia",
  //       instagram: "https://instagram.com/track-dia",
  //       tiktok: "https://www.tiktok.com/music/-7664792556329699345",
  //     },

  //     night: {
  //       url: "https://esrutayerma.com/",
  //       text: "Escucha 'No todo es parte de la vida'",
  //       website: "https://esrutayerma.com",

  //       facebook: "https://facebook.com/track-noche",
  //       instagram: "https://instagram.com/track-noche",
  //       tiktok: "https://www.tiktok.com/music/-7662460922510870545",
  //     },
  //   },
  //   camera: {
  //     position: {
  //       x: -1.9,
  //       y: 1.3,
  //       z: 0.9,
  //     },

  //     target: {
  //       x: 0,
  //       y: 1.3,
  //       z: 0,
  //     },
  //   },
  //   youtube: {
  //     day: "https://www.tiktok.com/music/-7664792556329699345",
  //     night: "https://www.tiktok.com/music/-7662460922510870545",
  //   },
  // },
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
