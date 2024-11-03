import { scaleRatio } from "../game/main.js";

export default class MathHelper {
    static randomInt(min, max) {
        return Math.round(Math.random() * (max - min + 1) + min);
    }
    
    static fixScale(num) {
        return num * scaleRatio;
    }
}