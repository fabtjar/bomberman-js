import { GameObject } from "./gameObject.js";
import { Keyboard } from "./keyboard.js";

export class Player extends GameObject {
    constructor(game, sprite, x, y) {
        super(sprite, x, y);
        this.game = game;
        this.vel = 100;

        this.keyboard = new Keyboard();
    }

    update(dt) {
        let inputX = 0;
        let inputY = 0;
        if (this.keyboard.isKeyDown("ArrowUp")) inputY--;
        if (this.keyboard.isKeyDown("ArrowDown")) inputY++;
        if (this.keyboard.isKeyDown("ArrowLeft")) inputX--;
        if (this.keyboard.isKeyDown("ArrowRight")) inputX++;

        let moveX = 0;
        let moveY = 0;

        if (inputX || inputY) {
            let moveAngle = Math.atan2(inputY, inputX);
            moveX = this.vel * Math.cos(moveAngle) * dt;
            moveY = this.vel * Math.sin(moveAngle) * dt;
        }

        if (this.x + moveX < 0 || this.x + moveX > this.game.width - 16) {
            moveX = 0;
        }

        if (this.y + moveY < 0 || this.y + moveY > this.game.height - 16) {
            moveY = 0;
        }

        this.x += moveX;
        this.y += moveY;
    }
}