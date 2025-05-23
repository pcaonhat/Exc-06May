import { Button } from "../components/button.js";
import { GameEngine } from "../engine/gameEngine.js";

export class GameManager {
    private engine: GameEngine;
    private buttonList: Button[] = [];
    private score: number = 0;
    private currentHighlightedIndex: number = -1;
    private isWin: boolean = true;
    private baseColor: string = '#3498db';
    private highlightColor: string = '#2ecc71';
    private difficulty: number = 0.3;

    constructor(engine: GameEngine) {
        this.engine = engine;
        this.initGame();
    }

    private initGame(): void {
        this.generateNewColors();
        this.createGrid();
        this.highlightRandomButton();
    }

    private generateNewColors(): void {

        this.baseColor = this.getRandomColor();
        
        this.highlightColor = this.getSlightlyDifferentColor(this.baseColor, this.difficulty);
    }

    private getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    private getSlightlyDifferentColor(baseColor: string, factor: number): string {

        const r = parseInt(baseColor.substr(1, 2), 16);
        const g = parseInt(baseColor.substr(3, 2), 16);
        const b = parseInt(baseColor.substr(5, 2), 16);


        const changeR = Math.floor((Math.random() * 2 - 1) * 255 * factor);
        const changeG = Math.floor((Math.random() * 2 - 1) * 255 * factor);
        const changeB = Math.floor((Math.random() * 2 - 1) * 255 * factor);


        const newR = Math.min(255, Math.max(0, r + changeR));
        const newG = Math.min(255, Math.max(0, g + changeG));
        const newB = Math.min(255, Math.max(0, b + changeB));


        return `#${this.toHex(newR)}${this.toHex(newG)}${this.toHex(newB)}`;
    }

    private toHex(value: number): string {
        const hex = value.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }

    private createGrid(): void {
        this.buttonList.forEach(button => {
            const index = this.engine.getComponents().indexOf(button);
            if (index > -1) {
                this.engine.getComponents().splice(index, 1);
            }
        });
        this.buttonList = [];

        const gridSize = 9;
        const buttonSize = 80;
        const padding = 10;
        const startX = (this.engine.getCanvas().width - (3 * (buttonSize + padding))) / 2;
        const startY = 100;

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const index = row * 3 + col;
                const x = startX + col * (buttonSize + padding);
                const y = startY + row * (buttonSize + padding);

                const button = new Button(
                    x, y, buttonSize, buttonSize,
                    '', 
                    () => this.handleButtonClick(index),
                );

                button.setBackgroundColor(this.baseColor);

                this.buttonList.push(button);
                this.engine.addComponent(button);
            }
        }
    }

    private highlightRandomButton(): void {

        this.buttonList.forEach(button => button.setBackgroundColor(this.baseColor));

        this.currentHighlightedIndex = Math.floor(Math.random() * this.buttonList.length);
        this.buttonList[this.currentHighlightedIndex].setBackgroundColor(this.highlightColor);
    }

    private handleButtonClick(index: number): void {
        if (!this.isWin) return;

        if (index === this.currentHighlightedIndex) {
            this.score++;
            if (this.score % 3 === 0 && this.difficulty > 0.05) {
                this.difficulty -= 0.01;
            }
            this.generateNewColors();
            this.highlightRandomButton();
        } else {
            this.isWin = false;
            alert(`Game Over! Your score: ${this.score}`);
            this.resetGame();
        }
    }

    private resetGame(): void {
        this.score = 0;
        this.isWin = true;
        this.difficulty = 0.1; 
        this.generateNewColors();
        this.highlightRandomButton();
    }

    public getScore(): number {
        return this.score;
    }

}