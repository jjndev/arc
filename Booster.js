import { arena } from './arc.js';
import { ArenaObject } from './ArenaObject.js';


export class Booster extends ArenaObject {
    constructor(x, y) {

        let newDocElement = document.createElement("div");
        newDocElement.className += "paddle";

        let newArenaArrayGroup = arena.paddleArray;

        super(x, y, arena.paddleArray, [newDocElement] );

        this.startAngle = startAngle;
        this.angle = 0;
        this.velocity = 0;
        this.size = 10;
        
        this.state = 0; //0 = active, 1 = inactive

        this.inputLeft = 0;
        this.inputRight = 0;
        this.inputBoost = 0;

        this.boostCooldown = 0;
        this.lives = 15;
    }

    logicUpdate () {
    }
}