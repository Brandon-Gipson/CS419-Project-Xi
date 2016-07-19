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
          ctx.drawImage(fullHeartImage, (this.x + i), this.y, 55, 50);
          i += 40;
        }
      }
      
      if (heartsToDisplay < this.max && this.current == Math.floor(this.current)) {
        i = 0;
        for(j = 0; j < heartsToDisplay; j++) {
          ctx.drawImage(fullHeartImage, (this.x + i), this.y, 55, 50);
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
          ctx.drawImage(fullHeartImage, (this.x + i), this.y, 55, 50);
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