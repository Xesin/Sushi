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
	}
}