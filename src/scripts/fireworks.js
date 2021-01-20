const fireworksPerTick = 0.05;
const fireworkHeight = 0.0
const fireworkExtraCanvasWidths = 0.2;

function fireworks() {
    fireworkBackground();
    currentBackground = fireworkBackground;

    currentParticle = rocketParticle;
    if (wind) {
        toggleWind();
    }
    particles = [];
    setup = true;
    spawnParticle = spawnfirework;
}

function cityBackground() {
    var cityImage = new Image();
    cityImage.src = "assets/citybackground.png";
    context.drawImage(cityImage, 0, 0);
}

function fireworkBackground() {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "blue";
    context.fillRect(0, context.canvas.height - fireworkHeight, context.canvas.width, context.canvas.height);
}

function spawnfirework() {
    var chance = Math.random();
    if (chance <= fireworksPerTick) {


        particles.push(new currentParticle(context, getRandomIntRange(-1 * fireworkExtraCanvasWidths * context.canvas.width, (1 + fireworkExtraCanvasWidths) * context.canvas.width), context.canvas.height));
    }
}