export class Keyboard {
    constructor() {
        this._isKeyDown = {};
        document.onkeydown = e => this.onKeyDown(e);
        document.onkeyup = e => this.onKeyUp(e);
        this.update();
    }

    onKeyDown(e) {
        this._isKeyDown[e.code] = true;
    }

    onKeyUp(e) {
        if (this.isKeyDown(e.code)) {
            this._isKeyReleased[e.code] = true;
        }
        this._isKeyDown[e.code] = false;
    }

    isKeyDown(code) {
        if (!(code in this._isKeyDown)) {
            this._isKeyDown[code] = false;
        }
        return this._isKeyDown[code];
    }

    isKeyReleased(code) {
        if (!(code in this._isKeyReleased)) {
            this._isKeyReleased[code] = false;
        }
        return this._isKeyReleased[code];
    }

    update() {
        this._isKeyReleased = {};
    }
}