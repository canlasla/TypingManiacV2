import Word from '/src/word.js';
import { wordArray } from '/src/wordsarray.js';

const GAMESTATE = {
	PAUSED: 0,
	RUNNING: 1,
	MENU: 2,
	GAMEOVER: 3,
};

export default class Game {
	constructor(gameWidth, gameHeight, ctx) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.gamestate = GAMESTATE.RUNNING;

		this.speed = 1;
		this.gameObjects = [
			new Word(
				this,
				wordArray[Math.floor(Math.random() * wordArray.length)],
				ctx
			),
		];
		this.lives = 3;

		// new InputHandler(this.paddle, this);
	}

	start() {
		if (
			this.gamestate !== GAMESTATE.MENU &&
			this.gamestate !== GAMESTATE.NEWLEVEL
		)
			return;

		this.gameObjects.push(this.word);

		this.gamestate = GAMESTATE.RUNNING;
	}

	update(deltaTime, ctx) {
		// if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

		// if (
		// 	this.gamestate === GAMESTATE.PAUSED ||
		// 	this.gamestate === GAMESTATE.MENU ||
		// 	this.gamestate === GAMESTATE.GAMEOVER
		// )
		// 	return;

		// [...this.gameObjects].forEach((object) => object.update(deltaTime));

		var i = 0;
		for (i = 0; i < this.gameObjects.length; i++) {
			var gone = this.gameObjects[i].update(deltaTime);
			if (gone) {
				this.gameObjects = this.gameObjects.filter((word) => !word.gone);
				this.gameObjects.push(
					new Word(
						this,
						wordArray[Math.floor(Math.random() * wordArray.length)],
						ctx
					)
				);
				if (Math.floor(Math.random() * 8) === 1) {
					this.gameObjects.push(
						new Word(
							this,
							wordArray[Math.floor(Math.random() * wordArray.length)],
							ctx
						)
					);
				}
			}
		}
	}

	draw(ctx) {
		[...this.gameObjects].forEach((object) => object.draw(ctx));

		if (this.gamestate === GAMESTATE.PAUSED) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,0.5)';
			ctx.fill();

			ctx.font = '30px Arial';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);
		}

		if (this.gamestate === GAMESTATE.MENU) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,1)';
			ctx.fill();

			ctx.font = '30px Arial';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.fillText(
				'Press SPACEBAR To Start',
				this.gameWidth / 2,
				this.gameHeight / 2
			);
		}
		if (this.gamestate === GAMESTATE.GAMEOVER) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,1)';
			ctx.fill();

			ctx.font = '30px Arial';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.fillText('GAME OVER', this.gameWidth / 2, this.gameHeight / 2);
		}
	}

	togglePause() {
		if (this.gamestate == GAMESTATE.PAUSED) {
			this.gamestate = GAMESTATE.RUNNING;
		} else {
			this.gamestate = GAMESTATE.PAUSED;
		}
	}
}
