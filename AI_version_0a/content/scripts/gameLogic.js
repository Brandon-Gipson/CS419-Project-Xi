/* Main game logic file */
"use strict";

var game_field = document.getElementById('game_field');
var ctx = game_field.getContext('2d');
var frameRate = 30;


var renderLoop = function() {
    ctx.beginPath();
    ctx.clearRect(0,0,game_field.width,game_field.height);  //Clear game field
    for (var i = 0; i < unitList.length; i++) {
        unitList[i].draw();
    }
    requestAnimationFrame(renderLoop);  // Loop graphics rendering
};

var logicLoop = function() {
    // Add units to game
    if (unitList.length < 1) {
        addUnit();
    }
    // Move units through game field
    for (var i = 0; i < unitList.length; i++) {
        unitList[i].move();
    }
    removeDead();  // Remove killed units
    setTimeout(logicLoop, 1000/frameRate);
};

window.onload = function() {
    loadPath();
    
    // Debug waypoint list
    console.log("Waypoint Lenght: " + waypointList.length);
    for (var i = 0; i < waypointList.length; i++) {
        console.log("Waypoint " + i + ": (" + waypointList[i].x + ", " + waypointList[i].y + ")");
    }

    setTimeout(logicLoop, 1000/frameRate);
    requestAnimationFrame(renderLoop);  // Start graphics rendering
};