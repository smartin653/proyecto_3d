import interactables from "../data/interactables.js";

export default class InteractionResolver {
  static resolve(object) {
    while (object) {
      const data = interactables[object.name];

      if (data) {
        return {
          object,
          data,
        };
      }

      object = object.parent;
    }

    return null;
  }
}
