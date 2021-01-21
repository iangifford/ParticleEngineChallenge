const snowflakesPerTick = 4;
const snowHeight = 20;
//snowing effect
function snow() {
    snowBackground();
    currentBackground = snowBackground;

    currentParticle = snowflakeParticle;

    particles = [];
    setup = true;
    if (!wind) {
        toggleWind();
    }
    spawnParticle = spawnSnow;
}

//black with white on the ground to represent snow layer
function snowBackground() {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "white";
    context.fillRect(0, context.canvas.height - snowHeight, context.canvas.width, snowHeight);
}


//spawn a bunch of flakes per tick
function spawnSnow() {
    var i;
    for (i = 0; i < snowflakesPerTick; i++) {
        particles.push(new currentParticle(context, getRandomIntRange(-1 * extraCanvasWidths * context.canvas.width, (1 + extraCanvasWidths) * context.canvas.width), getRandomIntRange(-1 * minimumSpawnHeight * context.canvas.height, -1 * maximumSpawnHeight * context.canvas.height)));
    }
}