const raindropAirResistance = .96;
const rainMass = 5;
class raindropParticle extends physicsParticle {

    constructor(context, x, y) {
        super(context, x, y);
        this.splat = false;
        this.splatTick = 0;
        this.splatStage = 0;
        this.setSplats();
        this.mass = rainMass
        this.airResistance = raindropAirResistance * (0.98 + Math.random() / 25) // +- up to 2% resistance randomly

        var randpic = getRandomInt(3);
        var image = new Image();
        this.image = image;
        switch (randpic) {
            case 0:
                image.src = "assets/rain/raindrop0.png"
                break;
            case 1:
                image.src = "assets/rain/raindrop1.png"
                break;
            case 2:
                image.src = "assets/rain/raindrop2.png"
                break;
        }

    }

    setSplats() {
        this.splat1 = new Image();
        this.splat1.src = "assets/rain/rainsplat1.png";
        this.splat2 = new Image();
        this.splat2.src = "assets/rain/rainsplat2.png";
        this.splat3 = new Image();
        this.splat3.src = "assets/rain/rainsplat3.png";
        this.splat4 = new Image();
        this.splat4.src = "assets/rain/rainsplat4.png";
        this.splat5 = new Image();
        this.splat5.src = "assets/rain/rainsplat5.png";
        this.splat6 = new Image();
        this.splat6.src = "assets/rain/rainsplat6.png";
        this.splat7 = new Image();
        this.splat7.src = "assets/rain/rainsplat7.png";
    }

    tick() {
        this.checkCollision();
        if (!this.dead && !this.splat) {
            this.ay = gravity; // Currently the only source of vertical acc
            this.ax = windShown / rainMass; //Only horizontal acc
            this.vx *= this.airResistance;
            this.vy *= this.airResistance;
            this.vx += this.ax;
            this.vy += this.ay;
            this.x += this.vx;
            this.y += this.vy;
            //console.log(this.y);
            if (this.y > context.canvas.height + death_barrier) {
                this.dead = true;
            }
        } else if (this.splat) {
            //splatted rain has no velocity, no updates to anything. maintain velocity for angle calcs
            if (this.splatStage > 5) {
                this.dead = true;
            } else {
                this.splatTick += 1;
                this.splatStage = Math.floor(this.splatTick / 1);
            }

        }
    }

    checkCollision() {
        if (this.y >= this.context.canvas.height - spriteSize - rainHeight) {
            this.splat = true;
            //this.y = context.canvas.height - rainHeight;
            this.vx = 0;
            this.vy = 0;
            this.y = context.canvas.height - spriteSize - rainHeight;
        }
    }

    draw() {


        switch (this.splatStage) {
            case 0:
                var movementAngle = Math.atan(-this.vx / this.vy);
                context.save();
                context.translate(this.x, this.y);
                context.rotate(movementAngle);
                this.context.drawImage(this.image, 0, 0);
                context.restore();
                break;
            case 1:
                this.context.drawImage(this.splat1, this.x, this.y);
                break;
            case 2:
                this.context.drawImage(this.splat2, this.x, this.y);
                break;
            case 3:
                this.context.drawImage(this.splat3, this.x, this.y);
                break;
            case 4:
                this.context.drawImage(this.splat4, this.x, this.y);
                break;
            case 5:
                this.context.drawImage(this.splat5, this.x, this.y);
                break;
            case 6:
                this.context.drawImage(this.splat6, this.x, this.y);
                break;
            case 7:
                this.context.drawImage(this.splat7, this.x, this.y);
                break;
        }


    }
}