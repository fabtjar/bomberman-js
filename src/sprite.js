export class Sprite {
    constructor(image) {
        this.image = image;
    }
    
    draw(canvas, x, y) {
        canvas.draw(this.image, x, y);
    }
}