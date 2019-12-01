class WhackAMole {
	
	
	constructor(gameOver ,startButton, moles, scoreOut, gameTimeLength, peepTimeMin, peepTimeMax){		
		// Game HTML Elements
		this.gmOver = gameOver
		this.btnStart = startButton;
		this.moles = moles;
		this.scoreOut = scoreOut;
		
		// Game Image
		this.moleImgSrc = 'mole.png';
		
		// Game Parameters
		this.gameTime = gameTimeLength;
		this.minPeepTime = peepTimeMin;
		this.maxPeepTime = peepTimeMax;
		this.numOfMoles = this.moles.length;
		
		// Game State Variables
		this.prevMoleNumber = null;
		this.timeUp = false;
		this.score = 0;
		this.gameTimer = null;
		this.peepTimer = null;		
	}
	
	init(){
		this.score = 0;
		this.scoreOut.text(this.score);
		this.timeUp = false;
		this.prevMoleNumber = null;
		this.gmOver.text(' ');
		this.btnStart.text('Stop Game');
		this.peep();
		this.gameTimer = setTimeout(() => {
			this.gmOver.text('Game Over')
			this.btnStart.text('Start Game');
			this.timeUp = true;
		}, this.gameTime);		
	}
	
	stop(){
		this.gmOver.text('Game Over')
		this.btnStart.text('Start Game');
		this.timeUp = true;
		this.moles.removeClass('up');
		clearInterval(this.peepTimer);
		clearInterval(this.gameTimer);
	}
	
	peep(){
		  const time = this._randomTime(this.minPeepTime, this.maxPeepTime);
    	const mole = this._randomMole(this.moles);
    	mole.addClass('up');
    	this.peepTimer = setTimeout(() => {
      		mole.removeClass('up');
      		if(this.timeUp === false){
				    this.peep();
			    } 
    	}, time);
	}
	
	bonk(mole) {
	this.score += 10;
    this.scoreOut.text(this.score);
	}
	
	// time wich mole will spend up
	_randomTime(min, max){
		return Math.round(Math.random() * (max - min) + min);
	}
	
	// randomly selects one of the moles to display
	_randomMole(moles) {
    	const idx = Math.floor(Math.random() * this.numOfMoles);
    	const mole = moles.eq(idx);
    	if(idx === this.prevMoleNumber ) {
      		return this._randomMole(moles);
    	}
		  this.prevMoleNumber = idx;
    	return mole;
	}
	
}

// New insance of mule
const wam = new WhackAMole($('#game-over'), $('#btn-start'), $('.mole-pic'), $('#score-out'), 20000, 700, 1100);

// Game Events
wam.btnStart.click(function(){
	
	if(wam.btnStart.text() === 'Start Game'){
		wam.init();
	}else{
		wam.stop();
	}
	
});

wam.moles.click(function(){
	
	if($(this).hasClass('bonked')){
		return;
	}
	
	wam.bonk( $(this) );
	
});