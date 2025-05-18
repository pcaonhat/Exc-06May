import { Component } from "./component.js";
export class Sprite extends Component {
    constructor(imageUrl, x, y, width, height) {
        super(x, y, width, height);
        this.image = new Image();
        this.image.src = imageUrl;
    }
    update(context) {
        if (this.image.complete) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}
