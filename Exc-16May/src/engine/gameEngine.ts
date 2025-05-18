import { Button } from "../components/button.js";
import { Component } from "../components/component.js";

export class GameEngine {
    private components: Component[] = [];
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Canvas not supported");
        }

        this.canvas = canvas;
        this.context = context;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        window.addEventListener("resize", () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        canvas.addEventListener('click', this.handleClick.bind(this));

        this.gameLoop();
    }

    private gameLoop(){
        requestAnimationFrame(() => this.gameLoop());

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        
        this.components.forEach(component => {
            component.update(this.context);
        });
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
}