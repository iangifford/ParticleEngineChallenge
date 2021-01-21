var width = 0;
var height = 0;
var context;
var windMax = 0.2; //not const because wind slider
const gravity = 1;
const death_barrier = 100;
const defaultWindMax = 0.2
const windMin = 0.0;

const spriteSize = 30;
const extraCanvasWidths = 2; //how far out falling particles can spawn for the purposes of not looking weird in strong wind
const maximumSpawnHeight = 0.6; //multiple of canvas height to spawn particles above the screen
const minimumSpawnHeight = 0.3; //minimum pixels for a particle to spawn above the screen
var ticks = 0;
var spawnParticle; // what function should the game use to spawn new particles 
//blank white background, used at start and after clear
function defaultBackground() {
    context.fillStyle = "white";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}
var currentBackground = defaultBackground; //what background to render in draws
var run = false;
var pauseTicking = false; //pause button
var firstrun = true; //for certain setup required on the first run of a new type
var setup = false;
var wind = false;
var windShown = 0;
var windTrueAcc = 0;
var currentParticle = null;

var particles;




function initialSetup() {
    var canvas = document.getElementById("physicsCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    requestAnimationFrame(mainloop);
    particles = [];
}


//used by start button
function start() {
    if (setup) {
        run = true;
        pauseTicking = false;
    }

}
// stop button
function stop() {
    pauseTicking = false;
    run = false;
}
//pause button
function pause() {
    pauseTicking = true;
}


//clear button/reset everything instantly (remove particles, clear background)
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




//update all of the particles in the particle list
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


//draw all particles in the list according to each of their draw functions
function draw_particles() {
    //console.log("draw");
    for (var i = 0; i < particles.length; i++) {
        //console.log("drawing" + i);
        if (particles[i] !== undefined) {
            particles[i].draw();
        }
    }
}


//update wind every tick
//uses simple random noise function sin(x) + sin(pi*x)
//non repeating noise in theory, but since pi doesnt have infinite digits it will eventually repeat (after an absurdly long time)
//if the wind is turned off, it gradually decreases to mitigate sudden acceleration loss
function updateWind() {
    if (wind) {
        windTrueAcc = ((Math.sin(2 * ticks / 200) + Math.sin(Math.PI * ticks / 200)) / 2) * windMax; //noise function from -2 to 2, divided onto -1,1, then multiplied by the wind maximum velocity in either direction
        if (Math.abs(windTrueAcc) > windMin) {
            windShown = windTrueAcc;
        } else {
            windShown = 0;
        }
    } else {
        if (windShown > 0.0001) {
            windShown *= 0.99;
        } else {
            windShown = 0;
        }
    }
}


//requestAnimationFrame loop
//ticks wind, particles, and draws particles
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