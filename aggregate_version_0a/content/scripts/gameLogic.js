/* Main game logic file */

var game_field = document.getElementById('game_field');
var ctx = game_field.getContext('2d');
ctx.shadowBlur = "black";
ctx.shadowBlur = 20;
var frameRate = 30;

var renderLoop = function() {
    ctx.beginPath();
    ctx.clearRect(0,0,game_field.width,game_field.height);  //Clear game field+
    //Test to draw tower placing toggle
    newTowerButton.draw();
    // Draw Health
    hearts.draw();
    // Draw Coins
    coins.draw();
    // Draw Units
    for (var i = 0; i < unitList.length; i++) {
        unitList[i].draw();
    }
    // Draw Towers
    for (var i = 0; i < towerList.length; i++) {
        towerList[i].draw();
    }
    requestAnimationFrame(renderLoop);  // Loop graphics rendering
};

var logicLoop = function() {
    
    // Add towers to game <<TEST>>
    if (towerList.length < 1) {
        placeTower(300,200)
    }
    // Add units to game <<TEST>>
    if (unitList.length < 1) {
        addUnit();
        unitList[0].setImage("red");
        // Cycle Gems in Tower <<TEST>>
        if (towerList[0].slot1.color == "gray") {
            towerList[0].updateGem("salmon",1);
        }
        else if (towerList[0].slot2.color == "gray") {
            towerList[0].updateGem("lime",2);
        }
        else if (towerList[0].slot3.color == "gray") {
            towerList[0].updateGem("cyan",3);
        }
        else {
            for (var i = 1; i <= 3; i++) {
                towerList[0].clearGem(i);
            }
        }
    }
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
    hearts.updateCurrent(5);
    hearts.updateMax(5);
    coins.update(1000);
    // Debug waypoint list
    //console.log("Waypoint Lenght: " + waypointList.length);
    //for (var i = 0; i < waypointList.length; i++) {
    //    console.log("Waypoint " + i + ": (" + waypointList[i].x + ", " + waypointList[i].y + ")");
    //}

    setTimeout(logicLoop, 1000/frameRate);
    requestAnimationFrame(renderLoop);  // Start graphics rendering
};