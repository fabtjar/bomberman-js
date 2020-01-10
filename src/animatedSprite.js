import { Sprite } from "./sprite.js";

export class AnimatedSprite extends Sprite {
    constructor(image, width, height) {
        super(image, width, height);

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
        this.animTime += dt;
        if (this.animTime >= animLength) {
            this.onAnimationEnd(this.animations[this.currentAnim]);
        }
        this.animTime %= animLength;
        this.animFrame = Math.floor(this.animTime / animLength * frameCount);
    }

    onAnimationEnd(anim) { }

    getFrameOffsetX() {
        if (this.currentAnim == null) return 0;
        return this.animations[this.currentAnim][this.animFrame];
    }

    draw(canvas, x, y) {
        const frameOffsetX = this.getFrameOffsetX();
        canvas.draw(
            this.image,
            x, y,
            this.width, this.height,
            this.width * frameOffsetX
        );
    }
}