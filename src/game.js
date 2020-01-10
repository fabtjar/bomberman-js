import { Canvas } from "./canvas.js";
import { Player } from "./player.js";
import { GameMap } from "./map.js";
import { Assets } from "./assets.js";
import { TiledSprite } from "./tiledSprite.js";
import { Bomb } from "./bomb.js";
import { Fire } from "./fire.js";

export class Game {
    constructor() {
        this.width = 180;
        this.height = 135;
        this.scale = 5;
        this.canvas = new Canvas(this.width, this.height, this.scale);

        this.assets = new Assets("../assets/");
        this.assets.loadImages([
            { name: "wall", src: "sprites/wall.png" },
            { name: "player", src: "sprites/player.png" },
            { name: "bomb", src: "sprites/bomb.png" },
        ]).onImagesLoaded = () => this.loaded();

        window.addEventListener('focus', () => this.lastTime = this.getTime());
    }

    loaded() {
        this.player = new Player(this, 32, 32);
        this.bombs = [];
        this.fires = [];
        this.player.onPlantBomb = (x, y) => {
            this.bombs.push(new Bomb(this, x, y));
        }

        this.map = new GameMap(this);
        this.canvas.x = (this.canvas.width - this.map.width) / 2;
        this.canvas.x = (this.canvas.height - this.map.height) / 2;

        this.player.map = this.map;
        this.background = new TiledSprite(this.assets.getImage("wall"), 32, 32, 16);
        this.lastTime = this.getTime();
        this.update();
    }

    update() {
        let dt = this.getDeltaTime();
        this.player.update(dt);
        this.bombs.forEach(bomb => {
            bomb.update(dt);
            if (bomb.isDead) {
                this.fires.push(new Fire(this, bomb.x, bomb.y));
                this.fires.push(new Fire(this, bomb.x - 16, bomb.y));
                this.fires.push(new Fire(this, bomb.x + 16, bomb.y));
                this.fires.push(new Fire(this, bomb.x, bomb.y - 16));
                this.fires.push(new Fire(this, bomb.x, bomb.y + 16));
                this.bombs.splice(this.bombs.indexOf(bomb), 1);
            }
        });
        this.fires.forEach(fire => {
            fire.update(dt);
            if (fire.isDead) {
                this.fires.splice(this.fires.indexOf(fire), 1);
            }
        });
        this.canvas.clear();
        this.background.draw(this.canvas, 0, 0, this.width, this.height);
        this.map.draw(this.canvas);
        this.bombs.forEach(bomb => bomb.draw(this.canvas));
        this.player.draw(this.canvas);
        this.fires.forEach(fire => fire.draw(this.canvas));
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
