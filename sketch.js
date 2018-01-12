var height = 500;
var width = 500;

var ball = new Ball();
var p = new Paddle(190, 100);
var p2 = new Paddle(220, 100);
var h2d = new H2D();
console.log(p);

h2d.addElement(p);
h2d.addElement(p2);
h2d.addElement(ball, true);



function setup() {

    createCanvas(500, 500);
    h2d.onCollision(new Ball(),new Paddle(),(ball,paddle)=>{

                if(paddle.nrHits-1>0){
                    paddle.nrHits--;
                }else{        
                    h2d.removeElement(paddle);
                }
                if(h2d.collisonPoint.side){
                  ball.xspeed*=-1;  
                }else{
                    ball.yspeed*=-1;
                }
    });
 
}

function draw() {
    background(51);
    fill(255);
    h2d.show();
    if (ball.init.initRelease){
        ball.update();
    }
    if (mouseIsPressed && !ball.init.initRelease) {
        // ball.x=mouseX;
        // ball.y=mouseY;
        ball.initState();
    } 
}

function mouseReleased() {
    if (!ball.init.initRelease && ball.init.initDrag){

        ball.init.initRelease = true;
    }
}
