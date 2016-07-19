/***********************************
 * Allows click to place for towers
 * *********************************/
 
 game_field.addEventListener("click", clickListener, false);
 
 function clickListener(e) {
    var mouseX = 0;
	var mouseY = 0;
	var hit = false;
	//var press = false;
		
	//getting mouse position and offsets it by canvas boundry
	var bRect = game_field.getBoundingClientRect(); //get the boundary of the canvas
 mouseX = event.clientX - bRect.left;
 mouseY = event.clientY - bRect.top;
 
 if((newTowerButton.x <= mouseX) && (newTowerButton.x + newTowerButton.width >= mouseX) && (newTowerButton.y <= mouseY) && (newTowerButton.y + newTowerButton.height >= mouseY)){
  newTowerButton.press = true;
  return;
  
 }
 
   
 if(newTowerButton.press) {
 //checks towerList to see if click is inside existing tower
  for (var i in towerList) {
   hit = hitTest(towerList[i], mouseX, mouseY);
   if (hit) {
    break;
   }
  }
	
 	//if the click was not within an existing tower then it places the tower
 	// and if the button for tower placement has been pressed
 	if (!hit) {
 	    placeTower(mouseX-5, mouseY-5); //We can edit this to snap more to the grid
 	                                   //Though I haven't though about how yet
 	    newTowerButton.press = false;
 	}
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
  
