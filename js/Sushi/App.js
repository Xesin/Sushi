function App(){
	var game = new XEngine.Game(640, 960, 'contenedor');
	game.state.add('SplashScreen', SplashScreen);
	game.state.add('LoadingScreen', LoadingScreen);
	game.state.add('SoundQuestion', SoundQuestion);
	game.state.add('MainMenu', MainMenu);
	game.state.add('Gameplay', Gameplay);
	game.scale.scaleType = XEngine.Scale.SHOW_ALL;
	//  Now start the Game state.
	game.state.start('SplashScreen');
}

App.GAME_W = 8;
App.GAME_H = 10;
App.POINTS_PER_OBJECT = 50;
App.POINTS_INCREASE = 15;
App.TIME_PER_GAME_SECONDS = 60;
App.TIME_TO_LOSE_BONUS_MS = 4000;
App.MAX_BONUS = 9;
App.HINT_TIME_MS = 5000;
App.TILE_SIZE = 70;
App.POINTS_COMPLETE = 15000;
App.EXTRA_TIME = 10000;
App.MAIN_FONT = 'MAIN_FONT';
App.DIGITS_BLUE_FONT = 'DIGITS_BLUE_FONT';
App.DIGITS_WHITE_FONT = 'DIGITS_WHITE_FONT';
App.DIGITS_GREEN_FONT = 'DIGITS_GREEN_FONT';
App.DIGITS_PURPLE_FONT = 'DIGITS_PURPLE_FONT';
App.DIGITS_RED_FONT = 'DIGITS_RED_FONT';
App.DIGITS_YELLOW_FONT = 'DIGITS_YELLOW_FONT';
App.TEXT_DARK = 'TEXT_DARK';
App.TEXT_RED = 'TEXT_RED';
App.TEXT_GREEN = 'TEXT_GREEN';
//image atlas keys
App.MENU_ITEMS_KEY = 'MENU_ITEMS_KEY';
App.LOADING_KEY = 'LOADING_KEY';
App.GAMEPLAY_KEY = 'GAMEPLAY_KEY';
App.SCORE_PAUSE_KEY = 'SCORE_PAUSE_KEY';
App.TUTORIAL_KEY = 'TUTORIAL_KEY';
App.COUNTDOWN_KEY = 'COUNTDOWN_KEY';
App.GAME_LOGO_KEY = 'GAME_LOGO_KEY';
App.LOGO_KEY = 'LOGO_KEY';
App.ORIENTATION_KEY = 'ORIENTATION_KEY';
App.OPTIONS_TEXT_STYLE = {
	fill: '#000000'
};
App.SOUND_QUESTION_STYLE = {
	fill: '#FFFFFF'
};
App.SCORE_TEXTS_STYLE = {
	font: "16px Arial",
	fill: '#FFFFFF'
};
App.SCORE_TITLE_STYLE = {
	font: "38px Arial",
	fill: '#FFFFFF'
};

var Sushi = {};

Sushi.BlockColor = {
	RED: 0,
	YELLOW: 1,
	GREEN: 2,
	PURPLE: 3,
	BLUE: 4
}

Sushi.State = {
	TUTORIAL: 0,
	COUNTDOWN: 1,
	PREPARING: 2,
	PLAYING: 3,
	SHOWING_SCORE: 4,
	PAUSE: 5
}