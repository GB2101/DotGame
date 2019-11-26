class board {
	constructor(x1, y1, x2, y2) {
		this.points = [];
		this.cells = [];
		this.marked = [[], []];
		this.selection = { s: false, i: 0, x: 0, y: 0 };
		let s = (x2 - x1) / 4;
		let x = x1;
		let y = y1;
		for (let i = 0; i < 5; i++) {
			this.points[i] = [];
			for (let j = 0; j < 5; j++) {
				this.points[i].push({ x, y });
				x += s;
			}
			x = x1;
			y += s;
		}
		for (let i = 0; i < 4; i++) {
			this.cells[i] = [];
			for (let j = 0; j < 4; j++) {
				let p1 = this.points[i][j];
				let p2 = this.points[i + 1][j + 1];
				this.cells[i].push(new cell(p1.x, p1.y, p2.x, p2.y, s));
			}
		}
		for (let i = 0; i < 5; i++) {
			this.marked[0][i] = [];
			for (let j = 0; j < 4; j++) {
				this.marked[0][i][j] = false;
			}
		}
		for (let i = 0; i < 4; i++) {
			this.marked[1][i] = [];
			for (let j = 0; j < 5; j++) {
				this.marked[1][i][j] = false;
			}
		}
	}

	render() {
		stroke(255);
		strokeWeight(15);
		push();
		for (let cell of this.cells) {
			for (let c of cell) {
				c.render();
			}
		}
		pop();
		for (let pont of this.points) {
			for (let p of pont) {
				point(p.x, p.y);
			}
		}
	}

	draw(p1, p2) {
		let f = this.selection;
		if (!this.marked[f.i][f.x][f.y]) {
			cursor(HAND);
			stroke(255, 150);
			strokeWeight(15);
			line(p1.x, p1.y, p2.x, p2.y);
		}
	}

	select(x, y) {
		//Horizontal lines
		let ver = false;
		let hor = false;
		for (let line of this.points) {
			let py = abs(line[0].y - y);
			if (py <= 7) {
				for (let i in line) {
					if (x < line[i].x) {
						if (i > 0) {
							let px1 = abs(line[i].x - x);
							let px2 = abs(line[i - 1].x - x);
							if (px1 > 7 && px2 > 7) {
								ver = true;
								this.selection = {
									s: true,
									i: 0,
									x: this.points.indexOf(line),
									y: i - 1,
								};
								this.draw(line[i], line[i - 1]);
							}
						}
						break;
					}
				}
				break;
			}
		}
		if (ver) {
			return;
		}
		//Vertical lines
		for (let i in this.points[0]) {
			let px = abs(this.points[0][i].x - x);
			if (px <= 7) {
				for (let j in this.points) {
					if (y < this.points[j][i].y) {
						if (j > 0) {
							let py1 = abs(this.points[j][i].y - y);
							let py2 = abs(this.points[j - 1][i].y - y);
							if (py1 > 7 && py2 > 7) {
								hor = true;
								this.selection = {
									s: true,
									i: 1,
									x: j - 1,
									y: i - 0,
								};
								this.draw(
									this.points[j][i],
									this.points[j - 1][i]
								);
							}
						}
						break;
					}
				}
				break;
			}
		}
		if (!hor) {
			cursor(ARROW);
			this.selection.s = false;
		}
	}

	mark(player) {
		let res = { m: false, w: false, p: 0 };
		let f = this.selection;
		if (f.s && !this.marked[f.i][f.x][f.y]) {
			this.marked[f.i][f.x][f.y] = true;
			let x1 = f.x;
			let y1 = f.y;
			let x2 = f.x - 1;
			let y2 = f.y;
			let w1 = 0;
			let w2 = 2;
			if (f.i === 1) {
				x2++;
				y2--;
				w1 = 3;
				w2 = 1;
			}
			if (x1 < 4 && y1 < 4) {
				let u = this.cells[x1][y1].update(w1, player);
				res.p += u;
				res.w = u;
			}
			if (x2 >= 0 && y2 >= 0) {
				let u = this.cells[x2][y2].update(w2, player);
				res.p += u;
				res.w = u;
			}
			res.m = true;
		}
		return res;
	}
}
