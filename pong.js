

/*
 * pong.js
 *
 * Classic Pong Game rewritten in Javascript. Game consists of 2 platform objects, a
 * ball object, and a bot object. The player controls the left platform, and the bot
 * controls the right platform. When the game starts, the player tries to hit the ball
 * by controlling the platform without letting the ball hit the left side of the screen.
 *  
 * As the game progresses, the ball will increase speed making it harder to reach.
 *
 * Peter Meglis
 * 4 February 2017
 */


var ball;
var player;
var cpu;
var bot;

var gameStart = false;
var playerScore = 0;
var cpuScore = 0;
var speed = 4;

var up = false;
var down = false;

var t = 0;
var pause = false;

var scores = [];

/*
 * Initializes the canvas, the ball, the two platforms, and the bot objects.
 */
function setup() {
	createCanvas(600, 400);
	ball = new Ball();
	player = new Platform(1);
	cpu = new Platform(2);

	bot = new Bot(cpu, ball, 3);
}

/*
 * Space: The game is started
 * W: The player's platform moves up
 * S: The player's platform moves down
 * Backspace: The game is restarted
 * Escape: Toggle paused
 */
function keyPressed() {
	if (keyCode === 32 && !gameStart) {
		gameStart = true;
		ball.start(speed);
	}
	if (keyCode === 87) {
		up = true;
	}
	if (keyCode === 83) {
		down = true;
	}
	if (keyCode === 8) {
		loop();
		this.restart();
	}
	if (keyCode === ESCAPE) {
		if (!pause) {
			pause = true;
			noLoop();
		}
		else if (pause) {
			pause = false;
			loop();
		}
	}
}

/*
 * Allows holding down W/S to move
 */
function keyReleased() {
	if (keyCode === 87) {
		up = false;
	}
	if (keyCode === 83) {
		down = false;
	}
}

/*
 * Restarts the game, setting the scores to 0, and reseting the ball speed.
 */
this.restart = function() {
	playerScore = 0;
	cpuScore = 0;
	speed = 4;
	ball.reset();
	player.reset();
	cpu.reset();
	bot.reset();
	gameStart = false;
}

/*
 * Resets the ball, platforms, and bot to their initial positions.
 */
this.reset = function() {
	if (speed < 6) speed += 0.5;
	ball.reset();
	player.reset();
	cpu.reset();
	bot.reset();
	gameStart = false;
}

/*
 * Draws parts of the background.
 */
function drawScene() {
	background(51);
	stroke(255);
	// Draws the middle border line.
	for (var i = 0; i < height; i += (height / 7.2)) {
		line(width / 2, i, width / 2, i + 10);
	}

	// Draws green dots on scored locations.
	push();
	stroke(0,200,0);
	fill(0,200,0);
	for (var i = 0; i < scores.length; i++) {
		while (scores[i].x > 600) scores[i].x--;
		while (scores[i].x < 0) scores[i].x++;
		ellipse(scores[i].x, scores[i].y, ball.r*2, ball.r*2);
	}
	pop();

	drawScore();
}

/*
 * Draws the score at the top of the screen.
 */
function drawScore() {
	push();
	noFill();
	stroke(200, 100);
	textSize(32);
	if (playerScore > 9) text(playerScore, width/2 - 45, 30);
	else text(playerScore, width/2 - 27, 30);
	text(cpuScore, width/2 + 10, 30);
	pop();
}

/*
 * Main draw function, handling the platforms and ball movement.
 */
function draw() {
	drawScene();

	bot.calculateLocation();
	bot.move();

	// Updates the ball movement if the ball hits a platform.
	player.hit(ball);
	cpu.hit(ball);

	// If the ball hits an edge, the score is updated and the game is reset.
	if (ball.score() == 0) {
		cpuScore++;
		scores.push(ball.pos.copy());
		this.reset();
	}
	else if (ball.score() == 1) {
		playerScore++;
		scores.push(ball.pos.copy());
		this.reset();
	}

	if (up) player.moveUp();
	if (down) player.moveDown();
	
	ball.move();
	ball.show();

	player.show();
	cpu.show();
}