/*****************************************************************************
*			         CS 419 - Software Projects
*				 Oregon State University - Summer 2016
*     	           WEB 1: Real-Time Strategy Game
*
* Project Team: Xi
* Members: Brandon Gipson, Tom Dale, James Pool
*
* Filename: gameTowers.js
* Version: 0b
* Description: Tower defense tower class and associated functions
*
*****************************************************************************/

/* List for current units in game */
var towerList = [];

/************************* Tower Superclass *********************************/
function tower(x,y) {
    // Placement variables
    this.x = x; // left point
    this.y = y;  // top point
    this.cost = 1;
    
    // Visual Properties
    this.towerColor = 'gray';
    this.width = 40;
    this.height = 40;
    this.centerX = this.x + (this.width / 2);
    this.centerY = this.y + (this.height / 2);
    this.clicked = false;
    
    // Tower Attack Attributes
    this.laserColor = 'gray';
    this.laserWidth = 1;
    this.damage = 1;
    this.fireRateMax = 5;      //value you trigger when tower shoots
    this.fireRateCount = 0;    //counter used to know when to fire
    this.range = 100;
    this.removeTower = false;  // Set to true have tower removed
    this.target = [null, null, null, null];
    this.maxTargets = 1;
    
    //Gem Properties
    this.redCount = 0;
    this.blueCount = 0;
    this.greenCount = 0;
    this.gemCount = 0;
    
  
    // Tower Upgrade Gems
    this.slot1 = {
        color: "gray",
    };
    this.slot2 = {
        color: "gray"
    };
    this.slot3 = {
        color: "gray",
    };
}

/************************* Tower Superclass Methods *************************/
/* Clear designated gem slot (set to gray) */
tower.prototype.clearGem = function(slotNumber) {
    if(slotNumber == 1) {
        this.slot1.color = "gray";
    }
    
    if(slotNumber == 2) {
        this.slot2.color = "gray";
    }
    
    if(slotNumber == 3) {
        this.slot3.color = "gray";
    }
    
    this.gemCount--;
    var tower = this;
    modifyTower(tower);
};

/* Set designated gem slot (gemColor is a string) */
tower.prototype.updateGem = function(gemColor, slotNumber) {
    if(slotNumber == 1) {
        this.slot1.color = gemColor;
    }
    
    if(slotNumber == 2) {
        this.slot2.color = gemColor;
    }
    
    if(slotNumber == 3) {
        this.slot3.color = gemColor;
    }
    
    this.gemCount++;
    var tower = this;
    modifyTower(tower);
    
};

/* Helper function to modify color counts */
tower.prototype.checkColors = function() {
    
    //reset colors
    tempRedCount = 0;
    tempBlueCount = 0;
    tempGreenCount = 0;
    
    //slot 1
    if (this.slot1.color == 'red') {
        tempRedCount += 1;
    }
    else if (this.slot1.color == 'green') {
        tempGreenCount += 1;
    }
    else if (this.slot1.color == 'blue') {
        tempBlueCount += 1;
    }
    
    //slot 2
    if (this.slot2.color == 'red') {
        tempRedCount += 1;
    }
    else if (this.slot2.color == 'green') {
        tempGreenCount += 1;
    }
    else if (this.slot2.color == 'blue') {
        tempBlueCount += 1;
    }
    
    //slot 3
    if (this.slot3.color == 'red') {
        tempRedCount += 1;
    }
    else if (this.slot3.color == 'green') {
        tempGreenCount += 1;
    }
    else if (this.slot3.color == 'blue') {
        tempBlueCount += 1;
    }
    
    this.redCount = tempRedCount;
    this.greenCount = tempGreenCount;
    this.blueCount = tempBlueCount;
};


/* Rendering Function: Draws the tower and gems onto the canvas */
tower.prototype.draw = function() {
    //The tower image is created below
    ctx.fillStyle=this.towerColor;
    ctx.fillRect(this.x, this.y, this.height, this.width);
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.height, this.width);
    
};

/* Rendering Function: Draws the tower's menu */
tower.prototype.drawMenu = function() {
    var xOffset = this.x - 10;
    var yOffset = this.y - 10;
    var widthOffset = this.width + 35;
    var heightOffset = this.height + 125;
    
    if ((xOffset + widthOffset) > game_field.width) {
        xOffset -= widthOffset;
    } 
    
    if ((yOffset + heightOffset) > game_field.height) {
        yOffset -= heightOffset;
    } 
    
    //draws the menu background
    ctx.fillStyle = "#e4d2ba";
    ctx.fillRect(xOffset, yOffset, widthOffset, heightOffset);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(xOffset, yOffset, widthOffset, heightOffset);
    
    //Basic stats
    ctx.fillStyle = "black";
    ctx.textAlgn = "left";
    ctx.textBaseline = "center";
    ctx.font = "Bold 11px Arial";
    ctx.fillText("Stats:", xOffset + 5, yOffset + 5);
    ctx.font = "Bold 8px Arial";
    ctx.fillText("Range - " + this.range, xOffset + 8, yOffset + 20);
    ctx.fillText("DPS - " + this.damage, xOffset + 8, yOffset + 30);
    
    //Gem slots. The word color changes to match the gem
    ctx.font = "Bold 11px Arial";
    ctx.fillText("Gems:", xOffset + 5, yOffset + 50);
    
    ctx.font = "Bold 8px Arial";
    ctx.fillStyle = this.slot1.color;
    if(this.slot1.color == "gray") {
        ctx.fillText("none", xOffset + 8, yOffset + 65);
    }
    else {
       ctx.fillText(this.slot1.color, xOffset + 8, yOffset + 65); 
    }
    
    ctx.fillStyle = this.slot2.color;
    if(this.slot2.color == "gray") {
        ctx.fillText("none", xOffset + 8, yOffset + 75);
    }
    else {
       ctx.fillText(this.slot2.color, xOffset + 8, yOffset + 75); 
    }
    
    ctx.fillStyle = this.slot3.color;
    if(this.slot3.color == "gray") {
        ctx.fillText("none", xOffset + 8, yOffset + 85);
    }
    else {
       ctx.fillText(this.slot3.color, xOffset + 8, yOffset + 85); 
    }
    
    //Bonuses give by gems
    ctx.fillStyle = "black";
    ctx.font = "Bold 11px Arial";
    ctx.fillText("Bonuses:", xOffset + 5, yOffset + 100);
    ctx.font = "Bold 8px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("+" + this.redCount + " damage", xOffset + 8, yOffset + 115);
    ctx.fillStyle = "blue";
    ctx.fillText("+" + this.blueCount + " targets", xOffset + 8, yOffset + 130);
    ctx.fillStyle = "green";
    ctx.fillText("+" + this.greenCount + " range", xOffset + 8, yOffset + 145);
    
}
  
/* Rendering Function: Draws the laser from tower to the enemy */
tower.prototype.drawLaser = function(j) {
    ctx.beginPath();
    ctx.moveTo(this.centerX, this.centerY);
    ctx.lineTo(this.target[j].x, this.target[j].y);
    ctx.strokeStyle = this.laserColor;
    ctx.lineWidth = this.laserWidth;
    ctx.stroke();
};
  
/* Logic Function: Deals damage to a targeted unit */
tower.prototype.shoot = function(x){
    //do damage to unit
    //calc damage based on units resistance
    //console.log("Shooting at target: " + x);
    //console.log("Target " + x + ": " + this.target[x].red);
    
    this.target[x].health = this.target[x].health - this.damage;
    
    //set to 0 for logic loop to know to clean up unit remove from towers target
    if (this.target[x].health <= 0) {
        this.target[x].health = 0;
        
        //set target back to null so attack function knows to find new target
        this.target[x] = null;
    }
};
  
/* Logic Function: Target unit and attack if unit is in range */
tower.prototype.attack = function(unitList){
    var tower = this;
    //check range of current target first
    
    //check if even fires based on rate of fire before runs any code
    //if count less than max increment
    if (tower.fireRateCount < tower.fireRateMax) {
        tower.fireRateCount++;
    }
    
    //check if in range then shoot
    else {
        
        //run for max number of targets
        for(var j = 0; j < tower.maxTargets; j++) {
            //check if current target is in range still
            if (tower.target[j] != null) {
                var distSq = Math.pow((tower.x - tower.target[j].x), 2) + Math.pow((tower.y - tower.target[j].y), 2);
                //if not in range anymore remove target (range less than distance)
                if (Math.pow(tower.range, 2) < distSq){
                    tower.target[j] = null;
                }
            }
        
            //if doesnt have a target find one
            if (tower.target[j] == null) {
                for (var i = 0; i < unitList.length; i++){
                    //calculate distance from tower x.y to unit x.y
                    distSq = Math.pow((tower.x - unitList[i].x), 2) + Math.pow((tower.y - unitList[i].y), 2);
                    //check if within tower range
                    if (Math.pow(tower.range, 2) > distSq){
                        //make sure not already targeted by this tower
                        var canTarget = true; //bool used to know if we can target this mob
                        for (var k = 0; k < tower.maxTargets; k++) {
                            //look through current targets make sure this unit is already targeted
                            if (unitList[i] == tower.target[k]){
                                canTarget = false;
                            }
                        }
                        
                        //if eligible target set it, else continue looping for new target
                        if(canTarget ==  true) {
                            //set the unit as the towers target
                            tower.target[j] = unitList[i];
                            break;
                        }
                    }
                }
            }
            
            //if the unit was in range, or found a new target shoot
            //if it shoots at least once reset fire count
            if (tower.target[j] != null){
                tower.fireRateCount = 0;
                tower.shoot(j); //pass in what target its shooting
            }
        }
    }
};

/********************** Tower Utility Functions *****************************/
/* Places a tower at specified (x, y) and adds to tower list */
var placeTower = function(x, y, type) {
    var newTower;
    type = type || 0;  // If no type is provided, default to 0
    newTower = new towerTypeList[type](x,y);  // Create new tower of base type
    towerList.push(newTower);  // Add new tower to tower list
    coins.amount -= newTower.cost;  // Subtract tower cost
};

/* Removes a tower and refunds some resources [NEED TO DO] */
var removeTowers = function() {
     for (var i = towerList.length - 1; i >= 0; i--) {
         if (towerList[i].removeTower) {
             towerList.splice(i,1);
         }
     }
};

/************************* Tower Subclasses *********************************/
// List of available towers
var towerTypeList = [baseTower];

/* Base Tower */
function baseTower(x,y) {
    tower.call(this, x, y);  // Call tower superclass constructor
    this.towerColor = 'gray';
    this.laserColor = getColor(0,0,0);
    this.damage = 10;
    this.cost = 100;
    
    
    //set to a blue tower for testing
    this.updateGem('blue', 1);
    
}
baseTower.prototype = Object.create(tower.prototype);

/* Function that modiffies the tower parameters when gems are added or removed */
function modifyTower(tower){
    
    //update towers colors
    tower.checkColors();
    
    //set of factors gems control
    var DAMAGE_FACTOR = [1, 1.5, 2, 2.5];
    var RANGE_FACTOR = [1, 2, 3, 4];
    var TARGET_FACTOR = [0, 1, 2, 3];
    var TOWER_LEVEL = [1, 2, 4, 8];
    
    // Tower Attack Attributes
    tower.laserColor = getColor(tower.redCount * 3,tower.greenCount * 3, tower.blueCount * 3);
    
    //modify damage by tower level and gem
    tower.damage =((10 * TOWER_LEVEL[tower.gemCount]) * DAMAGE_FACTOR[tower.redCount]);
    
    //modify by gem
    tower.range = 100 * RANGE_FACTOR[tower.greenCount];
    
    //modify max targets by gem
    tower.maxTargets = 1 + TARGET_FACTOR[tower.blueCount];
}