import { GameObject } from "./gameObject.js";
import { AnimatedSprite } from "./animatedSprite.js";

export class Fire extends GameObject {
    constructor(game, x, y, dir = null) {
        super(new AnimatedSprite(game.assets.getImage("bomb")), x, y);
        this.sprite.width = 16;
        this.sprite.addAnimation("fire", [2, 3, 4, 5, 6, 7, 8, 9], 20);
        this.isDead = false;
        this.sprite.onAnimationEnd = () => this.isDead = true;

        if (dir) {
            game.checkFireOnMap(Math.floor(this.x / 16), Math.floor(this.y / 16), dir);
        } else {
            game.checkFireOnMap(Math.floor(this.x / 16), Math.floor(this.y / 16), { x: -1, y: 0 });
            game.checkFireOnMap(Math.floor(this.x / 16), Math.floor(this.y / 16), { x: 1, y: 0 });
            game.checkFireOnMap(Math.floor(this.x / 16), Math.floor(this.y / 16), { x: 0, y: -1 });
            game.checkFireOnMap(Math.floor(this.x / 16), Math.floor(this.y / 16), { x: 0, y: 1 });
        }
    }
}