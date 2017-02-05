
/*
 * platform.js
 *
 * The Pong game uses two Platform objects, the player and the cpu platform.
 *
 * Peter Meglis
 * 4 February 2017
 */
function Platform(player) {
	this.length = 50;
	this.player = player;
	if (player === 1) this.pos = createVector(20, height / 2 - this.length / 2);
	else if (player === 2) this.pos = createVector(width - 20, height / 2 - this.length / 2);
	this.speed = 3;

	/*
	 * Calculates if the ball has "hit" the platform, and pushes that change to the ball object accordingly.
	 */
	this.hit = function(ball) {
		if (ball.pos.x > width / 3 && ball.pos.x < 2 * width / 3) 
			return;
		var upY = this.pos.y + this.length / 3;
		var midY = this.pos.y + 2 * this.length / 3;
		var downY = this.pos.y + this.length;
		for (var i = this.pos.y; i <= this.pos.y + this.length; i += 2) {
			var d  = dist(this.pos.x, i, ball.pos.x, ball.pos.y);
			if (d < ball.r) {
				if (ball.pos.y > upY) {
					ball.hit(1);
				}
				else if (ball.pos.y > midY) {
					ball.hit(0);
				}
				else {
					ball.hit(-1);
				}
				break;
			}
		}
	}

	/*
	 * Resets the location of the platform back to the middle.
	 */
	this.reset = function() {
		if (this.player === 1) this.pos = createVector(20, height / 2 - this.length / 2);
		else if (this.player === 2) this.pos = createVector(width - 20, height / 2 - this.length / 2);
	}

	/*
	 * Draws the platform.
	 */
	this.show = function() {
		stroke(255);
		strokeWeight(3);
		line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.length);
	}

	/*
	 * Moves the platform up based on the speed given to the platform.
	 */
	this.moveUp = function() {
		this.edges();
		this.pos.y -= this.speed;
	}

	/*
	 * Moves the platform down based on the speed given to the platform.
	 */
	this.moveDown = function() {
		this.edges();
		this.pos.y += this.speed;
	}

	/*
	 * If the platform is near an edge, this inhibits movement past the edge of the screen.
	 */
	this.edges = function() {
		if (this.pos.y <= 0) {
			this.pos.y = 0;
		}
		else if (this.pos.y + this.length >= height) {
			this.pos.y = height - this.length;
		}
	}
}