import { Button } from "../components/button.js";
import { Sprite } from "../components/sprite.js";
export class GameEngine {
    constructor(canvas) {
        this.components = [];
        this.lastTime = 0;
        const context = canvas.getContext("2d");
        if (!context) {
            throw new Error("Canvas not supported");
        }
        this.canvas = canvas;
        this.context = context;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.lastTime = 0;
        window.addEventListener("resize", () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
        canvas.addEventListener('click', this.handleClick.bind(this));
        this.gameLoop = this.gameLoop.bind(this);
        requestAnimationFrame(this.gameLoop);
    }
    gameLoop(timeStamp) {
        this.lastTime = this.lastTime || timeStamp;
        let deltaTime = timeStamp - this.lastTime;
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.components.forEach(component => {
            component.update(this.context, deltaTime);
        });
        requestAnimationFrame(this.gameLoop);
    }
    getComponents() {
        return this.components;
    }
    getCanvas() {
        return this.canvas;
    }
    addComponent(component) {
        this.components.push(component);
    }
    handleClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.components.forEach(component => {
            if (component.containsPoint(x, y)) {
                const button = component;
                if (button.onClick) {
                    button.onClick();
                }
            }
        });
    }
    createButton() {
        const button = new Button();
        this.addComponent(button);
        return button;
    }
    createSprite() {
        const sprite = new Sprite();
        this.addComponent(sprite);
        return sprite;
    }
}
