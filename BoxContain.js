function BoxContain(x, y, w, h) {
	this.pos = createVector(x, y);
	this.size = createVector(w, h);

	this.show = function(){
		noFill();
		stroke(color('hsba(100, 100%, 100%, 0.7)'));
		rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
	}
}