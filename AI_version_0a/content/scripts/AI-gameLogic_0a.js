/* Main game logic file */
"use strict";

var game_field = document.getElementById('game_field');
var ctx = game_field.getContext('2d');
var frameRate = 30;
var delay = 25;
var curr = 0;

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
    //if (unitList.length < 1) {
    //    addUnit();
    //}
    if (curr <= 0) {
        addUnit();
        curr = delay;  // Reset delay
    }
    curr--;
    // Move units through game field
    for (var i = 0; i < unitList.length; i++) {
        unitList[i].move();
    }
    removeDead();  // Remove killed units
    setTimeout(logicLoop, 1000/frameRate);
};

window.onload = function() {
    console.log("window.onload() ...");
    // Test Colors
    //for (var B = 0; B <= maxPoints; B++) {
    //    for (var G = 0; G <= maxPoints; G++) {
    //        for (var R = 0; R <= maxPoints; R++) {
    //            console.log("RGB Points: (" + R + "," + G + "," + B + ") - Color: " + getColor(R,G,B));
    //        }
    //    }
    //}
    
    loadPath();
    
    // Debug waypoint list
    //console.log("Waypoint Lenght: " + waypointList.length);
    //for (var i = 0; i < waypointList.length; i++) {
    //    console.log("Waypoint " + i + ": (" + waypointList[i].x + ", " + waypointList[i].y + ")");
    //}

    setTimeout(logicLoop, 1000/frameRate);
    requestAnimationFrame(renderLoop);  // Start graphics rendering
};