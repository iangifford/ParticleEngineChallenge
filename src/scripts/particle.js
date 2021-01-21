const airResistance = .98;
const defaultMass = 1;
//default particle
//usable for testing, but just a black square
class physicsParticle {

    constructor(context, x, y) {
            this.x = x;
            this.y = y;
            this.vx = 0;
            this.vy = 0;
            this.ax = 0;
            this.ay = 0;
            this.mass = defaultMass;
            this.airResistance = airResistance;
            this.context = context;
            this.dead = false;
            this.objectCollision = false;


            this.image = new Image();
            this.image.src = "assets/defaultparticle.png";

        }
        //draw function (called each tick)
    draw() {
            this.context.drawImage(this.image, this.x, this.y);
        }
        //update the particle each tick (position, acc, vel, etc)
    tick() {
        if (!this.dead) {
            this.ay = gravity // Currently the only source of vertical acc for this
            this.ax = windShown; //Only horizontal acc
            this.vx += this.ax;
            this.vx *= airResistance;
            this.vy += this.ay;
            this.vy *= airResistance;
            this.x += this.vx;
            this.y += this.vy;
            if (this.vy > this.terVel) {
                this.vy = this.terVel;
            }
            //console.log(this.y);
            if (this.y > context.canvas.height + death_barrier) {
                this.dead = true;
            }
        }
        this.checkCollision();
    }

    checkCollision() {

    }
}