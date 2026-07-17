export default class ContentVersionManager{

    constructor(){

    }

    getMode(){

        const hour = new Date().getHours();

        if(hour >= 6 && hour < 18){

            return "day";

        }

        return "night";

    }

    resolve(value){

    //----------------------------------
    // Valor simple
    //----------------------------------

    if(typeof value !== "object" || value === null){

        return value;

    }

    //----------------------------------
    // Valor day/night
    //----------------------------------

    return value[
        this.getMode()
    ];

}

resolveTrack(interactable) {

    return {

        ...interactable,

        title: this.resolve(interactable.title),

        cover: this.resolve(interactable.cover),

        audio: this.resolve(interactable.audio),

        visuals: interactable.visuals
            ? {
                ...interactable.visuals,

                monitor: this.resolve(interactable.visuals.monitor),

                projector: this.resolve(interactable.visuals.projector),

                paredfalsa: this.resolve(interactable.visuals.paredfalsa)

              }
            : undefined

    };

}

}