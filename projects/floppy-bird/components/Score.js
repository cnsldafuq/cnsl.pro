import kaplay from "https://unpkg.com/kaplay@3000.1.17/dist/kaboom.mjs"
import MathHelper from "../utils/MathHelper.js";

export default class Score {
    constructor(game) {
        this.game = game;

        const x = (innerHeight * (9/16)) / 2;
        const y = MathHelper.fixScale(50);
    
        this.score = add([
            text(`Score: ${this.game.state.score}`, {
                font: "minecraft",
                size: MathHelper.fixScale(32)
            }),
            pos(x, y),
            anchor("center"),
            z(5)
        ]);

        this.bestScore = add([
            text(`Best: ${this.game.state.bestScore}`, {
                font: "minecraft",
                size: MathHelper.fixScale("24")
            }),
            pos(x, y + MathHelper.fixScale(25)),
            anchor("center"),
            color("#FFD700"),
            z(5)
        ]);

        onUpdate(() => {
            if(!this.game.state.started) {
                this.score.hidden = true;
                this.bestScore.hidden = true;
                return;
            }
            this.score.hidden = false;
            this.bestScore.hidden = false;
            this.score.text = `Score: ${this.game.state.score}`;
            this.bestScore.text = `Best: ${this.game.state.bestScore}`;
        });
    }
}