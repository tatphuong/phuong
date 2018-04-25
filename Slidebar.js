function SlideBar(x, y, w, h, min, max, firtValue) {
	this.pos = createVector(x, y);
	this.size = createVector(w, h);
	this.min = min;
	this.max = max;
	this.val = firtValue;
	this.boxcontain = new BoxContain(this.pos.x, this.pos.y, this.size.x, this.size.y);

	this.show = function(){
		stroke(255-map(this.val, 0, 1, 0, 255), 255, 255);
		strokeWeight(2);
		var ConvertValue = map(this.val, this.min, this.max, 0, this.size.x);
		var valuePos = this.pos.x - this.size.x/2 + ConvertValue;
		ellipse(valuePos, this.pos.y, this.size.y, this.size.y);

		// check to not draw line when ellipse near end or begin
		if(valuePos > this.pos.x - this.size.x/2 + this.size.y/2) 
			line(this.pos.x-this.size.x/2, this.pos.y, valuePos-this.size.y/2 , this.pos.y);

		if(valuePos < this.pos.x + this.size.x/2 - this.size.y/2){
			stroke(255);
			line(valuePos+this.size.y/2 , this.pos.y, this.pos.x+this.size.x/2, this.pos.y)
		}

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
			var newVolume = map(mousex-(this.pos.x-this.size.x/2), 
							 0, this.size.x, 
							 this.min, this.max);
			this.val = newVolume;
			myAudio.volume(newVolume);
			//myAudio.elt.volume = newVolume;
		}
	}

	this.changeProperties = function(newX, newY, newW, newH, newMin, newMax, newFirstValue){
		this.pos.x = newX || this.pos.x;
		this.pos.y = newY || this.pos.y;
		this.size.x = newW || this.size.x;
		this.size.y = newH || this.size.y;
		
		this.min = newMin || this.min;
		this.max = newMax || this.max;
		this.val = newFirstValue || this.val;

		this.boxcontain = new BoxContain(this.pos.x, this.pos.y, this.size.x, this.size.y);
	}
}