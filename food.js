function Food(x, y,nrBallsAdded) {

    this.x = x;
    this.y = y;
    this.nr=nrBallsAdded;

    this.width = 15;
    this.height = 15;


    this.show =()=>{
        noFill();
        stroke(255);
        ellipse(this.x, this.y, this.width, this.height);

        fill(255);
        textSize(9);
        text(this.nr, this.x-2, this.y+3);
    }

}