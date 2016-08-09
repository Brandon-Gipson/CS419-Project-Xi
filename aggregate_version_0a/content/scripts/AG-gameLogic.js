/*****************************************************************************
*			         CS 419 - Software Projects
*				 Oregon State University - Summer 2016
*     	           WEB 1: Real-Time Strategy Game
*
* Project Team: Xi
* Members: Brandon Gipson, Tom Dale, James Pool
*
* Filename: gameLogic.js
* Version: -
* Description: Tower defense game logic loops
*
*****************************************************************************/

var game_field = document.getElementById('game_field');
var ctx = game_field.getContext('2d');
ctx.shadowBlur = "black";
ctx.shadowBlur = 20;
var frameRate = 60;
var unitDelay = 25;  // Unit Delay <<TEST>>
var unitDelayMax = 25;
var counter = 2*frameRate;
var coinCounter = frameRate/3;
var alpha = 1.0;

var waveDelay = 25;
var waveDelayMax = 25;
var runWave = false;
var waveCountDown = 10;
var gameOver = false;
var gameWon = false;


//Background music control variables
var bgm = document.getElementById('bgm');
bgm.volume = 0.5; //was 0.35
var buttonClick = document.getElementById('buttonclick');
buttonClick.volume = 0.45;

var rightClick = document.getElementById('rightClick');
rightClick.volume = 0.45;

var placementThud = document.getElementById('placeTower');

var laserSound = document.getElementById('pewpew');
laserSound.volume = 0.25;

var noCoins = document.getElementById('noCoins');

var coinDing = document.getElementById('coins');
coinDing.volume = 0.25;

var heartLoss = document.getElementById('heartLoss');
heartLoss.volume = 0.50;

var gameOverSound = document.getElementById('gameOver');
gameOverSound.volume = 0.20;

var gameWinSound = document.getElementById('gameWin');
gameWinSound.volume = 0.20;

var renderLoop = function() {
    // Draw Health
    hearts.draw();
    
    if(gameWon) {
        wave_banner.drawGameWon();
        return; //Stop game
    }
    
    if (gameOver) {
        wave_banner.drawGameOver();
        return;  // Stop game
    }
    
    ctx.beginPath();
    ctx.clearRect(0,0,game_field.width,game_field.height);  //Clear game field+
    //Test to draw tower placing toggle
    newTowerButton.draw();
    
    //--- Draw Gem buttons ---
    redGemButton.draw();
    blueGemButton.draw();
    greenGemButton.draw();
    // Draw Health
    hearts.draw();
    
    //--- Draw Coins ---
    if (coins.flash) {
        coinCounter--;
        coins.draw("red");
        if(coinCounter <= 0) {
            coins.flash = false;
            coinCounter = frameRate/3;
        }
    }
    else {
        coins.draw("gold");
    }
  
    //--- Draw Wave Banner ---
    wave_banner.draw();
  
    //--- Draw Units ---
    for (var i = 0; i < unitList.length; i++) {
        unitList[i].draw();
    }
    // Draw Towers
    for (var i = 0; i < towerList.length; i++) {
        towerList[i].draw();
        
        //Draw the cost of the tower and have it fade
        if(towerList[i].justPlaced) {
            counter--;
            towerList[i].drawCost(alpha);
            alpha -= 0.025;
            
            if(counter == 0) {
                towerList[i].justPlaced = false;
                counter = 2*frameRate;
                alpha = 1.0;
            }
        }
        
        //Draw the cost of the gem and have it fade
        if(towerList[i].gemJustPlaced) {
            counter--;
            towerList[i].drawGemCost(alpha);
            alpha -= 0.025;
            
            if(counter == 0) {
                towerList[i].gemJustPlaced = false;
                counter = 2*frameRate;
                alpha = 1.0;
            }
        }
        
        // Fire Laser!
        for (var j = 0; j < towerList[i].maxTargets; j++) {
            if (towerList[i].target[j] != null) {
                towerList[i].drawLaser(j);
            }
        }
        // Draw turret
        towerList[i].drawTurret();
    }
    
    //Draw outline for tower button press
    if(newTowerButton.press) {
        newTowerButton.drawOutline();
        mouseOutline.drawOutline();
    }
    
    //Draw outline for green button press
    if(greenGemButton.press) {
        greenGemButton.drawOutline();
    }
    
    //Draw outline for blue button press
    if(blueGemButton.press) {
        blueGemButton.drawOutline();
    }
    
    //Draw outline for red button press
    if(redGemButton.press) {
        redGemButton.drawOutline();
    }
    
    //Draw menu for towers
    for(i in towerList) {
        if(towerList[i].clicked == true) {
            towerList[i].drawMenu();
            towerList[i].drawOutline();
        }
    }
    
    //Makes boundaries visible in red
    // for (i in mapBoundaryList) {
    //     ctx.fillStyle = "red";
    //     ctx.fillRect(mapBoundaryList[i].x, mapBoundaryList[i].y, mapBoundaryList[i].width, mapBoundaryList[i].height);
    // }
    
    //Makes path boundaries visible in red
    // for (i in pathBoundaryList) {
    //     ctx.fillStyle = "red";
    //     ctx.fillRect(pathBoundaryList[i].x, pathBoundaryList[i].y, pathBoundaryList[i].width, pathBoundaryList[i].height);
    // }
    
    requestAnimationFrame(renderLoop);  // Loop graphics rendering
};

var logicLoop = function() {

    if (gameWon) {
        return; // Stop game
    }
    
    if (gameOver) {
        return;  // Stop game    
    }

    if  (runWave) {
    	if (unitDelay < 0) { 
	    	spawnUnit(curWave);  // Spawn next unit
	    	unitDelay = unitDelayMax;  // Reset unit Delay
	    	console.log(waveUnits.length);
	    	console.log(waveUnits);
	    	if (curWave.unitCount <= 0) {
	    	    if ((curWave.waveNumber + 1) >= waveUnits.length) { // End of Game
	    	        gameOver = true;  // Set game over flag
	    	    }
	    	    else {
		    	    curWave = createWave(curWave.waveNumber + 1);  // Next wave
		    	    wave_banner.currentWave = curWave.waveNumber + 1;  // Set banner wave number (+1 for 0 indexing)
		    	    runWave = false;  // Pause for next wave
	    		    waveCountDown = 10;  // Set counddown timer
	    		    wave_banner.countDown = waveCountDown;  // Update banner
    	        }
		    }
	    }
	    unitDelay--;
    }
    else {
	    if (waveDelay < 0) {
		    waveCountDown--;
	    	wave_banner.countDown = waveCountDown;  // Update banner
	    	if (waveCountDown <= 0)  {
		    	runWave = true;  // Run next wave
		    }
		    waveDelay = waveDelayMax;  // Reset wave Delay
	    }
	    waveDelay--;
    }
    
    //console.log("runWave: " + runWave + "; curWave: " + curWave.waveNumber + "; waveCountDown: " + waveCountDown);
    
    // Replace Hearts
    if (hearts.current <= 0) {
        gameOver = true;
        bgm.pause();
        gameOverSound.play();
    }
    
    if(wave_banner.currentWave >= 6){
        gameWon = true;
        bgm.pause();
        gameWinSound.play();
        
    }
    
    // Move units through game field
    for (var i = 0; i < unitList.length; i++) {
        unitList[i].move();
    }
    
    // Have each tower attack if able
    for (var i = 0; i < towerList.length; i++) {
        towerList[i].attack(unitList);
    }
    
    removeDead();  // Remove killed units
    removeTowers();  // Remove obsolete towers
    setTimeout(logicLoop, 1000/frameRate);
};

window.onload = function() {
    loadPath();
    loadPlayer();

    // Load Graphical Elements
    wave_banner = new waveBanner(ctx);

    // Start Logic & Grapics Loops
    setTimeout(logicLoop, 1000/frameRate);
    requestAnimationFrame(renderLoop);
};