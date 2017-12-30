var height = 500;
var width = 500;

var ball = new Ball();
var p = new Paddle(100, 100);
var p2 = new Paddle(180, 100);
var h2d = new H2D();
console.log(p);
h2d.addElement(p, true);
h2d.addElement(p2, false);
h2d.addElement(ball, true);



function setup() {

    createCanvas(500, 500);

}

function draw() {
    background(51);
    fill(255);
    h2d.show();

    //p.update();

}


// function randomM(min, max) {
//     return Math.random() * (max - min) + min;
// }