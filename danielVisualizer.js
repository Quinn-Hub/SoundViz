// sketch.js - Images, Video, & Sound Art
// Author: Daniel Do
// Date: 02-05-2024

// Initialize variables for audio, webcam capture, FFT (Fast Fourier Transform), and an array to hold particles
let audio;
let capture;
let fft;
let particles = [];
let canvasContainer;
let rotationAngle = 0; // Variable to control rotation angle

// Preload function to load the audio file before setup
function preload() {
  audio = loadSound('audio/electric.mp3');
}

function setup() {
  // Set up canvas and attach it to the specified container
  canvasContainer = $("#canvas-container");
  createCanvas(canvasContainer.width(), canvasContainer.height()).parent("canvas-container");

  // Adjust canvas size when window is resized
  $(window).resize(() => resizeCanvas(canvasContainer.width(), canvasContainer.height()));
  
  // Set initial background color
  background(0);

  // Initialize FFT
  fft = new p5.FFT();

  // Play the audio file
  audio.play();

  // Set the audio to loop indefinitely
  audio.setLoop(true);

  // Set the draw loop to run continuously
  loop();

  // Adjust pixel density for better performance
  pixelDensity(1);
}

function draw() {
  // Set frame rate
  frameRate(30);

  // Clear the canvas and set background color
  background(255);

  // Display the webcam capture with a translucent overlay
  loadPixels();
  updatePixels();
  noStroke();
  fill(0, 15);
  rect(0, 0, width, height);

  // Draw a star in the center of the canvas with rotation
  angleMode(RADIANS);
  stroke(100);
  noFill();
  strokeWeight(2);
  push(); // Save current transformation state
  translate(width / 2, height / 2); // Translate to the center of the canvas
  rotate(rotationAngle); // Rotate the canvas
  star(0, 0, 180, 300, 5); // Draw the star at (0, 0)
  pop(); // Restore previous transformation state
  rotationAngle += 0.01; // Increment rotation angle for smooth rotation

  // Switch angle mode back to DEGREES for FFT waveform
  angleMode(DEGREES);
  translate(width / 2, height / 2);
  
  // Analyze the audio with FFT
  fft.analyze();
  let amp = fft.getEnergy(20, 200);
  let wave = fft.waveform();
  stroke(0);
  noFill();

  // Draw guitar strings based on audio waveform
  for (let l = -1; l <= 1; l += 2) {
    for (let h = 0; h <= 400; h += 100) {
      beginShape();
      for (let i = 0; i <= 180; i += 0.5) {
        let index = floor(map(i, 0, 180, 0, wave.length - 1));
        let r = map(wave[index], -1, 1, 260, 190);
        let x = r * i * l;
        let y = r - h;
        vertex(x, y);
      }
      endShape();
    }
  }

  // Create and manage particles
  let p = new Particles();
  particles.push(p);

  for (let i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].edges()) {
      particles[i].update(amp > 230);
      particles[i].show();
    } else {
      particles.splice(i, 1);
    }
  }
}

// Particle class definition
class Particles {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250);
    this.vel = createVector(0, 0);
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001));
    this.w = random(3, 5);
  }
  update(cond) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    if (cond) {
      this.pos.add(this.vel);
      this.pos.add(this.vel);
      this.pos.add(this.vel);
    }
  }
  edges() {
    return (this.pos.x < -width / 2 || this.pos.x > width / 2 || this.pos.y < -height / 2 || this.pos.y > height / 2);
  }
  show() {
    noStroke();
    fill(random(0, 255));
    ellipse(this.pos.x, this.pos.y, this.w);
  }
}

// Function to restart audio and clear particles when Enter key is pressed
function keyPressed() {
  if (keyCode == RETURN) {
    audio.stop();
    audio.play();
    particles = [];
    clear();
  }
}

// Function to draw a star shape
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}