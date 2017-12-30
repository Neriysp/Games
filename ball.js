function Ball() {
    this.x = width/2-15;
    this.y = height-30;

    this.width = 30;
    this.height = 30;
    this.angle=90;
    this.lastPos={
        x:this.x,
        y:this.y
    }

    this.yspeed=-2;
    this.xspeed=5;

    this.show = function () {
        ellipse(this.x, this.y, this.width, this.height);
        this.checkBounds();
    }

    this.update = () => {
        this.y += this.yspeed;
        this.x += this.xspeed;
    }

    this.checkBounds=()=>{
      //  console.log(this.x,this.y);
        if (this.x <= 0 || this.x+this.width >= 500){
            this.fixAngle(true);
        } 
        else if(this.y-30 <= 0 || this.y+this.height >= 510 ){
            this.fixAngle(false);
        }
    }


    this.fixAngle=(side)=>{

            let dx = this.x - this.lastPos.x;
            let dy = this.y - this.lastPos.y;
            let h = Math.sqrt((Math.pow(dx,2) 
                    + Math.pow(dy,2)));
            let angle=Math.asin(dx/h);
        console.log(angle);
            if(side){
                this.xspeed = Math.min(this.xspeed * Math.abs(1.2 * sin(angle)),7)*-1;
                this.yspeed = Math.min(this.yspeed * Math.abs(1.2 * cos(angle)), 7) ;
            }else{
                this.xspeed = Math.min(this.xspeed * Math.abs(1.2 * sin(angle)), 7) ;
                this.yspeed = Math.min(this.yspeed * Math.abs(1.2 * cos(angle)), 7) * -1;
            }

            this.lastPos = {
                x: this.x,
                y: this.y
            }
        }
       
    
}