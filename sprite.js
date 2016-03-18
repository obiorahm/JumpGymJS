var 

s_bird,
s_bg,
s_fg,
s_pipeNorth,
s_pipeSouth,
s_text,
s_score,
s_splash,
s_buttons,
s_numberS,
s_numberB,
s_heart,

scaler = .7,
TO_RADIANS = Math.PI / 180;


function Sprite(img, x, y, width, height) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
Sprite.prototype.draw = function(ctx, x, y, w, h) {
	if (w==null){
		w = 1;
		h = 1;
	}
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
		x, y, this.width*w, this.height*h);
};

function initSprites(img) { //, img1) {

	// sign = new Sprite(img1, 0, 0, 331, 164);

	s_bird = [
		new Sprite(img, 23, 1140, 183, 184),
		new Sprite(img, 217, 1143, 189, 187),
		new Sprite(img, 421, 1148, 185, 187),
		new Sprite(img, 622, 1145, 184, 186),
		new Sprite(img, 823, 1140, 183, 184),
		new Sprite(img, 1017, 1144, 189, 186),
		new Sprite(img, 1221, 1147, 185, 188),
		new Sprite(img, 1423, 1144, 183, 186),

		new Sprite(img, 13, 1592, 188, 185),
		new Sprite(img, 208, 1601, 193, 176),
		new Sprite(img, 408, 1607, 193, 170),
		new Sprite(img, 613, 1589, 190, 187),
		new Sprite(img, 822, 1575, 188, 176),
		new Sprite(img, 1030, 1588, 174, 174),
		new Sprite(img, 1223, 1618, 173, 161),
		new Sprite(img, 1410, 1626, 186, 150),
		new Sprite(img, 1619, 1604, 177, 172),

		new Sprite(img, 543, 651, 177, 181),
		new Sprite(img, 743, 651, 177, 181),
		new Sprite(img, 943, 651, 177, 181)
	];

	s_bird1 = [
		new Sprite(img, 23, 1365, 183, 184),
		new Sprite(img, 217, 1368, 189, 187),
		new Sprite(img, 421, 1373, 185, 187),
		new Sprite(img, 622, 1370, 184, 186),
		new Sprite(img, 823, 1365, 183, 184),
		new Sprite(img, 1017, 1369, 189, 186),
		new Sprite(img, 1220, 1372, 186, 188),
		new Sprite(img, 1423, 1369, 183, 186),

		new Sprite(img, 13, 1814, 188, 185),
		new Sprite(img, 208, 1823, 193, 176),
		new Sprite(img, 408, 1829, 193, 170),
		new Sprite(img, 613, 1811, 190, 187),
		new Sprite(img, 822, 1797, 188, 176),
		new Sprite(img, 1030, 1810, 174, 174),
		new Sprite(img, 1223, 1840, 173, 161),
		new Sprite(img, 1410, 1848, 186, 150),
		new Sprite(img, 1619, 1826, 177, 172),

		new Sprite(img, 543, 861, 177, 187),
		new Sprite(img, 743, 861, 177, 187),
		new Sprite(img, 943, 861, 177, 187)
	];	
	
	s_bg = new Sprite(img, 1210, 0, 608, 1108);
	s_fg = new Sprite(img, 457, 153, 371,  138);
	
	s_pipe = [
		new Sprite(img, 335, 26, 80, 183),
		new Sprite(img, 14, 13, 130, 497),
		new Sprite(img, 149, 11, 157, 504)
	];
	
	s_text = {
		JumpJym:    new Sprite(img, 19, 538, 305, 84),
		GameOver:   new Sprite(img, 24, 623, 330, 55),
		GetReady:   new Sprite(img, 30, 700, 305, 82)
	}
	s_buttons = {
		Rate:  new Sprite(img, 1169, 39, 261, 93),
		Menu:  new Sprite(img, 1444, 40, 248, 92),
		Share: new Sprite(img, 914, 178, 248, 92),
		Score: new Sprite(img, 904, 41, 253, 94),
		Ok:    new Sprite(img, 588, 88, 131, 47),
		Start: new Sprite(img, 1449, 253, 94)
	}

	s_radio = {
		SinglePlayer: new Sprite(img, 555, 303, 287, 60),
		MultiPlayer: new Sprite(img, 555, 364, 287, 60)
	}
	
	s_radioT = {
		SinglePlayer: new Sprite(img, 876, 303, 287, 60),
		MultiPlayer: new Sprite(img, 876, 364, 287, 60)
	}

	s_label = {
		Timer: new Sprite(img, 341, 388, 68, 20),
		Calories: new Sprite(img, 343, 418, 105, 20),
		Jumps: new Sprite(img, 342, 448, 71, 20)		
	}

	s_score  = new Sprite(img, 877,  20, 331, 169);
	s_splash = new Sprite(img, 923, 213, 223, 69);

	s_numberS = [
		new Sprite(img, 344, 311, 14, 20),
		new Sprite(img, 363, 310, 9, 21),
		new Sprite(img, 376, 311, 13, 20),
		new Sprite(img, 393, 311, 11, 20),
		new Sprite(img, 407, 311, 13, 20),
		new Sprite(img, 424, 311, 12, 20),
		new Sprite(img, 440, 311, 14, 20),
		new Sprite(img, 455, 311, 14, 19),
		new Sprite(img, 472, 311, 12, 20),
		new Sprite(img, 489, 311, 12, 20)
	];

	s_numberB = [
		new Sprite(img, 344, 349, 14, 20),
		new Sprite(img, 363, 348, 9, 21),
		new Sprite(img, 376, 349, 13, 20),
		new Sprite(img, 393, 349, 11, 20),
		new Sprite(img, 407, 349, 13, 20),
		new Sprite(img, 424, 349, 12, 20),
		new Sprite(img, 440, 349, 14, 20),
		new Sprite(img, 455, 350, 14, 19),
		new Sprite(img, 472, 349, 12, 20),
		new Sprite(img, 489, 349, 12, 20)
	]

	s_letters = {
		A: new Sprite(img, 51, 848, 29, 37),
		B: new Sprite(img, 97, 846, 25, 39),
		C: new Sprite(img, 139, 847, 27, 38),
		D: new Sprite(img, 186, 847, 26, 38),
		E: new Sprite(img, 231, 847, 24, 38),
		F: new Sprite(img, 274, 847, 23, 37),
		G: new Sprite(img, 313, 846, 29, 38),
		H: new Sprite(img, 364, 846, 26, 39),
		I: new Sprite(img, 405, 847, 22, 38),
		J: new Sprite(img, 50, 907, 21, 37),
		K: new Sprite(img, 92, 907, 25, 37),
		L: new Sprite(img, 136, 907, 23, 37),
		M: new Sprite(img, 173, 905, 35, 39),
		N: new Sprite(img, 226, 906, 27, 38),
		O: new Sprite(img, 273, 906, 29, 39),
		P: new Sprite(img, 323, 906, 22, 39),
		Q: new Sprite(img, 365, 907, 35, 44),
		R: new Sprite(img, 53, 966, 24, 39),
		S: new Sprite(img, 95, 966, 21, 39),
		T: new Sprite(img, 132, 967, 30, 37),
		U: new Sprite(img, 181, 966, 25, 39),
		V: new Sprite(img, 225, 966, 29, 36),
		W: new Sprite(img, 269, 967, 42, 38),
		X: new Sprite(img, 328, 967, 26, 38),
		Y: new Sprite(img, 370, 967, 27, 38),
		Z: new Sprite(img, 414, 967, 26, 38),
		_: new Sprite(img, 53, 1010, 30, 39)
	}

	s_heart = new Sprite(img, 346, 492, 21, 17);

	s_numberS.draw = s_numberB.draw = function(ctx, x, y, num, scale) {
		if (scale==null){
			scale = 1;
		}
		num = num.toString();
		for (var i = 0, len = num.length; i < len; i++) {
			var n = parseInt(num[i]);
			var step = this[n].width + 12;
			ctx.drawImage(this[n].img, this[n].x, this[n].y, this[n].width, this[n].height,
				x, y, this[n].width * scale, this[n].height * scale);
			x += step;
		}
	}

	s_letters.draw = function(ctx, x, y, fact, drawBox, angle) {
		
		if (drawBox == null) {drawBox = false; rotate = false;}
		else if(angle == null) {angle = false;}

	    function draw(x, toDraw, letters) {
	    	var lineWidth = 0,
	    	array_n = [],
	    	n;

	    	for(var i = 0; i < toDraw.length; i++){
				word = toDraw[i];
				if (i == toDraw.length - 1){word = word.substring(0, word.length - 2)};
				for(var strI = 0; strI < word.length; strI++){
					n = word.charAt(strI);
					array_n += n;
					lineWidth += letters[n].width - letterPadding;
				}
			}
			x -= (lineWidth - letterPadding) / 2;
			if (drawBox) {
				if (angle) {
					ctx.save(); 
					ctx.translate(x + 23, y - lineSeparation);
					ctx.rotate(-angle * TO_RADIANS);
					ctx.fillStyle = "#FFE400";
					ctx.fillRect(-(lineWidth + letterPadding) / 2, -(letterHeight + 2 * lineSeparation) / 2,
                    	lineWidth + letterPadding, letterHeight + 2 * lineSeparation);
					ctx.restore(); 
					ctx.fillStyle = "white";
				}
				else {
					ctx.fillRect(x, y - lineSeparation, lineWidth, letterHeight + 2 * lineSeparation);
					ctx.beginPath();
		            ctx.arc(x, y + letterHeight / 2, letterHeight / 2 + lineSeparation, 0, 2 * Math.PI);
		            ctx.fill();
		            ctx.beginPath();
		            ctx.arc(x + lineWidth, y + letterHeight / 2, letterHeight / 2 + lineSeparation, 0, 2 * Math.PI);
		            ctx.fill();
				}
			}
			for(var arrayI = 0; arrayI < array_n.length; arrayI++){
				n = array_n[arrayI];
				var currentLetter = letters[n],
				step = currentLetter.width - letterPadding;
				if (angle){
					ctx.save(); 
					var radian = -angle * TO_RADIANS;
					ctx.translate(x, y);
					ctx.rotate(radian);
					ctx.drawImage(currentLetter.img, currentLetter.x, currentLetter.y, currentLetter.width, currentLetter.height,
						-(scaler * currentLetter.width / 2), -(scaler * currentLetter.height / 2), 
						scaler * currentLetter.width, scaler * currentLetter.height);
					ctx.restore(); 
					y -= Math.tan(-radian) * (scaler * currentLetter.width) + 2;
					x += step;
				}
				else {
					ctx.drawImage(currentLetter.img, currentLetter.x, currentLetter.y, currentLetter.width, currentLetter.height,
					x, y, scaler * currentLetter.width, scaler * currentLetter.height);
					x += step;
				}
			}
		}

		var xp = x,
			len = 0,
			index = 0,
			next_word,
			toDraw = [],
			fact = fact.toUpperCase().split(" "),

			letterPadding = 4,
	    	lineSeparation = 10,
	    	letterHeight = 30;

		for(var arrayI = 0; arrayI < fact.length; arrayI++){
			var word = fact[arrayI];

			if(len + word.length > 30){
				next_word = word;
				next_word += "_";
				draw(x, toDraw, this);
				len = next_word.length;
				toDraw = [next_word];
				x = xp;
				y += letterHeight + lineSeparation;
			}

			else {
				word += "_";
				len += word.length;
				toDraw += word;
			}
			index += 1;
		}
		toDraw += fact.slice(index, fact.length);
		draw(x, toDraw, this);
	}
}
