var windSlider = document.getElementById("windSlider");
var sliderLabel = document.getElementById("windSliderLabel");
windButton.classList.remove("active");
windSliderRow.style.opacity = 0.5;
windSlider.disabled = true;
windSlider.classList.remove("sliderHover");

windSlider.value = 50;
sliderLabel.innerHTML = (windSlider.value * 2).toString() + "%";
windSlider.oninput = function() {
    windMax = defaultWindMax * this.value / 50;
    sliderLabel.innerHTML = (this.value * 2).toString() + "%";
}