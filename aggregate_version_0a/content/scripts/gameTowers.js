/* Game Towers File */

var towerList = [];

/*****************************************
 * Tower class for creating pew pew towers
 * ***************************************/
function tower(x,y) {
  this.x = x;
  this.y = y;
  this.width = 40;
  this.height = 40;
  this.centerX = (this.x + this.width) / 2;
  this.centerY = (this.y + this.height) / 2;
  this.damage = 2;
  this.rof = 0; 
  this.range = 100;
  this.removeTower = false;  // Set to true have tower removed
  this.target = null;
  
  this.slot1 = {
    color: "gray",
  };
  this.slot2 = {
    color: "gray"
  };
  this.slot3 = {
    color: "gray",
  };
 
  /********************************************
   * Based on the slot number it is passed it 
   * will turn the gem back to its empty state
   * aka the color of the tower behind it
   * ******************************************/
  this.clearGem = function(slotNumber) {
    if(slotNumber == 1) {
      this.slot1.color = "gray";
    }
    
    if(slotNumber == 2) {
      this.slot2.color = "gray";
    }
    
    if(slotNumber == 3) {
      this.slot3.color = "gray";
    }
    
  }
  
  /***********************************************
   * Updates the color of the gem by taking in
   * variables for gemColor (must be a string with
   * quotes around it) and the slotNumber to be 
   * that color
   * *********************************************/
  this.updateGem = function(gemColor, slotNumber) {
    if(slotNumber == 1) {
      this.slot1.color = gemColor;
    }
    
    if(slotNumber == 2) {
      this.slot2.color = gemColor;
    }
    
    if(slotNumber == 3) {
      this.slot3.color = gemColor;
    }
    
  };
  
  /******************************************
   * Draws the tower and gems onto the canvas
   * ****************************************/
  this.draw = function() {
    //The tower image is created below
    ctx.fillStyle="gray";
    ctx.fillRect(this.x, this.y, this.height, this.width);
    
    //These draw the various gems in their slots
    ctx.fillStyle = this.slot1.color;
    ctx.fillRect(this.x + 16, this.y + 9, 10, 10);
    ctx.fillStyle=this.slot2.color;
    ctx.fillRect(this.x + 8, this.y + 22, 10, 10);
    ctx.fillStyle=this.slot3.color;
    ctx.fillRect(this.x + 22, this.y + 22, 10, 10);
  };
  
  /*************************************************
   * Creates laser object and draws a line from the
   * tower to the enemy. It's a work in progress
   * ***********************************************/
  this.fire = function(enemy) { 
    //Need to calculate the distance between enemy and tower and then animate
    var laser1 = new laser();
    
    //while (enemy.health > 0) {
      laser1.updateLaser((this.x * 2.5), (this.y * 2.5), enemy.x, enemy.y);
      laser1.draw(this.rof);
   // }
  };
  
 
  /*************************************************
   * Attacks a unit that is the towers target
   * ***********************************************/
  this.shoot = function(){
    
    //call fire animation
    //this.fire();
    
    //do damage to unit
    this.target.health = this.target.health - this.damage;
    
    //set to 0 for logic loop to know to clean up unit remove from towers target
    if (this.target.health < 0) {
      this.target.health = 0;
      this.target = null;
    }
  };
  
  /*************************************************
   * Has tower target units, calls attack if unit is in range
   * ***********************************************/
  this.attack = function(unitList){
       
    var tower = this;
    //check range of current target first
    if (tower.target != null) {
      var distSq = Math.pow((tower.x - tower.target.x), 2) + Math.pow((tower.y - tower.target.y), 2);
      //if not in range anymore remove target (range less than distance)
      if (Math.pow(tower.range, 2) < distSq){
        tower.target = null;
      }
    }
    
    //if doesnt have a target find one
    if (tower.target == null) {
      for (var i = 0; i < unitList.length; i++){
        //calculate distance from tower x.y to unit x.y
        distSq = Math.pow((tower.x - unitList[i].x), 2) + Math.pow((tower.y - unitList[i].y), 2);
        //check if within tower range
        if (Math.pow(tower.range, 2) > distSq){
          //set the unit as the towers target
          tower.target = unitList[i];
          break;
        }
      }
    }
    
    //if the unit was in range, or found a new target shoot
    if (tower.target != null){
      tower.shoot();
    }
  };
  
}

/***************************************************************************
* Places a tower at specified x, y. Takes in (x,y) coordinates and adds
* to tower list
* *************************************************************************/
var placeTower = function(x, y) {
    var newTower;
    newTower = new tower(x, y);  // Create new tower @ (x,y)
    towerList.push(newTower);  // Add new tower to tower list
};

/***************************************************************************
* Removes this tower from tower list
* << NEEDS TO BE UPDATED BASED ON RESOURCE REFUND >>
* *************************************************************************/
var removeTowers = function() {
     for (var i = towerList.length - 1; i >= 0; i--) {
         if (towerList[i].removeTower) {
             towerList.splice(i,1);
         }
     }
};

/********************************************
 * Laser class for creating pew pew graphics
 * *****************************************/
 function laser() {
   this.x1 = 0;
   this.y1 = 0;
   this.x2 = 0;
   this.y2 = 0;
   
   this.updateLaser = function(x1, y1, x2, y2) {
     this.x1 = x1;
     this.y1 = y1;
     this.x2 = x2;
     this.y2 = y2;
   };
   
   this.draw = function(speed) {
     ctx.strokeStyle = "red";
     ctx.moveTo(this.x1, this.y1);
     ctx.lineTo(this.x1 + (this.x2 - this.x1) * speed, this.y1 + (this.y2 - this.y1) * speed);
     ctx.stroke();
   };
 }