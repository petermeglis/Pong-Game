
/*
 * ball.js
 * 
 * The ball object is hit by the platforms in the Pong game. The ball is represented
 * with position, velocity, and acceleration vectors.
 *
 * Peter Meglis
 * 4 February 2017
 */
function Ball() {
	this.pos = createVector(width / 2, height / 2);
	this.vel = createVector(0,0);
	this.accel = createVector(0,0);

	this.r = 5;

	/*
	 * Pushes the ball, primarily used at the start of the game.
	 */
	this.push = function(force) {
		this.accel.add(force);
	}

	/*
	 * Hits the ball, changing its x velocity.
	 */
	this.hit = function(vel) {
		this.vel.x *= -1;
		this.vel.y += vel;
	}

	/*
	 * Resets the location of the ball.
	 */
	this.reset = function() {
		this.pos = createVector(width / 2, height / 2);
		this.vel = createVector(0,0);
	}

	/*
	 * Starts the ball moving, based on a random number to which side it starts.
	 */
	this.start = function(speed) {
		var leftRight = random(-1,1);
		if (leftRight >= 0) leftRight = 1;
		else leftRight = -1;
		if (speed > 5) var push = createVector(leftRight * random(0.5,1), random(-0.2,0.2));
		else var push = createVector(leftRight * random(0.5,1), random(-0.35,0.35));
		push.setMag(speed);
		this.push(push);
	}

	/*
	 * Moves the ball based on its velocity and acceleration.
	 */
	this.move = function() {
		this.edges();
		this.vel.add(this.accel);
		this.pos.add(this.vel);
		this.accel.mult(0);
	}

	/*
	 * Draws the ball.
	 */
	this.show = function() {
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
	}

	/*
	 * If the ball reaches a side, returns an integer accordingly.
	 * 0: Bot has scored
	 * 1: Player has scored
	 * -1: Neither scored
	 */
	this.score = function() {
		if (this.pos.x <= 0) {
			return 0;
		}
		else if (this.pos.x >= width) {
			return 1;
		}
		else return -1;
	}

	/*
	 * Bounces the ball off the top and bottom of the screen.
	 */
	this.edges = function() {
		if (this.pos.y < 0) {
			this.pos.y = 0;
			this.vel.y *= -1;
		}
		else if (this.pos.y > height) {
			this.pos.y = height;
			this.vel.y *= -1;
		}
	}

}