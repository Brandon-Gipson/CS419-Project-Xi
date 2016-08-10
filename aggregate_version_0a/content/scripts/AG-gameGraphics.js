/*****************************************************************************
*			         CS 419 - Software Projects
*				 Oregon State University - Summer 2016
*     	           WEB 1: Real-Time Strategy Game
*
* Project Team: Xi
* Members: Brandon Gipson, Tom Dale, James Pool
*
* Filename: gameGraphics.js
* Version: -
* Description: Tower defense graphics: hearts and coins
*
*****************************************************************************/

/***********************************
 * Hearts object for life tracking 
 * *********************************/
var hearts = {
  x: 10,
  y: 10,
  max: 5,
  current: 5,
  updateMax: function(max) {
    this.max = max;  
  },
  updateCurrent: function(current) {
      this.current = current;
  },
  draw: function() {
      var fullHeartImage = new Image();
      var halfHeartImage = new Image();
      var emptyHeartImage = new Image();
      
      fullHeartImage.src = "./content/images/resourceAssets/heartAssets/FullHeart.png";
      halfHeartImage.src = "./content/images/resourceAssets/heartAssets/HalfHeart.png";
      emptyHeartImage.src = "./content/images/resourceAssets/heartAssets/EmptyHeart.png";
      
      var heartsToDisplay = this.max - (this.max - this.current);
      
      if (this.current == this.max) {
        var i = 0;
        for(var j = 0; j < heartsToDisplay; j++) {
          ctx.drawImage(fullHeartImage, (this.x + i), this.y, 57, 50);
          i += 40;
        }
      }
      
      if (heartsToDisplay < this.max && this.current == Math.floor(this.current)) {
        i = 0;
        for(j = 0; j < heartsToDisplay; j++) {
          ctx.drawImage(fullHeartImage, (this.x + i), this.y, 57, 50);
          i += 40;
        }
        
        for(j = 0; j < (this.max - this.current); j++) {
          ctx.drawImage(emptyHeartImage, (this.x + i), this.y, 55, 50);
          i += 40;
        }
      }
      
      if (this.current != Math.floor(this.current)) {
        i = 0;
        for(j = 1; j < heartsToDisplay; j++) {
          ctx.drawImage(fullHeartImage, (this.x + i), this.y, 57, 50);
          i += 40;
        }
        
        ctx.drawImage(halfHeartImage, (this.x + i), this.y, 50, 50);
        i += 40;
        
        for(j = 0; j < (this.max - (this.current + 1)); j++) {
          ctx.drawImage(emptyHeartImage, (this.x + i), this.y, 55, 50);
          i += 40;
        }
      }
  }
};


/**************************************************
 * Coins object for money tracking and displaying 
 * ************************************************/
var coins = {
  x: 900,
  y: 10,
  amount: 0,
  flash: false,
  
  update: function(i) {
    this.amount = i;
  },
  
  draw: function(color) {
    var coinsImage = new Image();
    coinsImage.src = "./content/images/resourceAssets/coins.png";
    
    ctx.drawImage(coinsImage, this.x, this.y, 55, 50);
    ctx.fillStyle = color;
    ctx.font = "Bold 48px Arial"; 
    ctx.textAlgn = "left";
    ctx.textBaseline = "top";
    ctx.fillText(this.amount, this.x + 110, this.y);
  }
};

/******************************************
 * A button that toggles to let you place 
 * a tower on the map
 * **************************************/
var newTowerButton = {
  press: false,
  width: 20,
  height: 20,
  x: 30,
  y: 575,
  
  drawOutline: function() {
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  },
  
  draw: function() {
    ctx.fillStyle="gray";
    ctx.fillRect(this.x, this.y, this.height, this.width);
    ctx.fillStyle = "gold";
    ctx.font = "Bold 20px Arial";
    ctx.textAlgn = "left";
    ctx.textBaseline = "top";
    ctx.fillText("T", this.x + 9, this.y);
    
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
};

/******************************************
 * A button that toggles to let you place 
 * a gem in a tower
 * **************************************/
var redGemButton = {
  press: false,
  width: 20,
  height: 20,
  x: 55,
  y: 575,
  
  drawOutline: function() {
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  },
  
  draw: function() {
    ctx.fillStyle="red";
    ctx.fillRect(this.x, this.y, this.height, this.width);
    
    ctx.fillStyle = "gold";
    ctx.font = "Bold 20px Arial";
    ctx.textAlgn = "left";
    ctx.textBaseline = "top";
    ctx.fillText("G", this.x + 10, this.y);
    
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
};

/******************************************
 * A button that toggles to let you place 
 * a gem in a tower
 * **************************************/
var blueGemButton = {
  press: false,
  width: 20,
  height: 20,
  x: 80,
  y: 575,
  
  drawOutline: function() {
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  },
  
  draw: function() {
    ctx.fillStyle="blue";
    ctx.fillRect(this.x, this.y, this.height, this.width);
    
    ctx.fillStyle = "gold";
    ctx.font = "Bold 20px Arial";
    ctx.textAlgn = "left";
    ctx.textBaseline = "top";
    ctx.fillText("G", this.x + 10, this.y);
    
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
};

/******************************************
 * A button that toggles to let you place 
 * a gem in a tower
 * **************************************/
var greenGemButton = {
  press: false,
  width: 20,
  height: 20,
  x: 105,
  y: 575,
  
  drawOutline: function() {
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  },
  
  draw: function() {
    ctx.fillStyle="green";
    ctx.fillRect(this.x, this.y, this.height, this.width);
    
    ctx.fillStyle = "gold";
    ctx.font = "Bold 20px Arial";
    ctx.textAlgn = "left";
    ctx.textBaseline = "top";
    ctx.fillText("G", this.x + 10, this.y);
    
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
};

/******************************************
 * An object to draw bounds outline around
 * mouse for tower placement
 * ***************************************/
var mouseOutline = {
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    color: "red",
   
    drawOutline: function() {
        ctx.lineWidth = '3';
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x, this.y, this.width, this.height); 
    },
 };
 
/***************************** Game Boundries ********************************/

/*****************************************************************************
 * An object that contains coordinates for the game's map boundaries for the
 * purpose of tower placing retrictions.
 * **************************************************************************/
var mapBoundaryList = [
    upperLeftBorder = { x: 0, y: 0, width: 10, height: 360 },
    upperLeftHearts = { x: 0, y: 0, width: 220, height: 60 },
    upperLeftTree = { x: 0, y: 170, width: 110, height: 90 },
    upperLeftNP = { x: -100, y: 360, width: 110, height: 60 },
    upperMidSec = { x: 160, y: 0, width: 810, height: 10 },
    upperRightGold = { x: 902, y: 0, width: 220, height: 60 },
    upperRightTree = { x: 995, y: 250, width: 130, height: 80 },
    upperRightNP = { x: 1110, y: 0, width: 100, height: 420 },
    bottomLeftByButtons = { x: 0, y: 573, width: 140, height: 50 },
    bottomLeftSec = { x: 140, y: 600, width: 220, height: 10 },
    bottomLeftNP = { x: -100, y: 490, width: 110, height: 100 },
    bottomMidSec = { x: 360, y: 300, width: 390, height: 360 },
    bottomRightSec = { x: 750, y: 600, width: 370, height: 10 },
    bottomRightNP = { x: 1110, y: 490, width: 100, height: 110 }
];

/*****************************************************************************
 * An object that contains coordinates for the game's path boundaries for the
 * purpose of tower placing retrictions.
 * **************************************************************************/
var pathBoundaryList = [
    pathPart1 = { x: 0, y: 420, width: 290, height: 70 },
    pathPart2 = { x: 220, y: 127, width: 70, height: 300 },
    pathPart3 = { x: 220, y: 120, width: 690, height: 70 },
    pathPart4 = { x: 840, y: 127, width: 70, height: 300 },
    pathPart5 = { x: 840, y: 420, width: 270, height: 70 }
];

/*****************************************************************************
 * Draws the speficied boundry
 * **************************************************************************/
function drawBoundry(context, bList) {
    for (var i in bList) {
        //context.fillStyle = "red";
        context.fillStyle = "rgba(255, 0, 0, 0.5)";  // RED w/ 50% opacity
        context.fillRect(bList[i].x, bList[i].y, bList[i].width, bList[i].height);
    }
}