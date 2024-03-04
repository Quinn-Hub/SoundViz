// index.js

// Creating audio visualizer container
const visualizerContainer = document.createElement("div");
visualizerContainer.className = "canvas-container";

// Creating label for the audio visualizer
const label = document.createElement("label");
label.innerText = "Audio Canvas";
label.htmlFor = "audio-visualizer";
label.className = "label";

// Creating canvas for the audio visualizer
const audioVisualizerCanvas = document.createElement("canvas");
audioVisualizerCanvas.className = "canvas";
audioVisualizerCanvas.id = "audio-visualizer";

const ctx = audioVisualizerCanvas.getContext("2d");
ctx.font = "30px Arial";
ctx.strokeText("Audio Canvas", 10, 30);

visualizerContainer.appendChild(label);
visualizerContainer.appendChild(audioVisualizerCanvas);
document.body.appendChild(visualizerContainer);

//p5.js library
const p5Script = document.createElement("script");
p5Script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.js";
document.body.appendChild(p5Script);
//html2 library
const html2CanvasScript = document.createElement("script");
html2CanvasScript.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.3/html2canvas.min.js";
document.body.appendChild(html2CanvasScript);
//js scripts
const audioControlsScript = document.createElement("script");
audioControlsScript.src = "./scripts/audio-controls.js";
document.body.appendChild(audioControlsScript);
//switch visualizer buttons
const switchVisualizersScript = document.createElement("script");
switchVisualizersScript.src = "./scripts/switch-visualizers.js";
document.body.appendChild(switchVisualizersScript);
//full screen
const fullscreenScript = document.createElement("script");
fullscreenScript.src = "./scripts/fullscreen.js";
document.body.appendChild(fullscreenScript);
// Load jQuery library
const jqueryScript = document.createElement("script");
jqueryScript.src = "https://code.jquery.com/jquery-3.6.3.min.js";
document.body.appendChild(jqueryScript);

/*   Lukas's Visualizer
const audioVisualizerScript = document.createElement("script");
audioVisualizerScript.src = "audiovisualizer1.js";
document.body.appendChild(audioVisualizerScript);
*/