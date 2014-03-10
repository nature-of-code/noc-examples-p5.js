function Repeller(x, y){
  this.power = 300;
  this.position = new PVector(x, y);
}

Repeller.prototype.display = function(){
  stroke(255);
  strokeWeight(2);
  fill(127);
  ellipse(this.position.x,this.position.y, 32, 32);
}

Repeller.prototype.repel = function(p){
  var dir = PVector.sub(this.position, p.position); // Calculate direction of force
  var d = dir.mag();                                // Distance between objects
  dir.normalize();                                  // Normalize vector (distance doesn't matter here, we just want this vector for direction)
  d = constrain(d, 1, 100);                         // Keep distance within a reasonable range
  var force = -1 * this.power/ (d * d);             // Repelling force is inversely proportional to distance
  dir.mult(force);                                  // Get force vector --> magnitude * direction
  return dir;
}