import { GameObject } from "./gameObject.js";
import { AnimatedSprite } from "./animatedSprite.js";

export class Bomb extends GameObject {
    constructor(game, x, y, power = 2) {
        super(new AnimatedSprite(game.assets.getImage("bomb")), x, y);
        this.sprite.width = 16;
        this.sprite.addAnimation("tick", [0, 1], 10);
        this.boomTime = 2;
        this.power = power;
    }

    update(dt) {
        super.update(dt);
        this.boomTime -= dt;
        if (this.boomTime <= 0) this.isDead = true;
    }

    earlyBoom(delay = 0.1) {
        this.boomTime = Math.min(this.boomTime, delay);
    }

    checkFireHit(fire) {
        if (this != fire.bomb && this.x == fire.x && this.y == fire.y) {
            this.earlyBoom();
        }
    }
}