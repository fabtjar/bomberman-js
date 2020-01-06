export class Canvas {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        let scale = 5;
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

    draw(image, x, y) {
        this.ctx.drawImage(image, x, y);
    }
}
