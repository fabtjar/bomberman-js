import { GameObject } from "./gameObject.js";

export class Player extends GameObject {
    constructor(sprite, x, y) {
        super(sprite, x, y);
        this.velX = 100;
        this.velY = 60;
    }

    update(dt) {
        let moveX = this.velX * dt;
        let moveY = this.velY * dt;

        if (this.x + moveX < 0 || this.x + moveX > 150 - 16) {
            this.velX *= -1;
            moveX = this.velX * dt;
        }

        if (this.y + moveY < 0 || this.y + moveY > 100 - 16) {
            this.velY *= -1;
            moveY = this.velY * dt;
        }

        this.x += moveX;
        this.y += moveY;
    }
}