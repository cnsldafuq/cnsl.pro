import kaplay from "https://unpkg.com/kaplay@3000.1.17/dist/kaboom.mjs"
import MathHelper from "../utils/MathHelper.js";

export default class Trigger {
    constructor(game, y, spawnX) {

        this.game = game;

        this.trigger = add([
            sprite("trigger"),
            scale(MathHelper.fixScale(100)),
            pos(spawnX, y),
            area(),
            anchor("center"),
            "trigger"
        ]);

        this.trigger.onUpdate(() => this.update(this.trigger));
    }

    update(object) {
        if(!this.game.state.started || !this.game.state.alive) return;

        object.pos.x -= MathHelper.fixScale(300) * dt()
    }
}
