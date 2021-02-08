export default class Score {
	constructor(game, ctx) {
		this.gameWidth = game.gameWidth;
		this.gameHeight = game.gameHeight;
		this.game = game;
		this.score = 0;
		this.position = {
			x: 10,
			y: this.gameHeight - 10,
		};
	}

	draw(ctx) {
		ctx.font = '20px Consolas';
		ctx.fillStyle = 'white';
		ctx.fillText('Score: ' + this.score, this.position.x, this.position.y);
	}
}
