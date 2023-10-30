//let arena = 

/*

class Ball {

    constructor(x, y, ballType) {
        //css
        this.docElement = document.createElement("div");
        this.docElement.className = "ball";

        //attach to arena
        arena.docElement.appendChild(this.docElement);
        arena.ballArray.push(this);

        //game variables
        this.x = x;
        this.y = y;
        this.ballType = ballType; //0 = normal
        this.state = 0; //0 = neutral, 1 = falling, 2 = scored, 3 = inactive
        this.state_timer = 0;
    }

    
    
    
    function deleteObject () {
        this.docElement.remove();
        const objectIndex = playerArray.indexOf(5);
        if (index > -1) { // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
}
    }

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