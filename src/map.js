import { Collider } from "./collider.js";
import { Sprite } from "./sprite.js";

export class GameMap {
    constructor(game) {
        this.gridSize = 16;
        this.wallSprite = new Sprite(
            game.assets.getImage("wall"),
            this.gridSize,
            this.gridSize,
        );
        this.blockSprite = new Sprite(
            game.assets.getImage("wall"),
            this.gridSize,
            this.gridSize,
            0,
            this.gridSize
        );
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1],
            [1, 0, 0, 2, 1, 1, 1, 0, 1, 0, 0, 1],
            [1, 1, 1, 2, 1, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 2, 2, 1, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this.width = this.map[0].length * this.gridSize;
        this.height = this.map.length * this.gridSize;
        this.x = 0;
        this.y = 0;
        this.wallColliders = [];
        this.blockColliders = [];
        this.blockColliderPositions = {};
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] == 1) {
                    this.wallColliders.push(
                        new Collider(
                            this.gridSize,
                            this.gridSize,
                            x * this.gridSize + this.gridSize / 2,
                            y * this.gridSize + this.gridSize / 2
                        )
                    )
                } else if (this.map[y][x] == 2) {
                    this.blockColliderPositions[x + "_" + y] = new Collider(
                        this.gridSize,
                        this.gridSize,
                        x * this.gridSize + this.gridSize / 2,
                        y * this.gridSize + this.gridSize / 2
                    )
                    this.blockColliders.push(this.blockColliderPositions[x + "_" + y]);
                }
            }
        }
        this.updateColliders();
    }

    updateColliders() {
        this.colliders = this.wallColliders.concat(this.blockColliders);
    }

    checkFireDestroyed(x, y) {
        if (this.map[y][x] == 2) {
            this.map[y][x] = 0;
            this.blockColliders.splice(this.blockColliders.indexOf(this.blockColliderPositions[x + "_" + y]), 1);
            this.updateColliders();
        }
    }

    draw(canvas) {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] == 1) {
                    this.wallSprite.draw(
                        canvas,
                        this.x + x * this.gridSize,
                        this.y + y * this.gridSize
                    );
                } else if (this.map[y][x] == 2) {
                    this.blockSprite.draw(
                        canvas,
                        this.x + x * this.gridSize,
                        this.y + y * this.gridSize
                    );
                }
            }
        }
    }
}