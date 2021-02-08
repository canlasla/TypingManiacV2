export default class Lives {
	constructor(game, ctx) {
		this.gameWidth = game.gameWidth;
		this.gameHeight = game.gameHeight;
		this.game = game;
		this.lives = 3;
		this.position = {
			x:
				this.gameWidth -
				ctx.measureText('Lives left: ' + this.lives).width -
				40,
			y: this.gameHeight - 10,
		};
	}

	draw(ctx) {
		ctx.font = '20px Consolas';
		ctx.fillStyle = 'white';
		ctx.fillText('Lives left: ' + this.lives, this.position.x, this.position.y);
	}
}
