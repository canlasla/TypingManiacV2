export default class InputHandler {
	constructor(game, ctx) {
		this.inputElement = document.getElementById('input');
		document.addEventListener('keydown', (event) => {
			switch (event.code) {
				case 'Escape':
					game.togglePause();
					break;
				case 'ControlLeft' || 'ControlRight':
					game.start(ctx);
					break;
			}
		});
	}
}
