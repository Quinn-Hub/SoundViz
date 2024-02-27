const audioSideBar = document.createElement("div");
audioSideBar.className = "button-container";

const buttons = [
  { class: "button", id: "playButton", text: "Play", function: play },
  { class: "button", id: "pauseButton", text: "Pause", function: pause },
  { class: "button", id: "stopButton", text: "Stop", function: stop },
  { class: "button", id: "loopButton", text: "Loop", function:loop },
];

buttons.forEach((item)=>{
    const button = document.createElement("button");
    button.className = item.class;
    button.id = item.id;
    button.textContent = item.text;
    button.addEventListener('click', item.function);
    audioSideBar.appendChild(button);
});



// Example function for button click event
function play() {
  console.log("Play button clicked");
}

// Example function for button click event
function pause() {
  console.log("Pause button clicked");
}

// Example function for button click event
function stop() {
  console.log("Stop button clicked");
}

// Example function for button click event
function loop() {
  console.log("Loop button clicked");
}


document.body.appendChild(audioSideBar);



