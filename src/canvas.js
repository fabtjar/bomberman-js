export class Canvas {
    constructor(width, height, scale) {
        this.width = width;
        this.height = height;
        let canvas = document.getElementById("game");
        canvas.width = width;
        canvas.height = height;
        canvas.setAttribute(
            "style",
            "width: " + width * scale + "px;" +
            "height: " + height * scale + "px;" +
            "image-rendering: pixelated;"
        );

        this.ctx = canvas.getContext('2d');
        this.clear();
    }

    clear() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    draw(image, x, y, cropWidth, cropHeight, offsetX = 0, offsetY = 0) {
        const width = cropWidth || image.width;
        const height = cropHeight || image.height;
        this.ctx.drawImage(
            image,
            offsetX, offsetY,
            width, height,
            Math.floor(x), Math.floor(y),
            width, height
        );
    }
}
