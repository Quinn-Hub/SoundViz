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
let layer1 = false;
let layer2 = false;
let layer3 = false;
let layer4 = false;
let layer5 = false;

let prevTime = 0;
let gridSize = 200;
let gridOffset = 20;
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
  //window.addEventListener("resize", resizeCanvasHandler);

  fft = new p5.FFT();
  fft2 = new p5.FFT();

  bigCircleX = canvasContainer.width / 2;
  bigCircleY = (canvasContainer.height / 16) * 15;
  angleIncrement = TWO_PI / 8;

  // Initialize properties for each circle
  let circlePropOld = [];
  if (circleProperties.length > 0) {
    circlePropOld = [...circleProperties];
    console.log(circlePropOld);
  }
  else {
    for (let i = 0; i < numSmallCircles; i++) {
      circlePropOld.push({
        size: smallCircleRadius,
        color: color(255, 0, 0)
      });
    }
  }
  circleProperties.length = 0;
  for (let i = 0; i < numSmallCircles; i++) {
    let angle = i * angleIncrement + 3.15;
    let x = bigCircleX + cos(angle) * bigCircleRadius;
    let y = bigCircleY + sin(angle) * bigCircleRadius;
    circleProperties.push({
      x: x,
      y: y,
      size: circlePropOld[i].size,
      color: circlePropOld[i].color,
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
    let spectrum = fft.analyze();

    if (layer1) {
      createExplosions(spectrum, particles);
    }
    if (layer2) {
      drawEqualizerBars(spectrum);
    }
    if (layer3) {
      let amp = starFFT(fft2);
      GlitterParticles(amp, circleParticles);
    }
    if (layer4) {
      rotationAngle += 0.01;
      drawStar(rotationAngle);
    }
    if (layer5) {
      discoSquares(audioControls.sound, fft);
    }
  }

  // Draw switch visualizer buttons
  updateAndDisplayParticles(particles);
  drawSwitchVisualizerButtons();
}

function mousePressed() {
  if (circleProperties && circleProperties.length > 0) {
    for (let i = 0; i < numSmallCircles; i++) {
      let props = circleProperties[i];
      let d = dist(mouseX, mouseY, props.x, props.y);
      if (d < props.size) {
        clickedIndex = i;
        if (clickedIndex == 0) {
          if (layer1 == false) {
            layer1 = true;
          } else {
            layer1 = false;
          }
          clickedIndexText = "1";
        } else if (clickedIndex == 1) {
          if (layer2 == false) {
            layer2 = true;
          } else {
            layer2 = false;
          }
          clickedIndexText = "2";
        } else if (clickedIndex == 2) {
          if (layer3 == false) {
            layer3 = true;
          } else {
            layer3 = false;
          }
          clickedIndexText = "3";
        } else if (clickedIndex == 3) {
          if (layer4 == false) {
            layer4 = true;
          } else {
            layer4 = false;
          }
          clickedIndexText = "4";
        } else if (clickedIndex == 4) {
          if (layer5 == false) {
            layer5 = true;
          } else {
            layer5 = false;
          }
          clickedIndexText = "5";
        }
        break; // Stop the loop if a circle is clicked
      }
    }

    if (layer1 == false) {
      circleProperties[0].size = smallCircleRadius;
      circleProperties[0].color = color(255, 0, 0);
    } else if (layer1 == true) {
      // Change size and color of the clicked circle
      circleProperties[0].size = 35; // Change size
      circleProperties[0].color = color(0, 255, 0); // Change color
    }
    if (layer2 == false) {
      circleProperties[1].size = smallCircleRadius;
      circleProperties[1].color = color(255, 0, 0);
    } else if (layer2 == true) {
      circleProperties[1].size = 35;
      circleProperties[1].color = color(0, 255, 0);
    }
    if (layer3 == false) {
      circleProperties[2].size = smallCircleRadius;
      circleProperties[2].color = color(255, 0, 0);
    } else if (layer3 == true) {
      circleProperties[2].size = 35;
      circleProperties[2].color = color(0, 255, 0);
    }
    if (layer4 == false) {
      circleProperties[3].size = smallCircleRadius;
      circleProperties[3].color = color(255, 0, 0);
    } else if (layer4 == true) {
      circleProperties[3].size = 35;
      circleProperties[3].color = color(0, 255, 0);
    }
    if (layer5 == false) {
      circleProperties[4].size = smallCircleRadius;
      circleProperties[4].color = color(255, 0, 0);
    } else if (layer5 == true) {
      circleProperties[4].size = 35;
      circleProperties[4].color = color(0, 255, 0);
    }
    console.log("Button", clickedIndex + 1, "clicked");
  }
}

function drawSwitchVisualizerButtons() {
  // Draw the big circle
  noFill();
  stroke(0);
  strokeWeight(5);
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

/*
function resizeCanvasHandler() {
  resizeCanvas(canvasContainer.width, canvasContainer.height);
  console.log("Resizing.")
}
*/

// idk look at this https://jslegenddev.substack.com/p/how-to-make-your-canvas-scale-to
function windowResized() {
  setup();
  console.log("resizing");
}

function discoSquares(sound, fft) {
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
      stroke(color(colorR, colorG, colorB));
      fill(colorR, colorG, colorB);
      rect(square.x, square.y, gridSize, gridSize);
    }
  }
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

    stroke(color(map(spectrum[i], 0, 255, 0, 360), 80, 90));
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
    let particle = new Explosion(
      x,
      y,
      cos(angle) * radius,
      sin(angle) * radius,
      explosionColor
    );
    particles.push(particle);
  }
}

class Explosion {
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

function GlitterParticles(amp, circleParticles) {
  translate(width / 2, height / 2);
  let p = new Glitter();
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
  stroke(color(random(0, 255), random(0, 255), random(0, 255)));
  noFill();
  strokeWeight(10);
  push(); // Save current transformation state
  translate(width / 2, height / 2); // Translate to the center of the canvas
  rotate(rotationAngle); // Rotate the canvas
  star(0, 0, 180, 300, 5); // Draw the star at (0, 0)
  pop(); // Restore previous transformation state
  rotationAngle += 0.01;
}

class Glitter {
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
