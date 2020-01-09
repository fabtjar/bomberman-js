export class Sprite {
    constructor(image, width, height, offsetX = 0, offsetY = 0) {
        this.image = image;
        this.width = width || image.width;
        this.height = height || image.height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        
        this.animations = {};
        this.currentAnim = null;
        this.animFrame = 0;
        this.animTime = 0;
    }

    addAnimation(name, frames, fps = 0) {
        this.animations[name] = frames;
        this.animations[name].fps = fps;
        if (this.currentAnim == null) {
            this.currentAnim = name;
        }
    }

    playAnimation(name) {
        this.currentAnim = name;
    }

    updateAnimation(dt) {
        if (this.currentAnim == null) return;

        const frameCount = this.animations[this.currentAnim].length;
        const animLength = frameCount * 1 / this.animations[this.currentAnim].fps;
        this.animTime = (this.animTime + dt) % animLength;
        this.animFrame = Math.floor(this.animTime / animLength * frameCount);
    }

    getAnimFrameOffsetX() {
        if (this.currentAnim == null) return 0;
        return this.animations[this.currentAnim][this.animFrame];
    }

    draw(canvas, x, y) {
        const frameOffsetX = this.getAnimFrameOffsetX();
        canvas.draw(
            this.image,
            x, y,
            this.width, this.height,
            this.offsetX + this.width * frameOffsetX, this.offsetY
        );
    }
}