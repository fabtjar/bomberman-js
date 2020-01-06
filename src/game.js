import { Canvas } from "./canvas.js";
import { Sprite } from "./sprite.js";

export class Game {
    constructor() {
        let canvas = new Canvas(150, 100);
        
        let image = new Image();
        image.src = "../assets/sprites/wall.png";
        image.onload = () => {
            let sprite = new Sprite(image);
            sprite.draw(canvas, 64, 32);
        }
    }
}
