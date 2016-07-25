"use strict"

/* List for current units in game */
var unitList = [];

/************************** Unit Superclass *********************************/
function unit() {
    // Movement variables
    this.x = 0;  // left point
    this.y = 0;  // top point
    this.speed = 1;  // Unit movement speed [pixels per frame]
    this.waypoint = 1;  // Waypoint 0 is starting location
    
    // Visual properties
    this.color = 'gray';
    this.height = 20;
    this.width = 20;
    
    // Unit health
    this.health = 10;
    this.maxhealth = 10;
}

/************************** Unit Superclass Methods *************************/
/* Movement Function */
unit.prototype.move = function() {
    ManhattanPath(this);  // Use Manhattan Pathing Algorithm
}

/* Rendering Function */
unit.prototype.draw = function() {
    // Calculate unit top-left point
    var Px = this.x - this.width/2;
    var Py = this.y - this.height/2;
    
    //--- Draw unit ---
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(Px, Py, this.width, this.height);
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.strokeRect(Px, Py, this.width, this.height);
    
    //--- Draw health bar ---
    var Hx = Px + 1;  // Health bar left edge
    var Hy = Py + this.width / 3;  // Health bar upper edge
    var Hw = this.width - 2;  // Health bar width
    var Hh = this.height / 3  // Health bar height
    var Hp = this.health / this.maxhealth;  // Health percentage
    
    // Health bar background
    ctx.fillStyle = '#DEDEDE';  // Light Gray
    ctx.fillRect(Hx, Hy, Hw, Hh);
    
    // Health bar contents
    if (Hp > 0.5) {  // Green (>50%) = #7EE319
        ctx.fillStyle = '#7EE319';
    }
    else if (Hp > 0.25) { // Yellow (>25%) = #D4BF24
        ctx.fillStyle = '#D4BF24';
    }
    else { // Red (>0%) = #FF4747
        ctx.fillStyle = '#FF4747';
    }
    ctx.fillRect(Hx, Hy, Hw * Hp, Hh);
    
    // Health bar outline
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.strokeRect(Hx, Hy, Hw, Hh);
}

/*********************** Unit Utility Functions *****************************/
var addUnit = function() {
    // Randomly select a new unit from availible units
    //var newUnit;
    //var newUnitType = Math.floor(Math.random() * unitTypeList.length);
    //newUnit = new unitTypeList[newUnitType]();
    
    var newUnit = new colorBlock(gRed,gGreen,gBlue);
    incrementColor();
    
    // Set initial waypoint
    newUnit.x = waypointList[0].x;
    newUnit.y = waypointList[0].y;
    
    unitList.push(newUnit);  // Add unit to unit list
};

var removeDead = function() {
    // Remove units from end to beginning
    for (var i = unitList.length - 1; i >= 0; i--) {
        if (unitList[i].health <= 0) {  // Unit is dead, remove it
            unitList.splice(i,1);
        }
    }
};

/************************** Unit Subclasses *********************************/
// List of available units
var unitTypeList = [redBlock, greenBlock, blueBlock];

/* Red Block Unit */
function redBlock() {
    unit.call(this);  // Call unit superclass constructor
    // Set Red Block Parameters
    this.color ='red';
    this.health = 1;
    this.speed = 0.8
}
redBlock.prototype = Object.create(unit.prototype);

/* Green Block Unit */
function greenBlock() {
    unit.call(this);  // Call unit superclass constructor
    // Set Green Block Parameters
    this.color = 'green';
    this.speed = 2;
    this.health = 10;
}
greenBlock.prototype = Object.create(unit.prototype);

/* Blue Block Unit */
function blueBlock() {
    unit.call(this);  // Call unit superclass constructor
    // Set Blue Block Parameters
    this.color = 'blue';
    this.health = 4;
}
blueBlock.prototype = Object.create(unit.prototype);

var gRed = 0;
var gGreen = 0;
var gBlue =0;
function incrementColor() {
    gRed++;
    if (gRed > maxPoints) {
        gRed = 0;
        gGreen++;
        if (gGreen > maxPoints) {
            gGreen = 0;
            gBlue++;
            if (gBlue > maxPoints) {
                gBlue = 0;
            }
        }
    }
}

function colorBlock(R,G,B) {
    unit.call(this);  // Call unit superclass constructor
    // Set Color Block Parameters
    this.color = getColor(R,G,B);
    
    // Set block parameters
    var HEALTH_FACTOR = [2, 4, 8];
    var SIZE_FACTOR = [0.8, 1, 1.2];
    var SPEED_FACTOR = [0.8, 1, 1.5];
    
    this.speed = SPEED_FACTOR[G];
    this.health = HEALTH_FACTOR[R];
    this.height = 20 * SIZE_FACTOR[B];
    this.width = this.height;
}
colorBlock.prototype = Object.create(unit.prototype);



