
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

var fr;
var time;
var t = 0;
var pause = false;

var scores = [];

function setup() {
	createCanvas(600, 400);
	ball = new Ball();
	player = new Platform(1);
	cpu = new Platform(2);

	// botPlayer = new Bot(player, ball, 100);
	bot = new Bot(cpu, ball, 3);

	fr = createP('');
	time = createP('');
}

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

function keyReleased() {
	if (keyCode === 87) {
		up = false;
	}
	if (keyCode === 83) {
		down = false;
	}
}

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

this.reset = function() {
	if (speed < 6) speed += 0.5;
	ball.reset();
	player.reset();
	cpu.reset();
	bot.reset();
	gameStart = false;

	// gameStart = true;
	// ball.start(speed);
}

function drawScene() {
	background(51);
	stroke(255);
	for (var i = 0; i < height; i += (height / 7.2)) {
		line(width / 2, i, width / 2, i + 10);
	}

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

function draw() {
	drawScene();

	// botPlayer.calculateLocation();
	// botPlayer.move();

	bot.calculateLocation();
	bot.move();


	player.hit(ball);
	cpu.hit(ball);

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

	fr.html(floor(frameRate()));
}