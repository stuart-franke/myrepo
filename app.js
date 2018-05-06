//set variables libraries
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('input.txt');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

var input = [];

rl.on('line', function(line) {
  input.push(line);
});

rl.on('close', function() {
  //declare dimensions and convert to number
  var dims = input[0].split(" ");
  for (var i = 0; i < dims.length; i++) {
    dims[i] = +dims[i];
  }
  //declare positon of hoover and convert to number
  var pos = input[1].split(" ");
  for (var i = 0; i < pos.length; i++) {
    pos[i] = +pos[i];
  }
  //declare directions variable
  var directs = input[input.length - 1];
  //set dirt counter var
  var dirtFound = 0;
  //delete elements that are not dirts
  input.shift();
  input.shift();
  input.pop();
  //declare dirts as array
  var dirts = [];

  //convert dirts to number types
  for (var i = 0; i < input.length; i++) {
    dirts[i] = input[i].split(' ').map(Number);
  }  
  //used to exit loop when the hoover hits the edge of the room
  labelExitLoop:
  //loop through the directions array and for each of the 4 different directions, change position and if dirt is found, increment this var
  for (i = 0; i < directs.length; i++) {
	//check to see if the position is greater than or equal to the room dimensions
    if(pos[0] >= dims[0] || pos[1] >= dims[1]){
		console.log("Position of hoover is outside of the room dimensions");
		break labelExitLoop;
	}else{
	//switch statement to sort directions with default being an incorrect direction
	switch (directs[i]) {

      case 'N':
        pos[1] += 1
        for (j = 0; j < dirts.length; j++) {
          if (JSON.stringify(pos) === JSON.stringify(dirts[j])) {
            dirtFound += 1
			delete dirts[j]
          }
        }
        break;

      case 'S':
        pos[1] -= 1
        for (j = 0; j < dirts.length; j++) {
          if (JSON.stringify(pos) === JSON.stringify(dirts[j])) {
            dirtFound += 1
			delete dirts[j]
          }
        }
        break;

      case 'E':
        pos[0] += 1
        for (j = 0; j < dirts.length; j++) {
          if (JSON.stringify(pos) === JSON.stringify(dirts[j])) {
            dirtFound += 1
			delete dirts[j]
          }
        }
        break;

      case 'W':
        pos[0] -= 1
        for (j = 0; j < dirts.length; j++) {
          if (JSON.stringify(pos) === JSON.stringify(dirts[j])) {
            dirtFound += 1
			delete dirts[j]
          }
        }
        break;
	  //Displays if a direction besides allowed are given to program
      default:
        console.log("You gave the hoover some bad directions..")
        break;
    }
	}
  }
  //log the results to the console
  console.log(pos.toString().replace(/,/g, " "));
  console.log(dirtFound);
  });