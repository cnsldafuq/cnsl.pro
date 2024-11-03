import kaplay from "https://unpkg.com/kaplay@3000.1.17/dist/kaboom.mjs"
import MathHelper from "../utils/MathHelper.js";

let gravity = 2500;
let jumpPower = 900;

export default class Player {
    constructor(game) {
        this.reversed = false;
        this.game = game;

        this.player = add([
            sprite("bird"),
            scale(MathHelper.fixScale(5)),
            pos(0, 0),
            area(),
            body(),
            anchor("center"),
            z(3),
            "player"
        ]);

        this.resetPosition();

        let newY;
        let y;

        this.player.onUpdate(() => {
            if(!this.game.state.started) {
                if(this.player.pos.y > (innerHeight / 1.5)) this.player.jump(MathHelper.fixScale(jumpPower / 1.5))
            }
            newY = this.player.pos.y
            const dy = y - newY;
            y = newY;

            this.player.angle = -dy
            if((this.player.pos.y >= window.innerHeight || this.player.pos.y <= 0)) this.kill();
        });

        onKeyPress("space", () => this.jump());
        onClick(() => this.jump());

        onCollide("player", "pipe", () => {
            this.kill();
        });

        onCollide("player", "trigger", (p, trigger) => {
            play("collect");
            this.game.incrementScore();
            trigger.destroy();
        });

        onCollide("player", "reverse", (p, reverse) => {
            this.reversed = !this.reversed;
            this.player.flipY = this.reversed;

            gravity = -gravity;
            jumpPower = -jumpPower;

            setGravity(MathHelper.fixScale(gravity));
            reverse.destroy();
        });
    }
    
    resetPosition() {
        const x = (innerHeight * (9/16)) / 3;
        const y = innerHeight / 2;
        this.player.vel.x = 0;
        this.player.vel.y = 0;
        this.player.pos.x = x;
        this.player.pos.y = y;
    }

    jump() {
        if(!this.game.state.alive) return;

        if(!this.game.state.started) {
            setGravity(MathHelper.fixScale(gravity))
            this.game.state.started = true
        }
        play("swing");
        this.player.jump(MathHelper.fixScale(jumpPower))
    }

    fling() {
        const belowCenter = this.player.pos.y > (window.innerHeight / 2)

        if(belowCenter) {
            this.player.vel.y = MathHelper.fixScale(-MathHelper.randomInt(1000, 1500));
            this.player.vel.x = MathHelper.fixScale(-MathHelper.randomInt(100, 250));
        }
        else {
            this.player.vel.y = MathHelper.fixScale(MathHelper.randomInt(250, 500));
            this.player.vel.x = MathHelper.fixScale(-MathHelper.randomInt(100, 250));
        }
    }

    kill() {
        if(!this.game.state.alive) return;

        if(this.reversed) {
            this.reversed = !this.reversed;
            this.player.flipY = this.reversed;

            gravity = -gravity;
            jumpPower = -jumpPower;

            setGravity(MathHelper.fixScale(gravity));
        }

        play("death");
        this.game.end();
        this.fling();
    }
}
