import { Component } from "./component.js";

export class Button extends Component {
    private label: string;
    private backgroundColor: string = "#4A90E2";
    private labelColor: string = "white";
    public onClick: () => void;


    public constructor(x: number = 0, y: number = 0, 
        width: number = 100, height: number = 100, 
        label: string = "", onClick: () => void = () => {}) {
        super(x, y, width, height);
        this.label = label;
        this.onClick = onClick;
    }

    public update(context: CanvasRenderingContext2D, deltaTime: number): void {
        context.fillStyle = this.backgroundColor;
        context.fillRect(this.x, this.y, this.width, this.height);

        context.fillStyle = this.labelColor;
        context.font = "bold 18px 'Segoe UI', sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";

        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;

        context.fillText(this.label, centerX, centerY);
    }

    public setBackgroundColor(color: string): void {
        this.backgroundColor = color;
    }

    public setLabelColor(color: string): void {
        this.labelColor = color;
    }

}