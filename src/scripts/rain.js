const raindropsPerTick = 10;
const rainHeight = 2;

//create rain effect!
function rain() {
    rainBackground();
    currentBackground = rainBackground;

    currentParticle = raindropParticle;
    if (wind) {
        toggleWind();
        windShown = 0;
    }
    particles = [];
    setup = true;
    spawnParticle = spawnRain;
}


//blue on the bottom so there is water on the ground :)
function rainBackground() {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "blue";
    context.fillRect(0, context.canvas.height - rainHeight, context.canvas.width, context.canvas.height);
}
//spawns rain within bounds (extra width to prevent voids on sides during rain)
function spawnRain() {
    var i;
    for (i = 0; i < raindropsPerTick; i++) {

        particles.push(new currentParticle(context, getRandomIntRange(-1 * extraCanvasWidths * context.canvas.width, (1 + extraCanvasWidths) * context.canvas.width), getRandomIntRange(-1 * minimumSpawnHeight * context.canvas.height, -1 * maximumSpawnHeight * context.canvas.height)));
    }
}