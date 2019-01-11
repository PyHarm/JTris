var canvas = document.querySelector("canvas");

var ctx = canvas.getContext("2d");

ctx.rect(0,0,20,20);

canvas.width = 420;
canvas.height = 650;


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
    ctx.fillStyle = 'rgb(255,255,0)';
    ctx.fillRect(0,0,255,255);
}

setup();
