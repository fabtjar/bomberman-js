import { GameObject } from "./gameObject.js";
import { AnimatedSprite } from "./animatedSprite.js";

export class Fire extends GameObject {
    constructor(game, x, y, bomb, power, dir = null) {
        super(new AnimatedSprite(game.assets.getImage("bomb")), x, y);
        this.game = game;
        this.sprite.width = 16;
        this.sprite.addAnimation("fire", [2, 3, 4, 5, 6, 7, 8, 9], 20);
        this.isDead = false;
        this.sprite.onAnimationEnd = () => this.isDead = true;
        this.bomb = bomb;
        this.power = power;
        this.dir = dir;

        game.checkFireOnMap(this);
    }

    addNewFires() {
        if (this.power-- <= 0) return;

        if (this.dir) {
            this.makeNewFire(this.dir.x, this.dir.y);
        } else {
            this.makeNewFire(-1, 0);
            this.makeNewFire(1, 0);
            this.makeNewFire(0, -1);
            this.makeNewFire(0, 1);
        }
    }

    makeNewFire(x, y) {
        this.game.addNewFire(
            this.x + x * 16,
            this.y + y * 16,
            this.bomb,
            this.power,
            { x: x, y: y },
            this.bomb
        );
    }
}
