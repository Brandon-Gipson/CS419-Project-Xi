"use strict"

// Array storing function from: 
// http://stackoverflow.com/questions/7030229/storing-coordinates-in-array-in-javascript

var waypointList = [];  // Create empty list

// Function to add additional waypoints
function addWaypoint(xVal, yVal ,array) {
    array.push({x: xVal, y: yVal});
}

function loadPath() {
    addWaypoint(0, 100, waypointList);  // Starting Location
    addWaypoint(250, 100, waypointList);
    addWaypoint(250, 350, waypointList);
    addWaypoint(25, 350, waypointList);
    addWaypoint(25, 25, waypointList);  // End Point
};

// Manhattan Path Algorithm - Pauses at waypoint if would pass
function ManhattanPath(u) {
    // Setup pathing variables
    var xWay = waypointList[u.waypoint].x;
    var yWay = waypointList[u.waypoint].y;
    var xDist = Math.abs(xWay - u.x);
    var yDist = Math.abs(yWay - u.y);
    var xDir = (xWay - u.x) > 0 ? 1 : -1;
    var yDir = (yWay - u.y) > 0 ? 1 : -1;
    
    // Debug Lines
    //console.log("Waypoint " + u.waypoint + ": (" + xWay + ", " + yWay + ") - Unit: (" + u.x + ", " + u.y + ")");
    //console.log("Distance: (" + xDist + ", " + yDist + ") - Direction: (" + xDir + ", " + yDir + ")");
    
    // Check if waypoint is reached
    if ((xDist <= 0) && (yDist <= 0)) {
        //console.log("Next waypoint ... ");
        u.waypoint++;  // Move to next waypoint
        if (u.waypoint == waypointList.length) { // Check if unit reached end
            u.health = -1;  //Kill Unit (Temporary)
            return;
        }
    }
    
    // Move unit towards waypoint
    if (xDist >= yDist) {
        u.x += u.speed * xDir; // Move in x direction
        if ((xWay * xDir) < (u.x * xDir)) {  // Check if passed waypoint
            u.x = xWay;
        }
    }
    else {  // xDist < yDist
        u.y += u.speed * yDir; // Move in y direction
        if ((yWay * yDir) < (u.y * yDir)) {  // Check if passed waypoint
            u.y = yWay;
        }
    }
}