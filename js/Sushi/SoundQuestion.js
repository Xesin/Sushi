var SoundQuestion = function(game){
	
};
	
SoundQuestion.prototype = {
	start:function(){
		this.game.add.sprite(0, 0, App.MENU_ITEMS_KEY, 'Background');
		var confirmation = new ConfirmationDialog(this.game, 'Quieres sonido?', this.onClickYes, this.onClickNo, this);
		this.game.add.existing(confirmation, true, true);
		
	},

	onClickNo: function () {
		this.goToNextState();
	},
	onClickYes: function () {
		this.goToNextState();
	},
	goToNextState: function () {
		this.game.state.start('MainMenu');
	},
}