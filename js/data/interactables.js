// js/data/interactables.js

export default {
  // Pantalla del monitor: arranca con un fotograma en pausa; el clic reproduce/pausa.
  PlanosTele: {
    type: "screen",
    screen: "monitor", // clave de la pantalla en ScreenManager
    autoplay: true, // se reproduce solo al entrar al estudio (en silencio)
    showCard: true,
    video: {
      day: "https://assets.esrutayerma.com/videos/WhatsApp%20Video%202026-11-12%20at%205.12.59%20PM.mp4",
      night: "https://assets.esrutayerma.com/videos/WhatsApp%20Video%202026-11-12%20at%205.12.59%20PM.mp4",
    },
    hover: {
      outline: true,
      emissive: 0.8,
    },
    title: "Ver video",
    actionLabel: "Ver video",
    url: "https://www.youtube.com/watch?v=7ykCeB8nsBI"
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
  
  
 lista: {
    type: "info",
    showCard: false,
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "listaAction",
  },

  PortadaDia: {
    type: "link",
    showCard: true,
    hover: {
      outline: true,

      emissive: 0.8,
    },
    title: "Sahuaro",
    actionLabel: "Escuchar ahora",
    url: "https://edmaverick.lnk.to/SAHUARO",
    
  },

  PortadaNoche: {
    type: "link",
    showCard: true,
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "PortadaNocheAction",
    title: "En las buenas y en las malas",
    actionLabel: "Escuchar ahora",
    url: "https://edmaverick.lnk.to/elbyelm",
  },
  reveal_noche: {
    type: "link",
    showCard: true,
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "PortadaNocheAction",
    title: "haciendo tanto",
    actionLabel: "Escuchar ahora",
    url: "https://music.apple.com/mx/album/catarsis/1773878715",
  },

   texto_1: {
    type: "info",
    showCard: false,
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "texto_1Action",
  },

  texto_2: {
    type: "info",
    showCard: false,
    hover: {
      outline: true,

      emissive: 0.8,
    },
    animation: "texto_1Action",
  },

  
  REC: {
    type: "action",

    action: "openOfficialVideo",

    hint: "youtube",

    title: "",

    description:
      "Se abrirá el video oficial de la canción que se está reproduciendo en una nueva pestaña.",

    actionLabel: "Ver en Youtube",

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
