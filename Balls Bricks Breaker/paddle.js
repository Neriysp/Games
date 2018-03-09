function Paddle(x, y,nrHits){
    this.x=x;
    this.y=y;
    this.nrHits=nrHits;
    this.width=60;
    this.height = 60;
    this.colors = ['#CB044D', '#A70D79', '#18579A', '#B7BC43', '#F38A87', '#31A8A0', '#E64243','#95B825'];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];;

    this.show=function(){
        if(this.row==h2d.rows-1){
            showEndGame("GAME LOST");
        }else{
        rectMode(CENTER);
        fill(this.color);
        stroke(35, 41, 51);
        rect(this.x, this.y, this.width-1, this.height-1);
        noStroke();
        fill(255);
        textSize(16);
        textAlign(CENTER);
        text(this.nrHits.toString(), this.x, this.y+5);
        }
    }
    
}