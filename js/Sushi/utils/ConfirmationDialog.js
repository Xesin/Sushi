ConfirmationDialog = function(game, message, onConfirm, onCancel, context) {
	XEngine.Group.call(this, game, game.width/2, game.height/2);
	this.createMenu(message);
	this.onConfirm = onConfirm;
	this.onCancel = onCancel;
	this.context = context;
}

ConfirmationDialog.prototypeExtends = {
	createMenu: function(message){
		this.addInvisibleBackground();
		this.scale.setTo(0, 0);
		this.game.tween.add(this.scale).to({
			x: 1,
			y: 1
		}, 300, XEngine.Easing.Back.Out, true);
		var panel = this.game.add.sprite(0, 0, App.MENU_ITEMS_KEY, 'ConfirmationWindow');
		panel.anchor.setTo(0.5);
		var questionText = this.game.add.bitmapText(panel.position.x, panel.position.y - 60, App.MAIN_FONT, message);
		questionText.scale.setTo(0.7);
		questionText.anchor.setTo(0.5);
		var positiveButton = this.game.add.button(panel.position.x + 100, panel.position.y + 50, App.MENU_ITEMS_KEY, 'Ok', 'Ok_down', 'Ok');
		positiveButton.onClick.addOnce(this.confirmationPressed, this);
		positiveButton.anchor.setTo(0.5);
		var negativeButton = this.game.add.button(panel.position.x - 100, panel.position.y + 50, App.MENU_ITEMS_KEY, 'Cancel', 'Cancel_down', 'Cancel');
		negativeButton.onClick.addOnce(this.cancelPressed, this);
		negativeButton.anchor.setTo(0.5);
		this.add(panel);
		this.add(questionText);
		this.add(positiveButton);
		this.add(negativeButton);
	},

	confirmationPressed:function(){
		this.setAll('inputEnabled', false);
		this.game.tween.add(this.scale).to({
			x: 0,
			y: 0
		}, 300, XEngine.Easing.Back.In, true).onComplete.add(function () {
			this.invisibleBackground.destroy();
			if (this.onConfirm) {
				this.onConfirm.call(this.context);
			}
			this.destroy();
		}, this);
	},

	cancelPressed:function(){
		this.setAll('inputEnabled', false);
		this.game.add.tween(this.scale).to({
			x: 0,
			y: 0
		}, 300, XEngine.Easing.Back.In, true).onComplete.add(function () {
			this.invisibleBackground.destroy();
			if (this.onCancel) {
				this.onCancel.call(this.context);
			}
			this.destroy();
		}, this);
	},

	addInvisibleBackground:function(){
		this.invisibleBackground = this.game.add.rect(0, 0, this.game.width, this.game.height);
		this.invisibleBackground.setColor(0,0,0,0.4);
		this.invisibleBackground.inputEnabled = true;
	},
};

ConfirmationDialog.prototype = Object.create(XEngine.Group.prototype);
Object.assign(ConfirmationDialog.prototype, ConfirmationDialog.prototypeExtends); //Se le añade el prototypeExtends al prototype original
