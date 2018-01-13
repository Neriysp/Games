function H2D(){

    this.allObjects=[];
    this.collisonPair={};
    this.currentCollide=null;
    this.collisonPoint={};

    this.cellHeight;
    this.cellWidth;
    this.rows;
    this.cols;

    this.addElement = (e,detectCollision=false)=>{

        e.detectCollision = detectCollision;
        this.allObjects.push(e);
       
    }

    this.removeElement=(e)=>{
        if(this.currentCollide==e)
            this.currentCollide=null;
        this.allObjects.splice(this.allObjects.indexOf(e),1);
    }

    this.onCollision=(target, objType, callback)=>{
        let o={};
        o[objType.constructor.name]=callback;
        this.collisonPair[target.constructor.name]=o;
        
    }

    this.show=()=>{
        for (let i = this.allObjects.length-1; i >=0; i--) {
            let beforeLength=this.allObjects.length;
            if (this.allObjects[i].detectCollision){
                this.checkCollision(this.allObjects[i]);
            }
            let afterLength = this.allObjects.length;
            if(beforeLength==afterLength)
                this.allObjects[i].show();
            
        };
    }
    
    this.initMatrix=(cellWidth,cellHeight,screenWidth,screenHeight)=>{
        this.cellHeight=cellHeight;
        this.cellWidth=cellWidth;
        this.rows = screenWidth/cellWidth;
        this.cols = screenHeight/cellHeight;
    }
    
    this.addToMatrix=(row,col,obj,detectCollision=false)=>{
        let customObj = new obj.constructor(row*this.cellWidth+this.cellWidth/2
                                    ,col*this.cellHeight+this.cellHeight/2);
        this.addElement(customObj,detectCollision);

    }


    this.checkCollision=(e)=>{
        for (let i = 0; i < this.allObjects.length; i++) {
            let didCollide=false;
            let bot=false;
            let top = false;
            if (this.allObjects[i] == e) continue;
            if (((e.x - (e.width / 2) >= this.allObjects[i].x - (this.allObjects[i].width / 2) &&
                e.x - (e.width / 2) <= this.allObjects[i].x + (this.allObjects[i].width / 2))
                && (e.y - (e.height / 2) <= this.allObjects[i].y + (this.allObjects[i].height / 2))
                && e.y + (e.height / 2) > this.allObjects[i].y + (this.allObjects[i].height / 2))
                || ((e.x + (e.width / 2) >= this.allObjects[i].x - (this.allObjects[i].width / 2) &&
                    e.x + (e.width / 2) <= this.allObjects[i].x + (this.allObjects[i].width / 2))
                && (e.y - (e.height / 2) <= this.allObjects[i].y + (this.allObjects[i].height / 2))
                && e.y + (e.height / 2) > this.allObjects[i].y + (this.allObjects[i].height / 2))){
                    //bottom
                if (e.y > this.allObjects[i].y + (this.allObjects[i].height / 2)){   
                    bot = true;
                    console.log('bottom');
                    didCollide=true;
                    this.collisonPoint.x = e.x;
                    this.collisonPoint.y = e.y - (e.height / 2);
                    this.collisonPoint.side = false;
                    }
                } 
             if (((e.x - (e.width / 2) >= this.allObjects[i].x - (this.allObjects[i].width / 2) &&
                e.x - (e.width / 2) <= this.allObjects[i].x + (this.allObjects[i].width / 2))
                && (e.y - (e.height / 2) < this.allObjects[i].y - (this.allObjects[i].height / 2))
                && e.y + (e.height / 2) >= this.allObjects[i].y - (this.allObjects[i].height / 2))
                || ((e.x + (e.width / 2) >= this.allObjects[i].x - (this.allObjects[i].width / 2) &&
                    e.x + (e.width / 2) <= this.allObjects[i].x + (this.allObjects[i].width / 2))
                && (e.y - (e.height / 2) < this.allObjects[i].y - (this.allObjects[i].height / 2))
                && e.y + (e.height / 2) >= this.allObjects[i].y - (this.allObjects[i].height / 2))) {
                    //top
                    
                 if (e.y < this.allObjects[i].y - (this.allObjects[i].height / 2)) { 
                    top=true;
                    console.log('top');
                    didCollide = true;
                    this.collisonPoint.x = e.x;
                    this.collisonPoint.y = e.y + (e.height / 2);
                    this.collisonPoint.side = false;
                 }
                }
             if (((e.x - (e.width / 2) < this.allObjects[i].x - (this.allObjects[i].width / 2) &&
                e.x + (e.width / 2) >= this.allObjects[i].x - (this.allObjects[i].width / 2))
                && (e.y - (e.height / 2) <= this.allObjects[i].y + (this.allObjects[i].height / 2))
                && e.y - (e.height / 2) >= this.allObjects[i].y - (this.allObjects[i].height / 2))
                || ((e.x - (e.width / 2) < this.allObjects[i].x - (this.allObjects[i].width / 2) &&
                    e.x + (e.width / 2) >= this.allObjects[i].x - (this.allObjects[i].width / 2))
                && (e.y + (e.height / 2) <= this.allObjects[i].y + (this.allObjects[i].height / 2))
                && e.y + (e.height / 2) >= this.allObjects[i].y - (this.allObjects[i].height / 2))) {
                    //left
                 if (!bot && !top){ 
                            console.log('left');
                            didCollide = true;
                            this.collisonPoint.x = e.x + (e.width / 2);
                            this.collisonPoint.y = e.y;
                            this.collisonPoint.side = true;
                        
                }  
            }
             if (((e.x - (e.width / 2) <= this.allObjects[i].x + (this.allObjects[i].width / 2) &&
                e.x + (e.width / 2) > this.allObjects[i].x + (this.allObjects[i].width / 2))
                && (e.y - (e.height / 2) <= this.allObjects[i].y + (this.allObjects[i].height / 2))
                && e.y - (e.height / 2) >= this.allObjects[i].y - (this.allObjects[i].height / 2))
                || ((e.x - (e.width / 2) <= this.allObjects[i].x + (this.allObjects[i].width / 2) &&
                    e.x + (e.width / 2) > this.allObjects[i].x + (this.allObjects[i].width / 2))
                && (e.y + (e.height / 2) <= this.allObjects[i].y + (this.allObjects[i].height / 2))
                && e.y + (e.height / 2) >= this.allObjects[i].y - (this.allObjects[i].height / 2))) {
                    //right
                 if (!bot && !top) { 
                         console.log('right');
                         didCollide = true;
                         this.collisonPoint.x = e.x - (e.width / 2);
                         this.collisonPoint.y = e.y;
                         this.collisonPoint.side = true;
                     }
            }
            if (didCollide){

                if (this.collisonPair.hasOwnProperty(e.constructor.name)){
                    
                    if (this.collisonPair[e.constructor.name].hasOwnProperty(this.allObjects[i].constructor.name)) {
                        //call the callback
                       
                        if(this.currentCollide==null){
                            
                    
                            this.collisonPair[e.constructor.name][this.allObjects[i].constructor.name](e, this.allObjects[i]);
                            this.currentCollide = this.allObjects[i];
                    }
                        
                    }
                }
            
        }else{
                if (this.currentCollide == this.allObjects[i]){
                    this.currentCollide = null;
                }
        }
    }
}
}
