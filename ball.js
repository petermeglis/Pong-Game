function Ball() {
	this.pos = createVector(width / 2, height / 2);
	this.vel = createVector(0,0);
	this.accel = createVector(0,0);

	this.r = 5;

	this.push = function(force) {
		this.accel.add(force);
	}

	this.hit = function(vel) {
		this.vel.x *= -1;
		this.vel.y += vel;
	}

	this.reset = function() {
		this.pos = createVector(width / 2, height / 2);
		this.vel = createVector(0,0);
	}

	this.start = function(speed) {
		var leftRight = random(-1,1);
		if (leftRight >= 0) leftRight = 1;
		else leftRight = -1;
		if (speed > 5) var push = createVector(leftRight * random(0.5,1), random(-0.2,0.2));
		else var push = createVector(leftRight * random(0.5,1), random(-0.35,0.35));
		push.setMag(speed);
		this.push(push);
	}

	this.move = function() {
		this.edges();
		this.vel.add(this.accel);
		this.pos.add(this.vel);
		this.accel.mult(0);
	}

	this.show = function() {
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
	}

	this.score = function() {
		if (this.pos.x <= 0) {
			return 0;
		}
		else if (this.pos.x >= width) {
			return 1;
		}
		else return -1;
	}

	this.edges = function() {
		if (this.pos.x < 0) {
			this.pos.x = 0;
			this.vel.x *= -1;
		}
		else if (this.pos.x > width) {
			this.pos.x = width;
			this.vel.x *= -1;
		}
		else if (this.pos.y < 0) {
			this.pos.y = 0;
			this.vel.y *= -1;
		}
		else if (this.pos.y > height) {
			this.pos.y = height;
			this.vel.y *= -1;
		}
	}

}