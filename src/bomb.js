import { GameObject } from "./gameObject.js";
import { AnimatedSprite } from "./animatedSprite.js";

export class Bomb extends GameObject {
    constructor(game, x, y) {
        super(new AnimatedSprite(game.assets.getImage("bomb")), x, y);
        this.sprite.width = 16;
        this.sprite.addAnimation("tick", [0, 1], 10);
    }
}