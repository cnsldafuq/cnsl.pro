import kaplay from "https://unpkg.com/kaplay@3000.1.17/dist/kaboom.mjs"
import MathHelper from "../utils/MathHelper.js";

export default class Reverse {
    constructor(game, y, spawnX) {

        this.game = game;

        this.reverse = add([
            sprite("reverse"),
            scale(MathHelper.fixScale(5)),
            pos(spawnX, y),
            area(),
            anchor("center"),
            "reverse"
        ]);

        this.reverse.onUpdate(() => this.update(this.reverse));
    }

    update(object) {
        if(!this.game.state.started || !this.game.state.alive) return;

        object.pos.x -= MathHelper.fixScale(300) * dt()
    }
}
