//slider for the wind
var windSlider = document.getElementById("windSlider");
var sliderLabel = document.getElementById("windSliderLabel");
windButton.classList.remove("active");
windSliderRow.style.opacity = 0.5;
windSlider.disabled = true;
windSlider.classList.remove("sliderHover");

windSlider.value = 50;
sliderLabel.innerHTML = (windSlider.value * 2).toString() + "%";
//update the wind upper bound based on where its slid to
windSlider.oninput = function() {
    windMax = defaultWindMax * this.value / 50;
    //update the label
    sliderLabel.innerHTML = (this.value * 2).toString() + "%";
}