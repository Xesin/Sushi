var Block = function(game, gameState, x, y, type){
	var blockColor = '';
	var colorFont;
	switch (type) {
		case Sushi.BlockColor.RED:
			blockColor = 'shusi_red';
			colorFont = App.DIGITS_RED_FONT;
			break;
		case Sushi.BlockColor.YELLOW:
			blockColor = 'shushi_yellow';
			colorFont = App.DIGITS_YELLOW_FONT;
			break;
		case Sushi.BlockColor.GREEN:
			blockColor = 'shushi_green';
			colorFont = App.DIGITS_GREEN_FONT;
			break;
		case Sushi.BlockColor.PURPLE:
			blockColor = 'shushi_purple';
			colorFont = App.DIGITS_PURPLE_FONT;
			break;
		case Sushi.BlockColor.BLUE:
			blockColor = 'shusi_blue';
			colorFont = App.DIGITS_BLUE_FONT;
			break;
	}
	XEngine.Sprite.call(this, game, x * App.TILE_SIZE, -100, App.GAMEPLAY_KEY, blockColor);

	this.activated = true;
	this.indexX = x;
	this.indexY = y;
	this.blockType = type;
	game.add.existing(this);
	this.anchor.setTo(0.5);
	this.gameState = gameState;
	this.moveTween = null;
	this.hintedBlock = false;
	this.colorFont = colorFont;
	this.isTimeBlock = false;
}

Block.prototype = Object.create(XEngine.Sprite.prototype);

Block.prototypeExtends = {
	onCLickCircle:function(){
		if (!this.activated)
		return;
		this.removeHint();
		if (this.checkConnected({
			x: this.indexX,
			y: this.indexY
		})) {
			//this.gameState.resetHintTimer();
			this.gameState.removeCells({
				x: this.indexX,
				y: this.indexY
			}, this.colorFont);
		}
		else {
			//this.gameState.resetBonus();
		}
	},

	checkConnected:function(coords){
		var numConnections = 0;
		if (this.gameState.getCircle(coords.x + 1, coords.y) && this.gameState.getCircle(coords.x + 1, coords.y).blockType === this.blockType) {
			numConnections++;
		}
		if (this.gameState.getCircle(coords.x - 1, coords.y) && this.gameState.getCircle(coords.x - 1, coords.y).blockType === this.blockType) {
			numConnections++;
		}
		if (this.gameState.getCircle(coords.x, coords.y + 1) && this.gameState.getCircle(coords.x, coords.y + 1).blockType === this.blockType) {
			numConnections++;
		}
		if (this.gameState.getCircle(coords.x, coords.y - 1) && this.gameState.getCircle(coords.x, coords.y - 1).blockType === this.blockType) {
			numConnections++;
		}
		if (numConnections > 0) {
			return true;
		}
		else {
			return false;
		}
	},

	setAsTimeBlock:function(){
		this.isTimeBlock = true;
		var clockColor = '';
		switch (this.blockType) {
			case Sushi.BlockColor.RED:
				clockColor = 'Clock_red';
				break;
			case Sushi.BlockColor.YELLOW:
				clockColor = 'Clock_yellow';
				break;
			case Sushi.BlockColor.GREEN:
				clockColor = 'Clock_green';
				break;
			case Sushi.BlockColor.PURPLE:
				clockColor = 'Clock_purple';
				break;
			case Sushi.BlockColor.BLUE:
				clockColor = 'Clock_blue';
				break;
		}
		this.frame = clockColor;
	},

	goToInitialPos:function(delay){
		this.moveTween = this.game.tween.add(this.position).to({
			x: this.indexX * App.TILE_SIZE,
			y: this.indexY * App.TILE_SIZE
		}, 500, XEngine.Easing.Expo.InOut, true, delay);
		return this.moveTween;
	},

	enableInput:function(){
		this.inputEnabled = true;
		this.downBinding = this.onInputDown.add(this.onCLickCircle, this);
	},

	disableInput:function(){
		this.inputEnabled = false;
		this.downBinding.detach();
	},

	setupHint:function(){
		this.hintedBlock = true;
		this.hintShine = this.game.add.sprite(0, 0, App.GAMEPLAY_KEY, 'sushi_hint');
		this.hintShine.parent = this;
		this.hintShine.anchor.setTo(0.5);
		this.shakeBlock();
	},

	shakeBlock:function(){
		this.rotation = -8;
		this.hintTween = this.game.add.tween(this).to({
			rotation: 8
		}, 150, XEngine.Easing.Linear.None, true, 0, 1, true);
		this.hintTween.onComplete.add(function () {
			this.angle = 0;
			//this.waitForNextShake();
		}, this);
	},

	removeHint:function(){
		if (this.hintShine) {
			this.hintShine.destroy();
		}
		//this.hintTimer.stop();
		this.hintedBlock = false;
	},

	moveBlockDown:function(){
		this.game.tween.add(this.position).to({
			y: this.indexY * App.TILE_SIZE
		}, 100, XEngine.Easing.Expo.Out, true);
	},

	moveBlockSide:function(){
		this.game.tween.add(this.position).to({
			x: this.indexX * App.TILE_SIZE
		}, 100, XEngine.Easing.Expo.Out, true);
	}
}

Object.assign(Block.prototype, Block.prototypeExtends);