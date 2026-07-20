export default class AnimatedValue {

    constructor(value = 0, speed = 3) {

        this.current = value;
        this.target = value;
        this.speed = speed;

    }

    set(value) {

        this.target = value;

    }

    update(delta) {

        this.current +=
            (this.target - this.current) *
            Math.min(delta * this.speed, 1);

        return this.current;

    }

}