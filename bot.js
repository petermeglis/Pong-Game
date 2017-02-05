/*
 * bot.js
 *
 * The Pong game uses one bot object as the player's opponent. The bot moves the cpu platform based
 * on the projected location of the ball as it crosses the plane of the cpu platform. The difficulty
 * of the bot changes the "reaction time" given to the bot to move the platform.
 *
 * Peter Meglis
 * 4 February 2017
 */
function Bot(platform, ball, difficulty) {
	this.platform = platform;
	this.ball = ball;
	this.calculated = false;
	this.impactY = height / 2;
	this.difficulty = difficulty;

	/*
	 * Increases the speed of the bot's platform, making it easier to reach the ball's projected location.
	 */
	this.upgrade = function() {
		if (this.platform.speed == 2) this.platform.speed == 3;
	}

	/*
	 * Moves the platform back to the center of the screen after it has hit the ball.
	 */
	this.reset = function() {
		this.impactY = height / 2;
	}

	/*
	 * Calculates the projected location of the ball. Different calculations occur based on the difficulty
	 * set for the bot.
	 */
	this.calculateLocation = function() {
		if (this.ball.vel.x <= 0) this.calculated = false;

		// Reset - Difficulty 3
		if (!this.calculated && this.ball.pos.x < width / 4 && this.difficulty == 3) {
			if (this.platform.pos.y + this.platform.length / 2 < height / 3) this.impactY = height / 3;
			else if (this.platform.pos.y + this.platform.length > 2 * height / 3) this.impactY = 2 * height / 3;
			else this.impactY = height / 2;
		}
		// Reset - Difficulty 1
		if (this.difficulty == 0) this.impactY = ball.pos.copy().y;
		

		
		if (!this.calculated && this.ball.vel.x > 0 && this.ball.pos.x > width / 2) {
			// Calculate - Difficulty 1
			if (this.difficulty == 1) this.impactY = ball.pos.copy().y;
			// Calculate - Difficulty 2, 3
			else if (this.difficulty > 1) {
				var timeToImpact = ((this.platform.pos.x - ball.r) - ball.pos.x) / ball.vel.x;
				console.log(timeToImpact);
				this.impactY = floor(ball.pos.y + ball.vel.y * timeToImpact);
				while (this.impactY < 0 || this.impactY > height) {
					if (this.impactY < 0) this.impactY *= -1;
					if (this.impactY > height) this.impactY = height - (this.impactY - height);
				}
				this.calculated = true;
			}
		}
		
	}


	/*
	 * Moves the cpu platform to the impact point.
	 */
	this.move = function() {
		var midPos = this.platform.pos.y + this.platform.length / 2;
		if (this.difficulty > 1 && abs(midPos - this.impactY) < this.platform.speed) {}
		else if (midPos - this.impactY < 0) {
			this.platform.moveDown();
		}
		else if (midPos - this.impactY > 0) {
			this.platform.moveUp();
		}
	}
	
}