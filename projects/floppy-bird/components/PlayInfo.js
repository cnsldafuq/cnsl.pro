import kaplay from "https://unpkg.com/kaplay@3000.1.17/dist/kaboom.mjs"
import MathHelper from "../utils/MathHelper.js";

export default class PlayInfo {
    constructor(game) {
        this.game = game;

        const x = (innerHeight * (9/16)) / 2;
        const y = innerHeight - MathHelper.fixScale(50);
    
        this.playInfo = add([
            text("Tap to start a game!", {
                font: "minecraft",
                size: MathHelper.fixScale(32)
            }),
            pos(x, y),
            anchor("center"),
            z(5)
        ]);

        this.title = add([
            sprite("title"),
            scale(MathHelper.fixScale(0.40)),
            pos(x, MathHelper.fixScale(75)),
            anchor("center"),
            z(5)
        ]);

        let index = 0;
        const baseSize = MathHelper.fixScale(32); // Base font size
        const sizeVariation = MathHelper.fixScale(5); // Amount to vary the size by
        
        onUpdate(() => {
            if(this.game.state.started) {
                this.playInfo.hidden = true;
                this.title.hidden = true;
                return 
            }
            this.playInfo.hidden = false;
            this.title.hidden = false;
            index += dt(); // Increase the index over time for continuous animation
            const newSize = baseSize + Math.sin(index * 8) * sizeVariation; // Oscillate size
            this.playInfo.textSize = newSize;
        });
    }
}