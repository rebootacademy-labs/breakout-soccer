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
  height: 60,
  width: 30
}
var goals = 0;
var sound = new Audio("./images/goal2.mp3");
var reboteSound = new Audio("./images/rebote.mp3");
var gameOverSound = new Audio("./images/Loser.mp3");


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
        var gol = document.getElementById("gol")
        gol.classList.remove('hidde')
        gol.classList.add('show')
        setTimeout(function () {
          gol.classList.remove('show')
          gol.classList.add('hidde')
        }, 1000);
      }
      if (ball.x + ball.width >= FIELD.width) {
        gameOverSound.play();
        var over = document.getElementById("gameOver")
        over.classList.remove('hidde')
        over.classList.add('show')
        setTimeout(function () {
          location.reload()
        }, 3000);
        this.balls = null;
      }
    })
  }
};

function Ball() {
  this.width = 25;
  this.height = 25;
  this.x = 255;
  this.y = 120;

  this.incX = Math.floor((Math.random() * 4)) + 5;
  this.incY = Math.floor((Math.random() * 4)) + 5;
  if (Math.random() > 0.8) { this.incX *= -1 }
  if (Math.random() > 0.5) { this.incY *= -1 }

  this.html = document.createElement("div");
  this.html.setAttribute("class", "ball");
  this.html.style.top = `${this.y}px`;
  this.html.style.left = `${this.x}px`;
  this.html.style.width = `${this.width}px`;
  this.html.style.heigth = `${this.heigth}px`;
  document.getElementById("field").appendChild(this.html);

  this.move = function () {
    this.bottom = this.y + this.height;
    this.right = this.x + this.width;
    slider.bottom = slider.top + slider.height;
    slider.right = slider.left + slider.width;

    // Left Rebound
    if (this.x < 0) { this.incX *= -1; }

    // Vertical Field Rebound
    if (this.y < 0 ||
      this.bottom > FIELD.height) { this.incY *= -1; }
    // Horizontal Rebound
    if (this.right > slider.left &&
      this.right < slider.left + 20 &&
      this.bottom > slider.top &&
      this.y < slider.bottom) {
      reboteSound.play();
      this.incX *= -1;
    }

    // Vertical Rebound
    if (this.y > slider.bottom &&
      this.y < slider.bottom + 4 &&
      this.right > slider.left &&
      this.x < slider.right) {
      reboteSound.play();
      this.incY *= -1;
    }

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
};

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

var inicio = document.getElementById("start")
inicio.addEventListener("click", function () {
  game.start()
  inicio.classList.add('hidde')
});
