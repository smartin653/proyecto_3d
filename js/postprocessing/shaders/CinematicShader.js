export const CinematicShader = {
  uniforms: {
    tDiffuse: { value: null },

    warmth: { value: 0.0 },

    aberration: { value: 0.0 },
    grain: { value: 0.0 },
  },

  vertexShader: `

    varying vec2 vUv;

    void main() {

        vUv = uv;

        gl_Position =
            projectionMatrix *
            modelViewMatrix *
            vec4(position, 1.0);

    }

  `,

  fragmentShader: `

    uniform sampler2D tDiffuse;

    uniform float warmth;
    uniform float aberration;
    uniform float grain;

    varying vec2 vUv;


    float random(vec2 st){

    return fract(
        sin(
            dot(
                st,
                vec2(12.9898,78.233)
            )
        ) * 43758.5453123
    );

}

    void main() {

        //----------------------------------
        // Base Color
        //----------------------------------

        vec4 color = texture2D(
            tDiffuse,
            vUv
        );

        //----------------------------------
        // Warmth
        //----------------------------------

        vec3 warmthTint = vec3(

            1.0 + warmth * 0.08,

            1.0,

            1.0 - warmth * 0.08

        );

        color.rgb *= warmthTint;

        //----------------------------------
        // Chromatic Aberration
        //----------------------------------

        if (aberration > 0.0) {

            vec2 direction = normalize(
                vUv - vec2(0.5)
            );

            vec2 offset =
                direction * aberration;

            color.r = texture2D(
                tDiffuse,
                vUv + offset
            ).r;

            color.b = texture2D(
                tDiffuse,
                vUv - offset
            ).b;

        }

        //----------------------------------
        // Output
        //----------------------------------

        //----------------------------------
// Grain
//----------------------------------

float grainSize = 1.0;

vec2 grainCoord = floor(gl_FragCoord.xy / grainSize);

float noise = random(grainCoord) - 0.2;

color.rgb += noise  * 0.5;

        gl_FragColor = color;

    }

  `,
};