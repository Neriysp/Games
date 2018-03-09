var height = 600;
var width = 600;

var ball = new Ball();
var h2d = new H2D();
var stack=5;
var ballArr = [];
var nrBallsOut = 0;

h2d.addElement(ball, true);

function setup() {
    h2d.initMatrix(60,60,600,600);
    for(let i=0;i<h2d.rows;i++){

        let hole = Math.floor(Math.random() * h2d.cols);
        let food= Math.random();

        if(i%2==0 && i<5){
            for(let j=0;j<h2d.cols;j++){
                if(j!= hole){
                    let number = Math.ceil(stack / 2 + Math.random() * (stack + stack / 2))+1;
                    h2d.addToMatrix(new Paddle(), false, i, j, number);
                }else{
                    if(food<0.8){
                        h2d.addToMatrix(new Food(),false,i,j,5);
                    }
                }
                
            }
    }
    }
    createCanvas(600, 600);
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
             if (h2d.collisonPoint.type == "right" || h2d.collisonPoint.type == "left"){
                  ball.xspeed*=-1;  
                 } else if (h2d.collisonPoint.type=="corner"){
                    ball.xspeed *= -1;  
                    ball.yspeed *= -1;
                }
                else if (h2d.collisonPoint.type == "top" || h2d.collisonPoint.type == "bottom"){
                    ball.yspeed*=-1;
                }
    });

    h2d.onCollision(new Ball(), new Food(), (ball, food) => {

        stack+=food.nr;

        h2d.removeElement(food);
    });
 
}
function showEndGame(result){
    noLoop();
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
    background(35, 41, 51);
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
    strokeWeight(1);
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
