// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Child class constructor
function Confetti(position) {
  Particle.call(this,position);
}

// Inherit from the parent class
Confetti.prototype = Object.create(Particle.prototype);
Confetti.prototype.constructor = Confetti;

// Override the display method
Confetti.prototype.display = function(){
  rectMode(CENTER);
  fill(127,this.lifespan);
  stroke(0,this.lifespan);
  strokeWeight(2);
  pushMatrix();
  translate(this.position.x,this.position.y);
  var theta = map(this.position.x,0,width,0,TWO_PI*2);
  rotate(theta);
  rect(0,0,12,12);
  popMatrix();
}