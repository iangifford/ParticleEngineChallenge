const snowflakeAirResistance = .75;
const snowMass = 0.1;
class snowflakeParticle extends physicsParticle {

    constructor(context, x, y) {
        super(context, x, y);
        this.splat = false;
        this.splatTick = 0;
        this.splatStage = 0;
        this.setSplats();
        this.mass = snowMass * (0.98 + Math.random() / 25) // up to %2 mass diff
        this.airResistance = snowflakeAirResistance * (0.98 + Math.random() / 25) // +- up to 2% resistance randomly
        var randpic = getRandomInt(4);
        var image = new Image();
        this.image = image;
        switch (randpic) {
            case 0:
                image.src = "assets/snow/snowflake0.png"
                break;
            case 1:
                image.src = "assets/snow/snowflake1.png"
                break;
            case 2:
                image.src = "assets/snow/snowflake2.png"
                break;
            case 3:
                image.src = "assets/snow/snowflake3.png"
                break;
        }

    }

    setSplats() {
        this.splat1 = new Image();
        this.splat1.src = "assets/snow/snowsplat1.png";
        this.splat2 = new Image();
        this.splat2.src = "assets/snow/snowsplat2.png";
        this.splat3 = new Image();
        this.splat3.src = "assets/snow/snowsplat3.png";
        this.splat4 = new Image();
        this.splat4.src = "assets/snow/snowsplat4.png";
        this.splat5 = new Image();
        this.splat5.src = "assets/snow/snowsplat5.png";
        this.splat6 = new Image();
        this.splat6.src = "assets/snow/snowsplat6.png";
        this.splat7 = new Image();
        this.splat7.src = "assets/snow/snowsplat7.png";
    }

    tick() {
        if (!this.dead && !this.splat) {
            this.ay = gravity // Currently the only source of vertical acc
            this.ax = windShown / snowMass; //Only horizontal acc
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
            //splatted snowflakes only get horizontal velocity
            this.ax = windShown; //Only horizontal acc
            this.vx += this.ax;
            this.vx *= snowflakeAirResistance;
            this.x += this.vx;
            if (this.splatStage > 5) {
                this.dead = true;
            } else {
                this.splatTick += 1;
                this.splatStage = Math.floor(this.splatTick / 2);
            }

        }
        this.checkCollision();
    }

    checkCollision() {
        if (this.y >= this.context.canvas.height - snowHeight - spriteSize) {
            this.splat = true;
            this.vy = 0;
        }
    }

    draw() {
        switch (this.splatStage) {
            case 0:
                this.context.drawImage(this.image, this.x, this.y);
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