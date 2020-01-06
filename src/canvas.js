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

        let image = new Image();
        image.src = "../assets/sprites/wall.png";
        image.onload = () => {
            this.draw(image, 0, 0);
            this.draw(image, 16, 0);
            this.draw(image, 16, 16);
            this.draw(image, 32, 16);
            this.draw(image, 48, 16);
            this.draw(image, 32, 32);
        }
    }

    clear() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    draw(image, x, y) {
        this.ctx.drawImage(image, x, y);
    }
}
