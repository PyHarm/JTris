var ctx = document.querySelector("canvas");
ctx.width = window.innerWidth;
ctx.height = window.innerHeight;
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
    
}

setup();