let x, h, w;
let run = true;
let turn = 1;
let pl = [10, 6];

function setup() {
	createCanvas(innerWidth, innerHeight - 4);
	textFont('Georgia');
	h = height * 0.75;
	w = (width - h) / 2;
	x = new board(w, height - h - 50, width - w, h - 50);
}

function draw() {
	background(0);
	score();
	if (run) {
		x.select(mouseX, mouseY);
		x.render();
	} else {
		button();
	}
}

function control() {
	let p = x.mark(turn);
	if (p.m) {
		let a = turn === 1 ? 0 : 1;
		pl[a] += p.p;
		if (!p.w) {
			turn *= -1;
		}
	}
}

function reset() {
	if (over) {
		x = new board(w, height - h - 50, width - w, h - 50);
		pl = [0, 0];
		run = true;
		turn = 1;
		over = false;
	}
}

function mousePressed() {
	if (mouseButton === LEFT) {
		if (run) {
			control();
		} else {
			reset();
		}
	}
}

let over = false;
function button() {
	let c1 = 150;
	let c2 = 255;
	if (over) {
		c1 = 100;
		c2 = 150;
		cursor(HAND);
	} else {
		cursor(ARROW);
	}
	push();
	rectMode(RADIUS);
	fill(c1, c2);
	rect(width / 2, (3 * height) / 4, 100, 50);
	fill(255);
	textSize(28);
	stroke(255, c2);
	strokeWeight(1);
	textAlign(CENTER, CENTER);
	text('Play Again', width / 2, (3 * height) / 4);
	pop();
	over = buttonOver();
}

function buttonOver() {
	let res = false;
	let x = abs(width / 2 - mouseX);
	let y = abs((3 * height) / 4 - mouseY);
	if (x < 100 && y < 50) {
		res = true;
	}
	return res;
}

function score() {
	stroke(255);
	strokeWeight(1);
	fill(255);
	textSize(28);
	textAlign(LEFT);
	text('Player A: ' + pl[0], 50, 50);
	textAlign(RIGHT);
	text('Player B: ' + pl[1], width - 50, 50);
	let t = turn === 1 ? 'A' : 'B';
	textSize(48);
	textAlign(CENTER);
	text('Turn of player ' + t, width / 2, 50);

	let a = pl[0] + pl[1];
	if (a === 16) {
		run = false;
		fill(150);
		stroke(255);
		textSize(96);
		strokeWeight(5);
		if (pl[0] != pl[1]) {
			let p = pl[0] > pl[1] ? 'A' : 'B';
			text('Player ' + p + ' Won the Game !!!!', width / 2, height / 2);
		} else {
			text('The game draw', width / 2, height / 2);
		}
	}
}
