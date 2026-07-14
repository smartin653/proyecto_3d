import { ShaderPass } from "../libs/three.js";
import { CinematicShader } from "./shaders/CinematicShader.js";

export default class CinematicPass extends ShaderPass {
  constructor() {
    super(CinematicShader);
  }

  //----------------------------------
  // Warmth
  //----------------------------------

  setWarmth(value) {
    this.uniforms.warmth.value = value;
  }

  //----------------------------------
  // Chromatic Aberration
  //----------------------------------

  setAberration(value) {
    this.uniforms.aberration.value = value;
  }

  setGrain(value) {

    this.uniforms.grain.value = value;

}
}