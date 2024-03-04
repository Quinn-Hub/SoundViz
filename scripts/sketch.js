// sketch.js
let canvasContainer;
let particles = [];
let fft;
let sound;
let mode = 0;

let audioControls;

function preload() {
  sound = loadSound("audio/Franz_Ferdinand_This_Fire.mp3");
  audioControls = new AudioControls(sound); // Pass the sound object to AudioControls
}

function setup() {
  canvasContainer = select("#canvas-container");
  let canvas = createCanvas(canvasContainer.width, canvasContainer.height);
  canvas.parent("canvas-container");
  // Resize canvas when the page is resized
  window.addEventListener("resize", resizeCanvasHandler);

  fft = new p5.FFT();
}

function draw() {
  background(0);

  lukas_visualizer();
}

function uploadSong() {
  console.log("Upload button clicked");
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "audio/*"; // Accept only audio files
  fileInput.click();

  fileInput.onchange = function () {
    const files = this.files;
    if (files.length === 0) {
      console.log("No file selected!");
      return;
    }
    const file = files[0];
    const audioUrl = URL.createObjectURL(file);
    sound.stop(); // Stop the currently playing sound
    sound = loadSound(audioUrl, () => sound.play()); // Load and play the new audio file
    console.log("File uploaded:", file.name);
  };
}

function lukas_visualizer() {
  if (sound.isPlaying()) {
    let spectrum = fft.analyze();

    createExplosions(spectrum);
    drawEqualizerBars(spectrum);
  }

  updateAndDisplayParticles();
}



function createExplosions(spectrum) {
  let bassStart = 0;
  let bassEnd = 20;

  let explosionRate = 10;

  if (frameCount % explosionRate === 0) {
    for (let i = bassStart; i < bassEnd; i += 5) {
      if (random() > 0.8) {
        let radius = map(spectrum[i], 0, 255, 10, min(width, height) / 2);
        let x = random(width);
        let y = random(height);
        createExplosion(x, y, radius, spectrum[i]);
      }
    }
  }
}

function drawEqualizerBars(spectrum) {
  for (let i = 0; i < spectrum.length; i += 10) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);

    let prevH = i > 0 ? -height + map(spectrum[i - 10], 0, 255, height, 0) : h;
    h = lerp(prevH, h, 0.2);

    let barColor = color(map(spectrum[i], 0, 255, 0, 360), 80, 90);
    fill(barColor);
    rect(x, height, width / spectrum.length, h);
  }
}

function updateAndDisplayParticles() {
  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}

function createExplosion(x, y, radius, spectrumValue) {
  let explosionColor = color(map(spectrumValue, 0, 255, 0, 360), 80, 90);

  for (let i = 0; i < 20; i++) {
    let angle = random(TWO_PI);
    let particle = new Particle(
      x,
      y,
      cos(angle) * radius,
      sin(angle) * radius,
      explosionColor
    );
    particles.push(particle);
  }
}

class Particle {
  constructor(x, y, vx, vy, explosionColor) {
    this.x = x;
    this.y = y;
    this.vx = vx * 0.02;
    this.vy = vy * 0.02;
    this.alpha = 255;
    this.color = explosionColor;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 2;
  }

  display() {
    noStroke();
    fill(
      this.color.levels[0],
      this.color.levels[1],
      this.color.levels[2],
      this.alpha
    );
    ellipse(this.x, this.y, 5, 5);
  }
}

function resizeCanvasHandler() {
  resizeCanvas(canvasContainer.width, canvasContainer.height);
}

