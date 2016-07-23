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
      var fullHeartReady = false; //these need impelementation later to help
      var halfHeartReady = false;// prevent DOM errors
      var emptyHeartReady = false;
      
      var fullHeartImage = new Image();
      var halfHeartImage = new Image();
      var emptyHeartImage = new Image();
      
      fullHeartImage.onload = function () {
          fullHeartReady = true;
      };
      halfHeartImage.onload = function () {
          fullHeartReady = true;
      };
      emptyHeartImage.onload = function () {
          fullHeartReady = true;
      };
      
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
  
  update: function(i) {
    this.amount = i;
  },
  
  draw: function() {
    var coinsReady = false; //Needs to be implemented later to prevent DOM errors
    var coinsImage = new Image();
    
    coinsImage.onload = function () {
      coinsReady = true;
    };
    coinsImage.src = "./content/images/resourceAssets/coins.png";
    
    ctx.drawImage(coinsImage, 900, 10, 55, 50);
    ctx.fillStyle = "gold";
    ctx.font = "Bold 48px Arial"; //Would like to get a arcade font for this
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
    ctx.lineWidth = '1';
    ctx.strokeStyle = 'black';
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
  }
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
     width: 180,
     height: 380
   },
   
  upperMidSec = {
    x: 180,
    y: 0,
    width: 770,
    height: 80
  },
  
  upperRightSec = {
    x: 1090,
    y: 0,
    width: 170,
    height: 380
  },
   
  bottomLeftSec = {
    x: 0,
    y: 610,
    width: 330,
    height: 80
  },
   
  // bottomMidSec = {
  //   x: 340,
  //   y: 580,
  //   width: 200,
  //   height: 380
  // },
   
  bottomRightSec = {
    x: 1100,
    y: 580,
    width: 330,
    height: 80
  },
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
    height: 7
  },
  
  pathPart2 = {
    x: 1100,
    y: 580,
    width: 330,
    height: 80
  },
  
  pathPart3 = {
    x: 220,
    y: 130,
    width: 770,
    height: 7
  },
  
  pathPart4 = {
    x: 1100,
    y: 580,
    width: 330,
    height: 80
  },
  
  pathPart5 = {
    x: 1100,
    y: 580,
    width: 290,
    height: 7
  }
];