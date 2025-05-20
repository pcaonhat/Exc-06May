import { Component } from "./component.js";

export class Sprite extends Component {
    private image: HTMLImageElement;

    public constructor(imageUrl: string = "", 
        x: number = 0, y: number = 0, 
        width: number = 100, height: number = 100) {
        super(x, y, width, height);
        this.image = new Image();
        this.image.src = imageUrl;
    }

    public update(context: CanvasRenderingContext2D, deltaTime: number): void {
        if (this.image.complete) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}