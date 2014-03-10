var target;
var popmax;
var mutationRate;
var population;

function setup() {
	createGraphics(1000, 360);
  	target = "To be or not to be.";
  	popmax = 150;
  	mutationRate = 0.01;

  	population = new Population(target, mutationRate, popmax);
}

function draw() {
  	population.naturalSelection();
  	population.generate();
  	population.calcFitness();
  	displayInfo();

  	if (population.finished == true) {
    		println(millis()/1000.0);
    		noLoop();
  	}
};

function displayInfo() {
  	background(255);
	var answer = population.getBest();
  	textAlign(LEFT);
  	fill(0);
  
  
  	textSize(24);
  	text("Best phrase:",20,30);
  	textSize(40);
  	text(answer, 20, 100);
	
  	textSize(18);
  	text("total generations:     " + population.getGenerations(), 20, 160);
  	text("average fitness:       " + nf(population.getAverageFitness(), 0, 2), 20, 180);
  	text("total population: " + popmax, 20, 200);
  	text("mutation rate:         " + Math.floor(mutationRate * 100) + "%", 20, 220);
 
	textFont("Courier");
  	textSize(10);
  	text("All phrases:" + population.allPhrases() + "\n", 500, 10);
};
