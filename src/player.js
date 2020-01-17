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

        this.touchingBombs = [];
    }

    getInput() {
        let input = { x: 0, y: 0 };

        if (this.keyboard.isKeyDown("ArrowUp")) input.y--;
        if (this.keyboard.isKeyDown("ArrowDown")) input.y++;
        if (this.keyboard.isKeyDown("ArrowLeft")) input.x--;
        if (this.keyboard.isKeyDown("ArrowRight")) input.x++;

        input.bomb = this.keyboard.isKeyReleased("KeyZ");

        this.keyboard.update();

        return input;
    }

    getMovement(dt, input) {
        let movement = { x: 0, y: 0 };
        if (input.x || input.y) {
            let moveAngle = Math.atan2(input.y, input.x);
            movement.x = this.vel * Math.cos(moveAngle) * dt;
            movement.y = this.vel * Math.sin(moveAngle) * dt;
        }
        return movement;
    }

    updateAnimation(dt, isInput) {
        this.sprite.playAnimation(isInput ? "walk" : "idle");
        this.sprite.updateAnimation(dt);
    }

    checkCurrentBombCollision() {
        this.touchingBombs.forEach(bomb => {
            if (!this.getCollider().isOverlapping(bomb, 0, 0)) {
                this.touchingBombs.splice(this.touchingBombs.indexOf(bomb), 1);
            }
        });
    }

    isTouchingBomb(bomb) {
        let isTouching = false;
        this.touchingBombs.forEach(touchingBomb => {
            if (touchingBomb == bomb) isTouching = true;
        });
        return isTouching;
    }

    getCollisionMovement(movement, colliders) {
        let mapCollisionX = this.getMapCollision(this.map, movement.x, 0);
        if (mapCollisionX) movement.x = mapCollisionX.gapX;

        colliders.bombs.forEach(bomb => {
            if (this.isTouchingBomb(bomb)) return;
            let collision = this.getCollider().isOverlapping(bomb, movement.x, 0);
            if (collision) movement.x = collision.gapX;
        });

        // Use movement.x as this is where the player would now be
        let mapCollisionY = this.getMapCollision(this.map, movement.x, movement.y);
        if (mapCollisionY) movement.y = mapCollisionY.gapY;

        colliders.bombs.forEach(bomb => {
            if (this.isTouchingBomb(bomb)) return;
            let collision = this.getCollider().isOverlapping(bomb, movement.x, movement.y);
            if (collision) movement.y = collision.gapY;
        });

        return movement;
    }

    move(movement) {
        this.x += movement.x;
        this.y += movement.y;
    }

    checkPlantBomb(isPlantingBomb) {
        if (isPlantingBomb) {
            const x = Math.floor((this.x + this.width / 2) / 16) * 16;
            const y = Math.floor((this.y + this.height / 2) / 16) * 16;
            this.onPlantBomb(x, y);
        }
    }

    update(dt, colliders) {
        const input = this.getInput();

        let movement = this.getMovement(dt, input);
        movement = this.getCollisionMovement(movement, colliders);
        this.move(movement);

        this.checkCurrentBombCollision();
        this.checkPlantBomb(input.bomb);

        this.updateAnimation(dt, input.x || input.y);
    }
}