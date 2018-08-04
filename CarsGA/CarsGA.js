// Constant values
const MUTATION_PROB_PERC = 0.01;
const POPULATION_SIZE = 25;

let MAX_LIFE_CYCLE = 200;
let population;
let genP, actualCompletedP, maxCompletedP;
let maxCompleted = 0, completedCars = 0, bestFitnessToShow = 0, count = 0, generation = 1;
let canvas;

/**
 * Create canvas and text stuff, objective and a new population. 
 */
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  genP = createP();
  actualCompletedP = createP();
  maxCompletedP = createP();

  objective = new Objective();
  population = new Population();

  MAX_LIFE_CYCLE = dist(objective.pos.x, objective.pos.y, 0, 0);
}

function draw() {
  // Set background color
  background(50);

  // Show objective
  objective.show();

  // Show data
  completedCars = population.getCompletedCars();
  maxCompleted = completedCars > maxCompleted ? completedCars : maxCompleted; 
  genP.html("Generation: " + generation);
  actualCompletedP.html("Actual completed cars: " + completedCars);
  maxCompletedP.html("Max number of completed cars: " + maxCompleted);
  
  // Move and show cars
  population.run();
  
  // draw start position
  fill(255);
  noStroke();
  ellipse(width/2, height - (height * 0.1), 10, 10);
  
  // Count frames
  count++;

  // If already move on screen n times
  if(population.getCompletedCars() + population.getCrashedCars() >= POPULATION_SIZE - 2) {
    // Set count to 0
    count = 0;

    // Increment generation count
    generation++;

    // Evaluate this generation to check witch are best cars 
    population.evaluate();

    // Select best cars and make a new generation from they
    population.selection();
  }

  
}

/**
 * Double click on canvas will change objective position. 
 */
function doubleClicked () {
  this.objective.pos.x = mouseX;
  this.objective.pos.y = mouseY;
}



/**
 * Objective it's the point that cars are looking for.
 */
function Objective() {
  this.pos = createVector(random(0, width), random(height/3, 0));
  this.show = function () {
    push();
    noStroke();
    fill(255);
    ellipse(objective.pos.x, objective.pos.y, 20, 20);
    pop();
  };
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}