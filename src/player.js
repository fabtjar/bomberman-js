import { GameObject } from "./gameObject.js";
import { Keyboard } from "./keyboard.js";
import { AnimatedSprite } from "./animatedSprite.js";

export class Player extends GameObject {
    constructor(game, x, y) {
        super(new AnimatedSprite(game.assets.getImage("player")), x, y);
        this.game = game;
        this.vel = 100;
        this.setColliderSize(8, 12);

        this.sprite.width = 16;
        this.sprite.addAnimation("idle", [0]);
        this.sprite.addAnimation("walk", [1, 0, 2, 0], 10);

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
            this.sprite.playAnimation("walk");
        } else {
            this.sprite.playAnimation("idle");
        }

        let mapCollisionX = this.getMapCollision(this.map, moveX, 0);
        if (mapCollisionX) {
            moveX = mapCollisionX.gapX;
        }
        this.x += moveX;

        let mapCollisionY = this.getMapCollision(this.map, 0, moveY);
        if (mapCollisionY) {
            moveY = mapCollisionY.gapY;
        }
        this.y += moveY;

        this.sprite.updateAnimation(dt);
    }
}