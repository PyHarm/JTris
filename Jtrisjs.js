var ctx = document.querySelector("canvas");
ctx.width = window.innerWidth/2 - 20;
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

}

function draw(){
    canv.fillStyle = "rgb(255,255,0)";
    canv.fillRect(70,50,200,200);
}

setup();