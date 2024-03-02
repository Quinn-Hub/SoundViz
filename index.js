const canvas_container = document.createElement("div");
canvas_container.className = "canvas-container";

const label = document.createElement("label");
label.innerText = "Audio Canvas";
label.htmlFor = "audio-visulizer";
label.className = "label";

const audio_canvas = document.createElement("canvas");
audio_canvas.className = "canvas";
audio_canvas.id = "audio-visulizer";

var ctx = audio_canvas.getContext("2d");
ctx.font = "30px Arial";
ctx.strokeText("Audio Canvas", 10, 30);

canvas_container.appendChild(label);
canvas_container.appendChild(audio_canvas);
document.body.appendChild(canvas_container);
