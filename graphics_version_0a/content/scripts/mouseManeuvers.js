/*****************************************************************************
*			         CS 419 - Software Projects
*				 Oregon State University - Summer 2016
*     	           WEB 1: Real-Time Strategy Game
*
* Project Team: Xi
* Members: Brandon Gipson, Tom Dale, James Pool
*
* Filename: mouseManeuvers.js
* Version: -
* Description: Tower defense GUI mouse logic
*
*****************************************************************************/

/***********************************
 * Allows click to place for towers
 * *********************************/
 
 game_field.addEventListener("click", clickListener, false);
 
 function clickListener(e) {
  var mouseX = 0;
  var mouseY = 0;
	 var towerHit = false;
	 var buttonHit = false;
	 var mapHit = false;
	 var pathHit = false;
	 
 	//getting mouse position and offsets it by canvas boundry
 	var bRect = game_field.getBoundingClientRect(); //get the boundary of the canvas
  mouseX = event.clientX - bRect.left;
  mouseY = event.clientY - bRect.top;
  
  //check to see if mouse click is on the new tower button
  if((newTowerButton.x <= mouseX) && (newTowerButton.x + newTowerButton.width >= mouseX) && (newTowerButton.y <= mouseY) && (newTowerButton.y + newTowerButton.height >= mouseY)){
   newTowerButton.press = true; //marks bottom as pressed
 
   return;
  }
  
    
  if(newTowerButton.press) { //If the tower placement button was pressed then do:
  //checks towerList to see if click is inside existing tower
   for (var i in towerList) {
    towerHit = hitTest(towerList[i], mouseX, mouseY);
    if (towerHit) {
     break;
    }
    
    
   }
   
   buttonHit = hitTest(newTowerButton, mouseX, mouseY);
   
   for(i in mapBoundaryList) {
    mapHit = boundsHitTest(mapBoundaryList[i], mouseX, mouseY);
    if (mapHit) {
     break;
    }
   }
   
   for(i in pathBoundaryList) {
    pathHit = boundsHitTest(pathBoundaryList[i], mouseX, mouseY);
    if (pathHit) {
     break;
    }
   }
    
  }
   
 	
  	//if the click was not within an existing tower then it places the tower
  	// and if the button for tower placement has been pressed
  	if (!towerHit && !buttonHit && !mapHit && !pathHit && newTowerButton.press) {
  	    placeTower(mouseX-5, mouseY-5); //We can edit this to snap more to the grid
  	                                   //Though I haven't though about how yet
  	    newTowerButton.press = false;
  	}
  
 	
 	
 	
 	//prevents mouse click from effecting browser window
 	if (e.preventDefault) {
 	    e.preventDefault();
 	} //standard
 	else if (e.returnValue) {
 	    e.returnValue = false;
 	} //older IE
 	
 	return false;
 }
 
 
 /************************************************************
  * Tests to see if the the Mouse X,Y fall in the area between
  * the tower's corners. So its x, x+width, y, and y+height.
  * Returns true if it does and false if it doesn't
  * **********************************************************/
  function hitTest(obj,mx,my) {
      
      if ((obj.x <= mx + obj.width) && (obj.x + obj.width >= mx + obj.width) && (obj.y <= my + obj.height) && (obj.y + obj.height >= my + obj.height)) {
        return true;  
      }
      
      if ((obj.x <= mx + obj.width) && (obj.x + obj.width >= mx + obj.width) && (obj.y <= my) && (obj.y + obj.height >= my)) {
          return true;
      }
      
      if ((obj.x <= mx) && (obj.x + obj.width >= mx) && (obj.y <= my + obj.height) && (obj.y + obj.height >= my + obj.height)) {
          return true;
      }
      
      if ((obj.x <= mx) && (obj.x + obj.width >= mx) && (obj.y <= my) && (obj.y + obj.height >= my)) {
          return true;
      }
      
     return  false;
  }
  
  
/**************************************************************
 * Test to see if the mouse x, y fall inside or overlapping the
 * area we consider to be out of bounds for tower placement.
 * This is very similar to the function above but had to account
 * for the fact that we are checking the tower's width and height
 * against the boundary and not the obj (the boundary)
 * **************************************************************/
  function boundsHitTest(obj,mx,my) {
   
   if ((obj.x <= mx) && (obj.x + obj.width >= mx) && (obj.y <= my) && (obj.y + obj.height >= my)) { //top left corner
    return true;
    
   }
   
   if ((obj.x <= mx + 40) && (obj.x + obj.width >= mx + 40) && (obj.y <= my) && (obj.y + obj.height >= my)) { //top right corner
    return true;
    
   }

   if ((obj.x <= mx) && (obj.x + obj.width >= mx) && (obj.y <= my + 40) && (obj.y + obj.height >= my + 40)) { //bottom left corner
    return true;
   }
   
   if ((obj.x <= mx + 40) && (obj.x + obj.width >= mx + 40) && (obj.y <= my + 40) && (obj.y + obj.height >= my + 40)) { //bottom right corner
    return true;
   }
   
   return  false;
  }


