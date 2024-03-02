//AUDI or audio?
let audio = new Audio();

const audioButtonBar = document.createElement("div");
audioButtonBar.className = "button-container";

const buttons = [
  { class: "button", id: "playButton", text: "Play", function: play },
  { class: "button", id: "pauseButton", text: "Pause", function: pause },
  { class: "button", id: "stopButton", text: "Stop", function: stop },
  { class: "button", id: "loopButton", text: "Loop", function: loop },
  // upload download by lukas  
  { class: "button", id: "uploadButton", text: "Upload", function: upload },
  { class: "button", id: "downloadButton", text: "Download", function: download },
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
  if (audio.src) {
    audio.play().then(() => console.log("Playing...")).catch(error => console.error("Error playing the file:", error));
  } else {
    console.log("No audio file loaded");
  }
}

function stop() {
  console.log("Stop button clicked");
  if (!audio.paused) {
    audio.pause();
    audio.currentTime = 0; // Reset the audio position
    console.log("Audio stopped");
  }
}

function pause() {
  console.log("Pause button clicked");
  if (!audio.paused) {
    audio.pause();
    console.log("Audio paused");
  }
}

function loop() {
  console.log("Loop button clicked");
}

function upload() {
  console.log("Upload button clicked");
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'audio/*'; // Accept only audio files
  fileInput.click();

  fileInput.onchange = function() {
    const files = this.files;
    if (files.length === 0) {
      console.log('No file selected!');
      return;
    }
    const file = files[0];
    audio.src = URL.createObjectURL(file);
    console.log('File uploaded:', file.name);
  };
}

function download() {
  console.log("Download button clicked");
  html2canvas(document.body).then(canvas => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.download = 'screenshot.png';
      link.href = image;
      document.body.appendChild(link);
      link.click(); 
      document.body.removeChild(link); 
  }).catch(err => console.error("Error taking screenshot:", err));
}

const audioSliderBar = document.createElement("div");
audioSliderBar.className = "slider-container";

const sliders = [
  { class: "slider", id: "voulumeSlider", text: "Volume", function: voulume },
  { class: "slider", id: "bassSlider", text: "Bass", function: bass },
  { class: "slider", id: "pitchSlider", text: "Pitch", function: pitch },
];

sliders.forEach((item) => {
  const label = document.createElement("label");
  label.style = " text-align:center"
  label.innerText = item.text;
  label.form = item.text;

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

  audioSliderBar.appendChild(label);
  audioSliderBar.appendChild(slider);
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
