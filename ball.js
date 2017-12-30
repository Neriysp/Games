function Ball() {
    this.x = width/2-15;
    this.y = height-30;

    this.width = 30;
    this.height = 30;
    
    
    this.velocity=5;

    this.show = function () {
        ellipse(this.x, this.y, this.width, this.height);
    }

    this.update = () => {
        this.x += 0.1;
    }
}