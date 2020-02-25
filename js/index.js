/*var ball = document.getElementById('ball');
var barra = document.getElementById('barra');
var goal = document.getElementById('goal');
var campo = document.getElementById("campo");
var button = document.getElementById("button");
var tops = 0;
var campoPos = campo.getBoundingClientRect();
var campoTop = campoPos.top;
var campoBottom = campoPos.bottom;
var campoRight = campoPos.right;
var campoLeft = campoPos.left;


window.onload = function () {

    document.onkeydown = moveball;
}
function movebarra(event) {
    var codigo = event.keyCode;
    var barraPos = barra.getBoundingClientRect();
    var barraTop = barraPos.top;
    var barraBottom = barraPos.bottom;

    if (barraTop >= campoTop + 5 && barraBottom <= campoBottom - 5) {
        if (codigo === 40) {
            tops++;
            barra.style.top = tops + "0.1px"
        } if (codigo === 38) {
            tops--;
            barra.style.top = tops + "0.1px"
        }
    } else if (barraTop >= campoTop + 5) {
        tops--;
        barra.style.top = tops + "0.1px"
    } else if (barraBottom <= campoBottom - 5) {
        tops++;
        barra.style.top = tops + "0.1px"
    }
}

var timerId;

function multball() {
    var bolas = document.createElement("img");
    bolas.innerHtml("ball");
    bolas.setAttribute("class", "ball");
    bolas.setAttribute("src", "images/ball.jpg");
    campo.appendChild(bolas);
}

button.addEventListener("click", function (event) {
    var moving = event.onclick;
    if (!moving) {
        timerId = setInterval(multball, 3000);
    }
    moving = !moving;
});




function moveball() {
    var x = 0;
    var movi = setInterval(move, 5);
    var ballPos = ball.getBoundingClientRect();
    var ballTop = ballPos.top;
    var ballBottom = ballPos.bottom;
    var ballRight = ballPos.right;
    var ballLeft = ballPos.left;


    function move() {
        if (ballTop >= campoTop && ballBottom <= campoBottom && ballRight <= campoRight && ballLeft >= campoLeft) {
            x++;
            ball.style.top = x + "0.2px";
        } else {
            x--;
            ball.style.top = x + "0.2px";
        }
    }
}*/



function Game() {
  this.ball;

  this.init = function () {
    var barra = new Barra();
    // barra.getBarra();
    barra.movebarra();
    this.ball = new Ball();
    this.ball.newBall();
  }

  this.start = function () {
    var timerId = setInterval((function () {
      this.ball.moveBall();
    }).bind(this), 5);
  }

  this.getCollision = function () {
    // Portería
    var goal = document.getElementById("goal");
    var maxgoal = goal.style.top;
    var mingoal = goal.style.bottom;


    if (this.ball.style.left <= 0 && this.ball.style.top > maxgoal && this.ball.style.bottom < mingoal) {
      console.log("remove");
      this.ball.bolas.remove();

    }
    // Barra
    // Campo
  }
}

function Ball() {
  this.bolas;
  this.incX;
  this.incY;
  this.posx = 120;
  this.posy = 255;

  this.newBall = function () {
    this.bolas = document.createElement("img");
    this.bolas.setAttribute("class", "ball");
    this.bolas.setAttribute("src", "images/ball.jpg");

    var div = document.createElement("div");
    div.appendChild(this.bolas);

    var campo = document.getElementById("campo");
    campo.appendChild(div);

    this.setMovement();
  }

  this.setMovement = function () {
    this.incX = (Math.random() * 2) - 1;
    this.incY = (Math.random() * 2) - 1;
  }

  this.moveBall = function () {
    this.posx += this.incX;
    this.posy += this.incY;

    this.bolas.style.top = this.posx + 'px';
    this.bolas.style.left = this.posy + 'px';
  }

  this.changeMove = function () {

  }
}

function Barra() {
  this.barraHTML;
  this.campoHTML;

  /*this.getBarra = function() {
      this.barraHTML = document.getElementById("barra");
  }

  this.getCampo = function() {
      this.campoHTML = document.getElementById("campo");
  }*/


  this.movebarra = function () {
    document.onkeydown = function (evento) {
      var codigo = evento.keyCode;
      var tops = 0;
      console.log("barra top " + barra.style.top);
      console.log("campo top " + campo.style.top);
      console.log("barra bot " + barra.style.bottom);
      console.log("campo bot " + campo.style.bottom);
      if (barra.style.top <= campo.style.top + 5 && barra.style.bottom >= campo.style.bottom - 5) {
        if (codigo === 40) {
          tops++;
          console.log(tops);
          barra.style.top = tops + "0.1px"
        }else if (codigo === 38) {
          tops--;
          console.log(tops);
          barra.style.top = tops + "0.1px"
        }
      }else if (barra.style.top >= campo.style.top + 5) {
        tops--;
        barra.style.top = tops + "0.1px"
      }else if (barra.style.bottom <= campo.style.bottom  - 5) {
        tops++;
        barra.style.top = tops + "0.1px"
      }
    }
  }
}

var game = new Game();
game.init();
game.start();