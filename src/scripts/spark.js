const sparkAirResistance = .96;
const sparkMass = 1.9;
const maxBurn = 1;
const burnDecr = 0.1;
//spark that comes out of the back of fireworks as it zooms up
class sparkParticle extends physicsParticle {

    constructor(context, x, y, initialVX, initialVY) {
        super(context, x, y);
        this.burnTick = maxBurn;
        this.mass = sparkMass;
        this.airResistance = sparkAirResistance * (0.98 + Math.random() / 25); // +- up to 2% resistance randomly
        this.vx = initialVX;
        this.vy = initialVY;
        var randpic = getRandomInt(3);
        var image = new Image();
        this.image = image;
        switch (randpic) {
            case 0:
                image.src = "assets/fireworks/spark0.png"
                break;
            case 1:
                image.src = "assets/fireworks/spark1.png"
                break;
            case 2:
                image.src = "assets/fireworks/spark2.png"
                break;
        }

    }

    //update particle
    tick() {
        if (!this.dead) {
            this.ay = gravity; // Currently the only source of vertical acc
            this.ax = windShown / sparkMass; //Only horizontal acc
            this.vx *= this.airResistance;
            this.vy *= this.airResistance;
            this.vx += this.ax;
            this.vy += this.ay;
            this.x += this.vx;
            this.y += this.vy;
            //console.log(this.y);

            this.burnTick -= burnDecr;
            if (this.burnTick <= 0) {
                this.dead = true;
            }
        }
    }

    //draw particle
    draw() {


        if (!this.dead) {
            var movementAngle = Math.atan(-this.vx / this.vy);
            context.save(); //sacve and restore to prevent context drift
            context.translate(this.x, this.y);
            context.rotate(movementAngle); //turn with momentum
            if (this.burnTick > 0) {
                context.globalAlpha = this.burnTick / maxBurn;
            }
            this.context.drawImage(this.image, 0, 0);
            context.restore();
        }




    }
}