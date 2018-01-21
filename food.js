function Food(x, y,nrBallsAdded) {

    this.x = x;
    this.y = y;
    this.nr=nrBallsAdded;

    this.width = 20;
    this.height = 20;


    this.show =()=>{
        noFill();
        strokeWeight(2);
        stroke(255);
        ellipse(this.x, this.y, this.width, this.height);
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.width-10, this.height-10);
    }

}