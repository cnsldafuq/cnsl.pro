import kaplay from "https://unpkg.com/kaplay@3000.1.17/dist/kaboom.mjs"
import MathHelper from "../utils/MathHelper.js";

export default class Background {
    constructor(game) {
        this.game = game;

        this.background = add([
            sprite("background"),
            // Make the background centered on the screen
            pos(width() / 2, height() / 2),
            anchor("center"),
            // Allow the background to be scaled
            scale(MathHelper.fixScale(0.40)),
            // Keep the background position fixed even when the camera moves
            fixed()
        ]);
    }
}
