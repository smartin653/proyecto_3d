export const ChromaticAberrationShader = {

    uniforms: {

        tDiffuse: { value: null },

        strength: { value: 0.0 }

    },

    vertexShader: /* glsl */`

        varying vec2 vUv;

        void main() {

            vUv = uv;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

        }

    `,

    fragmentShader: /* glsl */`

        uniform sampler2D tDiffuse;

        uniform float strength;

        varying vec2 vUv;

        void main() {

            vec2 offset = vec2(strength, 0.0);

            float r = texture2D(tDiffuse, vUv + offset).r;

            float g = texture2D(tDiffuse, vUv).g;

            float b = texture2D(tDiffuse, vUv - offset).b;

            gl_FragColor = vec4(r, g, b, 1.0);

        }

    `

};