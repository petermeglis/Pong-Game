function Bot(platform, ball, difficulty) {
	this.platform = platform;
	this.ball = ball;
	this.calculated = false;
	this.impactY = height / 2;
	this.difficulty = difficulty;

	this.upgrade = function() {
		if (this.platform.speed == 2) this.platform.speed == 3;
	}

	this.reset = function() {
		this.impactY = height / 2;
	}

	this.calculateLocation = function() {
		if (this.difficulty != 100 && this.ball.vel.x <= 0) this.calculated = false;
		if (this.difficulty == 100 && this.ball.vel.x >= 0) this.calculated = false;
		if (!this.calculated && this.ball.pos.x < width / 4 && this.difficulty == 3) {
			// if (this.platform.pos.y + this.platform.length / 2 < height / 3) this.impactY = height / 3;
			// else if (this.platform.pos.y + this.platform.length > 2 * height / 3) this.impactY = 2 * height / 3;
			this.impactY = height / 2;
		}
		if (!this.calculated && this.ball.pos.x > width / 2 && this.difficulty == 100) {
			// if (this.platform.pos.y + this.platform.length / 2 < height / 3) this.impactY = height / 3;
			// else if (this.platform.pos.y + this.platform.length > 2 * height / 3) this.impactY = 2 * height / 3;
			this.impactY = height / 2;
		}
		if (this.difficulty == 0) this.impactY = ball.pos.copy().y;
		else if (this.difficulty == 100) {
			if (!this.calculated && this.ball.vel.x < 0) {
				if (this.difficulty == 1) this.impactY = ball.pos.copy().y;
				else if (this.difficulty > 1) {
					var timeToImpact = ((this.platform.pos.x - ball.r) - ball.pos.x) / ball.vel.x;
					// console.log(timeToImpact);
					this.impactY = floor(ball.pos.y + ball.vel.y * timeToImpact);
					while (this.impactY < 0 || this.impactY > height) {
						if (this.impactY < 0) this.impactY *= -1;
						if (this.impactY > height) this.impactY = height - (this.impactY - height);
					}
					this.calculated = true;
				}
			}
		}
		else {
			if (!this.calculated && this.ball.vel.x > 0 && this.ball.pos.x > width / 2) {
				if (this.difficulty == 1) this.impactY = ball.pos.copy().y;
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
	}



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