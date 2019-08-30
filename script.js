var myObstacles = [];
var myGameArea = {
  canvas: document.createElement("canvas"),
  frames: 0,
  start: function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
}


class Component {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    // new speed properties
    this.speedX = 0;
    this.speedY = 0;
  }

  
  
  update() {
    var ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    console.log(this)
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  
  newPos() {
    console.log("newpos called")
    this.x += this.speedX;
    this.y += this.speedY;
  }

 
}

  


var player = new Component(30, 30, "red", 100, 110);

console.log(player)

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 38: // up arrow
    console.log("up")
      player.speedY -= 1;
      break;
    case 40: // down arrow
    console.log("down")

      player.speedY += 1;
      break;
    case 37: // left arrow
    console.log("left")

      player.speedX -= 1;
      break;
    case 39: // right arrow
    console.log("right")

      player.speedX += 1;
      break;
  }

  updateGameArea()
};

document.onkeyup = function(e) {
  player.speedX = 0;
  player.speedY = 0;

  updateGameArea()
};

function updateGameArea() {
  console.log(player.x)
  console.log(player.y)
  myGameArea.clear();
  player.newPos()
  player.update();
  updateObstacles();
}
myGameArea.start()
  updateGameArea()

  function updateObstacles() {
    myGameArea.frames += 1;
    if (myGameArea.frames % 120 === 0) {
      var x = myGameArea.canvas.width;
      var minHeight = 20;
      var maxHeight = 200;
      var height = Math.floor(
        Math.random() * (maxHeight - minHeight + 1) + minHeight
      );
      var minGap = 50;
      var maxGap = 200;
      var gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      myObstacles.push(new Component(10, height, "green", x, 0));
      myObstacles.push(
        new Component(10, x - height - gap, "green", x, height + gap)
      );
    }
  }
  function updateObstacles() {
    for (i = 0; i < myObstacles.length; i++) {
      myObstacles[i].x += -1;
      myObstacles[i].update();
    }
  
    //.......
  }
 
  myGameArea.frames += 1;
  if (myGameArea.frames % 120 === 0) {
    var x = myGameArea.canvas.width;
    var minHeight = 20;
    var maxHeight = 200;
    var height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    var minGap = 50;
    var maxGap = 200;
    var gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new Component(10, height, "green", x, 0));
    myObstacles.push(
      new Component(10, x - height - gap, "green", x, height + gap)
    );
  }
  function checkGameOver() {
    var crashed = myObstacles.some(function(obstacle) {
      return player.crashWith(obstacle);
    });
  
    if (crashed) {
      myGameArea.stop();
    }
  }
  //code pen


 