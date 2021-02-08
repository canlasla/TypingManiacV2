export default class Word {
	constructor(game, word, ctx) {
		this.word = word;

		this.gameWidth = game.gameWidth;
		this.gameHeight = game.gameHeight;
		this.game = game;

		this.position = {
			x: Math.floor(
				Math.random() * (this.gameWidth - ctx.measureText(this.word).width)
			),
			y: 0,
		};
		this.speed = game.speed + Math.floor(Math.random() * 2);
		this.gone = false;
	}

	draw(ctx) {
		ctx.font = '20px Consolas';
		ctx.fillStyle = 'white';
		ctx.fillText(this.word, this.position.x, this.position.y);
	}

	update(deltaTime) {
		this.position.y += this.speed;
		// alert('here');
		// bottom of game
		if (this.position.y > this.gameHeight) {
			// this.game.lives--;
			this.gone = true;
			return true;
		}
		return this.gone;
	}
}
