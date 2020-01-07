export class Keyboard {
    constructor() {
        let isKeyDown = {};
        document.onkeydown = (e) => {
            isKeyDown[e.code] = true;
        };
        document.onkeyup = (e) => {
            isKeyDown[e.code] = false;
        };
        this.isKeyDown = (code) => {
            if (!(code in isKeyDown)) {
                isKeyDown[code] = false;
            }
            return isKeyDown[code];
        };
    }
}