export class Component {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    containsPoint(x, y) {
        const isXValid = x >= this.x && x <= this.x + this.width;
        const isYValid = y >= this.y && y <= this.y + this.height;
        return isXValid && isYValid;
    }
}
