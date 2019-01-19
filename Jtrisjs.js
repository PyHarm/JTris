var ctx = document.querySelector("canvas");
ctx.width = 560;
ctx.height = 840;
var canv = ctx.getContext("2d");

var width = ctx.width;
var height = ctx.height;

var currentTile;
var placedSQ = [];
var scoreDiv = document.getElementById('scoreDiv');
var score = 0;
scoreDiv.innerText = "Score: " + score;

class Sq{
    constructor(gx, gy, col){
        this.x = gx;
        this.y = gy;
        this.width = 28;
        this.col = col;
    }

    draw(){
        canv.fillStyle = this.col;
        canv.strokeStyle = "rgb(17, 17, 17)";
        canv.lineWidth = 3;
        canv.fillRect(this.x, this.y, this.width, this.width);
        canv.strokeRect(this.x, this.y, this.width, this.width);
    }
}

class Tile{
    constructor(){
        this.width = 28;
        this.counter = 0;
        this.colors = ["#00f0f0", "#0000f0", "#f0a000", "#f0f000", "#00f000", "#a000f0", "#f00000"];
        this.types = [[[[0, 0],[0, this.width],[0, this.width*2],[0, this.width*3],"#00f0f0"],
                       [[0, 0],[this.width, 0],[this.width*2, 0],[this.width*3, 0],"#00f0f0"],
                       [[0, 0],[0, this.width],[0, this.width*2],[0, this.width*3],"#00f0f0"],
                       [[0, 0],[this.width, 0],[this.width*2, 0],[this.width*3, 0],"#00f0f0"]],

                      [[[0, 0],[0, this.width],[this.width, 0],[this.width, this.width],"#0000f0"],
                       [[0, 0],[0, this.width],[this.width, 0],[this.width, this.width],"#0000f0"],
                       [[0, 0],[0, this.width],[this.width, 0],[this.width, this.width],"#0000f0"],
                       [[0, 0],[0, this.width],[this.width, 0],[this.width, this.width],"#0000f0"]],

                      [[[0, 0],[0, this.width],[0, this.width*2],[this.width, this.width*2],"#f0a000"],
                       [[0, 0],[this.width, 0],[this.width*2, 0],[0, -this.width],"#f0a000"],
                       [[0, 0],[0, this.width],[0, this.width*2],[-this.width, this.width*2],"#f0a000"],
                       [[0, 0],[this.width, 0],[this.width*2, 0],[this.width*2, this.width],"#f0a000"]],

                      [[[0, 0],[0, this.width],[this.width, this.width],[this.width, this.width*2],"#f0f000"],
                       [[0, 0],[this.width, 0],[this.width, -this.width],[this.width*2, -this.width],"#f0f000"],
                       [[0, 0],[0, this.width],[this.width, this.width],[this.width, this.width*2],"#f0f000"],
                       [[0, 0],[this.width, 0],[this.width, -this.width],[this.width*2, -this.width],"#f0f000"]],

                      [[[0, 0],[0, this.width],[0, this.width*2],[this.width, this.width],"#00f000"],
                       [[0, 0],[this.width, 0],[this.width*2, 0],[this.width, -this.width],"#00f000"],
                       [[0, 0],[0, this.width],[0, this.width*2],[-this.width, this.width],"#00f000"],
                       [[0, 0],[this.width, 0],[this.width*2, 0],[this.width, this.width],"#00f000"]],
                    ];

        this.x = width/2;
        this.y = -28*4;
        this.speed = 28;
        this.framerate = 20;
        this.falling = false;
        this.placed = false;
        this.leftTouch = false;
        this.rightTouch = false;
        this.rotation = 0;
        this.piecetype = Math.floor(Math.random()*5);
        this.type = this.types[this.piecetype][this.rotation];
        this.structure = [];

        for(var i=0; i<4; i++){
            this.structure.push(new Sq(this.x+this.type[i][0],this.y+this.type[i][1], this.type[4]));
        };
        
    }

    draw(){
        this.structure.forEach(square => {
            square.draw();
        });
    }

    move(){
        this.vColision();
        if(this.counter > this.framerate && this.placed == false){
            this.counter = 0;
            this.y += this.speed;
            this.reload();
        }
    }

    reload(){
        this.type = this.types[this.piecetype][this.rotation];
        for(var i=0; i<4; i++){
            this.structure[i].x = this.x+this.type[i][0];
            this.structure[i].y = this.y+this.type[i][1];
        };
    }

    leftRight(dir){
        this.hColision();
        if(this.falling == false){
            if((this.leftTouch == true && dir > 0) ||
               (this.rightTouch == true && dir < 0) ||
               (this.leftTouch == false && this.rightTouch == false)){
                this.x += this.width * dir;
                this.reload();
            }
        }
    }

    rotate(){
        if(this.falling == false){
            var flag = false;
            var dummyrot = this.rotation + 1;
            if(dummyrot == 4){
                dummyrot = 0;
            }

            var dummy = [];
            var dummytype = this.types[this.piecetype][dummyrot];
            for(var i=0; i<4; i++){
                dummy.push(new Sq(this.x + dummytype[i][0],this.y + dummytype[i][1]));
            };

            dummy.forEach(square => {
                if(square.x > width - this.width || square.x < 0 + this.width){
                    flag = true;
                }
            });

            if(flag == false){
                this.rotation += 1;
                if(this.rotation == 4){
                    this.rotation = 0;
                }
                this.reload();
            }
        }
    }

    fall(){
        this.framerate = 1;
        this.falling = true;
    }

    vColision(){
        this.structure.forEach(square => {
            if(square.y == height - this.width){
                this.placed = true;
            }

            placedSQ.forEach(placed => {
                if(square.y == placed.y - this.width && square.x == placed.x){
                    this.placed = true;
                }
            });
        });
    }

    hColision(){
        this.rightTouch = false;
        this.leftTouch = false;

        this.structure.forEach(square => {
            if(square.x == 0){
                this.leftTouch = true;
            }
            else if(square.x == width - this.width){
                this.rightTouch = true;
            }

            placedSQ.forEach(placed => {
                if(square.y == placed.y){
                    if(square.x == placed.x - this.width){
                        this.rightTouch = true;
                    }

                    else if(square.x == placed.x + this.width){
                        this.leftTouch = true;
                    }
                }
            });
        });
    }
}

function setBG(){
    canv.fillStyle = "rgb(17, 17, 17)";
    canv.fillRect(0,0,width,height);
}

function lookForRows(){
    var temp = [];
    for(var i = height - currentTile.width; i >= 0; i -= currentTile.width){
        temp = [];
        placedSQ.forEach(square => {
            if(square.y == i){
                temp.push(square);
            }
        });

        if(temp.length == width/currentTile.width){
            newSQ(i);
            placedSQ.forEach(sq => {
                if(sq.y < i){
                    sq.y += currentTile.width;
                }
            });
            score += width/currentTile.width;
            scoreDiv.innerText = "Score: " + score;
        }
    }
}

function newSQ(index){
    var temp = [];
    placedSQ.forEach(sq => {
        if(sq.y != index){
            temp.push(sq);
        }
    });

    placedSQ = temp;
}

function setup(){
    requestAnimationFrame(main);
    currentTile = new Tile();
}

function main(){
    update();
    draw();
    requestAnimationFrame(main);
}

function update(){
    lookForRows();
    if(currentTile.placed){
        currentTile.structure.forEach(square => {
            placedSQ.push(square);
        });
        currentTile = new Tile;
    }
    currentTile.counter += 1;
    currentTile.move();
    currentTile.vColision()
}

function draw(){
    setBG();
    canv.fillRect(0,0,width,height);
    currentTile.draw();
    placedSQ.forEach(square => {
        square.draw();
    });
}

window.addEventListener("keydown", userControl, false);

function userControl(key){
    if(key.keyCode == '65' || key.keyCode == '37'){ //a or left arrow
        currentTile.leftRight(-1);
    }

    if(key.keyCode == '68' || key.keyCode == '39'){ //d or right arrow
        currentTile.leftRight(1);
    }

    if(key.keyCode == '87' || key.keyCode == '38'){ //w or up arrow
        currentTile.rotate();
    }

    if(key.keyCode == '83' || key.keyCode == '40'){ //s or down arrow
        currentTile.fall();
    }
}


setup();