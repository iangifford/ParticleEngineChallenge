const burstAirResistance = .999;
const burstMass = 2.5;
const burstLength = 3;
const heat = -.99
class burstParticle extends physicsParticle {

    constructor(context, x, y, initialVX, initialVY, duration, color) {
        super(context, x, y);
        this.burnTick = duration;
        this.maxDuration = duration;
        this.mass = burstMass;
        this.airResistance = burstAirResistance * (0.99 + Math.random() / 50); // +- up to 2% resistance randomly
        this.vx = initialVX;
        this.vy = initialVY;
        var image = new Image();
        this.image = image;
        switch (color) {
            case 0:
                image.src = "assets/fireworks/burst0.png"
                break;
            case 1:
                image.src = "assets/fireworks/burst1.png"
                break;
            case 2:
                image.src = "assets/fireworks/burst2.png"
                break;
            case 3:
                image.src = "assets/fireworks/burst3.png"
                break;
            case 4:
                image.src = "assets/fireworks/burst4.png"
                break;
        }

    }


    tick() {
        if (!this.dead) {
            this.ay = gravity + heat; // heat because sparks float from heat or something
            this.ax = windShown / burstMass; //Only horizontal acc
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


    draw() {


        if (!this.dead) {
            var movementAngle = Math.atan(-this.vx / this.vy);
            context.save();
            context.translate(this.x - (spriteSize / 2), this.y + (spriteSize / 2));
            context.rotate(movementAngle);
            context.translate(-spriteSize / 2, -spriteSize + burstLength);
            if (this.burnTick > 0) {
                context.globalAlpha = this.burnTick / this.maxDuration;
            }
            this.context.drawImage(this.image, 0, 0);
            context.restore();
        }




    }
}