function Ball() {
    this.width = 10;
    this.height = 10;
    this.x = width/2;
    this.y = height-(this.height/2);

    this.init = {
        initDrag:false,
        initRelease:false,
        initX:-1,
        initY:-1
        };

    this.angle=90;
    this.lastPos={
        x:this.x,
        y:this.y
    }
    this.yspeed=-1;
    this.xspeed=1;

    this.initState=function(){
        if (this.init.initX == -1 && this.init.initY == -1) {
            this.init.initX = mouseX;
            this.init.initY = mouseY;
        }
        let dx = mouseX - this.init.initX;
        let dy = this.init.initY - mouseY;
        let newX = this.x - dx;
        let newY = this.y + dy;
        let hypotenuse = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        let angle = atan(dy / dx);
        if(angle){
        if(newX<this.x){
            angle=PI-angle;
        }
        this.yspeed = Math.min(0.05 * hypotenuse * sin(angle),9);
        this.xspeed = Math.min(0.05 * hypotenuse* cos(angle),9);
       
        stroke(255);
        line(this.x, this.y, newX, newY);
        this.init.initDrag=true;
         }
        // console.log('dx:' + dx + ' dy:' + dy + ' newX:' + newX + ' newY:' + newY);
        // console.log(hypotenuse, 0.01 * hypotenuse * sin(angle), 0.01 * hypotenuse * cos(angle));
    }

    this.show = () => {
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

            if(side){

                this.xspeed *= -1;
            }else{

                 this.yspeed *= -1;
            }

            this.lastPos = {
                x: this.x,
                y: this.y
            }
        }
       
    
}