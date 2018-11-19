// Constant values
const MUTATION_PROB = 0.001
const POPULATION_SIZE = 50

let MAX_DIST = 200, BEST_PATH
let population, startPos, canvas
let genP, actualCompletedP, maxCompletedP
let maxCompleted = 0, completedCars = 0, bestFitnessToShow = 0, count = 0, generation = 1

/**
 * Create canvas and text stuff, objective and a new population. 
 */
function setup() {
  canvas = createCanvas(windowWidth, windowHeight)
  canvas.position(0, 0)
  canvas.style('z-index', '-1')
  genP = createP()
  actualCompletedP = createP()
  maxCompletedP = createP()

  objective = new Objective()
  population = new Population()

  startPos = {
    pos: createVector(width/2, height - (height * 0.1)),
    r: 10
  }

  MAX_DIST = dist(objective.pos.x, objective.pos.y, 0, 0)
  BEST_PATH = dist(objective.pos.x, objective.pos.y, startPos.pos.x, startPos.pos.y)
}

function draw() {
  // Set background color and show objective
  background(50)
  objective.show()

  // Show data
  completedCars = population.getCompletedCars()
  maxCompleted = completedCars > maxCompleted ? completedCars : maxCompleted
  genP.html("Generation: " + generation)
  actualCompletedP.html("Actual completed cars: " + completedCars)
  maxCompletedP.html("Max number of completed cars: " + maxCompleted)
  
  // Move and show cars
  population.run()
  
  // draw start position
  fill(255)
  noStroke()
  ellipse(startPos.pos.x, startPos.pos.y , startPos.r)
  
  // Count frames
  count++

  // If half of population has crashed, start a new one
  if(population.getCrashedCars() + population.getCompletedCars() > population.cars.length / 2) {
    count = 0
    generation++

    // Evaluate this generation to check witch are best cars 
    population.evaluate()

    // Select best cars and make a new generation from they
    population.selection()
  }
}

/**
 * Objective it's the point that cars are looking for.
 */
function Objective() {
  this.pos = createVector(random(0, width), random(height/3, 0))
  this.show = function () {
    push()
    noStroke()
    fill(255)
    ellipse(objective.pos.x, objective.pos.y, 20, 20)
    pop()
  }
}

/**
 * Double click on canvas will change objective position. 
 */
function doubleClicked () {
  this.objective.pos.x = mouseX
  this.objective.pos.y = mouseY
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
