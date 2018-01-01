function H2D(){

    this.allObjects=[];
    this.collisonPair={};
    this.currentCollide=null;


    this.addElement = (e,detectCollision=false)=>{

        e.detectCollision = detectCollision;
        this.allObjects.push(e);
       
    }

    this.removeElement=(e)=>{
        this.allObjects.splice(this.allObjects.indexOf(e),1);
    }

    this.onCollision=(target, objType, callback)=>{
        let o={};
        o[objType.constructor.name]=callback;
        this.collisonPair[target.constructor.name]=o;
        
        console.log(this.collisonPair);
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
            
    this.checkCollision=(e)=>{
        for (let i = 0; i < this.allObjects.length; i++) {
            if (this.allObjects[i] == e) continue;
            if (((e.x - (e.width / 2) >= this.allObjects[i].x - (this.allObjects[i].width / 2) &&
                e.x - (e.width / 2) <= this.allObjects[i].x + (this.allObjects[i].width / 2))
                || (e.x + (e.width / 2) >= this.allObjects[i].x - (this.allObjects[i].width / 2) &&
                e.x + (e.width / 2) <= this.allObjects[i].x + (this.allObjects[i].width / 2)))
                &&
               ((e.y - (e.height / 2) >= this.allObjects[i].y - (this.allObjects[i].height / 2) &&
                e.y - (e.height / 2) <= this.allObjects[i].y + (this.allObjects[i].height / 2))
                || (e.y + (e.height / 2) >= this.allObjects[i].y - (this.allObjects[i].height / 2) &&
                e.y + (e.height / 2) <= this.allObjects[i].y + (this.allObjects[i].height / 2)))) {

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