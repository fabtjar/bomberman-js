export class Sprite {
    constructor(image, width, height, offsetX = 0, offsetY = 0) {
        this.image = image;
        this.width = width || image.width;
        this.height = height || image.height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }

    draw(canvas, x, y) {
        canvas.draw(
            this.image,
            x, y,
            this.width, this.height,
            this.offsetX, this.offsetY
        );
    }
}