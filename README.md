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

## Play
Runs the simulation. Acts to both unpause the simulation, as well as begin it (If it was stopped or had not been started yet)

## Pause
Freezes the simulation. Particles stop getting updated, and will remain in place. You can unpause using the play button.

## Stop
Stops particle spawning, and allows the remaining particles to dissapate naturally. Particle spawning can be resumed using the play button.

## Wind
Toggles wind. When particle effects are selected, they may toggle this on or off based on their default setting.<br>
When this is toggled on, the wind slider becomes active and can be used.

## Clear
Removed the current background, instantly kills all particles, and turns off the current particle spawning effect.

## Snow
Begins a snow effect. Has wind by default. Snow splats on the snow layer on the ground.

## Rain
Begins a rain effect. Has no wind by defualt. Rain splats on the wet ground.

## Fireworks
Begins a fireworks show effect. Has no wind by default. Fireworks explode at their set height.

## Wind Slider
Changes the strength of the wind. Allows setting in 10% increments from 0% to 200%. Only usable when wind is toggled on. 