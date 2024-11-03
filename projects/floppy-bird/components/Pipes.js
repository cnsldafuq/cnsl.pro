import kaplay from "https://unpkg.com/kaplay@3000.1.17/dist/kaboom.mjs"
import MathHelper from "../utils/MathHelper.js";

export default class Pipes {
    constructor(game, y, holeSize, spawnX) {
        this.game = game;
        const pipeHeight = MathHelper.fixScale(8) * 64;

        this.pipeTop = add([
            sprite("pipe_top"),
            scale(MathHelper.fixScale(8)),
            pos(spawnX, y - (pipeHeight / 2) - (holeSize / 2)),
            area(),
            anchor("center"),
            "pipe"
        ]);

        this.pipeBottom = add([
            sprite("pipe_bottom"),
            scale(MathHelper.fixScale(8)),
            pos(spawnX, y + (pipeHeight / 2) + (holeSize / 2)),
            area(),
            anchor("center"),
            "pipe"
        ]);

        onUpdate(() => this.update())
    }

    update() {
        if(!this.game.state.started || !this.game.state.alive) return;

        this.pipeTop.pos.x -= MathHelper.fixScale(300) * dt()
        this.pipeBottom.pos.x -= MathHelper.fixScale(300) * dt()

        if(this.pipeTop.pos.x < -500 || this.pipeBottom.pos.x < -500) {
            this.pipeTop.destroy();
            this.pipeBottom.destroy();
        }
    }
}
