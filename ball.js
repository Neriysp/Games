function Ball() {
    this.width = 10;
    this.height = 10;
    this.x = width/2;
    this.y = height-(this.height/2);

    this.init=false;

    this.angle=90;
    this.lastPos={
        x:this.x,
        y:this.y
    }
    this.yspeed=-1;
    this.xspeed=1;

    this.show = function () {
        ellipse(this.x, this.y, this.width, this.height);
        this.checkBounds();
    }

    this.update = () => {
        this.y += this.yspeed;
        this.x += this.xspeed;
    }

    this.checkBounds=()=>{
     
        if (this.x-(this.width/2) < 0 || this.x+(this.width/2) > width){
            this.fixAngle(true);
        } 
        else if (this.y - (this.height / 2) < 0 || this.y + (this.height / 2) > height ){
            this.fixAngle(false);
        }
    }


    this.fixAngle=(side)=>{

            let dx = this.x - this.lastPos.x;
            let dy = this.y - this.lastPos.y;
            let h = Math.sqrt((Math.pow(dx,2) 
                    + Math.pow(dy,2)));
            let angle=Math.acos(dy/h);
       // console.log(angle);
            if(side){
                // this.xspeed = Math.min(this.xspeed * Math.abs(1.2 * sin(angle)),7)*-1;
                // this.yspeed = Math.min(this.yspeed * Math.abs(1.2 * cos(angle)), 7) ;
                this.xspeed *= -1;
            }else{
                // this.xspeed = Math.min(this.xspeed * Math.abs(1.2 * sin(angle)), 7) ;
                // this.yspeed = Math.min(this.yspeed * Math.abs(1.2 * cos(angle)), 7) * -1;
                 this.yspeed *= -1;
            }

            this.lastPos = {
                x: this.x,
                y: this.y
            }
        }
       
    
}