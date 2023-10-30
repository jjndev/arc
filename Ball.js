import { arena } from './arc.js';
import { ArenaObject } from './ArenaObject.js';

export class Ball extends ArenaObject {
    constructor(x, y, vx, vy, ballType) {

        let newDocElement = document.createElement("div");
        newDocElement.className += "ball";

        let newArenaArrayGroup = arena.ballArray;

        super(x, y, arena.ballArray, [newDocElement] );

        this.vx = vx;
        this.vy = vy;
        this.ballType = ballType; //0 = normal
        this.currentQuadrant = this.getCurrentQuadrant();
        this.distanceFromCenter = this.getDistanceFromCenter();
        this.velocityAngleInDegrees = this.getVelocityAngleInDegrees();
        

        this.isPlayerActiveInThisQuadrant = false;
        this.state = 0; //0 = neutral, 1 = scored/inactive, 2 = falling
        this.state_timer = 0;
        this.size = 2;
        this.lastTouchedPlayer = -1;
    }

    logicUpdate () {
        //update position
        this.x += this.vx;
        this.y += this.vy;

        switch (this.state) {
            case 1:
                //in state 1 (disabled), fade out and then delete the ball
                this.opacity -= 0.1;
                if (this.opacity <= 0) {
                    this.deleteObject();
                }
            break;

            default:
                //calculate positioning
                this.currentQuadrant = this.getCurrentQuadrant();
                this.distanceFromCenter = this.getDistanceFromCenter();
                this.velocityAngleInDegrees = this.getVelocityAngleInDegrees();
                arena.debugElement2.textContent = `${this.velocityAngleInDegrees.toFixed(2)}`;

                this.isPlayerActiveInThisQuadrant = (arena.goalHandler.playerLives[this.currentQuadrant] > 0);

                //bounce logic
                this.logicBounceWithOtherBalls();
                this.logicBounceOnGoalposts();

                //console.log("before checking paddle script");

                if (this.isPlayerActiveInThisQuadrant) {
                    this.logicBounceOnPaddles();
                }
                else {
                    this.logicBounceOnArenaWalls();
                }
            break;
        }
        //update element positions
        this.updateElementPositions();
        //let dotProduct = this.x * this.vx + this.y * this.vy;
        
    }


    //todo: tidy and consolidate the ball physics algorithms below.

    logicBounceOnPaddles() {
        //check if the ball's current quadrant's paddle is in reach
        //console.log("paddle script runs");
        if (this.distanceFromCenter > 55) return;

        let closestPaddle = arena.paddleArray[this.currentQuadrant];
        //console.log(closestPaddle)
        if (closestPaddle == null || closestPaddle == undefined) return;


        
        //console.log("paddle detected");
        //find the nearest paddle
        let paddleX = closestPaddle.x * 1.1;
        let paddleY = closestPaddle.y * 1.1;
        //console.log(`${closestPaddle.x.toFixed(2)}, ${closestPaddle.y.toFixed(2)}`)
        let paddleDistance = this.pointDistance(this.x, this.y, paddleX, paddleY);
        let collisionDistance = this.size + closestPaddle.size;
        if (paddleDistance >= collisionDistance) return;
        


        //move the ball out of the paddle
        let dx = paddleX - this.x;
        let dy = paddleY - this.y;
        let clipDistance = (closestPaddle.size + this.size);
        dx /= paddleDistance; dy /= paddleDistance;
        //move the ball away from the post
        //this.x += dx*clipDistance; this.y += dy*clipDistance;
        this.x = paddleX - dx * clipDistance;
        this.y = paddleY - dy * clipDistance;


        //console.log("paddle collision");
        let angleToCollisionPoint = Math.atan2(-(paddleY - this.y), paddleX - this.x);
        // Angle of the current movement
        let oldAngle = Math.atan2(-this.vy, this.vx);
        // New angle
        let newAngle = 2 * angleToCollisionPoint - oldAngle;
        // new x/y speeds, using current speed and new angle
        let prevVelocity = Math.sqrt( (Math.pow(this.vx, 2)) + (Math.pow(this.vy , 2)) );
        
                //-----
                //temporary: increase ball speed on bounce
                if (this.lastTouchedPlayer != this.currentQuadrant) {
                    this.lastTouchedPlayer = this.currentQuadrant;
                    prevVelocity += 0.1;
                }
                //-----
        
        this.vx = -prevVelocity * Math.cos(newAngle);
        this.vy = prevVelocity * Math.sin(newAngle);


        

        
    }

    logicBounceOnGoalposts () {
        //goal posts are spaced evenly apart; use math to estimate where the nearest one is
        if (this.x == 0 || this.y == 0) return;
        let nearestGoalpostX = Math.sign(this.x) * 36;
        let nearestGoalpostY = Math.sign(this.y) * 36;
        let goalpostSize = 4;

        let goalpostDistance = this.pointDistance(this.x, this.y, nearestGoalpostX, nearestGoalpostY);
        if (goalpostDistance >= goalpostSize + this.size) return;

        
        //console.log("goalpost collision");
        let angleToCollisionPoint = Math.atan2(-(nearestGoalpostY - this.y), nearestGoalpostX - this.x);
        // Angle of the current movement
        let oldAngle = Math.atan2(-this.vy, this.vx);
        // New angle
        let newAngle = 2 * angleToCollisionPoint - oldAngle;
        // new x/y speeds, using current speed and new angle
        let prevVelocity = Math.sqrt( (Math.pow(this.vx, 2)) + (Math.pow(this.vy , 2)) );
        this.vx = -prevVelocity * Math.cos(newAngle);
        this.vy = prevVelocity * Math.sin(newAngle);
        
        //move the ball outside of the goalpost
        //get vector difference
        let dx = nearestGoalpostX - this.x;
        let dy = nearestGoalpostY - this.y;
        let clipDistance = (goalpostSize + this.size);
        dx /= goalpostDistance; dy /= goalpostDistance;
        //move the ball away from the post
        //this.x += dx*clipDistance; this.y += dy*clipDistance;
        this.x = nearestGoalpostX - dx * clipDistance;
        this.y = nearestGoalpostY - dy * clipDistance;
    }

    logicBounceOnArenaWalls () {

        let centerDist = this.distanceFromCenter;
        let collisionDist = 50 - this.size;
        if (centerDist <= collisionDist) return;
        
        let prevVelocity = Math.sqrt( (Math.pow(this.vx, 2)) + (Math.pow(this.vy , 2)) );

        // Angle from center of arena to center of small circle,
        // which is the same as angle from center of large cercle
        // to the collision point
        let angleToCollisionPoint = Math.atan2(-this.y, this.x);
        // Angle of the current movement
        var oldAngle = Math.atan2(-this.vy, this.vx);
        // New angle
        var newAngle = 2 * angleToCollisionPoint - oldAngle;
        // new x/y speeds, using current speed and new angle
        this.vx = -prevVelocity * Math.cos(newAngle);
        this.vy = prevVelocity * Math.sin(newAngle);
        
        this.x /= centerDist / collisionDist;
        this.y /= centerDist / collisionDist;

        //arena.debugElement2.textContent = 
        //    `incidenceAngle: ${incidenceAngle} <br>reflectAngle: ${reflectAngle}<br>dotProduct: ${dotProduct}`;
    }

    logicBounceWithOtherBalls () {
        //first, make sure the ball is still moving at a minimum speed.
        let ballVelocity = Math.sqrt(this.vx ** 2 + this.vy ** 2);
        if (ballVelocity < 0.05 && ballVelocity > 0) {
            this.vx /= ballVelocity * 20;
            this.vy /= ballVelocity * 20;
        } 

        let ballIndex = this.arenaArrayGroup.indexOf(this);
        if (ballIndex == -1) return;
        //shortened loop starting at one after the ball's index.
        //this means that balls with a lower index won't have the bounce code repeated twice.
        for (let i = ballIndex + 1; i < arena.ballArray.length; i++) {
            var otherBall = arena.ballArray[i];
            
            //check if the balls are close enough to collide
            let ballDistance = Math.sqrt( (Math.pow(this.x - otherBall.x, 2)) + (Math.pow(this.y - otherBall.y, 2)) );
            if (ballDistance >= (this.size + otherBall.size) ) continue;
            
            //move the balls outside of each other
            //get vector difference
            let dx = otherBall.x - this.x;
            let dy = otherBall.y - this.y;
            let clipDistance = (ballDistance - this.size - otherBall.size);
            dx /= ballDistance; dy /= ballDistance;
            //move the two centers apart
            this.x += dx*clipDistance/2; this.y += dy*clipDistance/2;
            otherBall.x -= dx*clipDistance/2; otherBall.y -= dy*clipDistance/2; 
            
            this.ballCollide(otherBall);


        }
    }

    ballCollide(b) { 
        const a = this;
        const x = a.x - b.x;
        const y = a.y - b.y;  
        const d = x * x + y * y;
    
        const u1 = (a.vx * x + a.vy * y) / d;  // From this to b
        const u2 = (x * a.vy - y * a.vx) / d;  // Adjust self along tangent
        const u3 = (b.vx * x + b.vy * y) / d;  // From b to this
        const u4 = (x * b.vy - y * b.vx) / d;  // Adjust b  along tangent
    
        // set new velocities
        b.vx = x * u1 - y * u4;
        b.vy = y * u1 + x * u4;
        a.vx = x * u3 - y * u2;
        a.vy = y * u3 + x * u2;     
    }

    getVelocityAngleInDegrees() {
        let velocityAngle = Math.atan2(-this.vx, -this.vy);
        //return (velocityAngle * 180) / Math.PI;
        return ((velocityAngle * (180 / Math.PI)) + 900) % 360;
    }


    getGoalIntersectAngleInDegrees() {
        //rough estimate placeholder.
        const angleRadians = Math.atan2(-this.x, -this.y);
        return ((angleRadians * (180 / Math.PI)) + 900) % 360;
    }

    //utility methods

    pointDistance (x1, y1, x2, y2) {
        //returns the distance between two points
        return Math.sqrt( (Math.pow(x1 - x2, 2)) + (Math.pow(y1 - y2 , 2)) );
    }

    getCurrentQuadrant () {
        let angleFromCenter = Math.atan2(-this.y, this.x); // range (-PI, PI]
        angleFromCenter *= 180 / Math.PI; // rads to degs, range (-180, 180]

        if (angleFromCenter < -135) return 3;
        if (angleFromCenter < -45) return 0;
        if (angleFromCenter < 45) return 1;
        if (angleFromCenter < 135) return 2;
        return 3;
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
    }

    getDistanceFromCenter () {
        return Math.sqrt( (Math.pow(this.x, 2)) + (Math.pow(this.y , 2)) );
    }
}