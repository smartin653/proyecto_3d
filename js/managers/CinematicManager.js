export default class CinematicManager {

    constructor(postProcessing, environment){

        this.postProcessing = postProcessing;

        this.environment = environment;

        console.log(this.postProcessing);

        console.log(this.environment);

        

    }

    test(){

    this.environment.setLightColor(
        "Spot001",
        0xff0000
    );

}

}