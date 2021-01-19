var width = 0;
var height = 0;
var context;
const gravity = 1;
const death_barrier = 100;
const windMax = 0.2;
const windMin = 0.0;

const spriteSize = 30;
const extraCanvasWidths = 2; //how far out falling particles can spawn for the purposes of not looking weird in strong wind
const maximumSpawnHeight = 0.6; //multiple of canvas height to spawn particles above the screen
const minimumSpawnHeight = 0.3; //minimum pixels for a particle to spawn above the screen
var ticks = 0;
var spawnParticle;

function defaultBackground() {
    context.fillStyle = "white";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}

var run = false;
var pauseTicking = false;
var firstrun = true;
var setup = false;
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




function initialSetup() {
    var canvas = document.getElementById("physicsCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    requestAnimationFrame(mainloop);
    particles = [];
}



function start() {
    if (setup) {
        run = true;
        pauseTicking = false;
    }

}

function stop() {
    pauseTicking = false;
    run = false;
}

function pause() {
    pauseTicking = true;
}

function clearCanvas() {
    console.log("clearing...");
    stop();
    context.fillStyle = "white";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    wind = false;
    particles = [];
    currentBackground = defaultBackground;
    setup = false;
    console.log("cleared.");

}





function tick_particles() {
    //console.log("tick");

    for (var i = 0; i < particles.length; i++) {
        //console.log("ticking" + i);
        if (particles[i] !== undefined) {
            if (particles[i].dead) {
                particles.splice(i, 1);
                i--;
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



function mainloop() {
    //console.log("loop");
    if (!pauseTicking) {
        ticks++;
        currentBackground();
        if (run) {
            spawnParticle();
        }
        updateWind();
        tick_particles();
        draw_particles();
    }
    requestAnimationFrame(mainloop);
}

initialSetup();