var ctx = document.querySelector("canvas");
ctx.width = window.innerWidth/10*3 - 20;
ctx.height = window.innerHeight - 20;
var canv = ctx.getContext("2d");

var width = ctx.width;
var height = ctx.height;

var tile;

class Sq{
    constructor(gx, gy, col){
        this.x = gx;
        this.y = gy;
        this.width = 28;
        this.col = col
    }

    draw(){
        canv.fillStyle = this.col;
        canv.fillRect(this.x, this.y, this.width, this.width); 
    }
}

class Tile{
    constructor(){
        this.width = 28;
        this.counter = 0;
        this.types = [[[[0, 0],[0, this.width],[0, this.width*2],[0, this.width*3]],
                       [[0, 0],[0, this.width],[0, this.width*2],[0, this.width*3]],
                       [[0, 0],[this.width, 0],[this.width*2, 0],[this.width*3, 0]],
                       [[0, 0],[this.width, 0],[this.width*2, 0],[this.width*3, 0]]],

                      [[[0, 0],[0, this.width],[this.width, 0],[this.width, this.width]],
                       [[0, 0],[0, this.width],[this.width, 0],[this.width, this.width]],
                       [[0, 0],[0, this.width],[this.width, 0],[this.width, this.width]],
                       [[0, 0],[0, this.width],[this.width, 0],[this.width, this.width]]],

                      [[[0, 0],[0, this.width],[0, this.width*2],[this.width, this.width*2]],
                       [[0, 0],[this.width, 0],[this.width*2, 0],[0, -this.width]],
                       [[0, 0],[0, this.width],[0, this.width*2],[-this.width, this.width*2]],
                       [[0, 0],[this.width, 0],[this.width*2, 0],[this.width*2, this.width]]],

                      [[[0, 0],[0, this.width],[this.width, this.width],[this.width, this.width*2]],
                       [[0, 0],[this.width, 0],[this.width, -this.width],[this.width*2, -this.width]],
                       [[0, 0],[0, this.width],[this.width, this.width],[this.width, this.width*2]],
                       [[0, 0],[this.width, 0],[this.width, -this.width],[this.width*2, -this.width]]],

                      [[[0, 0],[0, this.width],[0, this.width*2],[this.width, this.width]],
                       [[0, 0],[this.width, 0],[this.width*2, 0],[this.width, -this.width]],
                       [[0, 0],[0, this.width],[0, this.width*2],[-this.width, this.width]],
                       [[0, 0],[this.width, 0],[this.width*2, 0],[this.width, this.width]]],
                    ];

        this.x = width/2;
        this.y = -60;
        this.speed = 28;
        this.type = this.types[Math.floor(Math.random()*5)][Math.floor(Math.random()*4)];
        this.structure = [];

        for(var i=0; i<4; i++){
            this.structure.push(new Sq(this.x+this.type[i][0],this.y+this.type[i][1], "rgb(255,255,0)"));
        };
    }

    draw(){
        this.structure.forEach(square => {
            square.draw();
        });
    }

    move(){
        if(this.counter > 20){
            this.counter = 0;
            for(var i=0; i<4; i++){
                this.structure[i].y += this.speed;
            };
        }
    }
}

function setup(){
    requestAnimationFrame(main);
    tile = new Tile();
}

function main(){
    update();
    draw();
    requestAnimationFrame(main);
}

function update(){
    tile.counter += 1;
    tile.move();
}

function draw(){
    canv.fillStyle = "rgb(26, 27, 25)";
    canv.fillRect(0,0,width,height);
    tile.draw()
}

setup();