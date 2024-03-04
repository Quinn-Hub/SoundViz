let bigCircleRadius = 150;
let bigCircleX;
let bigCircleY;
let smallCircleRadius = 40;
let numSmallCircles = 5;
let angleIncrement;

function setup() {
  createCanvas(displayWidth, displayHeight);
  bigCircleX = displayWidth / 2;
  bigCircleY = (displayHeight / 16) * 12;
  angleIncrement = TWO_PI / 10; //TWO_PI / numSmallCircles;
}

function draw() {
  // Draw the big circle
  noFill();
  stroke(0);
  fill(220);
  ellipse(bigCircleX, bigCircleY, bigCircleRadius * 2);

  // Draw the smaller circles along the edge of the big circle
  let currVisualizer = 1;

  for (let i = 0; i < numSmallCircles; i++) {
    let angle = i * angleIncrement + 3.45;
    let smallCircleX = bigCircleX + cos(angle) * bigCircleRadius;
    let smallCircleY = bigCircleY + sin(angle) * bigCircleRadius;

    // Check if mouse is over the circle
    let d = dist(mouseX, mouseY, smallCircleX, smallCircleY);
    if (d < smallCircleRadius) {
      fill(0, 255, 0); // Change color to green when mouse is over
    } else {
      fill(255, 0, 0); // Otherwise, keep it red
    }

    noStroke();
    ellipse(smallCircleX, smallCircleY, smallCircleRadius * 2);
    fill(255);
    textSize(50);
    text(currVisualizer, smallCircleX - 10, smallCircleY + 10);
    currVisualizer++;
  }
}

function mousePressed() {
  for (let i = 0; i < numSmallCircles; i++) {
    let angle = i * angleIncrement + 3.45;
    let smallCircleX = bigCircleX + cos(angle) * bigCircleRadius;
    let smallCircleY = bigCircleY + sin(angle) * bigCircleRadius;

    let d = dist(mouseX, mouseY, smallCircleX, smallCircleY);
    if (d < smallCircleRadius) {
      // This circle was clicked, do something
      console.log("Button", i + 1, "clicked");
      // You can perform actions specific to each button here
    }
  }
}
