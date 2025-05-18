import { Component } from "./component.js";

export class Sprite extends Component {
    private image: HTMLImageElement;

    public constructor(imageUrl: string, x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
        this.image = new Image();
        this.image.src = imageUrl;
    }

    public update(context: CanvasRenderingContext2D): void {
        if (this.image.complete) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}