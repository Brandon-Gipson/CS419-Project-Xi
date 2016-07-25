/*****************************************************************************
*			         CS 419 - Software Projects
*				 Oregon State University - Summer 2016
*     	           WEB 1: Real-Time Strategy Game
*
* Project Team: Xi
* Members: Brandon Gipson, Tom Dale, James Pool
*
* Filename: gameWaves.js
* Version: 0
* Description: Waves Class to track waves of units in games
*
*****************************************************************************/

function wave(){
    this.units = [];
    this.healthMod = 0;
    
}

//function that spawns a random unit from unit list
wave.prototype.spawnUnit = function(){
    
    
};


//creates a wave to be used
function createWave(waveNumber){
    this.units = waveUnits[waveNumber];
    this.healthMod = 1 + ((0.1)*waveNumber);
}
createWave.prototype = Object.create(wave.prototype);

//wave unit information
var waveUnits = [];

//wave 0
waveUnits.push(
    [
        {count: 55, r: 0, g: 0, b: 0},
        {count: 15, r: 1, g: 0, b: 0},
        {count: 15, r: 0, g: 1, b: 0},
        {count: 15, r: 0, g: 0, b: 1}
    ]
)
//wave 1
waveUnits.push(
    [
        {count: 25, r: 0, g: 0, b: 0},
        {count: 25, r: 1, g: 0, b: 0},
        {count: 25, r: 0, g: 1, b: 0},
        {count: 25, r: 0, g: 0, b: 1}
    ]
)

console.log(waveUnits[0].length);
