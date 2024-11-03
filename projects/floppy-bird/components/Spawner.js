import MathHelper from "../utils/MathHelper.js";
import Pipes from "./Pipes.js";
import Reverse from "./Reverse.js";
import Trigger from "./Trigger.js";

const x = ((innerHeight * (9/16)) * 1.25)

export default class Spawner {
    constructor(game) {
        this.game = game;
    }

    spawn(xOffset = 0) {
        const offset = MathHelper.randomInt(MathHelper.fixScale(-100), MathHelper.fixScale(100));
        const pipesY = (window.innerHeight / 2) + offset;
        const hasReverse = MathHelper.randomInt(0, 9) === 9 && this.game.state.score > 10;

        const holeSize = hasReverse ? MathHelper.randomInt(MathHelper.fixScale(275), MathHelper.fixScale(300)) : MathHelper.randomInt(MathHelper.fixScale(240), MathHelper.fixScale(265))

        new Pipes(
            this.game,
            pipesY,
            holeSize,
            x + xOffset
        );

        if(hasReverse) {
            new Reverse(
                this.game,
                pipesY,
                x + xOffset
            );
        }

        new Trigger(
            this.game,
            pipesY,
            x + xOffset
        );
    }
}