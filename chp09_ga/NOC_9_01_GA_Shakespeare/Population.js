// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

function Population(p, m, num) {

  this.population = [];                   // Array to hold the current population
  this.matingPool = [];                   // ArrayList which we will use for our "mating pool"
  this.generations = 0;              // Number of generations
  this.finished = false;             // Are we finished evolving?
  this.target = p;                   // Target phrase
  this.mutationRate = m;             // Mutation rate
  this.perfectScore = 1;

  this.best = "";

  for (var i = 0; i < num; i++) {
    this.population[i] = new DNA(this.target.length);
  }

  this.calcFitness();
}



// Fill our fitness array with a value for every member of the population
Population.prototype.calcFitness = function() {
  for (let i = 0; i < this.population.length; i++) {
    this.population[i].calcFitness(target);
  }
};

// Generate a mating pool
Population.prototype.naturalSelection = function() {
  // Clear the ArrayList
  this.matingPool = [];

  var maxFitness = 0;
  for (var i = 0; i < this.population.length; i++) {
    if (this.population[i].fitness > maxFitness) {
      maxFitness = this.population[i].fitness;
    }
  }

  // Based on fitness, each member will get added to the mating pool a certain number of times
  // a higher fitness = more entries to mating pool = more likely to be picked as a parent
  // a lower fitness = fewer entries to mating pool = less likely to be picked as a parent
  for (let i = 0; i < this.population.length; i++) {
    
    var fitness = map(this.population[i].fitness,0,maxFitness,0,1);
    var n = floor(fitness * 100);  // Arbitrary multiplier, we can also use monte carlo method
    for (var j = 0; j < n; j++) {              // and pick two random numbers
      this.matingPool.push(this.population[i]);
    }
  }
};

// Create a new generation
Population.prototype.generate = function() {
  // Refill the population with children from the mating pool
  for (var i = 0; i < this.population.length; i++) {
    var a = floor(random(this.matingPool.length));
    var b = floor(random(this.matingPool.length));
    var partnerA = this.matingPool[a];
    var partnerB = this.matingPool[b];
    var child = partnerA.crossover(partnerB);
    child.mutate(this.mutationRate);
    this.population[i] = child;
  }
  this.generations++;
};


Population.prototype.getBest = function() {
  return this.best;
};

// Compute the current "most fit" member of the population
Population.prototype.evaluate = function() {
  var worldrecord = 0.0;
  var index = 0;
  for (var i = 0; i < this.population.length; i++) {
    if (this.population[i].fitness > worldrecord) {
      index = i;
      worldrecord = this.population[i].fitness;
    }
  }

  this.best = this.population[index].getPhrase();
  if (worldrecord === this.perfectScore) {
    this.finished = true;
  }
};

Population.prototype.isFinished = function() {
  return this.finished;
};

Population.prototype.getGenerations = function() {
  return this.generations;
};

// Compute average fitness for the population
Population.prototype.getAverageFitness = function() {
  var total = 0;
  for (var i = 0; i < this.population.length; i++) {
    total += this.population[i].fitness;
  }
  return total / (this.population.length);
};

Population.prototype.allPhrases = function() {
  var everything = "";
  
  var displayLimit = min(this.population.length,50);
  
  
  for (var i = 0; i < displayLimit; i++) {
    everything += this.population[i].getPhrase() + "<br>";
  }
  return everything;
};