export default class HintManager {

  constructor(scene) {

    this.scene = scene;

    this.hints = [];

  }

  add(hint) {

    this.hints.push(hint);

    this.scene.add(
      hint.sprite
    );

  }

  update(time) {

    this.hints.forEach((hint) => {

      hint.update(time);

    });

  }

}