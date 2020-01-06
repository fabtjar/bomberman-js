import { Canvas } from "./canvas.js";
import { Sprite } from "./sprite.js";
import { GameObject } from "./GameObject.js";

export class Game {
    constructor() {
        let canvas = new Canvas(150, 100);
        
        let image = new Image();
        image.src = "../assets/sprites/wall.png";
        image.onload = () => {
            let sprite = new Sprite(image);
            let box = new GameObject(sprite, 32, 32);
            box.draw(canvas);
        }
    }
}
