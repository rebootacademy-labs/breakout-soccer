const SPEED = 50;
const NEWBALL = 5000;
const GOAL = {
  top: 100,
  bottom: 160,
  height: 80
}
const FIELD = {
  width: 535,
  height: 275
}
const SLIDER = {
  top: 110,
  height: 60
}
var goals = 0;
var sound = new Audio("../images/goal.mp3");
var reboteSound = new Audio("../images/rebote.mp3");
var gameOverSound = new Audio("../images/Loser.mp3");


var game = {
  balls: [],
  timerId: null,
  start: function () {
    this.balls.push(new Ball());
    this.timerball = setInterval(this.newball.bind(this), NEWBALL);
    this.timerId = setInterval(this.update.bind(this), SPEED);
    document.addEventListener("keydown", slider.move.bind(slider));
  },
  newball: function () {
    this.balls.push(new Ball());
  },
  stop: function () {
    clearInterval(this.timerId);
    this.timerId = null;
  },
  update: function () {

    this.balls.forEach(ball => {
      ball.move();
      if (ball.x < 0 && ball.y > GOAL.top && ball.y < GOAL.bottom) {
        sound.play();
        ball.remove();
        goals++
        marcador.innerHTML = goals;
        var gol = document.createElement("div");
        gol.setAttribute("id", "gol");

        alert("GOLAZO");
      }
      if (ball.x + ball.width >= FIELD.width) {
        gameOverSound.play();
        alert("GAME OVER");
        this.balls = null;
        location.reload();
      }
    })
  }
}
function Ball() {
  this.width = 25;
  this.height = 25;
  this.x = 255;
  this.y = 120;
  this.incX = Math.ceil((Math.random() * 2 - 1) * 10);
  this.incY = Math.ceil((Math.random() * 2 - 1) * 10);
  this.html = document.createElement("div");
  this.html.setAttribute("class", "ball");
  this.html.style.top = `${this.y}px`;
  this.html.style.left = `${this.x}px`;
  this.html.style.width = `${this.width}px`;
  this.html.style.heigth = `${this.heigth}px`;
  document.getElementById("field").appendChild(this.html);
  this.move = function () {
    if (this.x < 0 || this.x > (FIELD.width - this.width)) { this.incX *= -1; }
    if (this.y < 0 || this.y > (FIELD.height - this.height)) { this.incY *= -1; }
    if (this.x + this.width > slider.left && this.y > slider.top && this.y < slider.top + slider.height) { reboteSound.play(); this.incX *= -1; }
    // if ( (this.y + this.height > slider.top && this.x + this.width > slider.left) 
    //    || (this.y < slider.top + slider.height && this.x + this.width > slider.left) ) { this.incY *= -1; }
    this.x += this.incX;
    this.y += this.incY;
    this.html.style.top = `${this.y}px`;
    this.html.style.left = `${this.x}px`;
  }
  this.remove = function () {
    this.html.remove();
    this.incX = 0;
    this.incY = 0;
    this.html.style.top = 0;
    this.html.style.left = 0;
    this.x = 0;
    this.y = 0;
  }
}

var slider = {
  top: 110,
  left: 490,
  height: 60,
  html: document.getElementById('slider'),
  move: function () {
    switch (event.code) {
      case "ArrowUp":
        if (this.top > 0) {
          this.top -= 10;
          this.html.style.top = `${this.top}px`;
        }
        break;
      case "ArrowDown":
        if (this.top + SLIDER.height < FIELD.height) {
          this.top += 10;
          this.html.style.top = `${this.top}px`;
        }
    }
  }
}
game.start();

