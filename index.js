// index.js


//p5.js library
const p5Script = document.createElement("script");
p5Script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.5.0/p5.js";
document.body.appendChild(p5Script);
//html2 library
const html2CanvasScript = document.createElement("script");
html2CanvasScript.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.3/html2canvas.min.js";
document.body.appendChild(html2CanvasScript);
//js scripts
const sketch = document.createElement("script");
sketch.type = "text/javascript";
sketch.src = "scripts/sketch.js";
sketch.defer = true;

document.body.appendChild(sketch);

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

const canvas_container = document.createElement("div");
canvas_container.id = "canvas-container";

document.body.appendChild(canvas_container);