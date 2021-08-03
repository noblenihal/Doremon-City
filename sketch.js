
function setup() {

  
  let myCanvas = createCanvas(800, 450);
  myCanvas.parent('myCanvas');
  frameRate(16);


  createP("Choose your path");
  

  createP();
  createSpan("Start Point");
  select1 = createSelect();
  select1.option("");
  select1.option("Nobi's Residence");
  select1.option("Shizuka's House");
  select1.option("Gian's Shop");
  select1.option("Suniyo's Bunglow");
  select1.option("School");
  select1.option("BackForest of school");
  select1.option("Baseball Field");
  select1.option("Open Ground");
  
  

  createP();
  createSpan("End Point");
  select2 = createSelect();
  select2.option("");
  select2.option("Nobi's Residence");
  select2.option("Shizuka's House");
  select2.option("Gian's Shop");
  select2.option("Suniyo's Bunglow");
  select2.option("School");
  select2.option("BackForest of school");
  select2.option("Baseball Field");
  select2.option("Open Ground");

  createP();
  button1 = createButton('Guide Me!');
  button1.style('background-color', color(43, 160, 290))
  button1.style('padding', '10px');
  button1.style('border-radius', '50px');
  button1.style('cursor','pointer');
  button1.style('margin-left', '190px' );


  button2 = createButton('Reset');
  button2.style('background-color', color(241, 112, 253))
  button2.style('padding', '10px');
  button2.style('border-radius', '50px');
  button2.style('cursor','pointer');
  button2.style('margin-left', '20px' );
  

  w = width / cols;
  h= height / rows; 

  for(var i=0; i<cols; ++i){
    grid[i] = new Array(rows);
  }
  
  
  for(var i=0; i<cols; ++i){
    for(var j=0; j<rows; ++j){
      grid[i][j] = new Spot(i,j)
      if(plot.includes(grid[i][j].cell) == false) {
        grid[i][j].wall = true;
      }
      
    }
  }
  

  neighbor();

  
  
  select1.changed(select1Changed);
  select2.changed(select2Changed);
  button1.mousePressed(pressed);
  button2.mousePressed(reset);

  start = select1.value;
  end = select2.value;

  
  
}


function draw() {
    

    if(started){
        
      
      if (openSet.length > 0) {
        
        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
          if (openSet[i].f < openSet[winner].f) {
            winner = i;
          }
        }
        var current = openSet[winner];

        
        if (current === end) {
          noLoop();
        }
      
        removeFromArray(openSet, current);
        closedSet.push(current);

        
        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
          var neighbor = neighbors[i];

          
          if (!closedSet.includes(neighbor) && !neighbor.wall) {
            var tempG = current.g + heuristic(neighbor, current);

            
            var newPath = false;
            if (openSet.includes(neighbor)) {
              if (tempG < neighbor.g) {
                neighbor.g = tempG;
                newPath = true;
              }
            } else {
              neighbor.g = tempG;
              newPath = true;
              openSet.push(neighbor);
            }

            
            if (newPath) {
              neighbor.h = heuristic(neighbor, end);
              neighbor.f = neighbor.g + neighbor.h;
              neighbor.previous = current;
            }
          }
        }
        
      } else {
        noLoop();
        return;
      }
      
      if(current==end){
        clear();
        noFill();
        stroke(172, 45, 6);
        strokeWeight(w / 2);
      }
      else{
        noFill();
        stroke(255, 0, 200,70);
        strokeWeight(w / 2);
      }

      path = [];
      var temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      
      beginShape();
      for (var i = 0; i < path.length; i++) {
        vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
      }

      endShape();

    }else{

    }
      
 }

 function select1Changed() {
  switch (select1.value()) {
    case "Nobi's Residence":
      start = grid[36][30];
      break;
    case "Shizuka's House":
      start = grid[28][46]
      break;
    case "Gian's Shop":
      start = grid[43][25];

      break;
    case "Suniyo's Bunglow":
      start = grid[44][43];

      break;
    case "School":
      start = grid[28][15];

      break;
    case "BackForest of school":
      start = grid[34][9]

      break;
    case "Baseball Field":
      start = grid[6][33]

      break;
    case "Open Ground":
      start = grid[29][40];

      break;
  }
}

function select2Changed() {
  switch (select2.value()) {
    case "Nobi's Residence":
      end = grid[36][30];
      break;
    case "Shizuka's House":
      end = grid[28][46]
      break;
    case "Gian's Shop":
      end = grid[43][25];
      break;
    case "Suniyo's Bunglow":
      end = grid[44][43];
      break;
    case "School":
      end = grid[28][15];
      break;
    case "BackForest of school":
      end = grid[34][9]
      break;
    case "Baseball Field":
      end = grid[6][33]
      break;
    case "Open Ground":
      end = grid[29][40];
      break;
  }
}


function pressed(){
  openSet.push(start);
  started =true;
}

function reset(){
  started =false;
  clear();
  openSet = [];
  closedSet = []; 
  neighbor();
  loop();
  
}

function neighbor(){
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].neighbor = [];
      grid[i][j].g=0;
      grid[i][j].h=0;
      grid[i][j].f=0;
      grid[i][j].previous = undefined;
      grid[i][j].addNeighbors(grid);
    }
  }
}