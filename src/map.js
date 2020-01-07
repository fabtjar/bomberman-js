export class GameMap {
    constructor(game, image) {
        this.image = image;
        this.gridSize = 16;
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this.width = this.map[0].length * this.gridSize;
        this.height = this.map.length * this.gridSize;
        this.x = (game.width - this.width) / 2;
        this.y = (game.height - this.height) / 2;
    }

    draw(canvas) {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] == 1) {
                    canvas.draw(
                        this.image,
                        this.x + x * this.gridSize,
                        this.y + y * this.gridSize
                    );
                }
            }
        }
    }
}