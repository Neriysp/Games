function H2D(){

    this.allObjects=[];
    this.collisonPair={};

    this.addElement = (e,detectCollision)=>{

        e.detectCollision = detectCollision;
        this.allObjects.push(e);
       
    }

    this.onCollision=(target, objType, callback)=>{
        let o={};
        o[objType.constructor.name]=callback;
        this.collisonPair[target.constructor.name]=o;
        
        console.log(this.collisonPair);
    }

    this.show=()=>{
        for (let i = 0; i < this.allObjects.length; i++) {
            if (this.allObjects[i].detectCollision){
                this.checkCollision(this.allObjects[i]);
            }
            this.allObjects[i].show();
            
        };
    }
            
    this.checkCollision=(e)=>{
        for (let i = 0; i < this.allObjects.length; i++) {
            if (this.allObjects[i] == e) continue;
            if (((e.x >= this.allObjects[i].x &&
                e.x <= this.allObjects[i].x + this.allObjects[i].width)
                || (e.x + e.width >= this.allObjects[i].x &&
                e.x + e.width <= this.allObjects[i].x + this.allObjects[i].width))
                &&
                ((e.y >= this.allObjects[i].y &&
                e.y <= this.allObjects[i].y + this.allObjects[i].height)
                || (e.y + e.height >= this.allObjects[i].y &&
                e.y + e.height <= this.allObjects[i].y + this.allObjects[i].height))) {

                if (this.collisonPair.hasOwnProperty(e.constructor.name)){

                    if (this.collisonPair[e.constructor.name].hasOwnProperty(this.allObjects[i].constructor.name)) {
                        this.collisonPair[e.constructor.name][this.allObjects[i].constructor.name]();
                    }
                }
            
        }
    }
}
}