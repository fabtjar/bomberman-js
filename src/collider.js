export class Collider {
    constructor(width, height, x = 0, y = 0) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    isOverlapping(other, moveX = 0, moveY = 0) {
        if (!other) return;
        if (
            this.x + moveX - this.width / 2 < other.x + other.width / 2 &&
            this.x + moveX + this.width / 2 > other.x - other.width / 2 &&
            this.y + moveY - this.height / 2 < other.y + other.height / 2 &&
            this.y + moveY + this.height / 2 > other.y - other.height / 2
        ) {
            let distX = other.x - this.x;
            let distY = other.y - this.y;
            let widthX = this.width / 2 + other.width / 2;
            let widthY = this.height / 2 + other.height / 2;
            
            return {
                gapX: distX - widthX * Math.sign(distX),
                gapY: distY - widthY * Math.sign(distY)
            };
        }
    }
}