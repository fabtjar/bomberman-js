import { Sprite } from "./sprite.js";

export class TiledSprite extends Sprite {
    draw(canvas, x, y, width, height) {
        for (let i = 0; i < width; i += this.width) {
            for (let j = 0; j < height; j += this.height) {
                canvas.draw(
                    this.image,
                    i, j,
                    this.width, this.height,
                    this.offsetX, this.offsetY
                );
            }
        }
    }
}