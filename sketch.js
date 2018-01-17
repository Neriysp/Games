var height = 500;
var width = 500;

var ball = new Ball();
var p = new Paddle(190, 100);
var p2 = new Paddle(220, 100);
var h2d = new H2D();
var stack=5;
console.log(p);
var ballArr = [];
var nrBallsOut = 0;

h2d.addElement(ball, true);

function setup() {
    h2d.initMatrix(50,50,500,500);

    for(let i=0;i<h2d.rows;i++){

        let hole = Math.floor(Math.random() * h2d.cols);
        let food= Math.random();

        if(i%2==0 && i<5){
            for(let j=0;j<h2d.cols;j++){
                if(j!= hole){
                    h2d.addToMatrix(new Paddle(),false,i,j);
                }else{
                    if(food<1){
                        h2d.addToMatrix(new Food(),false,i,j,5);
                    }
                }
                
            }
    }
    }
    createCanvas(500, 500);
    h2d.onCollision(new Ball(),new Paddle(),(ball,paddle)=>{

                if(paddle.nrHits>1){
                    paddle.nrHits--;
                }else{        
                    h2d.removeElement(paddle);
                    let gameWon=true;
                    for (let i of h2d.allObjects) {
                        if (i.constructor.name == 'Paddle') 
                            gameWon=false;
                    }
                    if(gameWon){
                        showEndGame("GAME WON");
                    }
                }
                if(h2d.collisonPoint.side){
                  ball.xspeed*=-1;  
                }else{
                    ball.yspeed*=-1;
                }
    });

    h2d.onCollision(new Ball(), new Food(), (ball, food) => {

        stack+=food.nr;

        h2d.removeElement(food);
    });
 
}
function showEndGame(result){
    fill(255);
    textSize(28);
    text(result, width / 3, height / 3);
    if (document.getElementsByTagName('button').length == 0) {
        button = createButton('Try Again');
        button.mousePressed(reloadGame);
    }
}

function reloadGame(){
        location.reload();
}

function draw() {
    background(51);
    fill(255);
    h2d.show();
    if (ball.init.initRelease){
        ball.update();
        for(let i=0;i<ballArr.length;i++){
                ballArr[i].update();
        }
    }
    if (mouseIsPressed && !ball.init.initRelease) {
        ball.initState();
    } 
    textSize(8);
    text('x' + stack, width / 2 + 20, height - 3);
}

function mouseReleased() {
    if (!ball.init.initRelease && ball.init.initDrag){
        ball.velocityInit.xSpeedInit = ball.xspeed;
        ball.velocityInit.ySpeedInit = ball.yspeed;
        let length = stack - 1;
        for (let i = ballArr.length; i < length;i++){
            let newball = new Ball(ball.velocityInit.xSpeedInit, ball.velocityInit.ySpeedInit);
            newball.x = ball.x - ((i + 1) * ball.velocityInit.xSpeedInit)*ball.width/2;
            newball.y = ball.y + ((i + 1) * Math.abs(ball.velocityInit.ySpeedInit))*ball.height/2;
            ballArr.push(newball);
            h2d.addElement(newball, true);
        }
        for (let i = 0; i < ballArr.length;i++){
            ballArr[i].xspeed = ball.velocityInit.xSpeedInit;
            ballArr[i].yspeed = ball.velocityInit.ySpeedInit;
            ballArr[i].x = ball.x - ((i + 1) * ball.velocityInit.xSpeedInit) * ball.width / 2;
            ballArr[i].y = ball.y + ((i + 1) * Math.abs(ball.velocityInit.ySpeedInit)) * ball.height / 2;
        }
        ball.init.initRelease = true;
    }
}
