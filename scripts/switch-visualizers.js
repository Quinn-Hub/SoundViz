let bigCircleRadius = 150;
let bigCircleX;
let bigCircleY;
let smallCircleRadius = 40;
let numSmallCircles = 5;
let angleIncrement;
let circleProperties = [];
let clickedIndexText = "1";

function setup() {
  createCanvas(displayWidth, displayHeight);
  bigCircleX = displayWidth / 2;
  bigCircleY = (displayHeight / 16) * 13;
  angleIncrement = TWO_PI / 10;

  // Initialize properties for each circle
  for (let i = 0; i < numSmallCircles; i++) {
    let angle = i * angleIncrement + 3.45;
    let x = bigCircleX + cos(angle) * bigCircleRadius;
    let y = bigCircleY + sin(angle) * bigCircleRadius;
    circleProperties.push({ x: x, y: y, size: smallCircleRadius, color: color(255, 0, 0) });
  }

  circleProperties[0].size = 50; // Change size
  circleProperties[0].color = color(0, 0, 255);
}

function draw() {
  background(255);

  // Draw the big circle
  noFill();
  stroke(0);
  fill(220);
  ellipse(bigCircleX, bigCircleY, bigCircleRadius * 2);
  fill(0);
  text(clickedIndexText, (displayWidth / 2) - 10, ((displayHeight / 16) * 13) - 30);

  // Draw the smaller circles along the edge of the big circle
  for (let i = 0; i < numSmallCircles; i++) {
    let props = circleProperties[i];
    let d = dist(mouseX, mouseY, props.x, props.y);
    if (d < props.size) {
      fill(0, 255, 0);
    } else {
      fill(props.color);
    }
    noStroke();
    ellipse(props.x, props.y, props.size * 2);
    fill(255);
    textSize(50);
    text(i + 1, props.x - 10, props.y + 15);
  }
}

function mousePressed() {
  let clickedIndex = -1; // Track the index of the clicked circle

  for (let i = 0; i < numSmallCircles; i++) {
    let props = circleProperties[i];
    let d = dist(mouseX, mouseY, props.x, props.y);
    if (d < props.size) {
      clickedIndex = i;
      if (clickedIndex == 0) {
        clickedIndexText = "1";
      } else if (clickedIndex == 1) {
        clickedIndexText = "2";
      } else if (clickedIndex == 2) {
        clickedIndexText = "3";
      } else if (clickedIndex == 3) {
        clickedIndexText = "4";
      } else if (clickedIndex == 4) {
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
    circleProperties[clickedIndex].size = 50; // Change size
    circleProperties[clickedIndex].color = color(0, 0, 255);
    console.log("Button", clickedIndex + 1, "clicked");
  }
}
