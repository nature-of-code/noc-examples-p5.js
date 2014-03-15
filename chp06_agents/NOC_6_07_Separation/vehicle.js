// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Vehicle object

function Vehicle(x, y) {
  // All the usual stuff
  this.position = new PVector(x, y);
  this.r = 12;
  this.maxspeed = 3;    // Maximum speed
  this.maxforce = 0.2;  // Maximum steering force
  this.acceleration = new PVector(0, 0);
  this.velocity = new PVector(0, 0);
}

Vehicle.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// Separation
// Method checks for nearby vehicles and steers away
Vehicle.prototype.separate = function(vehicles) {
  var desiredseparation = this.r*2;
  var sum = new PVector();
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < vehicles.length; i++) {
    var d = PVector.dist(this.position, vehicles[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = PVector.sub(this.position, vehicles[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      sum.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    sum.div(count);
    // Our desired vector is the average scaled to maximum speed
    sum.normalize();
    sum.mult(this.maxspeed);
    // Implement Reynolds: Steering = Desired - Velocity
    var steer = PVector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
}

// Method to update location
Vehicle.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

Vehicle.prototype.display = function() {
  fill(127);
  stroke(200);
  strokeWeight(2);
  pushMatrix();
  translate(this.position.x, this.position.y);
  ellipse(0, 0, this.r, this.r);
  popMatrix();
}

// Wraparound
Vehicle.prototype.borders = function() {
  if (this.position.x < -this.r) this.position.x =  width+this.r;
  if (this.position.y < -this.r) this.position.y = height+this.r;
  if (this.position.x >  width+this.r) this.position.x = -this.r;
  if (this.position.y > height+this.r) this.position.y = -this.r;
}






