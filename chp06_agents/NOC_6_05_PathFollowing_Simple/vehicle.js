// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

function Vehicle(x,y,ms,mf) {
  this.position = new PVector(x,y);
  this.acceleration = new PVector(0,0);
  this.velocity = new PVector(2,0);
  this.r = 4;
  this.maxspeed = ms || 4;
  this.maxforce = mf || 0.1;
}

Vehicle.prototype.run = function() {
  this.update();
  this.display();
}

// This function implements Craig Reynolds' path following algorithm
// http://www.red3d.com/cwr/steer/PathFollow.html
Vehicle.prototype.follow = function(p) {

  // Predict position 50 (arbitrary choice) frames ahead
  var predict = this.velocity.get();
  predict.normalize();
  predict.mult(50);
  var predictLoc = PVector.add(this.position, predict);

  // Look at the line segment
  var a = p.start;
  var b = p.end;

  // Get the normal point to that line
  var normalPoint = getNormalPoint(predictLoc, a, b);

  // Find target point a little further ahead of normal
  var dir = PVector.sub(b, a);
  dir.normalize();
  dir.mult(10);  // This could be based on velocity instead of just an arbitrary 10 pixels
  var target = PVector.add(normalPoint, dir);

  // How far away are we from the path?
  var distance = PVector.dist(predictLoc, normalPoint);
  // Only if the distance is greater than the path's radius do we bother to steer
  if (distance > p.radius) {
    this.seek(target);
  }


  // Draw the debugging stuff
  if (debug) {
    fill(200);
    stroke(200);
    line(this.position.x, this.position.y, predictLoc.x, predictLoc.y);
    ellipse(predictLoc.x, predictLoc.y, 4, 4);

    // Draw normal location
    fill(200);
    stroke(200);
    line(predictLoc.x, predictLoc.y, normalPoint.x, normalPoint.y);
    ellipse(normalPoint.x, normalPoint.y, 4, 4);
    stroke(200);
    if (distance > p.radius) fill(255, 0, 0);
    noStroke();
    ellipse(target.x+dir.x, target.y+dir.y, 8, 8);
  }
}


Vehicle.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Vehicle.prototype.seek = function(target) {
  var desired = PVector.sub(target, this.position);  // A vector pointing from the position to the target

  // If the magnitude of desired equals 0, skip out of here
  // (We could optimize this to check if x and y are 0 to avoid mag() square root
  if (desired.mag() == 0) return;

  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = PVector.sub(desired, this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force

  this.applyForce(steer);
}

  // Method to update position
Vehicle.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelerationelertion to 0 each cycle
  this.acceleration.mult(0);
}

// Wraparound
Vehicle.prototype.borders = function(p) {
  if (this.position.x > p.end.x + this.r) {
    this.position.x = p.start.x - this.r;
    this.position.y = p.start.y + (this.position.y-p.end.y);
  }
}
    
Vehicle.prototype.display = function() {
  // Draw a triangle rotated in the direction of velocity
  var theta = this.velocity.heading() + PI/2;
  fill(127);
  stroke(200);
  strokeWeight(1);
  pushMatrix();
  translate(this.position.x,this.position.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r*2);
  vertex(-this.r, this.r*2);
  vertex(this.r, this.r*2);
  endShape(CLOSE);
  popMatrix();
}

// A function to get the normal point from a point (p) to a line segment (a-b)
// This function could be optimized to make fewer new Vector objects
var getNormalPoint = function(p, a, b) {
  // Vector from a to p
  var ap = PVector.sub(p, a);
  // Vector from a to b
  var ab = PVector.sub(b, a);
  ab.normalize(); // Normalize the line
  // Project vector "diff" onto line by using the dot product
  ab.mult(ap.dot(ab));
  var normalPoint = PVector.add(a, ab);
  return normalPoint;
}



