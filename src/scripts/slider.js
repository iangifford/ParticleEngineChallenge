var windSlider = document.getElementById("windSlider");
windSlider.value = 50;
windSlider.oninput = function() {
    windMax = defaultWindMax * this.value / 50;
}