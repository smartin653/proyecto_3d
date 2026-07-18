export default class InteractionHelper {

    static forEachMesh(object, callback) {

        if (!object) return;

        if (object.isMesh) {

            callback(object);

            return;

        }

        object.traverse((child) => {

            if (!child.isMesh) return;

            callback(child);

        });

    }

}