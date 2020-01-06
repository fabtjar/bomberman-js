export class GameObject {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    update(dt) {}
    
    draw(canvas) {
        this.sprite.draw(canvas, this.x, this.y);
    }
}