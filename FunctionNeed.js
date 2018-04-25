function addSongFromIdZing(id){
	loadJSON("https://mp3.zing.vn/xhr/media/get-source?type=audio&key="
 			+id, function(dataJson){
 					var medialink = 'https:'+ dataJson.data.source[128];
 					jsonWeb_song_Now = dataJson;
 					myAudio.src = medialink;
 					nameSongNow = jsonWeb_song_Now.data.title + " - " + jsonWeb_song_Now.data.artists_names;
 					imageSong = loadImage(jsonWeb_song_Now.data.thumbnail);
 					console.log(jsonWeb_song_Now.data.title+"\n"+medialink);
 					console.log("avatar image\n"+jsonWeb_song_Now.data.thumbnail);
 				});
}

function showNameSong() {
	strokeWeight(1);
	stroke(255);	
	noFill();
	textSize(27);
	text(nameSongNow, width/2, buts[0].pos.y-70);
}

function showCurrentState(){
	// networkState & readyState http://www.developphp.com/lib/JavaScript/Audio
	if(myAudio.elt.networkState == 1 && myAudio.elt.readyState == 4) 
	{
		if(myAudio.elt.paused)
			buts[0].changeName("Play");
		else buts[0].changeName("Pause");
	}
	else {
		var loading = "Loading";
		var timeAnimation = (millis()/200)%(loading.length);
		var textAnimation = "";
		for(var i = 0; i < timeAnimation; i++){
			textAnimation += loading[i];
		}
		buts[0].changeName(textAnimation);
	}
}

function showTime(x, y){
	var Se = floor(myAudio.elt.duration % 60);
	var Mi = floor((myAudio.elt.duration / 60) % 60);

	var s = floor(myAudio.elt.currentTime % 60);
	var m = floor((myAudio.elt.currentTime / 60) % 60);

	//Add 0 if seconds less than 10
	if(Se < 10) Se = '0' + Se;
	if (s < 10) s = '0' + s;

	//Show
	textSize(15);
	stroke(255);
	noFill();
	text(m+":"+s +" / "+ Mi+":"+Se, x, y);
}

function animationAvatar(){
	if(mouseX > buts[0].pos.x-buts[0].size.x/2 && mouseX < buts[0].pos.x+buts[0].size.x/2
	&& mouseY > buts[0].pos.y-buts[0].size.y/2 && mouseY < buts[0].pos.y+buts[0].size.y/2
	&& imageSong)
	{
		push();
		translate(mouseX+imageSong.width/2, mouseY+imageSong.height/2);

		if(!myAudio.elt.paused && myAudio.elt.duration > 0)
			rotate(((millis()/700)%180));
		image(imageSong, 0, 0);

		pop();
	}
}

function PlayPause(){
	if(myAudio.elt.paused && myAudio.elt.duration > 0)
		myAudio.elt.play();
	else myAudio.elt.pause();
}

function NextPre(nextOrPre){
		if(nextOrPre == 'next') songNow++;
		else songNow--;

		var len = jsonFile_all_ID.data.length;
		if(songNow >= len) songNow -= len;
		if(songNow < 0) songNow += len;

		addSongFromIdZing(jsonFile_all_ID.data[songNow].id);
}

function LoopMusic(isLooping){
	if(isLooping) {
		myAudio.elt.loop = false;
		buts[3].changeName("Loop");
	}
	else {
	 myAudio.elt.loop = true;
	 buts[3].changeName("noLoop");
	}
}

function getFileLocal(filein) {
	if (filein.type === 'image') {
		backG = createImg(filein.data).hide();

	} else if(filein.type === 'audio' || filein.type === 'video'){
		var url = URL.createObjectURL(filein.file);
        console.log(filein.file);
        myAudio.src = url;
        nameSongNow = filein.file.name.substring(0, filein.file.name.length-4);
        imageSong = null;

	} else{
		alert('File type not support , Please choose another file');
	}
}

function changeBackGround(){
	backgNow++;
	if(backgNow > 25) backgNow = 1;
	var newBackG = loadImage("image/BackG"+backgNow+".jpg",
		function(dataNewImage){
			backG = dataNewImage;
		}
	);
}

function showGuide(){
	fill(color('rgba(51, 51, 51, 0.3)'));
	strokeWeight(1);
	stroke(255);
	rect(145, height-130, 280, 230);
	
	textSize(15);
	textAlign(LEFT, CENTER);
	noFill();
	var x = 10;
	var y = height-250;
	
	text('            HELP (press G : on / off)', x, y+=20);
	stroke(color('rgb(150, 150, 150)'));
	text('You can DRAG to this web one file:', x, y+=20);
	text('   + music to play (mp3, mp4, m4a, ogg..)', x, y+=20)
	text('   + image to change background', x, y+=20);
	text('       B :     change back ground auto', x, y+=20);
	text('       C :     show / hide controls', x, y+=20);
	text('       N :     next song', x, y+=20);
	text('       P :     pre song', x, y+=20);
	text('       R :     random song', x, y+=20);
	text('      Space :  play / pause', x, y+=20);
	text('   Left-Right arrow : jump 5s', x, y+=20);
	textAlign(CENTER, CENTER);
}
