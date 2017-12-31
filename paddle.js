function Paddle(x, y){
    this.x=x;
    this.y=y;
    
    this.width=30;
    this.height = 30;



    this.show=function(){
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
    }

    this.update=()=>{
        this.x+=0.1;
    }
}