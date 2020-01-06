import { Canvas } from "./canvas.js";
import { Player } from "./player.js";
import { Sprite } from "./sprite.js";

export class Game {
    constructor() {
        this.canvas = new Canvas(150, 100);

        let image = new Image();
        image.src = "../assets/sprites/wall.png";
        image.onload = () => {
            let sprite = new Sprite(image);
            this.player = new Player(sprite, 32, 32);

            this.lastTime = this.getTime();
            this.update();
        }

        window.addEventListener('focus', () => this.lastTime = this.getTime());
    }

    update() {
        let dt = this.getDeltaTime();
        this.player.update(dt);
        this.canvas.clear();
        this.player.draw(this.canvas);
        requestAnimationFrame(() => this.update());
    }

    getDeltaTime() {
        let now = this.getTime();
        let dt = (now - this.lastTime) / 1000;
        this.lastTime = now;
        return dt;
    }

    getTime() {
        if (window.performance && window.performance.now) {
            return window.performance.now();
        }
        return new Date().getTime();
    }
}
