// js/loaders/ModelLoader.js

import { GLTFLoader } from '../libs/three.js';

export default class ModelLoader {

    constructor() {

        this.loader = new GLTFLoader();

    }

    load(path) {

        return new Promise((resolve, reject) => {

            this.loader.load(

                path,

                (gltf) => {

                    console.log('Model loaded');

                    resolve(gltf);

                },

                undefined,

                (error) => {

                    console.error(error);

                    reject(error);

                }

            );

        });

    }

}