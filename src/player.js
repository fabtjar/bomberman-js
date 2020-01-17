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

    getCollisionMovement(movement) {
        let mapCollisionX = this.getMapCollision(this.map, movement.x, 0);
        if (mapCollisionX) movement.x = mapCollisionX.gapX;

        // Use movement.x as this is where the player would now be
        let mapCollisionY = this.getMapCollision(this.map, movement.x, movement.y);
        if (mapCollisionY) movement.y = mapCollisionY.gapY;

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

    update(dt) {
        const input = this.getInput();

        let movement = this.getMovement(dt, input);
        movement = this.getCollisionMovement(movement);
        this.move(movement);

        this.checkPlantBomb(input.bomb);

        this.updateAnimation(dt, input.x || input.y);
    }
}