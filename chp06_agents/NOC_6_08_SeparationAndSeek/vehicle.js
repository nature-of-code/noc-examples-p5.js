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


Vehicle.prototype.applyBehaviors = function(vehicles) {
   var separateForce = this.separate(vehicles);
   var seekForce = this.seek(new PVector(mouseX,mouseY));
   separateForce.mult(2);
   seekForce.mult(1);
   this.applyForce(separateForce);
   this.applyForce(seekForce); 
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
    sum.sub(this.velocity);
    sum.limit(this.maxforce);
  }
  return sum;
}

    // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
Vehicle.prototype.seek = function(target) {
  var desired = PVector.sub(target,this.position);  // A vector pointing from the location to the target
  
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus velocity
  var steer = PVector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force    
  return steer;
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






