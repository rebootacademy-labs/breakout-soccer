var ball = document.getElementById('ball');
var barra = document.getElementById('barra');
var goal = document.getElementById('goal');
var campo = document.getElementById("campo");
var campoTop = 0;
var campoBottom = 0;
var barraTop = 0;
var barraBottom = 0;
var tops = 0;
window.onload = function () {
    this.document.onkeydown = movebarra;
    var campoPos = campo.getBoundingClientRect();
    this.campoTop = campoPos.top;
    this.campoBottom = campoPos.bottom;
}
function movebarra(event) {
    var codigo = event.keyCode;
    var barraPos = barra.getBoundingClientRect();
    this.barraTop = barraPos.top;
    this.barraBottom = barraPos.bottom;
    if (codigo === 40) {
        tops++;
        barra.style.top = tops + "px"
    }
    var codigo = event.keyCode;
    if (codigo === 38) {
        tops--;
        barra.style.top = tops + "px"
    }
    if(barraTop == campoTop){
        tops = tops -2;
    }
}
const moveball = function () {
}