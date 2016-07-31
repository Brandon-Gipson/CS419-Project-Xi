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
var frameRate = 30;
var delay = 25;  // Unit Delay <<TEST>>
var delayMax = 25;
var counter = 2*frameRate;
var coinCounter = frameRate/3;
var alpha = 1.0;

//Background music control variables
var bgm = document.getElementById('bgm');
bgm.volume = 0.35; //was 0.35
var buttonClick = document.getElementById('buttonclick');
buttonClick.volume = 0.45;

var rightClick = document.getElementById('rightClick');
rightClick.volume = 0.45;

var placementThud = document.getElementById('placeTower');

var laserSound = document.getElementById('pewpew');
laserSound.volume = 0.25;

var noCoins = document.getElementById('noCoins');

var coinDing = document.getElementById('coins');
coinDing.volume = 0.50;

var heartLoss = document.getElementById('heartLoss');
heartLoss.volume = 0.50;

var renderLoop = function() {
    ctx.beginPath();
    ctx.clearRect(0,0,game_field.width,game_field.height);  //Clear game field+
    //Test to draw tower placing toggle
    newTowerButton.draw();
    // Draw Gem buttons
    redGemButton.draw();
    blueGemButton.draw();
    greenGemButton.draw();
    // Draw Health
    hearts.draw();
    // Draw Coins
    if (coins.flash) {
        coinCounter--;
        coins.draw("red");
        if(coinCounter == 0) {
            coins.flash = false;
            coinCounter = frameRate/3;
        }
    }
    else {
        coins.draw("gold");
    }
  
    // Draw Units
    for (var i = 0; i < unitList.length; i++) {
        unitList[i].draw();
    }
    // Draw Towers
    for (var i = 0; i < towerList.length; i++) {
        towerList[i].draw();
        
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
        
        // Fire Laser!
        for (var j = 0; j < towerList[i].maxTargets; j++) {
            if (towerList[i].target[j] != null) {
                towerList[i].drawLaser(j);
                //laserSound.play();
            }
        }
        // Draw turret
        towerList[i].drawTurret();
    }
    
    if(newTowerButton.press) {
        newTowerButton.drawOutline();
        mouseOutline.drawOutline();
    }
    
    if(greenGemButton.press) {
        greenGemButton.drawOutline();
    }
    
    if(blueGemButton.press) {
        blueGemButton.drawOutline();
    }
    
    if(redGemButton.press) {
        redGemButton.drawOutline();
    }
    
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
    
    // Add units to game <<TEST>>
    if (delay < 0) {
        
        spawnUnit(curWave);
        if (curWave.unitCount <= 0) {
            //temp set wave back to wave 0
            //curWave = createWave(curWave.waveNumber+1);
            if (curWave.waveNumber < waveUnits.length-1) {
                curWave = createWave(curWave.waveNumber+1);
            }
            else {
                //spawn no more units
            }
        }
        delay = delayMax;  // Reset delay
    }
    delay--;
    
    // Replace Hearts
    if (hearts.current <= 0) {
        hearts.current = 5;
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
    // Debug waypoint list
    //console.log("Waypoint Lenght: " + waypointList.length);
    //for (var i = 0; i < waypointList.length; i++) {
    //    console.log("Waypoint " + i + ": (" + waypointList[i].x + ", " + waypointList[i].y + ")");
    //}

    setTimeout(logicLoop, 1000/frameRate);
    requestAnimationFrame(renderLoop);  // Start graphics rendering
};