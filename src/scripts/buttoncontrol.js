//for button interaction
//certain things locked behind setup to prevent confusing interactions

//for time control buttons/stop
function highlightControl(element) {
    var stopButton = document.getElementById("stopButton");
    var startButton = document.getElementById("startButton");
    var pauseButton = document.getElementById("pauseButton");
    if (element.id == stopButton.id) {
        if (setup) {
            console.log("stopping");
            stopButton.classList.add("active");
            pauseButton.classList.remove("active");
            startButton.classList.remove("active");
        }
    } else if (element.id == startButton.id) {
        if (setup) {
            console.log("playing");
            startButton.classList.add("active");
            pauseButton.classList.remove("active");
            stopButton.classList.remove("active");
        }

    } else if (element.id == pauseButton.id) {
        if (setup) {
            console.log("pausing");
            pauseButton.classList.add("active");
            startButton.classList.remove("active");
        }
    } else {
        console.log("Unknown button");
    }
}
//for selecting type of particle
function highlightType(element) {
    var clearButton = document.getElementById("clearButton");
    var snowButton = document.getElementById("snowButton");
    var rainButton = document.getElementById("rainButton");
    var stopButton = document.getElementById("stopButton");
    var startButton = document.getElementById("startButton");
    var pauseButton = document.getElementById("pauseButton");
    if (element.id == clearButton.id) {
        console.log("clearing");
        rainButton.classList.remove("active");
        snowButton.classList.remove("active");
        startButton.classList.remove("active");
        pauseButton.classList.remove("active");
        stopButton.classList.remove("active");
        fireworkButton.classList.remove("active");
        if (wind) {
            toggleWind();
            windShown = 0;
        }

    } else if (element.id == snowButton.id) {
        console.log("snowing");
        rainButton.classList.remove("active");
        snowButton.classList.add("active");
        fireworkButton.classList.remove("active");
    } else if (element.id == rainButton.id) {
        console.log("raining");
        rainButton.classList.add("active");
        snowButton.classList.remove("active");
        fireworkButton.classList.remove("active");

    } else if (element.id == fireworkButton.id) {
        console.log("fireworks");
        fireworkButton.classList.add("active");
        snowButton.classList.remove("active");
        rainButton.classList.remove("active");
    }
}
//wind button, also used when changing type of particle to change the button accordingly
function toggleWind() {

    if (setup) {
        var windButton = document.getElementById("windButton");
        var windSliderRow = document.getElementById("windSliderRow");
        var windSlider = document.getElementById("windSlider");
        var pauseButton = document.getElementById("pauseButton");
        wind = !wind;
        if (wind) {
            windButton.classList.add("active");
            windSliderRow.style.opacity = 1;
            windSlider.disabled = false;
            windSlider.classList.add("sliderHover");
        } else {
            windButton.classList.remove("active");
            windSliderRow.style.opacity = 0.5;
            windSlider.disabled = true;
            windSlider.classList.remove("sliderHover");
        }
    }
}