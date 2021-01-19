var width = 0;
var height = 0;
var context;
const gravity = 0.05;
const death_barrier = 100;
const windMax = 0.05;
const windMin = 0.02;
const snowHeight = 20;
const spriteSize = 30;
const snowflakesPerTick = 2;
const airResistance = 0.60; //maintain this portion of velocities per second,  processing-fast way to fake it
const extraCanvasWidths = 2; //how far out falling particles can spawn for the purposes of not looking weird in strong wind
const maximumSpawnHeight = 0.5; //multiple of canvas height to spawn particles above the screen
const minimumSpawnHeight = 0.1; //minimum pixels for a particle to spawn above the screen
var ticks = 0;

function defaultBackground() {
    context.fillStyle = "white";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

var run = false;
var firstrun = true;
var wind = false;
var windShown = 0;
var windTrueAcc = 0;
var currentParticle = null;
var currentBackground = defaultBackground;
var particles;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomIntRange(min, max) {
    return Math.floor(Math.random() * Math.floor(max - min)) + min;
}


function snowBackground() {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "white";
    context.fillRect(0, context.canvas.height - snowHeight, context.canvas.width, snowHeight);
}


function initialSetup() {
    var canvas = document.getElementById("physicsCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    requestAnimationFrame(mainloop);
    particles = [];
}



function start() {
    run = true;

}

function stop() {
    run = false;
}

function clearCanvas() {
    console.log("clearing...");
    stop();
    context.fillStyle = "white";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    wind = false;
    particles = [];
    console.log("cleared.");
}



function snow() {
    snowBackground();
    currentBackground = snowBackground;

    currentParticle = snowflakeParticle;
    wind = true;
    particles = [];
}


function tick_particles() {
    //console.log("tick");

    for (var i = 0; i < particles.length; i++) {
        //console.log("ticking" + i);
        if (particles[i] !== undefined) {
            if (particles[i].dead) {
                particles.splice(i, 1);
            } else {
                particles[i].tick();
            }
        }
    }
}

function draw_particles() {
    //console.log("draw");
    for (var i = 0; i < particles.length; i++) {
        //console.log("drawing" + i);
        if (particles[i] !== undefined) {
            particles[i].draw();
        }
    }
}



function updateWind() {
    if (wind) {
        windTrueAcc = ((Math.sin(2 * ticks / 200) + Math.sin(Math.PI * ticks / 200)) / 2) * windMax; //noise function from -2 to 2, divided onto -1,1, then multiplied by the wind maximum velocity in either direction
        if (Math.abs(windTrueAcc) > windMin) {
            windShown = windTrueAcc;
        } else {
            windShown = 0;
        }
    } else {
        windShown = 0;
    }
}

function create_random_particle() {
    var i;
    for (i = 0; i < snowflakesPerTick; i++) {
        particles.push(new currentParticle(context, getRandomIntRange(-1 * extraCanvasWidths * context.canvas.width, (1 + extraCanvasWidths) * context.canvas.width), getRandomIntRange(-1 * minimumSpawnHeight * context.canvas.height, -1 * maximumSpawnHeight * context.canvas.height)));
    }
}

function mainloop() {
    //console.log("loop");
    ticks++;
    currentBackground();
    if (run) {

        create_random_particle();
    }
    updateWind();
    tick_particles();
    draw_particles();
    requestAnimationFrame(mainloop);
}

initialSetup();