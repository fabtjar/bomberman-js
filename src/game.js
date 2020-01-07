import { Canvas } from "./canvas.js";
import { Player } from "./player.js";
import { GameMap } from "./map.js";
import { Assets } from "./assets.js";

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = new Canvas(this.width, this.height);

        this.assets = new Assets("../assets/");
        this.assets.loadImages([
            { name: "wall", src: "sprites/wall.png" },
            { name: "player", src: "sprites/player.png" },
        ])
        .onImagesLoaded = () => this.loaded();

        window.addEventListener('focus', () => this.lastTime = this.getTime());
    }

    loaded() {
        this.player = new Player(this, 32, 32);
        this.map = new GameMap(this);
        this.player.map = this.map;

        this.lastTime = this.getTime();
        this.update();
    }

    update() {
        let dt = this.getDeltaTime();
        this.player.update(dt);
        this.canvas.clear();
        this.map.draw(this.canvas);
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
