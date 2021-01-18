var width = 0;
var height = 0;
var context;
const gravity = 0.05;
const death_barrier = 100;

var run = false;




function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function clearscreen() {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

function setup() {
    var canvas = document.getElementById("physicsCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    clearscreen()


}

function start() {
    run = true;
    requestAnimationFrame(mainloop);
}

function stop() {
    run = false;
}



function snow() {
    var count = 10;
    while (count > 0) {


        count--;
    }
}
var particles = [];

function tick_particles() {
    //console.log("tick");
    for (var i = 0; i < particles.length; i++) {
        //console.log("ticking" + i);
        if (particles[i].dead) {
            particles.splice(i, i + 1);
        }
        particles[i].tick();
    }
}

function draw_particles() {
    //console.log("draw");
    for (var i = 0; i < particles.length; i++) {
        //console.log("drawing" + i);
        particles[i].draw();
    }
}

function create_particle(type, x, y) {
    var particle;
    switch (type) {
        case "snowflake":
            particle = new physicsParticle("assets/snowflake2.png", context, x, y, 5);
    }
    particles.push(particle);
}

class physicsParticle {

    constructor(source, context, x, y, terVel) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.terVel = terVel;
        this.context = context;
        this.dead = false;


        this.image = new Image();
        this.image.src = source;

    }

    draw() {
        var ctx = this.context;
        var img = this.image;

        this.context.drawImage(this.image, this.x, this.y);
    }

    tick() {
        if (!this.dead) {
            this.vy += gravity;

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
    }
}

function create_random_particle(type) {
    if (getRandomInt(3) == 0) {
        create_particle(type, getRandomInt(context.canvas.width), getRandomInt(-100) - 50);
    }
}

function mainloop() {
    //console.log("loop");
    clearscreen();
    if (run) {
        create_random_particle("snowflake");
    }
    tick_particles();
    draw_particles();
    requestAnimationFrame(mainloop);
}
setup();