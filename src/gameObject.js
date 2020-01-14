import { Collider } from "./collider.js";

export class GameObject {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 16;
        this._collider = new Collider(this.width, this.height);
    }

    draw(canvas) {
        this.sprite.draw(canvas, this.x, this.y);
    }

    update(dt) {
        this.sprite.updateAnimation(dt);
    }

    getMapCollision(gameMap, moveX, moveY) {
        for (let i = 0; i < gameMap.colliders.length; i++) {
            let collision = this.getCollider().isOverlapping(gameMap.colliders[i], moveX, moveY);
            if (collision) {
                return collision;
            }
        }
    }

    getCollider() {
        this._collider.x = this.x + this.width / 2;
        this._collider.y = this.y + this.height / 2;
        return this._collider;
    }

    setColliderSize(width, height = null) {
        if (height == null) height = width;
        this._collider.width = width;
        this._collider.height = height;
    }

    getMapX() {
        return Math.floor(this.x / 16);
    }

    getMapY() {
        return Math.floor(this.y / 16);
    }
}