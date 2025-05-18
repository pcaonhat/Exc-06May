import { Button } from "./components/button.js";
import { Sprite } from "./components/sprite.js";
import { GameEngine } from "./engine/gameEngine.js";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const engine = new GameEngine(canvas);

const sprite = new Sprite('assets/backGround.jpg',100, 100, 200, 200);
const button = new Button(400, 400, 120, 40,'Click Me', () => {
    alert('Nút đã được nhấn!');
});

engine.addComponent(sprite);
engine.addComponent(button);