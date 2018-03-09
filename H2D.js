function H2D() {

    this.allObjects = [];
    this.collisonPair = {};
    this.currentCollide = null;
    this.collisonPoint = {};

    this.cellHeight;
    this.cellWidth;
    this.rows;
    this.cols;

    this.addElement = (e, detectCollision = false) => {

        e.detectCollision = detectCollision;
        this.allObjects.push(e);

    }

    this.removeElement = (e) => {
        if (this.currentCollide == e)
            this.currentCollide = null;
        this.allObjects.splice(this.allObjects.indexOf(e), 1);
    }

    this.onCollision = (target, objType, callback) => {
        let o = {};
        o[target.constructor.name] = callback;
        this.collisonPair[objType.constructor.name] = o;

    }

    this.objects = (callback) => {
        for (let el of this.allObjects) {
            callback(el);
        }
    }

    this.show = () => {
        for (let i = this.allObjects.length - 1; i >= 0; i--) {
            let beforeLength = this.allObjects.length;
            if (this.allObjects[i].detectCollision) {
                this.checkCollision(this.allObjects[i]);
            }
            let afterLength = this.allObjects.length;
            if (beforeLength == afterLength)
                this.allObjects[i].show();

        }
    }

    this.initMatrix = (cellWidth, cellHeight, screenWidth, screenHeight) => {
        this.cellHeight = cellHeight;
        this.cellWidth = cellWidth;
        this.rows = screenHeight / cellHeight;
        this.cols = screenWidth / cellWidth;
    }

    this.addToMatrix = (obj, detectCollision, row, col, ...args) => {
        let customObj;
        if (args.length > 0) {
            customObj = new obj.constructor(col * this.cellHeight + this.cellHeight / 2
                , row * this.cellWidth + this.cellWidth / 2, ...args);
        } else {
            customObj = new obj.constructor(col * this.cellHeight + this.cellHeight / 2
                , row * this.cellWidth + this.cellWidth / 2);

        }
        customObj.row = row;
        customObj.col = col;
        this.addElement(customObj, detectCollision);

    }

    this.modifyMatrix = (objType, callback) => {
        for (let i = 0; i < this.allObjects.length; i++) {
            if (this.allObjects[i].constructor.name == objType.constructor.name) {
                callback(this.allObjects[i]);
            }
        }
    }

    this.changeMatrixPos = (matrixElement, newRow, newCol) => {
        matrixElement.row = newRow;
        matrixElement.col = newCol;

        matrixElement.y = matrixElement.row * this.cellWidth + this.cellWidth / 2;
        matrixElement.x = matrixElement.col * this.cellHeight + this.cellHeight / 2;
    }

    this.checkCollision = (e) => {
        for (let i = 0; i < this.allObjects.length; i++) {
            let didCollide = false;
            if (this.allObjects[i] == e) continue;
            if (e.y - this.allObjects[i].y <= (this.allObjects[i].height / 2) + (e.height / 2)
                && e.y - this.allObjects[i].y >= 0 && abs(this.allObjects[i].x - e.x) <= (this.allObjects[i].width / 2)) {
                //bottom
                didCollide = true;
                this.collisonPoint.x = e.x;
                this.collisonPoint.y = e.y - (e.height / 2);
                this.collisonPoint.type = "bottom";
              
            }
           else if ( this.allObjects[i].y - e.y <= (this.allObjects[i].height / 2) + (e.height / 2)
                && this.allObjects[i].y - e.y >= 0 && abs(this.allObjects[i].x - e.x) <= (this.allObjects[i].width / 2)) {
                //top
                didCollide = true;
                this.collisonPoint.x = e.x;
                this.collisonPoint.y = e.y + (e.height / 2);
                this.collisonPoint.type = "top";
            }
           else if (this.allObjects[i].x - e.x <= (this.allObjects[i].width / 2) + (e.width / 2)
                && this.allObjects[i].x - e.x >= 0 && abs(this.allObjects[i].y - e.y) <= (this.allObjects[i].height / 2)) {
                //left
                    didCollide = true;
                    this.collisonPoint.x = e.x + (e.width / 2);
                    this.collisonPoint.y = e.y;
                    this.collisonPoint.type = "left";
            }
           else if (e.x - this.allObjects[i].x <= (this.allObjects[i].width / 2) + (e.width / 2)
                && e.x - this.allObjects[i].x >= 0 && abs(this.allObjects[i].y - e.y) <= (this.allObjects[i].height / 2)) {
                //right
                    didCollide = true;
                    this.collisonPoint.x = e.x - (e.width / 2);
                    this.collisonPoint.y = e.y;
                    this.collisonPoint.type = "right";
            }
            else if (this.inSameLine({ x: e.x, o: e, y: e.y }, 
                { x: this.allObjects[i].x, o: this.allObjects[i], y: this.allObjects[i].y },
                { x: this.allObjects[i].x + (this.allObjects[i].width / 2), y: this.allObjects[i].y + (this.allObjects[i].height / 2) })
                || this.inSameLine({ x: e.x, o: e, y: e.y },
                    { x: this.allObjects[i].x, o: this.allObjects[i], y: this.allObjects[i].y },
                    { x: this.allObjects[i].x - (this.allObjects[i].width / 2), y: this.allObjects[i].y + (this.allObjects[i].height / 2) })
                || this.inSameLine({ x: e.x, o: e, y: e.y },
                    { x: this.allObjects[i].x, o: this.allObjects[i], y: this.allObjects[i].y },
                    { x: this.allObjects[i].x - (this.allObjects[i].width / 2), y: this.allObjects[i].y - (this.allObjects[i].height / 2) })
                || this.inSameLine({ x: e.x, o: e, y: e.y },
                    { x: this.allObjects[i].x, o: this.allObjects[i], y: this.allObjects[i].y },
                    { x: this.allObjects[i].x + (this.allObjects[i].width / 2), y: this.allObjects[i].y - (this.allObjects[i].height / 2) }))
            {
                didCollide = true;
                this.collisonPoint.type = "corner";

            }
            if (didCollide) {

                if (this.collisonPair.hasOwnProperty(this.allObjects[i].constructor.name)) {

                    if (this.collisonPair[this.allObjects[i].constructor.name].hasOwnProperty(e.constructor.name)) {
                        //call the callback

                        if (this.currentCollide == null) {

                            this.collisonPair[this.allObjects[i].constructor.name][e.constructor.name](e, this.allObjects[i]);
                            this.currentCollide = this.allObjects[i];
                        }

                    }
                }

            } else {
                if (this.currentCollide == this.allObjects[i]) {
                    this.currentCollide = null;
                }
            }
        }
    }

    this.inSameLine=(pointA,pointB,pointC)=>{
        if(pointA.x * (pointB.y - pointC.y) + pointB.x * (pointC.y - pointA.y)+pointC.x * (pointA.y - pointB.y)==0){
            if (dist(pointA.x, pointA.y, pointB.x, pointB.y) <=(Math.sqrt(Math.pow(pointB.o.width, 2) + Math.pow(pointB.o.height, 2)) / 2)
                + (Math.sqrt(Math.pow(pointA.o.width, 2) + Math.pow(pointA.o.height, 2)) / 2)
            )
            {
                    return true;
            }
        }
        return false;
    }
}
