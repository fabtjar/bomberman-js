import { Canvas } from "./canvas.js";
import { Sprite } from "./sprite.js";
import { GameObject } from "./gameObject.js";

export class Game {
    constructor() {
        this.canvas = new Canvas(150, 100);

        let image = new Image();
        image.src = "../assets/sprites/wall.png";
        image.onload = () => {
            let sprite = new Sprite(image);
            this.box = new GameObject(sprite, 32, 32);

            this.lastTime = this.getTime();
            this.update();
        }
    }

    update() {
        let dt = this.getDeltaTime();
        this.box.update(dt);
        this.canvas.clear();
        this.box.draw(this.canvas);
        requestAnimationFrame(() => this.update());
    }

    getDeltaTime() {
        let now = this.getTime();
        let dt = (now - this.lastTime) / 1000;
        this.lastTime = now;

        // Incase loosing focus causing a huge delay
        return Math.min(1, dt);
    }

    getTime() {
        if (window.performance && window.performance.now) {
            return window.performance.now();
        }
        return new Date().getTime();
    }
}
