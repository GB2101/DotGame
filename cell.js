class cell {
	constructor(x1, y1, x2, y2, s) {
		this.p = [
			{ x: x1, y: y1 },
			{ x: x2, y: y1 },
			{ x: x2, y: y2 },
			{ x: x1, y: y2 },
		];
		this.s = s;
		this.player = 0;
		this.walls = [false, false, false, false];
		this.quant = 0;
	}

	stamp(x, y) {
		textAlign(CENTER, CENTER);
		let p = this.player === 1 ? 'A' : 'B';
		fill(255);
		stroke(255);
		strokeWeight(1);
		text(p, x, y);
	}

	render() {
		if (this.player != 0) {
			fill(255, 150);
			if (this.player < 0) {
				fill(75, 150);
			}
			noStroke();
			rect(this.p[0].x, this.p[0].y, this.s, this.s);
			let x = this.p[0].x + this.s / 2;
			let y = this.p[0].y + this.s / 2;
			this.stamp(x, y);
		}
		stroke(255);
		strokeWeight(2);
		for (let i = 0; i < 4; i++) {
			if (this.walls[i]) {
				let j = (i + 1) % 4;
				line(this.p[i].x, this.p[i].y, this.p[j].x, this.p[j].y);
			}
		}
	}

	update(i, player) {
		let res = false;
		this.walls[i] = true;
		this.quant++;
		if (this.quant === 4) {
			this.player = player;
			res = true;
		}
		return res;
	}
}
