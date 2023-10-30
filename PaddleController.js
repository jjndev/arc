import { Utility } from "./Utility.js";
import { arena } from "./arc.js";
import { Ball } from "./Ball.js";

export class PaddleController {
    constructor() {
        this.leftDown = false;
        this.rightDown = false;
        this.boostDown = false;
    }

    updateInputs() {
        
        this.leftDown = false;
        this.rightDown = false;
        this.boostDown = false;
    }

    rightInputMinusLeftInput() {
        return this.rightDown - this.leftDown;
    }
}

export class PaddleController_Player extends PaddleController {
    constructor() {
        super();
    }

    updateInputs() {
        //don't run if this player is out of lives
        if (arena.goalHandler.playerLives[this.quadrant] <= 0) return;
        //adopt keyboard event variables
        this.leftDown = keyboardLeftDown;
        this.rightDown = keyboardRightDown;
        this.boostDown = keyboardBoostDown;
    }
}

export class PaddleController_CPU extends PaddleController {
    constructor(paddleObject, difficulty) {
        super();
        this.paddleObject = paddleObject;
        this.quadrant = Math.round(paddleObject.startAngle / 90);
        this.difficulty = difficulty; //max is 100
        this.paddleStartX = paddleObject.x;
        this.paddleStartY = paddleObject.y;
    }

    updateInputs() {
        //Script for CPU inputs.

        //run this on every other frame.
        if (arena.gameTime % 2 == 0) return;

        //don't run if this player is out of lives
        if (arena.goalHandler.playerLives[this.quadrant] <= 0) return;

        //difficulty slider - run this less frequently on easier difficulties
        if (Math.random() * 100 > this.difficulty) return;
        //get the nearest ball

        let nearestBall = null;
        let nearestBallDistance = 80;

        for (let i = 0; i < arena.ballArray.length; i++) {
            let thisBall = arena.ballArray[i];
            //skip if the ball is not active
            if (thisBall.state != 0) continue; 
            //skip if the ball isn't travelling in the direction of this goal
            if (Utility.angleDifference(this.paddleObject.startAngle, thisBall.velocityAngleInDegrees) > 85) continue;
            //skip if the ball is not in this player's quadrant
            //if (thisBall.currentQuadrant != this.quadrant) continue;
            /*
            let thisBallDistance = Utility.pointDistance(
                thisBall.x + thisBall.vx * 5,
                thisBall.y + thisBall.vy * 5,
                this.paddleStartX, 
                this.paddleStartY
            );
            */
           let thisBallDistance = 0;
            thisBallDistance += Math.abs(50 - thisBall.distanceFromCenter);
            if (thisBallDistance > nearestBallDistance) continue;

            //store this ball as the nearest
            nearestBall = thisBall;
            nearestBallDistance = thisBallDistance;
        }

        if (nearestBall != null) {
            //get the true difference in angle
            let angleTarget = nearestBall.getGoalIntersectAngleInDegrees();
            let angleTargetDifference = Utility.signedAngleDifference(
                this.paddleObject.startAngle + this.paddleObject.angle + this.paddleObject.velocity * 2, angleTarget);
            
            /*
            arena.debugElement2.textContent = 
            `startangle: ${this.paddleObject.startAngle} | angle: 
            ${(this.paddleObject.startAngle + this.paddleObject.angle).toFixed(0)}
             > ${angleTarget.toFixed(0)} (angle difference: 
                ${angleTargetDifference.toFixed(0)})`;//| bounces: ${bounces.toFixed(2)}`;
                */
            
            this.leftDown = (angleTargetDifference > 4);
            this.rightDown = (angleTargetDifference < -4);
            this.boostDown = (nearestBallDistance <= 30 - this.difficulty / 10 && Math.random() <= this.difficulty / 3);
            //arena.debugElement2.textContent += ` moving: ${this.rightInputMinusLeftInput()}`;
        }
        else {
            
            //arena.debugElement2.textContent = "no ball in range";
            //if there is no ball to follow, move and stop idly.
            this.boostDown = false;
            
            if ( (this.leftDown || this.rightDown)) {
                if (Math.random() <= 0.1) {
                    this.leftDown = false;
                    this.rightDown = false;
                }
            }
            else if (Math.random() <= Math.abs(this.paddleObject.angle ** 2) * 0.001 + 0.1) {
                //(Math.abs(this.paddleObject.angle) >= 25) { //
                console.log("leave corner code runs")
                this.leftDown = (this.paddleObject.angle > 0);
                this.rightDown = (this.paddleObject.angle <= 0);
            }

        }
    }
}




document.onkeydown = checkKeyDown;
document.onkeyup = checkKeyUp;

var keyboardLeftDown = false;
var keyboardRightDown = false;
var keyboardBoostDown = false;

function checkKeyDown(e) {

    //e = e || window.event;

    if (e.keyCode == '38' || e.keyCode == '32') { //up key or spacebar
        keyboardBoostDown = true;
    }
    else if (e.keyCode == '37') { //left key
        keyboardLeftDown = true;
    }
    else if (e.keyCode == '39') { //right key
        keyboardRightDown = true;
    }
}

function checkKeyUp(e) {

    //e = e || window.event;

    
    if (e.keyCode == '38' || e.keyCode == '32') { //up key or spacebar
        keyboardBoostDown = false;
    }
    else if (e.keyCode == '37') { //left key
        keyboardLeftDown = false;
    }
    else if (e.keyCode == '39') { //right key
        keyboardRightDown = false;
    }

}