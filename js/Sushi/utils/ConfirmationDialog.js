ConfirmationDialog = function(game, message, onConfirm, onCancel, context) {
	XEngine.Group.call(this, game, game.width/2, game.heigth/2);
	this.createMenu(message);
	this.onConfirm = onConfirm;
	this.onCancel = onCancel;
	this.context = context;
}