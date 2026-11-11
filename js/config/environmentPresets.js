export default {
  morning: {
    garden: "jardinAmanecer",

    curtain: "PlanoAmanecer",

    // Relleno ambiental: cielo frío / rebote cálido del suelo. Da sombras
    // azuladas suaves en vez de zonas planas en blanco.
    hemisphere: {
      sky: "#EDE2D8",
      ground: "#B07C52",
      intensity: 12,
    },

    // Rebote de luz cálida desde el lado opuesto al sol, hacia el frente del
    // cuarto (pared del escritorio y puertas). Sin esto esa zona quedaba
    // gris-lavanda frente al resto cálido. Sin sombras: solo relleno.
    fills: [
      {
        color: "#FFC48C",
        intensity: 350,
        angle: 1.0,
        penumbra: 0.8,
        position: [2.2, 2.2, 0],
        target: [-3.2, 1.3, 0],
      },
    ],

    // Sol de la mañana entrando por la ventana (haces y sombras de gobo).
    // Si los haces se ven blancos en vez de naranjas, baja intensity: ACES
    // desatura lo que se pasa de brillo.
    sun: {
      color: "#FF9840",
      intensity: 1400,
      angle: 0.55,
      penumbra: 0.45,
      position: [-2.2, 2.5, 2.3],
      target: [3.0, 1.0, -0.4],
    },

    lights: {
      Spot001: {
        intensity: 150,
        visible: true,
        color: "#FFF8EC",
      },

      // Tonos cálidos, no naranjas saturados: así los objetos azules
      // (p. ej. el banco) conservan su color.
      Spot002: {
        intensity: 30,
        visible: true,
        color: "#FFD8B0",
      },

      Spot003: {
        intensity: 110,
        visible: true,
        color: "#FFD6A8",
      },

      Spot004: {
        intensity: 0,
        visible: true,
        color: "#FFF8EC",
      },
      Spot005: {
        intensity: 25,
        visible: true,
        color: "#FFD0A0",
      },
      Spot006: {
        intensity: 25,
        visible: true,
        color: "#FFD0A0",
      },
      Spot007: {
        intensity: 0,
        visible: true,
        color: "#FFF8EC",
      },
    },
  },

  afternoon: {
    garden: "jardinDia",

    curtain: "PlanoDia",

    lights: {
      Spot001: {
        intensity: 80,
        visible: true,
        color: "#ffffff",
      },

      Spot002: {
        intensity: 55,
        visible: true,
        color: "#ffffff",
      },

      Spot003: {
        intensity: 125,
        visible: true,
        color: "#ffffff",
      },

      Spot004: {
        intensity: 0,
        visible: true,
        color: "#ffffff",
      },
      Spot005: {
        intensity: 35,
        visible: true,
        color: "#FFF8EC",
      },
      Spot006: {
        intensity: 35,
        visible: true,
        color: "#FFF8EC",
      },
      Spot007: {
        intensity: 0,
        visible: true,
        color: "#FFF8EC",
      },
    },
  },

  night: {
    garden: "jardinNoche",

    curtain: "PlanoNoche",

    lights: {
      Spot001: {
        intensity: 35,
        visible: true,
        color: "#FFD8A8",
      },

      Spot002: {
        intensity: 80,
        visible: true,
        color: "#FFD8A8",
      },

      Spot003: {
        intensity: 35,
        visible: true,
        color: "#FFD8A8",
      },

      Spot004: {
        intensity: 80,
        visible: true,
        color: "#FFD8A8",
      },
      Spot005: {
        intensity: 35,
        visible: true,
        color: "#FFF8EC",
      },
      Spot006: {
        intensity: 5,
        visible: true,
        color: "#FFF8EC",
      },
      Spot007: {
        intensity: 35,
        visible: true,
        color: "#FFF8EC",
      },
    },
  },
};
