var ctx = document.querySelector("canvas");
ctx.width = window.innerWidth/10*3 - 20;
ctx.height = window.innerHeight - 20;
var canv = ctx.getContext("2d");

var width = ctx.width;
var height = ctx.height;

function setup(){
    requestAnimationFrame(main); 
}

function main(){
    update();
    draw();
    requestAnimationFrame(main);
}

function update(){
    console.log(width);
}

function draw(){
    canv.fillStyle = "rgb(255,255,0)";
    canv.fillRect(0,0,200,200);
}

setup();