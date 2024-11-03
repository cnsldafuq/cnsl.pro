import kaplay from "https://unpkg.com/kaplay@3000.1.17/dist/kaboom.mjs"
import MathHelper from "../utils/MathHelper.js";
import Player from "../components/Player.js";
import Spawner from "../components/Spawner.js";
import Score from "../components/Score.js";
import PlayInfo from "../components/PlayInfo.js";
import RestartInfo from "../components/RestartInfo.js";
import Background from "../components/Background.js";

export default class Game {
    constructor() {
        this.state = {
            started: false,
            alive: true,
            score: 0,
            bestScore: parseInt(window.localStorage.getItem("best_score")) || 0
        };

        this.score;
        this.player;
        this.spawner;
    }

    async preLoad() {
        // Pre load
        setGravity(MathHelper.fixScale(2500));
        loadSprite("background", "sprites/background.png");

        loadSprite("bird", "sprites/bird.png");
    
        loadSprite("pipe_top", "sprites/pipe_top.png");
        loadSprite("pipe_bottom", "sprites/pipe_bottom.png");
    
        loadSprite("trigger", "sprites/trigger.png");
    
        loadSprite("reverse", "sprites/reverse_rune.png");

        loadSprite("title", "sprites/title.png");
    
        loadSound("swing", "sounds/swing.mp3");
        loadSound("collect", "sounds/collect.mp3");
        loadSound("death", "sounds/death.mp3");

        loadFont("minecraft", "fonts/Minecraft.ttf");

        return true;
    }

    load() {
        this.player = new Player(this);
        this.score = new Score(this);
        this.spawner = new Spawner(this);

        new Background(this);
        new PlayInfo(this);
        new RestartInfo(this);

        this.setupInputHandlers();
        this.start();
    }
    
    setupInputHandlers() {
        const inputHandler = () => this.handleRespawn();
    
        onKeyPress(inputHandler);
        onClick(inputHandler);
    }
    
    handleRespawn() {
        if(!this.state.alive) {
            this.start();
        }
    }

    incrementScore() {
        this.state.score++;
        if(this.state.score > this.state.bestScore) this.state.bestScore = this.state.score;
        this.spawner.spawn(MathHelper.fixScale(100));
    }

    start() {
        // Clear existing game objects
        destroyAll("pipe");
        destroyAll("trigger");
        destroyAll("reverse");

        // Reset game state
        this.state.started = false;
        this.state.alive = true;
        this.state.score = 0;

        if(this.player) this.player.resetPosition();

        this.spawner.spawn();
    }

    async end() {
        this.state.alive = false;
        window.localStorage.setItem("best_score", this.state.bestScore);
    }
}