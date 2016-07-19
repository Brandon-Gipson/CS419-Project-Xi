/* Game Unit File */

var unitList = [];

function unit(x,y) {
    this.x = x;
    this.y = y;
    this.speed = 10
    //this.color = 'blue';  // Only needed for blue block
    //this.size = 20;  // Only needed for blue block
    this.image = new Image();  // Image for particular unit
    this.health = 10;
    this.waypoint = 1;  // Waypoint 0 is starting location
    
    /* Draw function */
    this.draw = function() {
        // Drawing for a blue block
        //ctx.beginPath();
        //ctx.fillStyle = this.color;
        //ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.drawImage(this.image, this.x - 12, this.y - 13, 25, 27);
    };
    
    /* Move function */
    this.move = function() {
        ManhattanPath(this); /* New Waypoint Implementation */
    };
    
    /* Set unit image */
    this.setImage = function(color) {
        if (color == "red") {
            this.image.src = "./content/images/enemyAssets/RedMage.png";
        }
        if (color == "green") {
            this.image.src = "./content/images/enemyAssets/GreenMage.png";
        }
        if (color == "blue") {
            this.image.src = "./content/images/enemyAssets/BlueMage.png";
        }
    }
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
            if (unitList[i].health == -1) {  // Unit escaped, reduce hearts
                hearts.current -= 0.5;
            }
            unitList.splice(i,1);
        }
    }
};