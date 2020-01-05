export class Canvas {
    constructor(width, height) {
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

        let ctx = canvas.getContext('2d');
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);

        let image = new Image();
        image.src = "../assets/sprites/wall.png";
        image.onload = () => {
            ctx.drawImage(image, 0, 0);
            ctx.drawImage(image, 16, 0);
            ctx.drawImage(image, 16, 16);
            ctx.drawImage(image, 32, 16);
            ctx.drawImage(image, 48, 16);
            ctx.drawImage(image, 32, 32);
        }
    }
}
