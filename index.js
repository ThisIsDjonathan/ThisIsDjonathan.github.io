const SPRING = 0.5;
const GRAVITY = 0.01;
const FRICTION = -0.9;
let num_of_balls = 40;
let balls = [];

function setup() {
    canvas = createCanvas(windowWidth, windowHeight)
    num_of_balls = (windowWidth + windowHeight) * 0.020 
    if (num_of_balls > 100) {
        num_of_balls = 100
    }
    canvas.position(0, 0)
    canvas.style('z-index', '-1')

    for (let i = 0; i < num_of_balls; i++) {
        let color = {
            r: 10,
            g: 20,
            b: 30
        }
        balls[i] = new Ball(random(width), random(height), random(30, 70), i, color, balls);
    }
    noStroke();
    background(50);
}

function draw() {
    noStroke();
    balls.forEach(ball => {
        ball.collide();
        ball.move();
        ball.display();
    });
}

class Ball {
    constructor(x, y, diameter, id, color, others) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.diameter = diameter;
        this.id = id;
        this.others = others;
        this.color = color;
    }

    collide() {
        for (let i = this.id + 1; i < num_of_balls; i++) {
            let dx = this.others[i].x - this.x;
            let dy = this.others[i].y - this.y;
            let distance = sqrt(dx * dx + dy * dy);
            let minDist = this.others[i].diameter / 2 + this.diameter / 2;
            if (distance < minDist) {
                let angle = atan2(dy, dx);
                let targetX = this.x + cos(angle) * minDist;
                let targetY = this.y + sin(angle) * minDist;
                let ax = (targetX - this.others[i].x) * SPRING;
                let ay = (targetY - this.others[i].y) * SPRING;
                this.vx -= ax;
                this.vy -= ay;
                this.others[i].vx += ax;
                this.others[i].vy += ay;
            }
        }
    }

    move() {
        this.vy += GRAVITY;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x + this.diameter / 2 > width+50) {
            this.x = width - this.diameter / 2;
            this.vx *= FRICTION;
        } else if (this.x - this.diameter / 2 < -50) {
            this.x = this.diameter / 2;
            this.vx *= FRICTION;
        }
        if (this.y + this.diameter / 2 > height+50) {
            this.y = height - this.diameter / 2;
            this.vy *= FRICTION;
        } else if (this.y - this.diameter / 2 < -50) {
            this.y = this.diameter / 2;
            this.vy *= FRICTION;
        }
    }

    display() {
        ellipse(this.x, this.y, this.diameter, this.diameter);
        fill(noise(this.color.r)*255,noise(this.color.g)*255,noise(this.color.b)*255, 10)

        this.color.r += 0.01;
        this.color.g += 0.01;
        this.color.b += 0.01;
    }
  }