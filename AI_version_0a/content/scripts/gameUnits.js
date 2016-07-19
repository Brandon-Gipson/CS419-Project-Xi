"use strict"

var unitList = [];

function unit(x,y) {
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.color = 'blue';
    this.size = 20;
    this.health = 1;
    this.waypoint = 1;  // Waypoint 0 is starting location
    
    /* Draw function */
    this.draw = function() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
    };
    
    /* Move function (temporary) */
    this.move = function() {
        /* New Waypoint Implementation */
        ManhattanPath(this);
    };
}

var addUnit = function() {
    var newUnit;
    newUnit = new unit(waypointList[0].x,waypointList[0].y);  // Create new unit
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