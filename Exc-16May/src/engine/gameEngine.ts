import { Button } from "../components/button.js";
import { Component } from "../components/component.js";
import { Sprite } from "../components/sprite.js";

export class GameEngine {
    private components: Component[] = [];
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private lastTime: number = 0;

    constructor(canvas: HTMLCanvasElement) {
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

    private gameLoop(timeStamp: number){

        this.lastTime = this.lastTime || timeStamp;

        let deltaTime = timeStamp - this.lastTime;
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        
        this.components.forEach(component => {
            component.update(this.context, deltaTime);
        });

        requestAnimationFrame(this.gameLoop);
    }

    public getComponents(): Component[] {
        return this.components;
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }
    public addComponent(component: Component) {
        this.components.push(component);
    }

    private handleClick(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.components.forEach(component => {
            if (component.containsPoint(x, y)) {
                const button = component as Button;
                if (button.onClick) {
                    button.onClick();
                }
            }
        });
    }

    private createButton(): Button {
        const button = new Button();
        this.addComponent(button);
        return button;
    }

    private createSprite(): Sprite {
        const sprite = new Sprite();
        this.addComponent(sprite);
        return sprite;
    }
}