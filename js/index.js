var ball = document.getElementsByClassName('ball');
var barra = document.getElementById('barra');
var goal = document.getElementById('goal');
var campo = document.getElementById("campo");
var button = document.getElementById("button");
var campoTop = 0;
var campoBottom = 0;
var barraTop = 0;
var barraBottom = 0;
var tops = 0;

window.onload = function () {
    document.onkeydown = movebarra;
    var campoPos = campo.getBoundingClientRect();
    campoTop = campoPos.top;
    campoBottom = campoPos.bottom;
}
function movebarra(event) {
    var codigo = event.keyCode;
    var barraPos = barra.getBoundingClientRect();
    barraTop = barraPos.top;
    barraBottom = barraPos.bottom;

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


button.addEventListener("click", function (e) {
    if (!moving) {
        timerId = setInterval(multball, 3000);
    }
    moving = !moving;
})

