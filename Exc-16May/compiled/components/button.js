import { Component } from "./component.js";
export class Button extends Component {
    constructor(x, y, width, height, label, onClick = () => { }) {
        super(x, y, width, height);
        this.label = label;
        this.onClick = onClick;
    }
    update(context) {
        context.fillStyle = "#4A90E2";
        context.fillRect(this.x, this.y, this.width, this.height);
        // context.fillStyle = "white";
        // context.font = "20px Arial";
        // context.fillText(this.label, this.x + 10, this.y + 30);
        // Cài đặt font và màu chữ
        context.fillStyle = "white";
        context.font = "bold 18px 'Segoe UI', sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        // Tính vị trí căn giữa chữ
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        // Vẽ chữ
        context.fillText(this.label, centerX, centerY);
    }
}
