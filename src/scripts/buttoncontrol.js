function highlightControl(element) {
    var stopButton = document.getElementById("stopButton");
    var startButton = document.getElementById("startButton");
    var pauseButton = document.getElementById("pauseButton");
    if (element.id == stopButton.id) {
        console.log("stopping");
        stopButton.classList.add("active");
        pauseButton.classList.remove("active");
        startButton.classList.remove("active");
    } else if (element.id == startButton.id) {
        if (setup) {
            console.log("playing");
            startButton.classList.add("active");
            pauseButton.classList.remove("active");
            stopButton.classList.remove("active");
        }

    } else if (element.id == pauseButton.id) {
        console.log("pausing");
        pauseButton.classList.add("active");
        startButton.classList.remove("active");
    } else {
        console.log("Unknown button");
    }
}

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

    } else if (element.id == snowButton.id) {
        console.log("snowing");
        rainButton.classList.remove("active");
        snowButton.classList.add("active");
    } else if (element.id == rainButton.id) {
        console.log("raining");
        rainButton.classList.add("active");
        snowButton.classList.remove("active");
    }
}