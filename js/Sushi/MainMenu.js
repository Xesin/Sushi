var MainMenu = function(game){

};

MainMenu.prototype = {
	start:function(){
		this.optionsButtonPosition = {
			x: 80,
			y: 80
		};
		this.languageButtonPosition = {
			x: this.game.width - 80,
			y: 80
		};
		this.playButtonPosition = {
			x: this.game.width/2,
			y: this.game.height - 160
		};
		this.logoPosition = {
			x: this.game.width/2,
			y: this.game.height/2 - 220
		};
		this.background = this.game.add.sprite(0, 0, App.MENU_ITEMS_KEY);
		this.background.frame = 'Background';
		this.createLogo();
		this.mainGroup = this.game.add.group();
		this.createButtons();
		this.optionsGroup = this.game.add.group();
		this.languageGroup = this.game.add.group();
	},

	createLogo:function(){
		this.logoGroup = this.game.add.group();
		this.logoGroup.position.x = this.logoPosition.x;
		this.logoGroup.position.y = this.logoPosition.y;
		this.logoGroup.alpha = 0;
		var logo = this.game.add.sprite(0, 0, App.GAME_LOGO_KEY, 'Logo');
		logo.scale.setTo(0.1);
		logo.anchor.setTo(0.5);
		this.logoGroup.add(logo);
		var sushiRed = this.game.add.sprite(0, 0, App.GAME_LOGO_KEY, 'Sushi_LogoRed');
		sushiRed.anchor.setTo(0.5);
		sushiRed.scale.setTo(0.3);
		this.logoGroup.add(sushiRed);
		var sushiGreen = this.game.add.sprite(0, 0, App.GAME_LOGO_KEY, 'Sushi_LogoGreen');
		sushiGreen.anchor.setTo(0.5);
		sushiGreen.scale.setTo(0.3);
		this.logoGroup.add(sushiGreen);
		var sushiPurple = this.game.add.sprite(0, 0, App.GAME_LOGO_KEY, 'Sushi_LogoPurple');
		sushiPurple.anchor.setTo(0.5);
		sushiPurple.scale.setTo(0.3);
		this.logoGroup.add(sushiPurple);
		var sushiYellow = this.game.add.sprite(0, 0, App.GAME_LOGO_KEY, 'Sushi_LogoYellow');
		sushiYellow.anchor.setTo(0.5);
		sushiYellow.scale.setTo(0.3);
		this.logoGroup.add(sushiYellow);
		var sushiBlue = this.game.add.sprite(0, 0, App.GAME_LOGO_KEY, 'Sushi_LogoBlue');
		sushiBlue.anchor.setTo(0.5);
		sushiBlue.scale.setTo(0.3);
		this.logoGroup.add(sushiBlue);
		// this.game.tween.add(this.logoGroup).to({
		// 	alpha: 1
		// }, 300, XEngine.Easing.ExpoIn, true, 300);
		this.game.tween.add(sushiRed.scale).to({ x: 1, y: 1 }, 600, XEngine.Easing.ExpoIn, true);
		this.game.tween.add(sushiGreen.scale).to({ x: 1, y: 1 }, 600, XEngine.Easing.ExpoIn, true);
		this.game.tween.add(sushiPurple.scale).to({ x: 1, y: 1 }, 600, XEngine.Easing.ExpoIn, true);
		this.game.tween.add(sushiYellow.scale).to({ x: 1, y: 1 }, 600, XEngine.Easing.ExpoIn, true);
		this.game.tween.add(sushiBlue.scale).to({ x: 1, y: 1 }, 600, XEngine.Easing.ExpoIn, true);
		this.game.tween.add(logo.scale).to({ x: 1, y: 1 }, 600, XEngine.Easing.ExpoIn, true);
		this.game.tween.add(sushiRed).to({ rotation: 17 }, 1500, XEngine.Easing.ExpoOut, true);
		this.game.tween.add(sushiGreen).to({ rotation: -19 }, 1500, XEngine.Easing.ExpoOut, true);
		this.game.tween.add(sushiPurple).to({ rotation: -25 }, 1500, XEngine.Easing.ExpoOut, true);
		this.game.tween.add(sushiYellow).to({ rotation: 15 }, 1500, XEngine.Easing.ExpoOut, true);
		this.game.tween.add(sushiBlue).to({ rotation: -18 }, 1500, XEngine.Easing.ExpoOut, true);
		this.game.tween.add(sushiRed.position).to({ x: '-220', y: '-50' }, 600, XEngine.Easing.ExpoIn, true);
		this.game.tween.add(sushiGreen.position).to({ x: '-220', y: '+140' }, 600, XEngine.Easing.ExpoIn, true);
		this.game.tween.add(sushiPurple.position).to({ x: '-30', y: '+250' }, 600, XEngine.Easing.ExpoIn, true);
		this.game.tween.add(sushiYellow.position).to({ x: '+180', y: '+220' }, 600, XEngine.Easing.ExpoIn, true);
		this.game.tween.add(sushiBlue.position).to({ x: '+250', y: '+30' }, 600, XEngine.Easing.ExpoIn, true);
	},

	createButtons:function(){
		var playButton = this.game.add.button(this.playButtonPosition.x, this.playButtonPosition.y, App.MENU_ITEMS_KEY, 'Play', 'Play_down', 'Play');
		var optionsButton = this.game.add.button(this.optionsButtonPosition.x, this.optionsButtonPosition.y, App.MENU_ITEMS_KEY, 'Options', 'Options_down', 'Options');
		var languageButton = this.game.add.button(this.languageButtonPosition.x, this.languageButtonPosition.y, App.MENU_ITEMS_KEY, 'Language', 'Language_down', 'Language');
		playButton.anchor.setTo(0.5);
		optionsButton.anchor.setTo(0.5);
		languageButton.anchor.setTo(0.5);
		this.mainGroup.add(playButton);
		this.mainGroup.add(optionsButton);
		this.mainGroup.add(languageButton);
		playButton.alpha = 0;
		playButton.scale.setTo(0);
		playButton.onClick.addOnce(this.playPressed, this);
		this.game.tween.add(playButton).to({
			alpha: 1
		}, 300, XEngine.Easing.ExpoIn, true, 300);
		this.game.tween.add(playButton.scale).to({
			x: 1,
			y: 1
		}, 400, XEngine.Easing.BackOut, true, 300);
		optionsButton.alpha = 0;
		optionsButton.scale.setTo(0);
		this.game.tween.add(optionsButton).to({
			alpha: 1
		}, 300, XEngine.Easing.ExpoIn, true, 300);
		this.game.tween.add(optionsButton.scale).to({
			x: 1,
			y: 1
		}, 400, XEngine.Easing.BackOut, true, 300);
		languageButton.alpha = 0;
		languageButton.scale.setTo(0);
		this.game.tween.add(languageButton).to({
			alpha: 1
		}, 300, XEngine.Easing.ExpoIn, true, 300);
		this.game.tween.add(languageButton.scale).to({
			x: 1,
			y: 1
		}, 400, XEngine.Easing.BackOut, true, 300);
	},

	playPressed:function(){
		this.mainGroup.setAll('inputEnabled', false);
		this.game.tween.add(this.logoGroup.scale).to({
			x: 0,
			y: 0
		}, 400, XEngine.Easing.BackIn, true).onComplete.addOnce(function () {
			this.game.state.start('Gameplay');
		}, this);
		var mainButtons = this.mainGroup.children;
		for (var i = 0; i < mainButtons.length; i++) {
			this.game.tween.add(mainButtons[i].scale).to({
				x: 0,
				y: 0
			}, 300, XEngine.Easing.BackIn, true);
		}
	}
}