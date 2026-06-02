// js/core/RendererManager.js

import { THREE } from '../libs/three.js';

export default class RendererManager {

    constructor(container, scene, camera) {

        this.container = container;
        this.scene = scene;
        this.camera = camera;

        this.renderer = null;

        this.createRenderer();

    }

    createRenderer() {

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        );

        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );

        this.renderer.shadowMap.enabled = true;

        this.container.appendChild(
            this.renderer.domElement
        );

        console.log('Renderer created');

    }

    render() {

        this.renderer.render(
            this.scene,
            this.camera
        );

    }

    resize() {

        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );

        this.renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        );

    }

}