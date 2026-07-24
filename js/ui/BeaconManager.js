import { THREE } from "../libs/three.js";
import Beacon from "./Beacon.js";

export default class BeaconManager {
  constructor(scene) {
    this.scene = scene;

    this.beacons = [];
  }

  create(interactable, object) {
    const beacon = new Beacon(interactable.hint);

    const box = new THREE.Box3().setFromObject(object);

    const position = new THREE.Vector3();

    box.getCenter(position);

    //console.log(object.name, position);

    //console.log(object.name, position);

    beacon.setPosition(position);

    beacon.addHeight(0.1);

    this.scene.add(beacon.sprite);
    //console.log("Beacon:", beacon.sprite.position);

    this.beacons.push({
      beacon,

      object,

      interactable,
    });
  }

  update(time) {
    this.beacons.forEach(({ beacon, object }) => {
      beacon.sprite.visible = object.visible;

      if (object.visible) {
        beacon.update(time);
      }
    });
  }
}
