const audioButtonBar = document.createElement("div");
audioButtonBar.className = "button-container";

const buttons = [
  { class: "button", id: "playButton", text: "Play", function: play },
  { class: "button", id: "pauseButton", text: "Pause", function: pause },
  { class: "button", id: "stopButton", text: "Stop", function: stop },
  { class: "button", id: "loopButton", text: "Loop", function: loop },
];

buttons.forEach((item) => {
  const button = document.createElement("button");
  button.className = item.class;
  button.id = item.id;
  button.textContent = item.text;
  button.addEventListener("click", item.function);
  audioButtonBar.appendChild(button);
});
document.body.appendChild(audioButtonBar);

// Button Functions
function play() {
  console.log("Play button clicked");
}

function pause() {
  console.log("Pause button clicked");
}

function stop() {
  console.log("Stop button clicked");
}

function loop() {
  console.log("Loop button clicked");
}

const audioSliderBar = document.createElement("div");
audioSliderBar.className = "slider-container";

const sliders = [
  { class: "slider", id: "voulumeSlider", text: "Volume", function: voulume },
  { class: "slider", id: "bassSlider", text: "Bass", function: bass },
  { class: "slider", id: "pitchSlider", text: "Pitch", function: pitch },
];

sliders.forEach((item) => {
  const slider = document.createElement("input");
  slider.id = item.id;

  slider.className = item.class;
  slider.onchange = item.function;
  slider.name = item.text;
  slider.type = "range";
  slider.min = 0;
  slider.max = 1;
  slider.step = 0.01;
  slider.value = 0.5;

  const label = document.createElement("label");
  label.innerText = item.text;
  label.form = item.text;

  audioSliderBar.appendChild(slider);
  audioSliderBar.appendChild(label);
});

document.body.appendChild(audioSliderBar);

// SLider Functions
function voulume() {
  console.log("Volume Slider changed");
}

function bass() {
  console.log("Bass Slider changed");
}

function pitch() {
  console.log("Pitch Slider changed");
}
