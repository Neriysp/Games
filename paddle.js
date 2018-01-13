function Paddle(x, y){
    this.x=x;
    this.y=y;
    this.nrHits=5;
    this.width=50;
    this.height = 50;



    this.show=function(){
        rectMode(CENTER);
        noFill();
        stroke(255);
        rect(this.x, this.y, this.width, this.height);
        fill(255);
        textSize(18);
        text(this.nrHits.toString(), this.x-5, this.y+5);
    }

    this.update=()=>{
        this.x+=0.1;
    }
}