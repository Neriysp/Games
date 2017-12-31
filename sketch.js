var height = 500;
var width = 500;

var ball = new Ball();
var p = new Paddle(190, 100);
var p2 = new Paddle(250, 100);
var h2d = new H2D();
console.log(p);

h2d.addElement(p, false);
h2d.addElement(p2, false);
h2d.addElement(ball, true);



function setup() {

    createCanvas(500, 500);
    h2d.onCollision(new Ball(),new Paddle(),(ball,paddle)=>{
                h2d.removeElement(paddle);
                ball.velocity*=-1;
    })

}

function draw() {
    background(51);
    fill(255);
    h2d.show();
    ball.update();
   // p.update();

}


// function randomM(min, max) {
//     return Math.random() * (max - min) + min;
// }