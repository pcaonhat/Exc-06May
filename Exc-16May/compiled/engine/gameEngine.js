export class GameEngine {
    constructor(canvas) {
        this.components = [];
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
    gameLoop() {
        requestAnimationFrame(() => this.gameLoop());
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.components.forEach(component => {
            component.update(this.context);
        });
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
}
