import { arena } from './arc.js';
import { Ball } from './Ball.js';

export class BallSpawnHandler {
    constructor() {
        this.logicStart_Demo();
    }


    logicStart() {
        this.maximumBallsInPlay = 1;
        this.maximumBallsIncrement = 900;
        this.maximumBallsCap = 10;
        this.maximumBallsIncrementTimer = 0;
        this.despawnAllBalls();
    }

    logicStart_Demo() {
        this.maximumBallsInPlay = 0;
        this.maximumBallsIncrement = 900;
        this.maximumBallsCap = 0;
        this.maximumBallsIncrementTimer = 0;
    }

    logicUpdate () {
        //steadily increase the number of balls in play
        this.maximumBallsIncrementTimer++;

        if (this.maximumBallsIncrementTimer >= this.maximumBallsIncrement) {
            this.maximumBallsIncrementTimer = 0;
            this.maximumBallsInPlay = Math.min(this.maximumBallsCap, this.maximumBallsInPlay + 1);
        }

        //spawn balls from the spawners at random
        var currentBallsInPlay = arena.ballArray.length;
        if (currentBallsInPlay < this.maximumBallsInPlay && Math.random() < 0.01) {
            this.spawnBall();
        }
    }

    spawnBall() {
        //spawn a ball from a random corner in a random direction
        let newBallX = (Math.random() < 0.5) * 60 - 30;
        let newBallY = (Math.random() < 0.5) * 60 - 30;
        let newBallVX = Math.sign(-newBallX) * 0.4
            + (Math.random()>0.5)*0.3 + Math.random()*0.1 - 0.15;
        let newBallVY = Math.sign(-newBallY) * 0.4
            + (Math.random()>0.5)*0.3 + Math.random()*0.1 - 0.15;
        let newBall = new Ball(newBallX, newBallY, newBallVX, newBallVY, 0);
    }

    despawnAllBalls() {
        if (arena.ballArray == undefined) return;
        for (let i = 0; i < arena.ballArray.length; i++) {
            arena.ballArray[i].state = 1;
        }
    }
}