export abstract class Component {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public abstract update(context: CanvasRenderingContext2D, deltaTime: number ):void;

    public containsPoint(x: number, y: number): boolean {
        const isXValid = x >= this.x && x <= this.x + this.width;
        const isYValid = y >= this.y && y <= this.y + this.height;
        return isXValid && isYValid;
    }
}