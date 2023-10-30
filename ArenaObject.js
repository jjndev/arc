import { arena } from './arc.js';
export { ArenaObject }

class ArenaObject {
    
    constructor(x, y, arenaArrayGroup, docElementArray) {
        //css
        this.docElementArray = docElementArray;//[ document.createElement("arenaArrayGroup"); ]
        this.arenaArrayGroup = arenaArrayGroup;
        //game variables
        this.x = x;
        this.y = y;
        this.xPrevious = 0;
        this.yPrevious = 0;
        this.opacity = 1;
        //console.log("Ball Super Called");
        //console.log(this);

        //insert this object into the chosen array
        this.arenaArrayGroup.push(this);

        //append elements
        this.initializeElements();
    }

    deleteObject () {
        this.docElementArray.forEach((element) => { 
            if (element != null) element.remove(); 
        } );

        //this.docElementArray.foreach()
        //this.docElement.remove();
        const objectIndex = this.arenaArrayGroup.indexOf(this);
        if (objectIndex > -1) { // only splice array when item is found
            this.arenaArrayGroup.splice(objectIndex, 1); // 2nd parameter means remove one item only
        }
    }

    initializeElements() {
        this.docElementArray.forEach( (element) => {
            arena.docElement.append(element);
        } );
        this.updateElementPositions();
    }

    updateElementPositions() {
        if (this.x === this.xprevious && this.y === this.yprevious) {
            //console.log("position was not updated")
            //return;
        }
        this.docElementArray.forEach( (element) => {
            element.style.left = `${this.x + 50}%`;
            element.style.top = `${this.y + 50}%`;
            element.style.zIndex = `${this.y}`
            element.style.opacity = `${this.opacity}`;
            arena.debugElement.textContent = `${this.x.toFixed(2)}, ${this.y.toFixed(2)}  |  ${element.style.left}`
        } );
        this.xPrevious = this.x;
        this.yPrevious = this.y;
    }
}
