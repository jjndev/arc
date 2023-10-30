export class Utility {
    static pointDistance (x1, y1, x2, y2) {
        //returns the distance between two points
        return Math.sqrt( (Math.pow(x1 - x2, 2)) + (Math.pow(y1 - y2 , 2)) );
    }

    static getCurrentQuadrant () {
        let angleFromCenter = Math.atan2(-this.y, this.x); // range (-PI, PI]
        angleFromCenter *= 180 / Math.PI; // rads to degs, range (-180, 180]

        if (angleFromCenter < -135) return 3;
        if (angleFromCenter < -45) return 0;
        if (angleFromCenter < 45) return 1;
        if (angleFromCenter < 135) return 2;
        return 3;
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
    }

    static getDistanceFromCenter () {
        return Math.sqrt( (Math.pow(this.x, 2)) + (Math.pow(this.y , 2)) );
    }

    static angleDifference (angle1, angle2) {
        return Math.abs(angle1 - angle2);
    }

    static signedAngleDifference(angle1, angle2) {
        return ((((angle1 - angle2) % 360) + 540) % 360) - 180;
    }



    static getAngleOfCircleIntercept() {
        // Center of the circle
        const centerX = 0; // Replace with your actual center coordinates
        const centerY = 0;

        // Current position of the object
        const objectX = 3; // Replace with your actual object coordinates
        const objectY = 4;

        // Circle's radius
        const radius = 5; // Replace with your actual radius

        // Calculate the vector from the center to the object
        const dx = objectX - centerX;
        const dy = objectY - centerY;

        // Calculate the length of the vector
        const length = Math.sqrt(dx * dx + dy * dy);

        // Normalize the vector
        const unitX = dx / length;
        const unitY = dy / length;

        // Calculate the intersection point coordinates
        const intersectionX = centerX + unitX * radius;
        const intersectionY = centerY + unitY * radius;

        // Calculate the angle in radians
        const angleRadians = Math.atan2(intersectionY - centerY, intersectionX - centerX);

        // Convert to degrees
        const angleDegrees = angleRadians * (180 / Math.PI);

        console.log("Angle in radians: " + angleRadians);
        console.log("Angle in degrees: " + angleDegrees);
    }
}