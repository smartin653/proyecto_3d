import interactables from "../data/interactables.js";

export default class InteractionResolver {
  static resolve(object, mode) {
    while (object) {
      const data = interactables[object.name];

      if (
        data &&
        (!data.availableModes || data.availableModes.includes(mode))
      ) {
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
