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
  max: 4,
  current: 4,
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
  
  amount: 0,
  flash: false,
  
  update: function(i) {
    this.amount = i;
  },
  
  draw: function(color) {
    var coinsImage = new Image();
    coinsImage.src = "./content/images/resourceAssets/coins.png";
    
    ctx.drawImage(coinsImage, 900, 10, 55, 50);
    ctx.fillStyle = color;
    ctx.font = "Bold 48px Arial"; 
    ctx.textAlgn = "left";
    ctx.textBaseline = "top";
    ctx.fillText(this.amount, 970, 10);
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
    ctx.fillText("T", 33, 575);
    
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
    ctx.fillText("G", 58, 575);
    
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
    ctx.fillText("G", 83, 575);
    
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
    ctx.fillText("G", 108, 575);
    
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

/***************************************
 * An object that contains coordinates
 * for the game map's boundaries for the
 * purpose of tower placing retrictions
 * **************************************/
var mapBoundaryList = [
 
upperLeftSec = {
    x: 0,
    y: 0,
    width: 160,
    height: 360
  },
  
  upperLeftNP = {
    x: -100,
    y: 360,
    width: 110,
    height: 60
  },
   
  upperMidSec = {
    x: 160,
    y: 0,
    width: 810,
    height: 60
  },
  
  upperRightSec = {
    x: 970,
    y: 0,
    width: 150,
    height: 360
  },
  
  upperRightNP = {
    x: 1110,
    y: 360,
    width: 100,
    height: 60
  },
   
  bottomLeftSec = {
    x: 0,
    y: 550,
    width: 350,
    height: 60
  },
  
  bottomLeftNP = {
    x: -100,
    y: 490,
    width: 110,
    height: 60
  },
   
  bottomMidSec = {
    x: 350,
    y: 250,
    width: 430,
    height: 360
  },
   
  bottomRightSec = {
    x: 780,
    y: 550,
    width: 350,
    height: 60
  },
  
  bottomRightNP = {
    x: 1110,
    y: 490,
    width: 100,
    height: 60
  }
];

/**************************************
 * An object that contains coordinates
 * for the game map's boundaries for the
 * purpose of tower placing retrictions
 * **************************************/
var pathBoundaryList = [
  pathPart1 = {
    x: 0,
    y: 420,
    width: 290,
    height: 70
  },
  
  pathPart2 = {
    x: 220,
    y: 127,
    width: 70,
    height: 300
  },
  
  pathPart3 = {
    x: 220,
    y: 120,
    width: 690,
    height: 70
  },
  
  pathPart4 = {
    x: 840,
    y: 127,
    width: 70,
    height: 300
  },
  
  pathPart5 = {
    x: 840,
    y: 420,
    width: 270,
    height: 70
  }
];