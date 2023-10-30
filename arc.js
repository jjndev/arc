/////


import { Ball } from './Ball.js';
import { BallSpawnHandler } from './BallSpawnHandler.js';
import { GoalHandler } from './GoalHandler.js';
import { Paddle } from './Paddle.js';
import { SplashScreenHandler } from './SplashScreenHandler.js';
var bounces = 0;

//game logic
setInterval(gameLogicStep, 16)

//debug game logic
//arena.docElement.addEventListener("mouseover", gameLogicStep);

//



export var arena = {
    docElement: document.getElementById("arena"),
    containerDocElement: document.getElementById("arena-container"),
    size: 50,
    playerArray: [],
    goalArray: [],
    ballArray: [],
    paddleArray: [],
    gameTime: 0,

    cameraRotate: 0,

    ballSpawnHandler: new BallSpawnHandler(),
    goalHandler: new GoalHandler(),
    splashScreenHandler: new SplashScreenHandler(),

    debugElement: document.getElementById("debug-log"),
    debugElement2:document.getElementById("debug-log2")
}


document.getElementById("splash-btn-title-play").addEventListener("click", gameLogicStart);
document.getElementById("splash-btn-howtoplay-play").addEventListener("click", gameLogicStart);
document.getElementById("splash-btn-win-playagain").addEventListener("click", gameLogicStart);
document.getElementById("splash-btn-lose-playagain").addEventListener("click", gameLogicStart);

document.getElementById("splash-btn-title-instructions").addEventListener("click", displayInstructions);

/*
class ArenaField {
    static docElement = 
    static size = 100;
    static playerArray =  [];
    static goalArray = [];
    static ballArray = [];
}
*/
//export var arena = new ArenaField();


//while (arena.ballArray.length < 0) {
//    var newBall = new Ball(Math.random(40) - 20, Math.random(40) - 20, 
//    Math.random(2) - 1, Math.random(2) - 1, 0);
//}

//var newBall = new Ball(-25, 0, 1, 2, 0);
//var newBall = new Ball(25, 0, 1, 2, 0);






//splash screen events

/*
let ball = {
    docElement: (document.getElementsByClassName("ball"))[0],
    x: 25,
    y: 0,
    size: 1,
    
    vx: 0.1,
    vy: -0.2,
    distanceFromCenter () {
        return Math.sqrt( (Math.pow(this.x, 2)) + (Math.pow(this.y , 2)) );
    },

    logicUpdate () {
        this.x += this.vx;
        this.y += this.vy;
        //this.docElement.style.backgroundColor = "red";
        
        //edge of arena
        
        //debugElement.textContent = `Distance from Center: ${centerDist}`;

        this.logicBounceOnArenaWalls();
        
        let dotProduct = this.x * this.vx + this.y * this.vy;
        debugElement2.textContent = `dotProduct: ${dotProduct.toFixed(2)} | bounces: ${bounces.toFixed(2)}`;
        
        ball.docElement.style.left = `${this.x + 50}%`;
        ball.docElement.style.top = `${this.y + 50}%`;
    },

    logicBounceOnArenaWalls () {

        let centerDist = this.distanceFromCenter();
        let collisionDist = 50 - this.size;
        if (centerDist <= collisionDist) return;
        
        let prevVelocity = Math.sqrt( (Math.pow(this.vx, 2)) + (Math.pow(this.vy , 2)) );
        
        //// let incidenceAngle = Math.atan2(-this.y, this.x);
        //// //let 
        //// let reflectAngle = 2 * incidenceAngle - Math.atan2(-this.vy, this.vx);
        //// this.vx = Math.cos(reflectAngle) * prevVelocity;
        //// this.vy = Math.sin(reflectAngle) * prevVelocity;
        


        // Angle from center of large circle to center of small circle,
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
        

        bounces++;

        //this.x += this.vx;
        //this.y += this.vy;
        //if the ball is moving away from the center of the circle after bouncing, make it bounce again
        let dotProduct = this.x * this.vx + this.y * this.vy;
        if (dotProduct > 0) {
            console.log (`ball moving away on bounce ${bounces}`)
            //ball is moving away; this shouldn't be the case after bouncing inside the arena
            reflectAngle -= Math.PI;
            //reflectAngle = 2 * incidenceAngle - Math.atan2(this.vx, this.vy);
            this.vx = Math.cos(reflectAngle) * prevVelocity;
            this.vy = Math.sin(reflectAngle) * prevVelocity;
            dotProduct = this.x * this.vx + this.y * this.vy;
            console.log (`bounce ${bounces} corrected: ${dotProduct <= 0}`)    
        }
        




        //this.x /= centerDist / collisionDist;
        //this.y /= centerDist / collisionDist;

        debugElement2.textContent = 
            `incidenceAngle: ${incidenceAngle} <br>reflectAngle: ${reflectAngle}<br>dotProduct: ${dotProduct}`;
    }

};
*/


var paddle = new Paddle( 0, 90, "orange", 0);
var paddle = new Paddle( 90, 90, "red", 1);
var paddle = new Paddle( 180, 90, "blueviolet", 3);
var paddle = new Paddle( 270, 90, "blue", 2);




var mouseButtonIsPressed = false;

function logButtons(e) {
    mouseButtonIsPressed = e.buttons > 0;
  }
  
  document.addEventListener("mouseup", logButtons);
  document.addEventListener("mousedown", logButtons);


function arenaReset() {
    while (arena.ballArray.length > 0) {
        arena.ballArray[0].remove
    }
    for (let i = 0; i < arena.ballArray.length; i++) {
        arena.ballArray[i].logic();
    }
    for (let i = 0; i < arena.paddleArray.length; i++) {
        arena.paddleArray[i].logicUpdate();
    }
}

function displayInstructions() {
    arena.splashScreenHandler.showSplashScreen(1);
}

function gameLogicStart() {
    arena.ballSpawnHandler.despawnAllBalls();
    arena.splashScreenHandler.hideAllSplashScreens();
    arena.goalHandler.logicStart();
    arena.ballSpawnHandler.logicStart();
}

function gameLogicStep() {
    if (mouseButtonIsPressed) return;
    arena.gameTime++;
    //let asd = ball.distanceFromCenter();
    
    arena.ballSpawnHandler.logicUpdate();

    //arena.ballArray.foreach(this.logicUpdate());
    //console.log(arena);
    for (let i = 0; i < arena.ballArray.length; i++) {
        arena.ballArray[i].logicUpdate();
    }
    for (let i = 0; i < arena.paddleArray.length; i++) {
        arena.paddleArray[i].logicUpdate();
    }

    arena.cameraRotate += (arena.paddleArray[0].angle - arena.cameraRotate) * 0.05;
    arena.containerDocElement.style.transform = `rotateY(${arena.cameraRotate * -0.2}deg)`;

    arena.goalHandler.logicUpdate();
    //ball.logicUpdate();
    
}


