export const CinematicShader = {
  uniforms: {

    tDiffuse: { value: null },

    warmth: { value: 0.0 },

    contrast: { value: 1.0 },

    grain: { value: 0.0 },

    aberration: { value: 0.0 }

},

  vertexShader: `

        varying vec2 vUv;

        void main() {

            vUv = uv;

            gl_Position = projectionMatrix *
                          modelViewMatrix *
                          vec4(position,1.0);

        }

    `,
fragmentShader: `

uniform sampler2D tDiffuse;

uniform float warmth;
uniform float contrast;
uniform float grain;
uniform float aberration;

varying vec2 vUv;

//----------------------------------
// Random
//----------------------------------

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

void main(){

    //----------------------------------
    // Chromatic Aberration
    //----------------------------------

    vec2 offset = vec2(aberration,0.0);

    float r = texture2D(
        tDiffuse,
        vUv + offset
    ).r;

    float g = texture2D(
        tDiffuse,
        vUv
    ).g;

    float b = texture2D(
        tDiffuse,
        vUv - offset
    ).b;

    vec4 color = vec4(
        r,
        g,
        b,
        1.0
    );

    //----------------------------------
    // Luminance
    //----------------------------------

    float luminance = dot(
        color.rgb,
        vec3(0.299,0.587,0.114)
    );

    //----------------------------------
    // Warmth
    //----------------------------------

    color.r += warmth * 0.18;
    color.g += warmth * 0.03;
    color.b -= warmth * 0.12;

    //----------------------------------
    // Contrast
    //----------------------------------

    color.rgb =
        (color.rgb - 0.5)
        * contrast
        + 0.5;

    //----------------------------------
    // Grain
    //----------------------------------

    float noise =
        random(gl_FragCoord.xy) - 0.5;

    float grainMask =
        1.0 -
        smoothstep(
            0.15,
            0.85,
            luminance
        );

    color.r += noise * grain * grainMask * 1.0;
    color.g += noise * grain * grainMask * 0.8;
    color.b += noise * grain * grainMask * 0.6;

    //----------------------------------
    // Clamp
    //----------------------------------

    color.rgb = clamp(
        color.rgb,
        0.0,
        1.0
    );

    //----------------------------------
    // Output
    //----------------------------------

    gl_FragColor = color;

}

`,
};
