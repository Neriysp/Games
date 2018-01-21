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
        // o[objType.constructor.name]=callback;
        // this.collisonPair[target.constructor.name]=o;
        o[target.constructor.name] = callback;
        this.collisonPair[objType.constructor.name] = o;
        
    }

    this.objects=(callback)=>{
        for(let el of this.allObjects){
            callback(el);
        }
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
            
        }
    }
    
    this.initMatrix=(cellWidth,cellHeight,screenWidth,screenHeight)=>{
        this.cellHeight=cellHeight;
        this.cellWidth=cellWidth;
        this.rows = screenHeight / cellHeight; 
        this.cols = screenWidth / cellWidth;
    }
    
    this.addToMatrix = (obj, detectCollision,row,col,...args)=>{
        let customObj;
        if(args.length>0){
            customObj = new obj.constructor(col * this.cellHeight + this.cellHeight/2
                , row * this.cellWidth + this.cellWidth/2,...args);
        }else{
            customObj = new obj.constructor(col * this.cellHeight + this.cellHeight / 2
                , row * this.cellWidth + this.cellWidth / 2);

        }
        customObj.row=row;
        customObj.col=col;
        this.addElement(customObj, detectCollision);

    }

    this.modifyMatrix=(objType,callback)=>{
        for(let i=0;i<this.allObjects.length;i++){
            if(this.allObjects[i].constructor.name==objType.constructor.name){
                callback(this.allObjects[i]);
            }
        }
    }

    this.changeMatrixPos=(matrixElement,newRow,newCol)=>{
        matrixElement.row=newRow;
        matrixElement.col=newCol;

        matrixElement.y = matrixElement.row * this.cellWidth + this.cellWidth / 2; 
        matrixElement.x = matrixElement.col * this.cellHeight + this.cellHeight / 2;
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
                   // console.log('bottom');
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
                   // console.log('top');
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
                          //  console.log('left');
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
                        // console.log('right');
                         didCollide = true;
                         this.collisonPoint.x = e.x - (e.width / 2);
                         this.collisonPoint.y = e.y;
                         this.collisonPoint.side = true;
                     }
            }
            if (didCollide){

                if (this.collisonPair.hasOwnProperty(this.allObjects[i].constructor.name)){
                    
                    if (this.collisonPair[this.allObjects[i].constructor.name].hasOwnProperty(e.constructor.name)) {
                        //call the callback
                       
                        if(this.currentCollide==null){
                            
                    
                            this.collisonPair[this.allObjects[i].constructor.name][e.constructor.name](e, this.allObjects[i]);
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
