import { arena } from './arc.js';
import { ArenaObject } from './ArenaObject.js';
import { PaddleController_Player } from './PaddleController.js';
import { PaddleController_CPU } from './PaddleController.js';

export class Paddle extends ArenaObject {
    constructor(startAngle, movementRange, color, controlMethod) {
        /*
        let newDocElementArray = [];
        for (let i = 0; i < 3; i++) {
            newDocElementArray[i] = document.createElement("div");
            newDocElementArray[i].className += "paddle";
            newDocElementArray[i].style.borderTopColor = color;
        }
        newDocElementArray[0].style.borderTopStyle = "solid";
        */
        let newDocElement1 = document.createElement("div");
        newDocElement1.className += "paddle zheight1";
        newDocElement1.style.borderTopColor = color;

        //let newDocElement2 = document.createElement("div");
        //newDocElement2.className += "paddle";
        //newDocElement2.style.borderTopColor = color;

        let newArenaArrayGroup = arena.paddleArray;
        super(0, 0, arena.paddleArray, [newDocElement1]);//[newDocElement1, newDocElement2] );

        this.startAngle = startAngle;
        this.controlMethod = controlMethod; //0 = player, 1 = easy CPU, 2 = med CPU, 3 = hard CPU
        
        this.logicStart();

        this.paddleController;
        switch (this.controlMethod) {
            case 0: //player
                this.paddleController = new PaddleController_Player(); break;
            case 1: //easy cpu
                this.paddleController = new PaddleController_CPU(this, 30); break;
            case 3: //hard cpu
                this.paddleController = new PaddleController_CPU(this, 50); break;
            default: //medium cpu
                this.paddleController = new PaddleController_CPU(this, 40); break;
        }

        



        
        
    }

    logicStart () {
        
        this.angle = 0;
        this.velocity = 0;
        this.size = 10;
        
        this.state = 0; //0 = neutral, 1 = falling, 2 = scored, 3 = inactive
        
        this.boostCooldown = 0;
        this.lives = 15;
    }

    logicUpdate () {

        //this.velocity = Math.random(5) - 1;
        this.paddleController.updateInputs();

        this.velocity = Math.max(0, Math.abs(this.velocity) - 0.6) * Math.sign(this.velocity);
        this.velocity =  Math.min(2.5, Math.max(-2.5, this.velocity + 1 * this.paddleController.rightInputMinusLeftInput()));
        
        this.angle = Math.min(30, Math.max(-30, this.angle + this.velocity));

        this.x = Math.sin((this.startAngle + this.angle) * Math.PI / 180) * 50;
        this.y = Math.cos((this.startAngle + this.angle) * Math.PI / 180) * 50;
        this.updateElementPositions();
    }


    updateElementPositions() {
        super.updateElementPositions();
        this.docElementArray.forEach( (element, index) => {
            //console.log(`${element.style.left} | ${element.style.top}`)
            //element.style.rotate = `${ - this.startAngle - this.angle}deg`;
            element.style.transform = `rotateZ(${-this.angle - this.startAngle}deg) translate(-50%, -50%) translateZ(${index*0.5 + 1}vmin)`;
        });
    }

    activatePaddle() {

    }
}
