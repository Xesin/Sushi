var SplashScreen = function(game){

}

SplashScreen.prototype = {
	preload:function(){
		this.game.load.jsonSpriteSheet(App.LOADING_KEY, 'asset/UI/Loading.png', 'asset/json/Loading.json');
	},

	start:function(){
		this.game.state.start('LoadingScreen');
	}

}