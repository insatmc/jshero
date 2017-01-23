canvas = document.getElementById("canvas")
ctx = canvas.getContext("2d");
width = canvas.width;
height = canvas.height;

level = 1;
walls = [];

function drawHero(x,y){
  var img = new Image();
  img.onload = function(){
    ctx.clearRect(0 ,0 ,width,height);
    ctx.drawImage(img,x,y,100,100);
    for (var i = 0; i < walls.length; i++) {
      wall = walls[i];
      ctx.fillStyle = "rgb(44, 62, 80)";
      if(wall.destroyed == 0){
        ctx.fillRect(wall.x ,(height - wall.height + 100) - 100 ,30, wall.height -100);
      }else{
        ctx.fillRect(wall.x ,height - wall.height ,30, wall.height);
      }
    }
  };
  img.src = 'hero.png';
}

x = 0;
y = height - 100;
JUMP = false;
MOVES = 0;
function execute(){
  ctx.fillStyle = "#eee"
  drawHero(x,y)
  if (walls.length == 0) {
  }
  for (var i = 0; i < walls.length; i++) {
    wall = walls[i];

    if ((x+100) < wall.x || x > (wall.x + 30) ){
    }else{
      if (y < (height - (wall.height + 101) ) || wall.destroyed == 0 ) {

      }else{
        PAUSE = true;
        setTimeout(repeatLevel,2000);
      }
    }
  }
  if (x > width) {
    console.log("Next Level");
    nextLevel()
  }

  if(!PAUSE){
    if(MOVES > 0){
      x+=10;
      MOVES--;
    }

    if (check == 0) {
      if (JUMP){
        y -= 20;
        if (y == height-300 ) {
          JUMP = false;
        }
      }else{
        if (y < height - 100) {
          y += 20;
        }
      }
    }

    if ( x+150 >= check*10 ) {
      if (JUMP){
        y -= 20;
        if (y <= height - 300) {
          JUMP = false;
        }
      }else{
        if (y < height - 100) {
          y += 10;
        }
      }
    }else{
    }

    if (x+150 >= breakpos*10) {
      if (breakcount == 0) {
        ctx.fillStyle = "#eee"
        ctx.fillRect(breakpos*10 ,height - 100 ,30, 100);
      }
    }

    window.requestAnimationFrame(execute);
  }else{
  }
}



function repeatLevel(){
  walls = []
  MOVES = 0;
  JUMP = false;
  PAUSE = false;
  x = 0;
  y = height - 100;
  if(level == 3){
    drawWall(200,100);
  }else if(level == 4){
    drawWall(200,300);
  }
  window.requestAnimationFrame(execute);
}
repeatLevel();

function nextLevel(){

  level ++;

  if (document.getElementById("inst"+(level)) == null) {
    alert("You are now a JS Master")
  }else{
    document.getElementById("inst"+(level-1)).style.display = "none";
    document.getElementById("inst"+(level)).style.display = "block";
  }
  repeatLevel();
}

function drawWall(x,height){
  walls.push({
    x: x,
    height: height,
    destroyed: 4
  })
}

function move(){
  MOVES++;
  if (level == 1){
    setTimeout(nextLevel,2000)
  }
}

function jump(){
  JUMP = true;
}
breakcount = 4;
breakpos = 0;
function breakWall(pos){
  for (var i = 0; i < walls.length; i++) {
    var wall = walls[i];
    if ( pos * 10 == wall.x) {
      wall.destroyed = wall.destroyed - 1;
      console.log("break")
    }
  }
}
function isDestroyed(pos){
    yes = false;
    for (var i = 0; i < walls.length; i++) {
      var wall = walls[i];
      if ( pos * 10 == wall.x) {
        yes = (wall.destroyed == 0);
        breakpos = pos;
      }
    }
    return yes;
}

var check = 0;
function isAWallAhead(pos){
  yes = false;
  for (var i = 0; i < walls.length; i++) {
    var wall = walls[i];
    if ( pos * 10 == wall.x ) {
      yes = true;
      check = pos;
    }
  }
  return yes;
}

function tryCode(){
  newScript = document.createElement('script');
  newScript.text = editAreaLoader.getValue("code");
  document.body.appendChild(newScript);
}
