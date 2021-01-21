# ParticleEngineChallenge
For Asymmetrik's coding challenge
# How to run
Download from github and unzip the file into a folder.
Inside that folder, open `/src/particles.html`. Your computer should automatically open it in your default browser. <br>
If not, then it will prompt you to select what program to open it with, where you should select the browser of your choice.

# How to use
On the left side are the Play, Pause, Stop, and Wind controls.<br>
On the right are the Clear, Snow, Rain, and Firework buttons.<br>
On the in the middle below the simulation viewing area is the Wind Slider.

## Play ![play button](https://github.com/iangifford/ParticleEngineChallenge/blob/main/src/assets/page_assets/play.png?raw=true)
Runs the simulation. Acts to both unpause the simulation, as well as begin it (If it was stopped or had not been started yet)

## Pause![pause button](https://github.com/iangifford/ParticleEngineChallenge/blob/main/src/assets/page_assets/pause.png?raw=true)
Freezes the simulation. Particles stop getting updated, and will remain in place. You can unpause using the play button.

## Stop![stop button](https://github.com/iangifford/ParticleEngineChallenge/blob/main/src/assets/page_assets/stop.png?raw=true)
Stops particle spawning, and allows the remaining particles to dissapate naturally. Particle spawning can be resumed using the play button.

## Wind![wind button](https://github.com/iangifford/ParticleEngineChallenge/blob/main/src/assets/page_assets/wind.png?raw=true)
Toggles wind. When particle effects are selected, they may toggle this on or off based on their default setting.<br>
When this is toggled on, the wind slider becomes active and can be used.

## Clear![clear button](https://github.com/iangifford/ParticleEngineChallenge/blob/main/src/assets/page_assets/clear.png?raw=true)
Removed the current background, instantly kills all particles, and turns off the current particle spawning effect.

## Snow![snow button](https://github.com/iangifford/ParticleEngineChallenge/blob/main/src/assets/page_assets/snow.png?raw=true)
Begins a snow effect. Has wind by default. Snow splats on the snow layer on the ground.

## Rain![rain button](https://github.com/iangifford/ParticleEngineChallenge/blob/main/src/assets/page_assets/rain.png?raw=true)
Begins a rain effect. Has no wind by defualt. Rain splats on the wet ground.

## Fireworks![fireworks button](https://github.com/iangifford/ParticleEngineChallenge/blob/main/src/assets/page_assets/fireworks.png?raw=true)
Begins a fireworks show effect. Has no wind by default. Fireworks explode at their set height.

## Wind Slider![wind slider](https://github.com/iangifford/ParticleEngineChallenge/blob/main/src/assets/page_assets/wind.png?raw=true)
Changes the strength of the wind. Allows setting in 10% increments from 0% to 200%. Only usable when wind is toggled on. 