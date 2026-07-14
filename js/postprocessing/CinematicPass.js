import { ShaderPass } from "../libs/three.js";
import { CinematicShader } from "./shaders/CinematicShader.js";

export default class CinematicPass extends ShaderPass {

    constructor() {

        super(CinematicShader);

    }

    setWarmth(value){

    this.uniforms.warmth.value = value;


}

setContrast(value){

    this.uniforms.contrast.value = value;

}

setGrain(value){

    this.uniforms.grain.value = value;

}

setAberration(value){

    this.uniforms.aberration.value = value;

}



}

