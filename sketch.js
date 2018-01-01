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
    if(ball.init){
        ball.update();
    }
    console.log(h2d.collisonPoint);

}

function mouseClicked() {
   if(!ball.init){
       ball.init=true;
   }else{
       ball.init=false;
   }   
}
function mouseMoved() {
    if (!ball.init) {
        if (mouseX >= (width - (ball.width / 2))){
            ball.x = width - (ball.width / 2);
        } else if (mouseX <= ball.width / 2){
            ball.x = ball.width / 2;
        }else{
            ball.x=mouseX;
        }
        if (mouseY >= (height - (ball.height / 2))) {
            ball.y = height - (ball.height / 2);
        } else if (mouseY <= ball.height / 2) {
            ball.y = ball.height / 2;
        } else {
            ball.y = mouseY;
        }
    }  
}
// function randomM(min, max) {
//     return Math.random() * (max - min) + min;
// }