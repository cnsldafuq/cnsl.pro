import kaplay from "https://unpkg.com/kaplay@3000.1.17/dist/kaboom.mjs"
import Game from "./Game.js";

const aspectRatio = 9 / 16;
const height = window.innerHeight;
const width = height * aspectRatio;

const referenceHeight = 720;
export const scaleRatio = height / referenceHeight; // Calculate scale based on the current height

kaplay({
    width: width,
    height: height,
    background: [100, 20, 200],
    root: document.getElementById("game-container"),
});

// Preload
const game = new Game();
await game.preLoad();
game.load();