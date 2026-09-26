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
      day: "Track 1: GUITARRA ELÉCTRICA",
      night: "track 1: guitarra + voz",
    },
    cover: {
      day: "https://assets.esrutayerma.com/covers/segundo_lanzamiento/day/EdMaverick_Escombro_01%20(1).jpg",
      night: "../assets/covers/EdMaverick_TendriaQueHablarDeLuz.jpg",
    },
    audio: {
      day: "https://assets.esrutayerma.com/audios/segundo_lanzamiento/day/ESCOMBRO-_GUITARRA-EL%C3%89CTRICA_.mp3",
      night:
        "../assets/audio/night/tqhdl.mp3",
    },
    sharing: {
      day: {
        url: "https://esrutayerma.com/",
        text: "Escucha 'Escombro'",
        website: "https://esrutayerma.com",

        facebook: "",
        instagram: "",
        tiktok: "https://www.tiktok.com/music/-7686686825079375889",
      },

      night: {
        url: "https://esrutayerma.com/",
        text: "Escucha ",
        website: "https://esrutayerma.com",

        facebook: "",
        instagram: "",
        tiktok: "https://www.tiktok.com/music/-7686697246201415697",
      },
    },

    download: "https://assets.esrutayerma.com/audios/segundo_lanzamiento/day/ESCOMBRO-_GUITARRA-EL%C3%89CTRICA_.mp3",
    visuals: {
      monitor: {
        day: "../assets/video/day/grabadora_saery.mp4",
        night: "../assets/video/day/grabadora_saery.mp4",
      },

      projector: {
        day: "https://assets.esrutayerma.com/videos/segundo_lanzamiento/day/videos_segundo_lanzamiento_day_1.mp4",
        night:
          "https://assets.esrutayerma.com/videos/segundo_lanzamiento/night/Ed_ninios_frente.mp4",
      },
      curtains: {
        day: "https://assets.esrutayerma.com/videos/segundo_lanzamiento/day/videos_segundo_lanzamiento_day_1.mp4",
        night:
          "https://assets.esrutayerma.com/videos/segundo_lanzamiento/night/Ed_ninios_lateral.mp4",
      },
    },
    youtube: {
      day: "https://www.tiktok.com/music/-7686686825079375889",
      night: "https://www.tiktok.com/music/-7686697246201415697",
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
  Slider_Pista02: {
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
      day: "Track 2: CUERDAS MAIN",
      night: "",
    },
    cover: {
      day: "https://assets.esrutayerma.com/covers/segundo_lanzamiento/day/EdMaverick_Escombro_02.jpg",
      night:
        "",
    },
    audio: {
      day: "https://assets.esrutayerma.com/audios/segundo_lanzamiento/day/ESCOMBRO-_CUERDAS-MAIN_.mp3",
      night:
        "",
    },
    visuals: {
      monitor: {
        day: "../assets/video/day/grabadora_saery.mp4",
        night: "../assets/video/day/grabadora_saery.mp4",
      },

      projector: {
        day: "https://assets.esrutayerma.com/videos/segundo_lanzamiento/day/videos_segundo_lanzamiento_day_1.mp4",
        night:
          "https://assets.esrutayerma.com/videos/segundo_lanzamiento/night/Ed_ninios_frente.mp4",
      },
      curtains: {
        day: "https://assets.esrutayerma.com/videos/segundo_lanzamiento/day/videos_segundo_lanzamiento_day_1.mp4",
        night:
          "https://assets.esrutayerma.com/videos/segundo_lanzamiento/night/Ed_ninios_lateral.mp4",
      },
    },
    sharing: {
      day: {
        url: "https://esrutayerma.com/",
        text: "Escucha Escombro",
        website: "https://esrutayerma.com",

        facebook: "https://facebook.com/track-dia",
        instagram: "https://instagram.com/track-dia",
        tiktok: " https://www.tiktok.com/music/-7686682475310172177",
      },

      night: {
        url: "https://esrutayerma.com/",
        text: "Escucha 'No todo es parte de la vida'",
        website: "https://esrutayerma.com",

        facebook: "",
        instagram: "",
        tiktok: "",
      },
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
    youtube: {
      day: "https://www.tiktok.com/music/-7686682475310172177",
      night: "https://youtu.be/1rssala9TT4",
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
  porter: {
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
    title: "SAERY tour",
    actionLabel: "Boletos",
    url: "https://esrutayerma.com/tour",
    animation: "poster_move",
    
  },
  nota1: {
    type: "info",
    showCard: false,
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "Nota Dia.001",
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
  botas_sabado_dia: {
    type: "info",
    title: "o estar pensando en lo que sería",
    hover: {
      outline: true,

      emissive: 0.8,
    },
  },
  microondas_sabado_noche: {
    type: "info",
    title: "y se parece tanto aquí a una playa en el jardín",
    hover: {
      outline: true,

      emissive: 0.8,
    },
  },
  herradura_domingo_dia: {
    type: "info",
    title: "Se va a secar el pasto si no riego el jardín todos los días",
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "herradura_move",
  },
  vela_domingo_noche: {
    type: "info",
    title: "cosas de tu cama flotan en el agua",
    hover: {
      outline: true,

      emissive: 0.8,
    },
  },
  Libreta: {
    type: "info",
    showCard: false,
    
    
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "libreta_move",
  },
    sombrero_lunes_dia: {
    type: "info",
    title: "Mirar para el pasado ver lo aprendido y ver que pasaría",
    hover: {
      outline: true,

      emissive: 0.8,
    },
    
  },
   tostadora_lunes_noche: {
    type: "info",
    title: "y vuelves a acercarte lentamente",
    hover: {
      outline: true,

      emissive: 0.8,
    },
    
  },
  cuerda_miercoles_dia: {
    type: "info",
    title: "Ver el campo a su lado, nunca creí que un día volvería.",
    hover: {
      outline: true,

      emissive: 0.8,
    },
    
  },
   planta_miercoles_noche: {
    type: "info",
    title: "y vuelves a mirarme fijamente",
    hover: {
      outline: true,

      emissive: 0.8,
    },
    
  },
  // segundo lanzamiento 
  sl_mosco1: {
    type: "info",
    title: "No quiero mirar si no puedo quitar el escombro que hay y no puedo limpiar",
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "alas1"
    
  },
  sl_mosco2: {
    type: "info",
    title: "Si no puedo avanzar ¿de qué sirve soñar?",
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "alas2"
  },
  NotaDia: {
    type: "info",
    showCard: false,
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "Nota_Dia",
  },
  NotaNoche: {
    type: "info",
    showCard: false,
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "Nota_Noche",
  },
   
  PERRO_2: {
    type: "trigger",
    showCard: false,
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animations: [""],
  },
  // noche
  sl_metronomo: {
    type: "info",
    title: "En medio de este canto que te doy ",
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "alas1"
    
  },
  sl_metronomo: {
    type: "info",
    title: "En medio de este canto que te doy ",
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "PlaneAction.001"
    
  },
  PERRO_1: {
  type: "trigger",
  showCard: false,
  hover: {
    outline: true,
    emissive: 0.8,
  },
  animations: ["pataAction", "colaAction"],
},
  
  carta: {
    type: "link",
    showCard: true,
    hover: {
      outline: true,

      emissive: 0.8,
    },
    title: "Newsletter",
    actionLabel: "Suscribirse",
    url: "https://link.fans/edmaverick",
    animation: "cartaAction",
  },
  
  REC: {
    type: "action",

    action: "openOfficialVideo",

    hint: "youtube",

    title: "Tiktok",

    description:
      "Se abrirá el video oficial de la canción que se está reproduciendo en una nueva pestaña.",

    actionLabel: "Reproduce el audio en tiktok",

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
