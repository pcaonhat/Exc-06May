import { Component } from "./component.js";
export class Sprite extends Component {
    constructor(imageUrl = "", x = 0, y = 0, width = 100, height = 100) {
        super(x, y, width, height);
        this.image = new Image();
        this.image.src = imageUrl;
    }
    update(context, deltaTime) {
        if (this.image.complete) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}
