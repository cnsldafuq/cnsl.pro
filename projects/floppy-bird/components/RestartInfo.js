import kaplay from "https://unpkg.com/kaplay@3000.1.17/dist/kaboom.mjs"
import MathHelper from "../utils/MathHelper.js";

export default class RestartInfo {
    constructor(game) {
        this.game = game;

        const x = (innerHeight * (9/16)) / 2;
        const y = innerHeight - MathHelper.fixScale(50);
    
        this.restartInfo = add([
            text("Tap to restart!", {
                font: "minecraft",
                size: MathHelper.fixScale(32)
            }),
            pos(x, y),
            anchor("center"),
            z(5)
        ]);

        let index = 0;
        const baseSize = MathHelper.fixScale(32); // Base font size
        const sizeVariation = MathHelper.fixScale(5); // Amount to vary the size by
        
        onUpdate(() => {
            if(this.game.state.alive) return this.restartInfo.hidden = true;
            this.restartInfo.hidden = false;
            index += dt(); // Increase the index over time for continuous animation
            const newSize = baseSize + Math.sin(index * 8) * sizeVariation; // Oscillate size
            this.restartInfo.textSize = newSize;
        });
    }
}