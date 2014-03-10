// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var Mover = function(m, x, y) {
  this.mass = m;
  this.position = new PVector(x, y);
  this.velocity = new PVector(0, 0);
  this.acceleration = new PVector(0, 0);
};
  
Mover.prototype.applyForce = function(force) {
  var f = PVector.div(force, this.mass);
  this.acceleration.add(f);
};
  
Mover.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
};

Mover.prototype.display = function() {
  stroke(0);
  strokeWeight(2);
  fill(255, 127);
  ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
};

Mover.prototype.calculateAttraction = function(m) {
  // Calculate direction of force
  var force = PVector.sub(this.position, m.position);
  // Distance between objects
  var distance = force.mag();
  // Limiting the distance to eliminate "extreme" results for very close or very far objects
  distance = constrain(distance, 5.0, 25.0);
  // Normalize vector (distance doesn't matter here, we just want this vector for direction                            
  force.normalize();
  // Calculate gravitional force magnitude
  var strength = (G * this.mass * m.mass) / (distance * distance);
  // Get force vector --> magnitude * direction
  force.mult(strength);
  return force;
};



