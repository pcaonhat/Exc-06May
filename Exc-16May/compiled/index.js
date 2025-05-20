import { GameEngine } from "./engine/gameEngine.js";
import { GameManager } from "./managers/gameManager.js";
const canvas = document.getElementById("game");
const engine = new GameEngine(canvas);
const gameManager = new GameManager(engine);
const scoreDisplay = document.createElement("div");
scoreDisplay.style.position = "absolute";
scoreDisplay.style.top = "20px";
scoreDisplay.style.left = "20px";
scoreDisplay.style.color = "white";
scoreDisplay.style.fontSize = "24px";
document.body.appendChild(scoreDisplay);
setInterval(() => {
    scoreDisplay.textContent = `Score: ${gameManager.getScore()}`;
}, 100);
