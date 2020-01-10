import { GameObject } from "./gameObject.js";
import { AnimatedSprite } from "./animatedSprite.js";

export class Bomb extends GameObject {
    constructor(game, x, y) {
        super(new AnimatedSprite(game.assets.getImage("bomb")), x * 16, y * 16);
        this.mapX = x;
        this.mapY = y;
        this.sprite.width = 16;
        this.sprite.addAnimation("tick", [0, 1], 10);
        this.boomTime = 2;
    }

    update(dt) {
        super.update(dt);
        this.boomTime -= dt;
        if (this.boomTime <= 0) this.isDead = true;
    }
}