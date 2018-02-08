LoadingScreen = function(game){

}

LoadingScreen.prototype ={
	preload:function(){
		this.game.setBackgroundColor(0,0,0);
		var barOut = this.game.add.sprite(this.game.width/2, this.game.height/2, App.LOADING_KEY, 'Loading_BarOut');
		barOut.anchor.setTo(0.5);
		this.barIn = this.game.add.sprite(barOut.position.x, this.game.height/2, App.LOADING_KEY, 'Loading_BarIn');
		this.barIn.anchor.setTo(0.5, 0.5);
		this.barIn.x -= this.barIn.width / 2;
		this.barWith = this.barIn.width;
		this.cropRectangle = this.game.add.rect(this.barIn.position.x - this.barIn.width /2, this.barIn.position.y, 0, this.barIn.height);
		this.cropRectangle.anchor.y = 0.5
		this.cropRectangle.render = false;
		this.barIn.mask = this.cropRectangle;
		var frames = [];

		for(var i =0; i <= 7; i++){
			frames[i] = 'Loading_'+i;
		}
		
		var sushi = this.game.add.sprite(this.game.width /2, this.barIn.position.y - 60, App.LOADING_KEY, 0);
		sushi.anchor.setTo(0.5);
		sushi.animation.add('anim', frames, 30, true);
		sushi.animation.play('anim');
		this.game.load.onCompleteFile.add(this.onLoadFile, this);
		this.game.load.jsonSpriteSheet(App.MENU_ITEMS_KEY, 'asset/UI/StartScreen.png', 'asset/json/StartScreen.json');
		this.game.load.jsonSpriteSheet(App.GAMEPLAY_KEY, 'asset/gameplay/Gameplay.png', 'asset/json/Gameplay.json');
		this.game.load.jsonSpriteSheet(App.SCORE_PAUSE_KEY, 'asset/gameplay/ScorePause.png', 'asset/json/ScorePause.json');
		this.game.load.jsonSpriteSheet(App.TUTORIAL_KEY, 'asset/UI/Tutorial.png', 'asset/json/Tutorial.json');
		this.game.load.jsonSpriteSheet(App.GAME_LOGO_KEY, 'asset/UI/LogoAnimation.png', 'asset/json/LogoAnimation.json');
		this.game.load.jsonSpriteSheet(App.COUNTDOWN_KEY, 'asset/gameplay/Countdown.png', 'asset/json/Countdown.json');
		this.game.load.bitmapFont(App.MAIN_FONT, 'fonts/Gang_font.png', 'fonts/Gang_font.xml');
		this.game.load.bitmapFont(App.DIGITS_BLUE_FONT, 'fonts/Digits_Blue.png', 'fonts/Digits_Blue.xml');
		this.game.load.bitmapFont(App.DIGITS_GREEN_FONT, 'fonts/Digits_Green.png', 'fonts/Digits_Green.xml');
		this.game.load.bitmapFont(App.DIGITS_PURPLE_FONT, 'fonts/Digits_Purple.png', 'fonts/Digits_Purple.xml');
		this.game.load.bitmapFont(App.DIGITS_RED_FONT, 'fonts/Digits_Red.png', 'fonts/Digits_Red.xml');
		this.game.load.bitmapFont(App.DIGITS_YELLOW_FONT, 'fonts/Digits_Yellow.png', 'fonts/Digits_Yellow.xml');
		this.game.load.bitmapFont(App.DIGITS_WHITE_FONT, 'fonts/Digits_White.png', 'fonts/Digits_White.xml');
		this.game.load.bitmapFont(App.TEXT_DARK, 'fonts/Text_Dark.png', 'fonts/Text_Dark.xml');
		this.game.load.bitmapFont(App.TEXT_GREEN, 'fonts/Text_Green.png', 'fonts/Text_Green.xml');
		this.game.load.image('timewarning', 'asset/gameplay/timewarning.png');
	},

	start:function(){
		this.game.state.start('SoundQuestion');
	},

	onLoadFile :function (progress) {
		var cropWith = XEngine.Mathf.lerp(0, this.barIn.width, progress);
		this.cropRectangle.width = cropWith;
	}
}