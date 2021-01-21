const fireworkAirResistance = .995;
const fireworkMass = 2;
const fireworkThrust = -.3;
const fireworkMaxHeight = 0.35; //maximum percentage of the screen height they can travel to (from the top)
const sparksPerTick = 4;
const maxOffset = 3;
const minExplosionParticles = 50;
const maxExplosionParticles = 100;
const sheepParticlesMin = 150;
const sheepParticlesMax = 250;
const explosionPower = 0.8;
const minExplosionDuration = 6;
const maxExplosionDuration = 10;
const sheepDuration = 12;
const sheepExplosionPower = 0.8;
class rocketParticle extends physicsParticle {

    constructor(context, x, y) {
        super(context, x, y);
        this.splat = false;
        this.splatTick = 0;
        this.splatStage = 0;
        this.mass = fireworkMass
        this.airResistance = fireworkAirResistance * (0.98 + Math.random() / 25); // +- up to 2% resistance randomly
        this.thrust = fireworkThrust * (0.98 + Math.random() / 25);
        this.maxHeight = fireworkMaxHeight * (0.75 + Math.random() / 2) * context.canvas.height;
        var randpic = getRandomInt(2);
        var image = new Image();
        this.image = image;
        switch (randpic) {
            case 0:
                image.src = "assets/fireworks/firework0.png"
                break;
            case 1:
                image.src = "assets/fireworks/firework1.png"
                break;
        }

    }


    tick() {
        if (this.y < this.maxHeight) {
            this.dead = true;
            this.explode();
        }
        this.spawnSpark();
        this.checkCollision();
        if (!this.dead) {
            this.ay = this.thrust;
            this.ax = windShown / fireworkMass; //Only horizontal acc
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

        }
    }
    explode() {
            var style = getRandomInt(6);
            var explosionParticles = getRandomIntRange(minExplosionParticles, maxExplosionParticles);
            var angle = -Math.PI;
            var i, vx, vy;
            var color = getRandomInt(5);
            var realPower = explosionPower * (0.5 + Math.random());
            var duration = Math.random() * (maxExplosionDuration - minExplosionDuration) + minExplosionDuration;
            var angleOffset = Math.PI / Math.random();
            switch (style) {
                case 0: //circle
                    for (i = 0; i < explosionParticles; i++) {
                        vx = realPower * Math.cos(angle + angleOffset);
                        vy = realPower * Math.sin(angle + angleOffset);
                        var newSpark = new burstParticle(this.context, this.x, this.y, vx, vy, duration, color, .01);
                        particles.push(newSpark);
                        angle = i * 2 * Math.PI / explosionParticles;
                    }
                    break;
                case 1: //plus
                    var modifiedPower;
                    var modifier = Math.PI / 2;

                    for (i = 0; i < explosionParticles; i++) {
                        modifiedPower = Math.abs((angle % modifier) - (modifier / 2)); // normalize between .5 of modifier to 0
                        modifiedPower = realPower * ((modifier + 1) / (modifiedPower + 1));
                        vx = modifiedPower * Math.cos(angle + angleOffset);
                        vy = modifiedPower * Math.sin(angle + angleOffset);
                        var newSpark = new burstParticle(this.context, this.x, this.y, vx, vy, duration, color, .01);
                        particles.push(newSpark);
                        angle = i * 2 * Math.PI / explosionParticles;
                    }
                    break;
                case 2: //star
                    var modifiedPower;
                    var modifier = Math.PI / 2.5;
                    for (i = 0; i < explosionParticles; i++) {
                        modifiedPower = Math.abs((angle % modifier) - (modifier / 2)); // normalize between .5 of modifier to 0
                        modifiedPower = realPower * ((modifier + 1) / (modifiedPower + 1));
                        vx = modifiedPower * Math.cos(angle + angleOffset);
                        vy = modifiedPower * Math.sin(angle + angleOffset);
                        var newSpark = new burstParticle(this.context, this.x, this.y, vx, vy, duration, color, .01);
                        particles.push(newSpark);
                        angle = i * 2 * Math.PI / explosionParticles;
                    }
                    break;

                case 3: //8 point star
                    var modifiedPower;
                    var modifier = Math.PI / 4;
                    for (i = 0; i < explosionParticles; i++) {
                        modifiedPower = Math.abs((angle % modifier) - (modifier / 2)); // normalize between .5 of modifier to 0
                        modifiedPower = realPower * Math.pow(((modifier + 1) / (modifiedPower + 1)), 2);
                        vx = modifiedPower * Math.cos(angle + angleOffset);
                        vy = modifiedPower * Math.sin(angle + angleOffset);
                        var newSpark = new burstParticle(this.context, this.x, this.y, vx, vy, duration, color, .01);
                        particles.push(newSpark);
                        angle = i * 2 * Math.PI / explosionParticles;
                    }
                    break;
                case 4: //sheep
                case 5: //sheep
                    console.log("sheep");
                    var totalLoops = 1;
                    explosionParticles = getRandomIntRange(sheepParticlesMin, sheepParticlesMax);
                    angleOffset = 0;
                    realPower *= 2;
                    var modifiedPower;
                    var modifier = Math.PI / 4;
                    duration = sheepDuration;
                    realPower = sheepExplosionPower;
                    for (i = 0; i < explosionParticles; i++) {
                        modifiedPower = getSheepSin(angle);
                        //console.log(modifiedPower);
                        vx = modifiedPower[0] * realPower / 300;
                        vy = modifiedPower[1] * realPower / 300;
                        var newSpark = new burstParticle(this.context, this.x, this.y, vx, vy, duration, color, 0.0001);
                        particles.push(newSpark);
                        angle = i * 2 * totalLoops * Math.PI / explosionParticles;
                    }
                    break;

            }

        }
        //spawns sparks as it rises, a few per tick and with random offset for more of a "showering" effect
    spawnSpark() {
            var i;
            var offset;
            for (i = 0; i < sparksPerTick; i++) {
                offset = getRandomIntRange(-maxOffset, maxOffset);
                var newSpark = new sparkParticle(this.context, this.x + offset, this.y, -this.vx / 2, -this.vy / 2);
            }
            particles.push(newSpark);
        }
        //check if it "collides" with it's maximum height (basically just a max height mechanic)
    checkCollision() {
            if (this.y <= 0) {
                this.splat = true;
                //this.y = context.canvas.height - fireworkHeight;
                this.vx = 0;
                this.vy = 0;
                this.y = context.canvas.height - spriteSize - fireworkHeight;
            }
        }
        //cool angular movement cuz thats how fireworks go
    draw() {
        var movementAngle = Math.atan(-this.vx / this.vy);
        context.save(); //save and restore because of slight imperfections with undoing translating resulting in drift
        context.translate(this.x, this.y);
        context.rotate(movementAngle);
        this.context.drawImage(this.image, 0, 0);
        context.restore();

    }


}