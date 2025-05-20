import { Component } from "./component.js";
export class Button extends Component {
    constructor(x = 0, y = 0, width = 100, height = 100, label = "", onClick = () => { }) {
        super(x, y, width, height);
        this.backgroundColor = "#4A90E2";
        this.labelColor = "white";
        this.label = label;
        this.onClick = onClick;
    }
    update(context, deltaTime) {
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
    setBackgroundColor(color) {
        this.backgroundColor = color;
    }
    setLabelColor(color) {
        this.labelColor = color;
    }
}
