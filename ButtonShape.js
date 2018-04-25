function buttonShape(x, y, w, h, name, textsize, whenClick) {
	this.pos = createVector(x, y);
	this.size = createVector(w, h);
	this.name = name;
	this.textsize = textsize;
	this.hightlight = false;
	this.clickBut = whenClick;
	this.boxcontain = new BoxContain(this.pos.x, this.pos.y, this.size.x, this.size.y);

	this.changeName = function(newName){
		this.name = newName;
	}

	this.show = function(){
		strokeWeight(1);
		stroke(255);

		if(this.hightlight) fill(color('hsba(150, 100%, 100%, 0.7)'));
		else noFill();
		
		rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		textSize(this.textsize);
		text(this.name, this.pos.x, this.pos.y); // plus this.size.y/8 to CENTER text
	}

	this.update = function(x, y){
		if(mouseX > this.pos.x - this.size.x/2 && mouseX < this.pos.x + this.size.x/2
		&& mouseY > this.pos.y - this.size.y/2 && mouseY < this.pos.y + this.size.y/2){
			this.hightlight = true;
		} else this.hightlight = false;
	}

	this.run = function(){
		this.update();
		this.show();

		// show box contain
		if(showBoxContain){
			strokeWeight(1);
			stroke(255);
			this.boxcontain.show();
		}
	}

	this.clicked = function(mousex, mousey){
		if(mousex > this.pos.x - this.size.x/2 && mousex < this.pos.x + this.size.x/2
		&& mousey > this.pos.y - this.size.y/2 && mousey < this.pos.y + this.size.y/2){
			this.clickBut();
		}
	}

	this.changeProperties = function(newX, newY, newW, newH, newName, newTextSize){
		this.pos.x = newX || this.pos.x;
		this.pos.y = newY || this.pos.y;
		this.size.x = newW || this.size.x;
		this.size.y = newH || this.size.y;
		this.name = newName || this.name;
		this.textsize = newTextSize || this.textsize;

		this.boxcontain = new BoxContain(this.pos.x, this.pos.y, this.size.x, this.size.y);
	}
}
