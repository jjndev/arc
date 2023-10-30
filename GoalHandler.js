import { arena } from './arc.js';
import { Ball } from './Ball.js';
import { SplashScreenHandler } from './SplashScreenHandler.js';
export class GoalHandler {
    constructor() {
        this.docElementArray = document.getElementsByClassName("ui-lives");
        this.logicStart_Demo();
    }

    getRemainingPlayers() {
        return (playerLives[0] > 0) + (playerLives[1] > 0) + (playerLives[2] > 0) + (playerLives[3] > 0);
    }

    logicStart() {
        this.playerLives = [15, 15, 15, 15];
        for (let i = 0; i < 4; i++) {
            this.docElementArray[i].textContent = this.playerLives[i];
        }
    }

    logicStart_Demo() {
        this.playerLives = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            this.docElementArray[i].textContent = this.playerLives[i];
        }
    }

    logicUpdate () {
        //steadily increase the number of balls in play

        for (let i = 0; i < arena.ballArray.length; i++) {
            var currentBall = arena.ballArray[i];
            //skip to the next ball if this ball isn't neutral & inside the arena
            if (currentBall.state != 0 || currentBall.distanceFromCenter < 55) continue;

            //disable the ball
            currentBall.state = 1;
            //subtract a life from the player
            var currentGoal = currentBall.currentQuadrant;
            this.playerLives[currentGoal]--;
            //update ui element
            this.docElementArray[currentGoal].textContent = this.playerLives[currentGoal];
            //disable this player when lives falls to zero
            if (this.playerLives[currentGoal] <= 0) {
                this.playerLives[currentGoal] = 0;

                if (currentGoal <= 0) {
                    //end the game if the player's lives fell to zero
                    arena.splashScreenHandler.showSplashScreen(3);
                    arena.ballSpawnHandler.despawnAllBalls();
                }

                else {
                    //score handler things

                    //if all other players are out of lives, display a win screen
                    if (this.playerLives[0] > 0 
                        && this.playerLives[1] == 0 
                        && this.playerLives[2] == 0
                        && this.playerLives[3] == 0) {
                            arena.splashScreenHandler.showSplashScreen(2);
                            arena.ballSpawnHandler.despawnAllBalls();
                    }
                }
            }
        }

        this.maximumBallsIncrementTimer++;

        if (this.maximumBallsIncrementTimer >= this.maximumBallsIncrement) {
            this.maximumBallsIncrementTimer = 0;
            this.maximumBallsInPlay = Math.min(this.maximumBallsCap, this.maximumBallsInPlay + 1);
        }

        //spawn balls from the spawners at random
        var currentBallsInPlay = arena.ballArray.length;
        if (currentBallsInPlay < this.maximumBallsInPlay && Math.random() < 0.02) {
            this.spawnBall();
            console.log("ball spawned")
        }
        
    }

    spawnBall() {
        let newBallX = (Math.random() < 0.5) * 70 - 35;
        let newBallY = (Math.random() < 0.5) * 70 - 35;
        let newBallVX = Math.sign(-newBallX) + Math.random() * 0.3;
        let newBallVY = Math.sign(-newBallY) + Math.random() * 0.3;
        let newBall = new Ball(newBallX, newBallY, newBallVX, newBallVY, 0);
    }
}