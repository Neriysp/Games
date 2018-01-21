function Ball(xspeed, yspeed) {
this.width = 10;
this.height = 10;
this.x = width / 2;
this.y = height - (this.height / 2);

this.init = {
    initDrag: false,
    initRelease: false,
    initX: -1,
    initY: -1
};
this.velocityInit = {
    xSpeedInit: -1,
    ySpeedInit: -1
}

this.angle = 90;
this.lastPos = {
    x: this.x,
    y: this.y
}
this.yspeed = yspeed;
this.xspeed = xspeed;

this.passedBottomBorder = false;
this.started = false;

this.initState = function () {
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

    if (angle) {
        if (newX < this.x) {
            angle = PI - abs(angle);
        }
        let coefficient = 0.02;
        if (abs(coefficient * hypotenuse * sin(angle)) <= 5) {
            this.yspeed = -1 * Math.abs(coefficient * hypotenuse * sin(angle));
        }
        if (coefficient * hypotenuse * cos(angle) >= 0) {
            if (coefficient * hypotenuse * cos(angle) <= 5)
                this.xspeed = coefficient * hypotenuse * cos(angle);
        } else {
            if (coefficient * hypotenuse * cos(angle) >= -5)
                this.xspeed = coefficient * hypotenuse * cos(angle);
        }
        // console.log(this.xspeed,this.yspeed,180*angle/PI);
        stroke(255);
        let lineSlope = (newY - this.y) / (newX - this.x);
        let lineLength = dist(this.x, this.y, newX, newY);

        if (lineLength > 50) {
            let newPoint = this.getLongestLineLength(lineSlope);

            if (lineSlope > 0) {
                line(this.x, this.y, this.x - newPoint.x, this.y - newPoint.y);
            } else {
                line(this.x, this.y, this.x + newPoint.x, this.y + newPoint.y);
            }
        } else {
            line(this.x, this.y, newX, newY);
        }


        this.init.initDrag = true;
    }
    // console.log('dx:' + dx + ' dy:' + dy + ' newX:' + newX + ' newY:' + newY);
    // console.log(hypotenuse, 0.01 * hypotenuse * sin(angle), 0.01 * hypotenuse * cos(angle));
}

this.show = () => {
    if (this.x < 500-this.width/2 && this.x > this.width/2 && this.y <= 500) {
        if (this.y + (this.height / 2) + 2 < 500) {
            this.started = true;
        }
        ellipse(this.x, this.y, this.width, this.height);
    }
    if(this.started){
        this.checkBounds();
    }
   
}

this.update = () => {
    this.y += this.yspeed;
    this.x += this.xspeed;
}

this.checkBounds = () => {

    if (this.x - (this.width / 2) < 0 || this.x + (this.width / 2) > width) {
        this.fixAngle(true);
    } else if (this.y - (this.height / 2) < 0) {
        this.fixAngle(false);
    } else if (this.y > height + (this.height / 2) && this.started) {

        if (nrBallsOut == ballArr.length + 1) {
            ball.resetPosition();
        } else {
            if (!this.passedBottomBorder) {
                nrBallsOut++;
            }
            this.passedBottomBorder = true;
        }

    }

}

this.resetPosition = () => {
    nrBallsOut = 0;
    for (let i = 0; i < ballArr.length; i++) {
        ballArr[i].passedBottomBorder = false;
        ballArr[i].started = false;
    }
    this.xspeed = 0;
    this.yspeed = 0;
    this.init.initDrag = false;
    this.init.initRelease = false;
    this.init.initX = -1;
    this.init.initY = -1;
    this.x = width / 2;
    this.y = height - (this.height / 2);
    this.passedBottomBorder = false;
    this.started = false;
    h2d.modifyMatrix(new Paddle(), (e) => {
        h2d.changeMatrixPos(e, e.row + 1, e.col);
    });
    h2d.modifyMatrix(new Food(), (e) => {
        h2d.changeMatrixPos(e, e.row + 1, e.col);
    });
    let hole = Math.floor(Math.random() * h2d.cols);
    let food = Math.random();
    let firstRowEmpty = true;
    h2d.objects((e) => {
        if (e.row == 1) {
            firstRowEmpty = false;
        }
    });
    if (firstRowEmpty) {
        for (let j = 0; j < h2d.cols; j++) {
            if (j != hole) {
                let number = Math.floor(stack / 2 + Math.random() * (stack + stack / 2));
                h2d.addToMatrix(new Paddle(), false, 0, j, number);
            } else {
                if (food < 0.5) {

                    h2d.addToMatrix(new Food(), false, 0, j, 5);
                }
            }

        }
    }
}

this.fixAngle = (side) => {

    if (side) {

        this.xspeed *= -1;
    } else {

        this.yspeed *= -1;
    }

    this.lastPos = {
        x: this.x,
        y: this.y
    }
}

this.getLongestLineLength = (k) => {
    let dx = Math.sqrt(2500 / (1 + Math.pow(k, 2)));
    let dy = k * dx;

    return {
        x: dx,
        y: dy
    };
}

}