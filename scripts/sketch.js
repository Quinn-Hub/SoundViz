// sketch.js
let canvasContainer;
let particles = [];
let circleParticles = [];
let fft;
let fft2;
let sound;
let mode = 0;
let rotationAngle = 0;

let bigCircleRadius = 100; //150;
let bigCircleX;
let bigCircleY;
let smallCircleRadius = 30; //40;
let numSmallCircles = 5;
let angleIncrement;
let circleProperties = [];
let clickedIndexText = "1";
let clickedIndex = 0;
let layerToggled = [];

let prevTime = 0;
let gridSize = 20;
let gridOffset = 5;
let grid = [];

let audioControls = new AudioControls();

function preload() {
  audioControls.loadAudioByUrl("audio/Franz_Ferdinand_This_Fire.mp3");
}

function setup() {
  canvasContainer = select("#canvas-container");
  let canvas = createCanvas(canvasContainer.width, canvasContainer.height);
  canvas.parent("canvas-container");
  // Resize canvas when the page is resized
  window.addEventListener("resize", resizeCanvasHandler);

  fft = new p5.FFT();
  fft2 = new p5.FFT();

  bigCircleX = canvasContainer.width / 2;
  bigCircleY = (canvasContainer.height / 16) * 15;
  angleIncrement = TWO_PI / 8;

  // Initialize properties for each circle
  for (let i = 0; i < numSmallCircles; i++) {
    let angle = i * angleIncrement + 3.15;
    let x = bigCircleX + cos(angle) * bigCircleRadius;
    let y = bigCircleY + sin(angle) * bigCircleRadius;
    circleProperties.push({
      x: x,
      y: y,
      size: smallCircleRadius,
      color: color(255, 0, 0),
    });
  }

  setUpGrid();
}

function setUpGrid() {
  for (let x = 0; x < width + 25; x += gridSize) {
    for (let y = 0; y < height + 25; y += gridSize) {
      grid.push({ x: random(width + 25), y: random(height + 25) });
    }
  }
}

function draw() {
  background(0);

  if (audioControls.sound) {
    // let spectrum = fft.analyze();
    reuben_visulizer(audioControls.sound, fft);

    // for (i = 0; i < layerToggled.length; i++) {
    //   if (layerToggled[i] == 0) {
    //     createExplosions(spectrum, particles);
    //   } else if (layerToggled[i] == 1) {
    //     drawEqualizerBars(spectrum);
    //   } else if (layerToggled[i] == 2) {
    //     let amp = starFFT(fft2);
    //     DanielParticleManager(amp, circleParticles);
    //   } else if (layerToggled[i] == 3) {
    //     rotationAngle += 0.01;
    //     drawStar(rotationAngle);
    //   } else if (layerToggled[i] == 4) {
    //     // Add water ripple function here
    //   } else if (layerToggled[i] == 5) {
    
    //   }
    // }
  }

  // // Draw switch visualizer buttons
  // drawSwitchVisualizerButtons();
}

function mousePressed() {
  for (let i = 0; i < numSmallCircles; i++) {
    let props = circleProperties[i];
    let d = dist(mouseX, mouseY, props.x, props.y);
    if (d < props.size) {
      clickedIndex = i;
      if (clickedIndex == 0) {
        if (layerToggled[i] != clickedIndex) {
          layerToggled.push(clickedIndex);
        } else if (
          layerToggled[i] == clickedIndex &&
          circleProperties[clickedIndex].size == 35
        ) {
          for (let j = 0; j <= layerToggled.length; j++) {
            layerToggled.pop(layerToggled[i]);
          }
        }
        clickedIndexText = "1";
      } else if (clickedIndex == 1) {
        if (layerToggled[i] != clickedIndex) {
          layerToggled.push(clickedIndex);
        } else if (
          layerToggled[i] == clickedIndex &&
          circleProperties[clickedIndex].size == 35
        ) {
          for (let j = 0; j <= layerToggled.length; j++) {
            layerToggled.pop(layerToggled[i]);
          }
        }
        clickedIndexText = "2";
      } else if (clickedIndex == 2) {
        if (layerToggled[i] != clickedIndex) {
          layerToggled.push(clickedIndex);
        } else if (
          layerToggled[i] == clickedIndex &&
          circleProperties[clickedIndex].size == 35
        ) {
          for (let j = 0; j <= layerToggled.length; j++) {
            layerToggled.pop(layerToggled[i]);
          }
        }
        clickedIndexText = "3";
      } else if (clickedIndex == 3) {
        if (layerToggled[i] != clickedIndex) {
          layerToggled.push(clickedIndex);
        } else if (
          layerToggled[i] == clickedIndex &&
          circleProperties[clickedIndex].size == 35
        ) {
          for (let j = 0; j <= layerToggled.length; j++) {
            layerToggled.pop(layerToggled[i]);
          }
        }
        clickedIndexText = "4";
      } else if (clickedIndex == 4) {
        if (layerToggled[i] != clickedIndex) {
          layerToggled.push(clickedIndex);
        } else if (
          layerToggled[i] == clickedIndex &&
          circleProperties[clickedIndex].size == 35
        ) {
          for (let j = 0; j <= layerToggled.length; j++) {
            layerToggled.pop(4);
          }
        }
        clickedIndexText = "5";
      }
      break; // Stop the loop if a circle is clicked
    }
  }

  if (clickedIndex !== -1) {
    // Reset properties of all circles to their original values
    for (let i = 0; i < numSmallCircles; i++) {
      circleProperties[i].size = smallCircleRadius;
      circleProperties[i].color = color(255, 0, 0);
    }

    // Change size and color of the clicked circle
    for (let i = 0; i < layerToggled.length; i++) {
      circleProperties[layerToggled[i]].size = 35; // Change size
      circleProperties[layerToggled[i]].color = color(0, 255, 0);
      console.log(layerToggled[i]);
    }
    console.log("Button", clickedIndex + 1, "clicked");
  }
}

function drawSwitchVisualizerButtons() {
  // Draw the big circle
  noFill();
  stroke(0);
  fill(220);
  ellipse(bigCircleX, bigCircleY, bigCircleRadius * 2);
  fill(0);
  text(
    clickedIndexText,
    canvasContainer.width / 2 - 10,
    canvasContainer.height - 30
  );

  // Draw the smaller circles along the edge of the big circle
  for (let i = 0; i < numSmallCircles; i++) {
    let props = circleProperties[i];
    let d = dist(mouseX, mouseY, props.x, props.y);
    if (d < props.size) {
      fill(255, 255, 0);
    } else {
      fill(props.color);
    }
    noStroke();
    ellipse(props.x, props.y, props.size * 2);
    stroke(0);
    strokeWeight(5);
    fill(255);
    textSize(50);
    text(i + 1, props.x - 10, props.y + 15);
  }
}

function resizeCanvasHandler() {
  resizeCanvas(canvasContainer.width, canvasContainer.height);
}

// Reuben
function reuben_visulizer(sound, fft) {
  if (sound.isPlaying()) {
    let spectrum = fft.analyze();

    // Calculate time elapsed since the last frame
    let currentTime = millis();
    let deltaTime = (currentTime - prevTime) / 1000; // Convert milliseconds to seconds
    prevTime = currentTime;

    // Loop through each square in the grid
    for (let i = 0; i < grid.length; i++) {
      let square = grid[i];

      // Map FFT values to random translation amounts
      let translateX = map(spectrum[i % spectrum.length], 0, 255, -2, 2);
      let translateY = map(spectrum[(i + 1) % spectrum.length], 0, 255, -2, 2);

      // Map FFT values to z-axis (color)
      let translateZ = map(spectrum[(i + 2) % spectrum.length], 0, 255, 0, 255);

      // Apply random translation to the square's position
      square.x += translateX;
      square.y += translateY;

      // Constrain square within canvas width and height
      square.x = constrain(square.x, gridOffset, width - gridOffset - gridSize);
      square.y = constrain(
        square.y,
        gridOffset,
        height - gridOffset - gridSize
      );

      // Calculate color based on translation in z-axis
      let colorR = 100; // Constant red color
      let colorG = 100; // Constant green color
      let colorB = translateZ; // Map z-axis FFT value to blue channel

      // Draw the square at its new position with calculated color
      fill(colorR, colorG, colorB);
      rect(square.x, square.y, gridSize, gridSize);
    }
  }
}

// lUCAS
function lukas_visualizer(
  sound,
  fft,
  particles,
  canvasContainer,
  numSmallCircles,
  circleProperties,
  smallCircleRadius,
  clickedIndexText,
  clickedIndex
) {
  if (sound.isPlaying()) {
    let spectrum = fft.analyze();

    createExplosions(spectrum, particles);
    drawEqualizerBars(spectrum);
  }

  updateAndDisplayParticles(particles);
}

function createExplosions(spectrum, particles) {
  let bassStart = 0;
  let bassEnd = 20;

  let explosionRate = 10;

  if (frameCount % explosionRate === 0) {
    for (let i = bassStart; i < bassEnd; i += 5) {
      if (random() > 0.8) {
        let radius = map(spectrum[i], 0, 255, 10, min(width, height) / 2);
        let x = random(width);
        let y = random(height);
        createExplosion(x, y, radius, spectrum[i], particles);
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

function updateAndDisplayParticles(particles) {
  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}

function createExplosion(x, y, radius, spectrumValue, particles) {
  let explosionColor = color(map(spectrumValue, 0, 255, 0, 360), 80, 90);

  for (let i = 0; i < 20; i++) {
    let angle = random(TWO_PI);
    let particle = new LukasParticle(
      x,
      y,
      cos(angle) * radius,
      sin(angle) * radius,
      explosionColor
    );
    particles.push(particle);
  }
}

class LukasParticle {
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

// DANIEL
function daniel_visualizer(
  sound,
  fft,
  particles,
  canvasContainer,
  bigCircleX,
  bigCircleY,
  bigCircleRadius,
  rotationAngle
) {
  if (sound.isPlaying()) {
    let spectrum = fft.analyze();

    // Set frame rate
    frameRate(30);

    // // Clear the canvas and set background color
    // background(255);

    // Draw a star in the center of the canvas with rotation
    drawStar(rotationAngle); // Increment rotation angle for smooth rotation

    // Switch angle mode back to DEGREES for FFT waveform
    let { wave, amp } = starFFT(fft);

    // Draw guitar strings based on audio waveform
    drawGuitarStrings(wave);

    // Create and manage particles
    DanielParticleManager(amp, particles);
  }
}

function DanielParticleManager(amp, circleParticles) {
  translate(width / 2, height / 2);
  let p = new DanielParticle();
  circleParticles.push(p);

  for (let i = circleParticles.length - 1; i >= 0; i--) {
    if (!circleParticles[i].edges()) {
      circleParticles[i].update(amp > 230);
      circleParticles[i].show();
    } else {
      circleParticles.splice(i, 1);
    }
  }
  translate(-1 * (width / 2), -(height / 2));
}

function drawGuitarStrings(wave) {
  stroke(3);
  fill(255);
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
}

function starFFT(fft2) {
  angleMode(DEGREES);
  translate(width / 2, height / 2);

  // Analyze the audio with FFT
  //fft.analyze();
  let amp = fft2.getEnergy(20, 200);
  let wave = fft2.waveform();
  stroke(0);
  noFill();
  translate(-(width / 2), -(height / 2));
  return { wave, amp };
}

function drawStar(rotationAngle) {
  angleMode(RADIANS);
  stroke(100);
  noFill();
  strokeWeight(2);
  push(); // Save current transformation state
  translate(width / 2, height / 2); // Translate to the center of the canvas
  rotate(rotationAngle); // Rotate the canvas
  star(0, 0, 180, 300, 5); // Draw the star at (0, 0)
  pop(); // Restore previous transformation state
  rotationAngle += 0.01;
}

class DanielParticle {
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
    return (
      this.pos.x < -width / 2 ||
      this.pos.x > width / 2 ||
      this.pos.y < -height / 2 ||
      this.pos.y > height / 2
    );
  }
  show() {
    noStroke();
    fill(random(0, 255));
    ellipse(this.pos.x, this.pos.y, this.w);
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
