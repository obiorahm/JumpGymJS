// JumpGym
// John Franklin

// Browser-friendly multiplayer game for resesrach project

var 
canvas,
ctx,
width = 1080,
height = 800,
bgScaler = .66,
logScaler = [1, 1, .8],

// Animation
fgpos = 0,
bgpos = 0,
frames = 0,
stunnedFrame = 0,
stunnedFrame1 = 0,

// Level
initialLevel = 225,
level = initialLevel,

// Reset times
sec = 1000,
getReadyTime = 3*sec,
splashTime = 0,
circleGrowthTime = 0,
jumpResetTime = .25*sec,
menuResetTime = 3*sec,

// Physical properties
maxJumps = 4,
initialSpeed = 5,
speed = initialSpeed,
gravity = .40,
pipeHeight = 140,

// Counter values
timerCount = 0,
timerPos = 0,
initialTens = 10,
tens = initialTens,
score = 0,
score1 = 0,
calories = 0,
calories1 = 0,
record = 0,
newRecord = 0,

//Source: UW Health (http://www.uwhealth.org/healthfacts/psychiatry/6246.html)
facts = ["Jumping helps improve your flexibility and posture",
        "Jumping helps increase your heart strength and efficiency",
        "Jumping helps improve your coordination and agility",
        "Jumping helps you build stronger bones",
        "Jumping helps improve your balance",
        "Jumping helps increase your attention span",
        "Jumping helps tone your muscles and improves your skin",
        "Jumping helps improve both upper and lower body strength"],

randnum = Math.floor(Math.random() * facts.length),

// Game features
SinglePlayer = true,
MultiPlayer = false,
Timer = true,
Calories = true,
Jumps = true,

// Same-obstacle tracker
different = true,
different1 = true,

// Winner result (1: player 1, 2: player 2)
winner,

// Key map
map = [],

// Audio assets
jumpGym = new Audio("res/JumpGym.mp3"),
snd = new Audio("res/jumping_teon.mp3"),
snd1 = new Audio("res/jumping_teon1.mp3"),
punch = new Audio("res/punch_sound.mp3"),
punch1 = new Audio("res/punch_sound1.mp3"),
swamp = new Audio("res/swamp_sounds.mp3"),
banjo = new Audio("res/banjo.mp3"),
banjo_start = new Audio("res/banjo_start.mp3"),
banjo_count = new Audio("res/banjo_count.mp3"),
banjo_end = new Audio("res/banjo_end.wav"),
hrtPop = new Audio("res/heart_pop.wav"),

okbtn,
SinglePlayerbtn,
MultiPlayerbtn,

currentstate,
states = {
    Splash: 0, Game: 1, Score: 2, PreSplash: 3
},

// Bird physical properties
birdSeparation = 90,
bird_x = 80,
bird1_x = bird_x + birdSeparation,
birds_y = 10,
minBirdPlacement = -195;

bird = {

    x: bird_x,
    y: birds_y,
    frame: 0,
    velocity: 0,
    animation: [0,1,2,3,4,5,6,7, 8,9,10,11,12,13,14,15,16, 17,18,19], //order of sprites, to get the animation sequence
    rotation: 0,
    radius: 12,
    _jump: 11,
    dead: false,
    lives: 3,
    canJumpCounter: 0,
    canJump: true,

    resetCanJump: function() {
        if(currentstate != states.Score){
            bird.canJump = true;
        }
    },

    jump: function(){
        if (this.canJump){
            if (this.canJumpCounter < maxJumps)  {
                if (this.canJumpCounter == 0) {snd.play()}; 
                this.velocity = -this._jump;
                this.canJumpCounter += 1;
                setTimeout(this.resetCanJump, jumpResetTime);
            }
            this.canJump = false;
        }
        
    },

    update: function(){
        if(this.dead == true){
            n = 9;
            stunnedFrame += frames % n === 0 ? 1 : 0;
            stunnedFrame %= 3;
            this.frame = stunnedFrame + 17;
            if(currentstate === states.Game){
                this.x -= speed % s_fg.width;
            }
        }
        else{
            n = Math.max(3, 5 + (level-initialLevel)/20);
            this.frame  += frames % n === 0 ? 1 : 0
            this.frame %= 8;
        }
        if (currentstate === states.PreSplash){
            this.y = height - s_fg.height - 58;
        } else if (currentstate === states.Game || currentstate === states.Splash || currentstate === states.Score){
            this.velocity += gravity;
            this.y += this.velocity;
            //when he jumps use a single frame
            if (this.y < height - s_fg.height - 58 && currentstate != states.Score){
                if(!this.dead){
                    if(this.velocity < .5 && this.velocity > -.5) {
                    this.frame = 14; 
                    }
                    else if(this.velocity < 0) {
                        this.frame = 12; 
                    }   
                    else{
                        this.frame = 13;
                    }  
                }
                if(this.y < 85){//removed less than or equal to so that it does not remain in the same
                this.y = 85;
                }
            }
            else{
                if(this.y < 50){//removed less than or equal to so that it does not remain in the same
                this.y = 50;
                }
            }
            //when it goes below the fore ground, set at the foreground
            if(this.y > height - s_fg.height - 58){//removed less than or equal to so that it does not remain in the same
                if(this.canJumpCounter != 0){
                    snd.play();
                }
                this.canJumpCounter = 0;
                if(!this.dead){this.canJump = true;}
                this.y = height - s_fg.height - 58;
            }
        }

    },

    draw: function(ctx){

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        var n  = this.animation[this.frame];
        s_bird[n].draw(ctx, -s_bird[n].width / 2, -s_bird[n].height / 2);
        ctx.restore();
    }
},

bird1 = {

    x: bird1_x,
    y: birds_y,
    frame: 0,
    velocity: 0,
    animation: [3,4,5,6,7,0,1,2, 8,9,10,11,12,13,14,15,16, 17,18,19],//order of sprites, to get the animation sequence
    rotation: 0,
    radius: 12,
    _jump: 11,
    dead: false,
    lives: 3,
    canJumpCounter: 0,
    canJump: true,

    resetCanJump: function() {
        if(currentstate != states.Score){
            bird1.canJump = true;
        }
    },

    jump: function(){
        if (this.canJump){
            if (this.canJumpCounter < maxJumps)  {
                if (this.canJumpCounter == 0) {snd1.play()}; 
                this.velocity = -this._jump;
                this.canJumpCounter += 1;
                setTimeout(this.resetCanJump, jumpResetTime);
            }
            this.canJump = false;
        }
        
    },

    update: function(){
        if(this.dead == true){
            n = 9;
            stunnedFrame1 += frames % n === 0 ? 1 : 0;
            stunnedFrame1 %= 3;
            this.frame = stunnedFrame1 + 17;
            if(currentstate === states.Game){
                this.x -= speed % s_fg.width;
            }
        }
        else{
            n = Math.max(3, 5 + (level-initialLevel) / 20);
            this.frame  += frames % n === 0 ? 1 : 0
            this.frame %= 8;
        }
        if (currentstate === states.PreSplash){
            this.y = height - s_fg.height -58;
        } else if (currentstate === states.Game || currentstate === states.Splash || currentstate === states.Score){
            this.velocity += gravity;
            this.y += this.velocity;
            //when he jumps use a single frame
            if (this.y < height - s_fg.height - 58 && currentstate != states.Score){
                if(!this.dead){
                    if(this.velocity < .5 && this.velocity > -.5) {
                    this.frame = 14; 
                    }
                    else if(this.velocity < 0) {
                        this.frame = 12; 
                    }   
                    else{
                        this.frame = 13;
                    }  
                }
                if(this.y < 85){//removed less than or equal to so that it does not remain in the same
                this.y = 85;
                }
            }
            else{
                if(this.y < 50){//removed less than or equal to so that it does not remain in the same
                this.y = 50;
                }
            }
            //when it goes below the fore ground, set at the foreground
            if(this.y > height - s_fg.height - 58){ //removed less than or equal to so that it does not remain in the same
                if(this.canJumpCounter != 0){
                    snd1.play();
                }
                this.canJumpCounter = 0;
                if(!this.dead){this.canJump = true;}
                this.y = height - s_fg.height - 58;
            }
        }
        if(this.x < 170 && !bird1.dead){
            this.x += 10;
        }

    },

    draw: function(ctx){

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        var n  = this.animation[this.frame];
        s_bird1[n].draw(ctx, -s_bird1[n].width / 2, - s_bird1[n].height / 2);
        ctx.restore();

    }
},

// Hearts dimensions
heartSize = 20,
heartSeparation = 10,
heart3_x = -1,
heart2_x = heart3_x + heartSeparation,
heart1_x = heart2_x + heartSeparation,
heart_y = 120,

hearts = {
    draw: function(ctx){
        if (bird.lives == 3) {
           s_heart.draw(ctx, bird.x + heart3_x, bird.y - heart_y);
           s_heart.draw(ctx, bird.x + heart3_x + heartSize, bird.y - heart_y);
           s_heart.draw(ctx, bird.x + heart3_x + 2 * heartSize, bird.y - heart_y);
        }
        else if (bird.lives == 2) {
           s_heart.draw(ctx, bird.x + heart2_x, bird.y - heart_y);
           s_heart.draw(ctx, bird.x + heart2_x + heartSize, bird.y - heart_y);
        }
        else if (bird.lives == 1) {
           s_heart.draw(ctx, bird.x + heart1_x, bird.y - heart_y);
        }
        ctx.restore();
    }
},

hearts1 = {
    draw: function(ctx){
        if (bird1.lives == 3) {
           s_heart.draw(ctx, bird1.x + heart3_x, bird1.y - heart_y);
           s_heart.draw(ctx, bird1.x + heart3_x + heartSize, bird1.y - heart_y);
           s_heart.draw(ctx, bird1.x + heart3_x + 2 * heartSize, bird1.y - heart_y);
        }
        else if (bird1.lives == 2) {
           s_heart.draw(ctx, bird1.x + heart2_x, bird1.y - heart_y);
           s_heart.draw(ctx, bird1.x + heart2_x + heartSize, bird1.y - heart_y);
        }
        else if (bird1.lives == 1) {
           s_heart.draw(ctx, bird1.x + heart1_x, bird1.y - heart_y);
        }
        ctx.restore();
    }
},

pipes = {
    _pipes: [],

    reset: function(){
        this._pipes = [];
    },

    update: function(){
        if (frames % (level) === 0)
        {
            var randHeart = (Math.random() > .1);
            var j = Math.floor(Math.random() * 3);
            var _y = height + 90 - (s_pipe[j].height + s_fg.height); //+ pipeHeight * Math.random());
            this._pipes.push({
                x: width + 25, // +25 starts it off-screen
                y: _y,
                width: s_pipe[j].width,
                height: s_pipe[j].height,
                index: j,
                cleared: 1,
                cleared1: 1,
                heart: randHeart
            });
        }
        for(var i = 0, len = this._pipes.length; i < len; i++){
            var p = this._pipes[i];

            if(i == 0){
                if (bird.dead == true && bird1.dead == true){
                    if (score > record) {
                        record = score;
                        newRecord = score;
                    }
                    if (score1 > record) {
                        record = score1;
                        newRecord = score1;
                    }
                    banjo.pause();
                    banjo_end.play();
                    currentstate = states.Score; 
                }
                // If bird hits the boundary remove from the scene
                if (p.x <= bird.x && p.cleared == 1){
                    if (bird.y + .5 *  (s_bird[1].height) > (p.y + (1 - logScaler[p.index]) * s_pipe[p.index].height)){
                        if (different) {
                            if (bird.lives != 1){
                                different = false;
                                p.cleared = 0;
                            }
                            else{
                                bird.dead = true;
                                winner == 1;
                            } 
                            bird.lives--;
                            punch.play();
                        }
                    }
                    else {
                        score++;
                        p.cleared = 2;
                    }
                    different = true;
                 }
                // If bird hits the boundary remove from the scene
                if (p.x <= bird1.x && p.cleared1 == 1){
                    if (bird1.y + .5 * (s_bird[1].height) > (p.y + (1 - logScaler[p.index]) * s_pipe[p.index].height)){
                        if (different1) {
                            if (bird1.lives != 1){
                                different1 = false;
                                p.cleared1 = 0;
                            }
                            else{
                                bird1.dead = true;
                                winner = 2;
                            } 
                            bird1.lives--;
                            if(MultiPlayer){punch1.play();}
                        }
                    }
                    else {
                        score1++;
                        p.cleared1 = 2;
                    }
                    different1 = true;
                 }
            }

            p.x  -= speed;
            if(p.x < -40){
                this._pipes.splice(i, 1);
                i--;
                len--;
            }

        }
    },

    draw: function(ctx){
        for(var i = 0, len = this._pipes.length; i < len; i++){
            var p = this._pipes[i];
            s_pipe[p.index].draw(ctx, p.x - .5 * s_pipe[p.index].width, p.y + (1 - logScaler[p.index]) * s_pipe[p.index].height, 1, logScaler[p.index]);
            //if(p.heart){s_heart.draw(ctx, p.x, p.y + (1-logScaler[p.index])*s_pipe[p.index].height - 30)}
        }
    }
};

function onclick(evt1){

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect(),
        x = evt.clientX - rect.left,
        y = evt.clientY - rect.top;

        scaled_x = (x / window.innerWidth) * width;
        scaled_y = (y / window.innerHeight) * height;
        return {
          x: scaled_x,
          y: scaled_y
        };
    }

    var pos = getMousePos(canvas, evt1);
    mx = pos.x;
    my = pos.y;

    if (currentstate === states.Score){
            if(okbtn.x < mx && mx < okbtn.x + okbtn.width && 
                okbtn.y < my && my < okbtn.y + okbtn.height
                ){
                resetter();
                bird.canJump = false;
                setTimeout(function(){bird.canJump = true;}, menuResetTime);
                jumpGym.play();
            }               
    }
    if (currentstate === states.Splash){
        if (mx < width/2)
            {                
                bird.jump();
            }
            if (mx > width/2)
            {     
                if(!MultiPlayer){
                    bird1.x = - 30;
                    MultiPlayer = true;
                    SinglePlayer = false;
                }          
                bird1.jump();
            }
    }
    if (currentstate === states.PreSplash){
            if(SinglePlayerbtn.x < mx && mx < SinglePlayerbtn.x + SinglePlayerbtn.width && 
                SinglePlayerbtn.y < my && my < SinglePlayerbtn.y + SinglePlayerbtn.height && !SinglePlayer
                ){
                    SinglePlayer = true;
                    MultiPlayer = !SinglePlayer;
                }       

            if(MultiPlayerbtn.x < mx && mx < MultiPlayerbtn.x + MultiPlayerbtn.width && 
                MultiPlayerbtn.y < my && my < MultiPlayerbtn.y + MultiPlayerbtn.height && !MultiPlayer
                ){ 
                    bird1.x = - 30;
                    MultiPlayer = true;
                    SinglePlayer = !MultiPlayer;
                    bird1.canJump = false;
                    setTimeout(function(){bird1.resetCanJump()}, jumpResetTime);
                } 
            if(okbtnPS.x < mx && mx < okbtnPS.x + okbtnPS.width && 
                okbtnPS.y < my && my < okbtnPS.y + okbtnPS.height
                ){   
                    splashTime = getReadyTime / sec;
                    var countdown = setInterval(function() {
                        splashTime--;
                        }, sec);
                    var growCircle = setInterval(function() {
                        circleGrowthTime++;
                        }, 1);
                    setTimeout(function(){frames = 0; 
                                        splashTime = 0;
                                        clearInterval(countdown); 
                                        clearInterval(growCircle);
                                        currentstate = states.Game;
                                        countup = setInterval(IntervalTimer, sec);
                    }, getReadyTime);
                    jumpGym.pause();
                    banjo_count.play();
                    currentstate = states.Splash;
                }
    }
    if (currentstate === states.Game){
        if (mx < width / 2)
        {   
            bird.jump();
            calories++;
        }

        if (mx > width/2)
        {   
            if(!MultiPlayer && !bird1.dead){
                bird1.x = - 30;
                MultiPlayer = true;
                SinglePlayer = false;
            }
            //switch between keys
            bird1.jump();
            calories1++;
        }
    }
}

function onpress(evt){
    map[evt.keyCode] = evt.type == 'keyup';
    switch(currentstate){
        case states.PreSplash:
            if (evt.keyCode == 32 && bird.canJump)
            {   
                splashTime = getReadyTime / sec;
                var countdown = setInterval(function() {
                    splashTime--;
                    }, sec);
                var growCircle = setInterval(function() {
                    circleGrowthTime++;
                    }, 1);
                setTimeout(function(){frames = 0; 
                                    splashTime = 0;
                                    clearInterval(countdown); 
                                    clearInterval(growCircle);
                                    currentstate = states.Game;
                                    countup = setInterval(IntervalTimer, sec);
                }, getReadyTime);
                jumpGym.pause();
                banjo_count.play();
                currentstate = states.Splash;
            }
            if (evt.keyCode == 38 && bird1.canJump)
            {
                bird1.x = - 30;
                MultiPlayer = MultiPlayer ? false:true;
                SinglePlayer = !MultiPlayer;
                bird1.canJump = false;
                setTimeout(function(){bird1.resetCanJump()}, jumpResetTime);
            }
            break;              
        case states.Splash:
            if (evt.keyCode == 32)
            {                   
                bird.jump();
            }
            if (evt.keyCode == 38)
            {     
                if(!MultiPlayer){
                    bird1.x = - 30;
                    MultiPlayer = true;
                    SinglePlayer = false;
                }            
                bird1.jump();
            }
            break;

        case states.Game:


            if (evt.keyCode == 32)
            {   
                bird.jump();
                calories++;
            }

            if (evt.keyCode == 38)
            {   
                if(!MultiPlayer && !bird1.dead){
                    bird1.x = - 30;
                    MultiPlayer = true;
                    SinglePlayer = false;
                }
                //switch between keys
                bird1.jump();
                calories1++;
            }

            break;

        case states.Score:
            if ((evt.keyCode == 32 || evt.keyCode == 37 || evt.keyCode == 38 || evt.keyCode == 39) && bird.canJump && bird1.canJump)
            {   
                resetter();
                bird.canJump = false;
                setTimeout(function(){bird.canJump = true;}, menuResetTime);
                jumpGym.play();
            }   
            break;
    }

    if(evt.keyCode == 77){
        if(banjo.volume == 0){
            JumpGym.volume = 1;
            banjo.volume = .7;
            banjo_start.volume = 1;
            banjo_count.volume = 1;
            banjo_end.volume = 1;

        }
        else{
            JumpGym.volume = 0;
            banjo.volume = 0;
            banjo_start.volume = 0;
            banjo_count.volume = 0;
        }
    }
}

function main(){
    canvas = document.getElementById("canvas");
    evt = "keyup";
    evt1 = "mousedown";
    evt2 = "mouseup";

    document.addEventListener(evt, onpress);
    document.addEventListener(evt1, onclick);
    document.addEventListener(evt2, onpress);

    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    currentstate = states.PreSplash;

    document.body.appendChild(canvas);

    var img = new Image();
    img.onload =function(){
        // var sign = document.getElementById("img1");
        initSprites(this); //, img1);
        ctx.fillStyle = s_bg.color;
        
        okbtn = {
            x: (width - s_buttons.Ok.width) / 2,
            y: height - 150,
            width: s_buttons.Ok.width,
            height: s_buttons.Ok.height
        };

//Initialize buttons
//Single Player
        SinglePlayerbtn = {
            x: (width - s_radio.SinglePlayer.width) / 2,
            y: height -400,
            width: s_radio.SinglePlayer.width,
            height: s_radio.SinglePlayer.height             
        };

        SinglePlayerbtnT = {
            x: (width - s_radio.SinglePlayer.width) / 2,
            y: height -400,
            width: s_radioT.SinglePlayer.width,
            height: s_radioT.SinglePlayer.height                
        };          

//Multi Player
        MultiPlayerbtn = {
            x: (width - s_radio.MultiPlayer.width) / 2,
            y: height -350,
            width: s_radio.MultiPlayer.width,
            height: s_radio.MultiPlayer.height              
        };

        MultiPlayerbtnT = {
            x: (width - s_radioT.MultiPlayer.width) / 2,
            y: height -350,
            width: s_radioT.MultiPlayer.width,
            height: s_radioT.MultiPlayer.height             
        };          

        okbtnPS = {
            x: (width - s_buttons.Ok.width) / 2,
            y: height - 100,
            width: s_buttons.Ok.width,
            height: s_buttons.Ok.height
        };  

// Background and foreground layout
        bgnd = {
            shift: s_bg.width * bgScaler - 2,
            y: height - s_bg.height * bgScaler - (.5 * s_fg.height)
        };

        fgnd = {
            shift: s_fg.width - 2,
            y: height - s_fg.height
        };
        
        run();
    }
    img.src = "res/assets.png";

    swamp.addEventListener('ended', function() {
        this.currentTime = 10;
        this.play();
    }, false);
    swamp.play();

    banjo_count.addEventListener('ended', function() {
        banjo.playbackRate = 1;
        banjo.currentTime = 0;
        banjo.play();
    }, false);

    banjo.addEventListener('ended', function() {
        banjo.currentTime = 0;
        banjo.play();
    }, false);

    jumpGym.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    banjo.volume = .7;
    jumpGym.play();
}

function run(){
    var loop = function(){
        update();
        render();
        window.requestAnimationFrame(loop,canvas);
    }
    window.requestAnimationFrame(loop,canvas);
}

function update(){
    frames++;
    if (currentstate != states.Score){
        fgpos = (fgpos - speed) % s_fg.width;
        bgpos = (bgpos - 1) % (bgScaler * s_bg.width);
        if(currentstate == states.Game){
            pipes.update();        
        }
    }
    bird.update();
    if (bird1.dead != true || winner == 2){
        bird1.update();
    }
    else if(bird.canJumpCounter == 0 && bird1.canJumpCounter == 0){ // If current state is Score
        setTimeout(function(){bird.canJump = true;}, menuResetTime);
        setTimeout(function(){bird1.canJump = true;}, menuResetTime);
    }
}

function resetter()
{
    pipes.reset();
    clearInterval(countup);
    currentstate = states.PreSplash;
    randnum = Math.floor(Math.random() * facts.length);
    bird.dead = false;
    bird.lives = 3;
    bird1.dead = false;
    bird1.lives = 3;
    bird.x = bird_x;
    bird1.x = bird1_x;
    stunnedFrame = 0;
    stunnedFrame1 = 0;
    winner = null;
    bird.canJumpCounter = 0;
    bird1.canJumpCounter = 0;
    pipes.cleared = 1;
    pipes.cleared1 = 1;
    splashTime = 0;
    circleGrowthTime = 0;
    level = initialLevel;
    speed = initialSpeed;
    timerCount = 0;
    timerPos = 0;
    tens = initialTens;
    score = 0;
    if(score1 == 0){SinglePlayer == true; MultiPlayer == false;};
    score1 = 0;
    calories = 0;
    calories1 = 0;
    newRecord = 0;
}   

function render(){
    ctx.fillRect(0, 0, width, height);
    s_bg.draw(ctx, bgpos, bgnd.y, bgScaler, bgScaler);
    s_bg.draw(ctx, bgpos + bgnd.shift, bgnd.y, bgScaler, bgScaler);
    s_bg.draw(ctx, bgpos + 2 * bgnd.shift, bgnd.y, bgScaler, bgScaler);
    s_bg.draw(ctx, bgpos + 3 * bgnd.shift, bgnd.y, bgScaler, bgScaler);

    s_fg.draw(ctx, fgpos, fgnd.y);
    s_fg.draw(ctx, fgpos + fgnd.shift, fgnd.y);
    s_fg.draw(ctx, fgpos + 2 * fgnd.shift, fgnd.y);
    s_fg.draw(ctx, fgpos + 3 * fgnd.shift, fgnd.y);

    if ((bird1.x > minBirdPlacement /*|| winner ==2*/) && SinglePlayer == false) {
        bird1.draw(ctx);
        if (currentstate === states.Game){
            hearts1.draw(ctx);
        }
    }
    if (bird.x > -195 /*|| winner == 1*/){
        bird.draw(ctx);
        if (currentstate === states.Game){
            hearts.draw(ctx);
        }
    }
    pipes.draw(ctx);
    
    // I subtracted 2 because there was a hole and I thought the 2 above in the fgpos calculation had something
    // to do with it.
    var width2 = width / 2;
    if (currentstate === states.Splash){
        s_splash.draw(ctx, width2 - s_splash.width / 2, height - 450);
        s_text.GetReady.draw(ctx, width2 - s_text.GetReady.width / 2, height - 600);
        if(splashTime != 0){
            if (circleGrowthTime <= sec) { 
                var scale = 1.3 * Math.abs(Math.sin(4.1 * Math.PI * circleGrowthTime / sec));
                ctx.beginPath();
                ctx.arc(width2, height - 490, 20 * scale, 0, 2 * Math.PI);
                ctx.fillStyle = "white";
                ctx.fill();
                s_numberS.draw(ctx, width2 - 5 * scale - 1, height - 10 * scale - 490, splashTime, scale);
            }
        }
    }
    if (currentstate === states.PreSplash){
        s_text.JumpJym.draw(ctx,  width2 - s_text.JumpJym.width / 2, height - 600);
        if (SinglePlayer === true){
            s_radioT.SinglePlayer.draw(ctx, SinglePlayerbtnT.x, SinglePlayerbtnT.y);
        }else{
            s_radio.SinglePlayer.draw(ctx, SinglePlayerbtn.x, SinglePlayerbtn.y);
        }
        if (MultiPlayer === true){
            s_radioT.MultiPlayer.draw(ctx, MultiPlayerbtnT.x, MultiPlayerbtnT.y);
        }else{
            s_radio.MultiPlayer.draw(ctx, MultiPlayerbtn.x, MultiPlayerbtn.y);
        }
        s_buttons.Ok.draw(ctx,okbtnPS.x,okbtnPS.y);

    }
    if (currentstate === states.Score && bird.y == (height - s_fg.height -58) && bird1.y == (height - s_fg.height - 58)){
        s_text.GameOver.draw(ctx, width2 - s_text.GameOver.width / 2, height - 650);
        s_score.draw(ctx, width2 - s_score.width / 2, height - 540);
        s_buttons.Ok.draw(ctx, okbtn.x, okbtn.y);
        s_numberS.draw(ctx, width2  + 50, height - 518, score);
        s_letters.draw(ctx, width2 - 41, height - 430, "Record", false);
        if (newRecord) {
            s_letters.draw(ctx, width2 - 135, height - 425, "New", true, 30);
            s_numberS.draw(ctx, width2 + 50, height - 430, record);
        }
        else {
            s_numberB.draw(ctx, width2 + 50, height - 430, record);
        }
        s_letters.draw(ctx, width2, height - 330, facts[randnum], true);
        if(MultiPlayer === true)
                s_numberS.draw(ctx, width2  + 50, height - 475, score1);
    }else if (currentstate === states.Game)
    { 
        if (frames%sec == 0) {
            if (level >= 100) {level -= 20; frames = 0;};
            banjo.playbackRate = banjo.playbackRate + .1;
            speed += 1;
        } 
        if (Jumps === true){
            // sign.draw(ctx, width2 - 11 * sign.width / 20, 0, 1.1, .6);
            s_label.Jumps.draw(ctx, width2 - s_label.Jumps.width / 2 + 100, 8);
            s_numberS.draw(ctx, width2 + 100, 40, score);
                if(SinglePlayer === false){
                    s_numberS.draw(ctx, width2 + 100, 70, score1);                
                }
            }
        if (Timer === true){
            s_label.Timer.draw(ctx, width2 -100- s_label.Timer.width / 2,8);
            s_numberS.draw(ctx, width2 - 100 - 12 * timerPos, 40, timerCount);           
        }
    }
}

function IntervalTimer(){
        timerCount++;
        if(timerCount % tens == 0){
            tens = 10*tens;
            timerPos++;
        };
}

main();