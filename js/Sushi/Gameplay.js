var Gameplay = function(game){
	
};
	
Gameplay.prototype = {
	start:function(){
		this.game.add.sprite(0, 0, App.GAMEPLAY_KEY, 'Background_Gameplay');
		var firsTimePlaying = localStorage.getItem('first_time');
		if (firsTimePlaying) {
			firsTimePlaying = JSON.parse(localStorage.getItem('first_time'));
		}
		else {
			firsTimePlaying = true;
		}
		if (firsTimePlaying == true) {
			// this.currentState = Sushi.State.TUTORIAL;
			localStorage.setItem('first_time', JSON.stringify(false));
			// new Sushi.Tutorial(this.game, this.setupNewGame, this);
			this.setupNewGame();
		}
		else {
			this.setupNewGame();
		}
	},

	setupNewGame:function(){
		this.currentState = Sushi.State.PREPARING;
		this.hurryUp = false;
		this.previousFeedback = -1;
		this.previousFeedbackText = -1;
		this.createUI();
		this.createPlayground();
		this.initializeArray();
		this.score = 0;
		this.gameTimeRemaining = App.TIME_PER_GAME_SECONDS * 1000;
		//this.hintTimer = this.time.create(false);
		//this.brightTimer = this.time.create(false);
		this.currentBonus = 1;
		this.timeToLostBonus = 0;
		this.startCountDown();
	},

	createUI: function(){
		this.uiGroup = this.game.add.group();
		this.timeBarGroup = this.game.add.group();
		this.uiGroup.add(this.timeBarGroup);
		this.timeBarGroup.position.x = this.game.width / 2;
		this.timeBarGroup.position.y = 150;
		this.uiGroup.position.y = -500;
		var scoreBox = this.game.add.sprite(205, 70, App.GAMEPLAY_KEY, 'Score_Box');
		scoreBox.anchor.setTo(0.5);
		this.uiGroup.add(scoreBox);
		this.scoreText = this.game.add.text(scoreBox.position.x, scoreBox.position.y,  '0',{font_size: 38});
		this.scoreText.anchor.setTo(0.5);
		this.uiGroup.add(this.scoreText);
		var comboBox = this.game.add.sprite(this.game.width / 2 + 80, scoreBox.position.y, App.GAMEPLAY_KEY, 'Combo_Box');
		comboBox.anchor.setTo(0.5);
		this.uiGroup.add(comboBox);
		this.comboBar = this.game.add.sprite(comboBox.position.x, comboBox.position.y, App.GAMEPLAY_KEY, 'Combo_Bar');
		this.comboBar.anchor.setTo(0.5, 1);
		this.comboBar.position.y = this.comboBar.position.y + this.comboBar.height / 2;
		this.comboBar.angle = 180;
		this.uiGroup.add(this.comboBar);
		this.comboBack = this.game.add.sprite(comboBox.position.x + comboBox.width + 20, comboBox.position.y, App.GAMEPLAY_KEY, 'Combo_TextBox');
		this.comboBack.anchor.setTo(0.5);
		this.uiGroup.add(this.comboBack);
		this.comboImage = this.game.add.sprite(comboBox.position.x + comboBox.width + 20, comboBox.position.y, App.GAMEPLAY_KEY, 'x1');
		this.comboImage.anchor.setTo(0.5);
		this.uiGroup.add(this.comboImage);
		var timeBox = this.game.add.sprite(0, 0, App.GAMEPLAY_KEY, 'Time_box');
		timeBox.anchor.setTo(0.5);
		this.timeBarGroup.add(timeBox);
		this.timeBar = this.game.add.sprite(0, 0, App.GAMEPLAY_KEY, 'Time_bar');
		this.timeBar.anchor.setTo(0, 0.5);
		this.timeBarGroup.add(this.timeBar);
		this.timeBar.position.x = -this.timeBar.width / 2;
		var pauseButton = this.game.add.button(this.game.width - 76, comboBox.position.y, App.GAMEPLAY_KEY, 'Pause', 'Pause_down', 'Pause', 'Pause');
		pauseButton.anchor.setTo(0.5);
		this.uiGroup.add(pauseButton);
		this.game.tween.add(this.uiGroup.position).to({
			y: 0
		}, 500, XEngine.Easing.ExpoOut, true);
		this.timeCropRect = this.game.add.rect(this.timeBar.position.x, this.timeBar.position.y, this.timeBar.width, this.timeBar.height);
		this.timeCropRect.anchor.setTo(0, 0.5);
		this.timeBar.mask = this.timeCropRect;
		this.timeCropRect.render = false;
		this.timeBarGroup.add(this.timeCropRect);
		this.comboCropRect = this.game.add.rect(this.comboBar.position.x, this.comboBar.position.y, this.comboBar.width, this.comboBar.height);
		this.comboCropRect.anchor.setTo(0.5, 1);
		this.comboBar.mask = this.comboCropRect;
		this.comboCropRect.render = false;
		this.uiGroup.add(this.comboCropRect);
		this.cropWidth = this.timeCropRect.width;
		this.cropHeight = this.comboCropRect.height;
		this.comboCropRect.height = 0;
	},

	createPlayground:function(){
		this.grid = this.game.add.sprite(this.game.width / 2, 0, App.GAMEPLAY_KEY, 'Grid');
		this.blocksGroup = this.game.add.group();
		this.blocksGroup.position.x = this.game.width / 2 - (App.GAME_W / 2) * App.TILE_SIZE + App.TILE_SIZE / 2;
		this.blocksGroup.position.y = (this.game.height / 2 - (App.GAME_H / 2) * App.TILE_SIZE + App.TILE_SIZE / 2) + 90;
		this.mask = this.game.add.rect(this.game.width / 2 - (App.GAME_W / 2) * App.TILE_SIZE - 10, this.blocksGroup.position.y - App.TILE_SIZE / 2, App.GAME_W * App.TILE_SIZE + 20, App.GAME_H * App.TILE_SIZE + 20);
		this.mask.render = false;
		this.blocksGroup.mask = this.mask;
		this.grid.anchor.setTo(0.5, 0);
		this.grid.position.y = this.blocksGroup.position.y - App.TILE_SIZE + 5;
	},

	initializeArray:function(){
		this.blocksArray = new Array();
		for (var i = 0; i < App.GAME_W; i++) {
			var column = new Array();
			for (var j = 0; j < App.GAME_H; j++) {
				column.push(null);
			}
			this.blocksArray.push(column);
		}
	},

	startCountDown:function(){
		this.fillWithBlocks();
	},

	fillWithBlocks: function(){
		var clockLevel = XEngine.Mathf.randomRange(0, 100) > 70;
		var generatedClock = false;
		var randomCoord = null;
		if (clockLevel) {
			randomCoord = this.getRandomCoord();
		}
		for (var i = 0; i < App.GAME_W; i++) {
			for (var j = 0; j < App.GAME_H; j++) {
				var type = XEngine.Mathf.randomIntRange(0, 4);
				//Decide the type if the current sushi have neighbors based on random results
				if (this.getCircle(i - 1, j) && this.getCircle(i, j - 1) && this.getCircle(i - 1, j).blockType == this.getCircle(i, j - 1).blockType) {
					if (XEngine.Mathf.randomIntRange(0, 100) > 20) {
						type = this.getCircle(i - 1, j).blockType;
					}
				}
				else if (this.getCircle(i - 1, j)) {
					if (XEngine.Mathf.randomIntRange(0, 100) > 70) {
						type = this.getCircle(i - 1, j).blockType;
					}
				}
				else if (this.getCircle(i, j - 1)) {
					if (XEngine.Mathf.randomIntRange(0, 100) > 70) {
						type = this.getCircle(i, j - 1).blockType;
					}
				}
				var sprite = new Block(this.game, this, i, j, type);
				if (clockLevel && !generatedClock && randomCoord.x == i && randomCoord.y == j) {
					generatedClock = true;
					sprite.setAsTimeBlock();
				}
				var delayMult = (App.GAME_H - 1 - j);
				var tween = sprite.goToInitialPos(delayMult * 100);
				if (i == App.GAME_W - 1 && j == 0) {
					tween.onComplete.add(function () {
						this.onFinishFillingBlocks();
					}, this);
				}
				this.blocksGroup.add(sprite);
				this.blocksArray[i][j] = sprite;
			}
		}
	},

	getRandomCoord:function(){
		var x = XEngine.Mathf.randomIntRange(0, App.GAME_W - 1);
		var y = XEngine.Mathf.randomIntRange(0, App.GAME_H - 1);
		return { x: x, y: y };
	},

	getCircle:function(x,y){
		if (x < 0 || x > this.blocksArray.length - 1 || y < 0 || y > this.blocksArray[x].length - 1) {
			return null;
		}
		return this.blocksArray[x][y];
	},

	onFinishFillingBlocks:function(){
		for (var i = 0; i < App.GAME_W; i++) {
			for (var j = 0; j < App.GAME_H; j++) {
				this.blocksArray[i][j].enableInput();
			}
		}
		// this.startHintTimer();
		// this.startBrighTimer();
		this.currentState = Sushi.State.PLAYING;
	},

	removeCells:function(coords, colorFont){
		this.timeToLostBonus += 700;
		this.blocksGroup.callAll('removeHint', null);
		var cells = this.getAllConnected(coords);
		var puntuation = 0;
		for (var i = 0; i < cells.length; i++) {
			cells[i].activated = false;
			var tween = this.game.tween.add(cells[i].scale).to({
				x: 0,
				y: 0
			}, 200, XEngine.Easing.BackIn, true);
			
			tween.onComplete.add(function () {
				this.kill();
			}, cells[i]);

			if (i === cells.length - 1) {
				tween.onComplete.add(function () {
					this.moveDown();
				}, this);
			}
			
			puntuation += App.POINTS_PER_OBJECT;
			if (cells[i].isTimeBlock) {
				this.gameTimeRemaining += App.EXTRA_TIME;
				this.gameTimeRemaining = XEngine.Mathf.clamp(this.gameTimeRemaining, 0, App.TIME_PER_GAME_SECONDS * 1000);
				if (this.hurryUp) {
					this.exitHurryUp();
				}
			}
			this.spawnExplosion({ x: cells[i].indexX, y: cells[i].indexY });
			if (i > 1) {
				puntuation += App.POINTS_INCREASE * (i - 1);
			}
		}
		this.increaseScore(puntuation * this.currentBonus);
		//this.showCollectedScore(puntuation, colorFont);
	},

	spawnExplosion:function(coords){
		var explosion = this.game.add.sprite(coords.x * App.TILE_SIZE, coords.y * App.TILE_SIZE, App.GAMEPLAY_KEY, 'Explosion/Explosion_0');
		this.blocksGroup.add(explosion);
		explosion.anchor.setTo(0.5);
		var frames = [];
		
		for(var i =0; i <= 3; i++){
			frames[i] = 'Explosion/Explosion_'+i;
		}
		explosion.animation.add('explode', frames, 100, false);
		explosion.animation.play('explode').onComplete.addOnce(function () {
			this.destroy();
		}, explosion);
	},

	getAllConnected:function(initialCoords){
		var connectedCells = [];
		var cell = this.getCircle(initialCoords.x, initialCoords.y);
		var step = function (coords, gameState) {
			var circle = gameState.getCircle(coords.x, coords.y);
			var ourType = cell.blockType;
			if (circle && circle.blockType == ourType && circle.alive && circle.activated) {
				circle.activated = false;
				connectedCells.push(circle);
				step({
					x: coords.x - 1,
					y: coords.y
				}, gameState);
				step({
					x: coords.x + 1,
					y: coords.y
				}, gameState);
				step({
					x: coords.x,
					y: coords.y - 1
				}, gameState);
				step({
					x: coords.x,
					y: coords.y + 1
				}, gameState);
			}
		};
		step({
			x: cell.indexX,
			y: cell.indexY
		}, this);
		return connectedCells;
	},

	moveDown: function(){
		var newArray = new Array();
		for (var i = 0; i < App.GAME_W; i++) {
			var column = new Array();
			var lastGoodY = App.GAME_H - 1;
			for (var j = App.GAME_H - 1; j >= 0; j--) {
				column.push(null);
			}
			for (var j = App.GAME_H - 1; j >= 0; j--) {
				if (this.blocksArray[i][j] && this.blocksArray[i][j].alive) {
					this.blocksArray[i][j].indexY = lastGoodY;
					this.blocksArray[i][j].moveBlockDown();
					column[lastGoodY] = this.blocksArray[i][j];
					lastGoodY--;
				}
			}
			newArray.push(column);
		}
		this.blocksArray = newArray;
		this.fillEmptyColumns();
	},

	fillEmptyColumns:function(){
		for (var i = 1; i <= (App.GAME_W / 2) - 1; i++) {
			var emptyColumn = true;
			for (var j = 0; j < App.GAME_H; j++) {
				if (this.blocksArray[i][j] && this.blocksArray[i][j].alive) {
					emptyColumn = false;
				}
			}
			if (emptyColumn) {
				this.moveRight(i);
			}
		}
		for (var i = App.GAME_W - 2; i >= (App.GAME_W / 2); i--) {
			var emptyColumn = true;
			for (var j = 0; j < App.GAME_H; j++) {
				if (this.blocksArray[i][j] && this.blocksArray[i][j].alive) {
					emptyColumn = false;
				}
			}
			if (emptyColumn) {
				this.moveLeft(i);
			}
		}
		// if (this.checkEndGame()) {
		// 	if (this.currentState == Sushi.State.PLAYING) {
		// 		this.currentState = Sushi.State.PREPARING;
		// 		var playerCompletePanel = this.playerCompletesPanel();
		// 		this.stopHintTimer();
		// 		this.stopBrighTimer();
		// 		this.clearRemainingBlocks();
		// 		if (playerCompletePanel) {
		// 			this.getCompletedReward();
		// 		}
		// 		else {
		// 			this.showPanelFinishedFeedback();
		// 		}
		// 	}
		// }
	},

	moveRight:function(emptyColumn){
		for (var i = emptyColumn - 1; i >= 0; i--) {
			for (var j = 0; j < App.GAME_H; j++) {
				var goodX = i + 1;
				this.blocksArray[goodX][j] = this.blocksArray[i][j];
				if (this.blocksArray[i][j]) {
					this.blocksArray[goodX][j].indexX = goodX;
					this.blocksArray[goodX][j].moveBlockSide();
				}
				this.blocksArray[i][j] = null;
			}
		}
	},

	moveLeft:function(emptyColumn){
		for (var i = emptyColumn + 1; i <= App.GAME_W - 1; i++) {
			for (var j = 0; j < App.GAME_H; j++) {
				var goodX = i - 1;
				this.blocksArray[goodX][j] = this.blocksArray[i][j];
				if (this.blocksArray[i][j]) {
					this.blocksArray[goodX][j].indexX = goodX;
					this.blocksArray[goodX][j].moveBlockSide();
				}
				this.blocksArray[i][j] = null;
			}
		}
	},

	increaseScore:function(amount){
		this.score += amount;
		this.scoreText.setText(this.score);
	}
	
}