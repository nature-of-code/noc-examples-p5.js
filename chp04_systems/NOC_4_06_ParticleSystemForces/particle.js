// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

// A simple Particle class

function Particle(position) {
  this.acceleration = new PVector(0, 0.0);
  this.velocity = new PVector(random(-1, 1), random(-2, 0));
  this.position = position.get();
  this.lifespan = 255.0;  
  this.mass = 1; // Let's do something better here!
}

Particle.prototype.run = function() {
  this.update();
  this.display();  
}

Particle.prototype.applyForce = function(force){
  var f = force.get();
  f.div(this.mass);
  this.acceleration.add(f);
}

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
  this.lifespan -= 2.0;
}

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
}

 // Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0.0) {
      return true;
    } 
    else {
      return false;
    }
}
